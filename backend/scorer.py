import re

SECTIONS = {
    "contact":    ["email", "phone", "linkedin", "@", "simu", "barua pepe"],
    "education":  ["education", "elimu", "university", "degree", "chuo", "shahada"],
    "experience": ["experience", "work", "employment", "kazi", "internship",
                   "ajira", "mafunzo"],
    "skills":     ["skills", "technical", "proficient", "ujuzi", "stadi"],
    "summary":    ["summary", "profile", "objective", "about", "muhtasari"],
}


def rule_based_score(text: str) -> dict:
    text_l = text.lower()
    words = re.findall(r"\b\w+\b", text)
    word_count = len(words)

    checks: dict = {}
    score = 0

    # --- Length ---
    if 300 <= word_count <= 900:
        checks["length"] = ["good", f"{word_count} words"]
        score += 15
    elif word_count < 300:
        checks["length"] = ["too short", f"{word_count} words — add detail"]
    else:
        checks["length"] = ["too long", f"{word_count} words — trim to 1-2 pages"]

    # --- Sections ---
    for sec, kws in SECTIONS.items():
        found = any(kw in text_l for kw in kws)
        checks[sec] = ["good" if found else "missing", ""]
        if found:
            score += 10

    # --- Email ---
    if re.search(r"[\w\.-]+@[\w\.-]+\.\w+", text):
        checks["email"] = ["good", ""]
        score += 5
    else:
        checks["email"] = ["missing", "Add an email address"]

    # --- Phone ---
    if re.search(r"(\+?\d[\d\s\-]{7,}\d)", text):
        checks["phone"] = ["good", ""]
        score += 5
    else:
        checks["phone"] = ["missing", "Add a phone number"]

    # --- Quantified achievements ---
    numbers = re.findall(r"\b\d+%|\b\d{2,}\b", text)
    if len(numbers) >= 3:
        checks["quantified"] = ["good", f"{len(numbers)} metrics found"]
        score += 10
    else:
        checks["quantified"] = ["weak",
                                "Add numbers (%, TZS, counts, team size)"]

    return {
        "score": min(score, 100),
        "checks": checks,
        "word_count": word_count,
    }
