import os
import time
import re as _re
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set. Check backend/.env file.")

genai.configure(api_key=api_key)

# ---- Auto-detect a working model ----
# Preferred order — we pick the first one the API says is available
PREFERRED_MODELS = [
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-2.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.6-flash",
    "gemini-3.7-flash",
    "gemini-3.8-flash",
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-pro-latest",
]

def _pick_model() -> str:
    """Query Google for available models and pick the best match."""
    # User override via .env
    override = os.getenv("GEMINI_MODEL", "").strip()
    if override:
        print(f"[gemini] using override model from .env: {override}")
        return override

    try:
        available = {
            m.name.replace("models/", "")
            for m in genai.list_models()
            if "generateContent" in m.supported_generation_methods
        }
        print(f"[gemini] models available to your key: {sorted(available)}")

        for candidate in PREFERRED_MODELS:
            if candidate in available:
                print(f"[gemini] selected model: {candidate}")
                return candidate

        # Fallback: first available that supports generateContent
        if available:
            fallback = sorted(available)[0]
            print(f"[gemini] no preferred match, using: {fallback}")
            return fallback
    except Exception as e:
        print(f"[gemini] could not list models ({e}), using default")
        return PREFERRED_MODELS[0]

    return PREFERRED_MODELS[0]

MODEL_NAME = _pick_model()
model = genai.GenerativeModel(MODEL_NAME)

# ---- Prompt ----
PROMPT = """You are a professional CV reviewer for the Tanzanian job market
(mainland and Zanzibar). Analyze this CV and respond ONLY in strict JSON
(no markdown fences, no commentary):

{{
  "overall_score": <integer 0-100>,
  "summary": "<2-sentence verdict>",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "improvements": [
    {{"section": "Experience", "issue": "...", "fix": "..."}}
  ],
  "ats_friendly": true,
  "tanzania_specific_tips": ["..."],
  "rewritten_summary": "<a better version of their summary section>"
}}

CV TEXT:
---
{cv_text}
---
"""

def ai_analyze(cv_text: str, max_retries: int = 3) -> str:
    """Return raw JSON string from Gemini, with retry on rate limit."""
    prompt = PROMPT.format(cv_text=cv_text[:8000])

    for attempt in range(max_retries):
        try:
            resp = model.generate_content(prompt)
            return resp.text

        except Exception as e:
            msg = str(e)
            if "429" in msg or "quota" in msg.lower() or "rate" in msg.lower():
                m = _re.search(r"retry in (\d+(?:\.\d+)?)s", msg)
                wait = float(m.group(1)) + 1 if m else 15
                if attempt < max_retries - 1:
                    print(f"[rate limit] waiting {wait:.1f}s, "
                          f"retry {attempt + 2}/{max_retries}")
                    time.sleep(wait)
                    continue
            raise

    raise RuntimeError("Max retries exceeded on Gemini API")
