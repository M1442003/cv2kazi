import json
import re
import time

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from jobs_data import JOBS
from pydantic import BaseModel
from parser import extract_text
from scorer import rule_based_score
from analyzer import ai_analyze, model as gemini_model

load_dotenv()

app = FastAPI(title="CV Analyzer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------- Root & health --------------------

@app.get("/")
def root():
    return {"status": "ok", "service": "CV Analyzer"}


@app.get("/health")
def health():
    return {"status": "healthy"}


# -------------------- /analyze --------------------

@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    job_description: str = Form(""),
):
    if not file.filename.lower().endswith((".pdf", ".docx")):
        raise HTTPException(400, "Only PDF or DOCX files are allowed.")

    data = await file.read()
    if len(data) > 5 * 1024 * 1024:
        raise HTTPException(400, "File too large (max 5MB).")

    try:
        text = extract_text(data, file.filename)
    except Exception as e:
        raise HTTPException(400, f"Parse error: {e}")

    if len(text.strip()) < 50:
        raise HTTPException(
            400, "Could not read CV text. Try a text-based PDF or DOCX."
        )

    rules = rule_based_score(text)

    try:
        ai_raw = ai_analyze(text)
        cleaned = re.sub(
            r"^```json|```$", "", ai_raw.strip(), flags=re.MULTILINE
        ).strip()
        ai = json.loads(cleaned)
    except Exception as e:
        ai = {"error": f"AI analysis failed: {e}"}

    return {
        "filename": file.filename,
        "rule_based": rules,
        "ai_analysis": ai,
        "job_description_provided": bool(job_description.strip()),
    }


# -------------------- /rewrite --------------------

@app.post("/rewrite")
async def rewrite_bullet(
    bullet: str = Form(...),
    job_context: str = Form(""),
):
    """Rewrite a single CV bullet point with AI."""
    if not bullet.strip():
        raise HTTPException(400, "Bullet text is required.")

    context_line = f"Job context: {job_context}" if job_context else ""

    prompt = f"""You are a CV writing expert for the Tanzanian job market.

Rewrite the bullet point below to be:
- More impact-driven (start with a strong action verb)
- Include measurable metrics if possible (use placeholder [X] for numbers)
- Concise (max 25 words)
- Professional and specific

Return ONLY the rewritten bullet — no quotes, no explanations.

{context_line}

Original bullet: {bullet}
"""

    for attempt in range(3):
        try:
            resp = gemini_model.generate_content(prompt)
            return {"rewritten": resp.text.strip()}
        except Exception as e:
            msg = str(e)
            if (
                ("429" in msg or "quota" in msg.lower())
                and attempt < 2
            ):
                time.sleep(15)
                continue
            raise HTTPException(500, f"Rewrite failed: {e}")

    raise HTTPException(500, "Rewrite failed after retries.")
# -------------------- Jobs --------------------

class JobMatchRequest(BaseModel):
    cv_text: str
    location: str = ""
    job_type: str = ""


def _calculate_match(cv_text: str, job: dict) -> dict:
    """Score how well a CV matches a job (0-100)."""
    cv_lower = cv_text.lower()

    # Keyword scoring
    matched = [kw for kw in job["keywords"] if kw.lower() in cv_lower]
    missing = [kw for kw in job["keywords"] if kw.lower() not in cv_lower]

    keyword_score = (
        len(matched) / len(job["keywords"]) * 100
        if job["keywords"]
        else 0
    )

    # Title bonus — if job title words appear in CV
    title_words = job["title"].lower().split()
    title_hits = sum(1 for w in title_words if w in cv_lower)
    title_score = min(title_hits / max(len(title_words), 1) * 100, 100)

    # Weighted total (70% keywords, 30% title)
    score = int(keyword_score * 0.7 + title_score * 0.3)

    return {
        "score": min(score, 100),
        "matched_keywords": matched,
        "missing_keywords": missing[:8],  # top 8 missing
    }


@app.post("/jobs/match")
async def match_jobs(req: JobMatchRequest):
    """Return jobs ranked by how well they match the CV."""
    cv_text = req.cv_text.strip()
    if len(cv_text) < 50:
        raise HTTPException(400, "CV text is too short to match.")

    results = []
    for job in JOBS:
        # Optional filters
        if req.location and req.location.lower() not in job["location"].lower():
            continue
        if req.job_type and req.job_type.lower() != job["type"].lower():
            continue

        match = _calculate_match(cv_text, job)
        results.append({**job, "match": match})

    # Sort by score descending
    results.sort(key=lambda j: j["match"]["score"], reverse=True)

    return {
        "total": len(results),
        "jobs": results[:12],  # top 12
    }