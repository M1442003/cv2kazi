import io
import pdfplumber
import docx


def extract_text(file_bytes: bytes, filename: str) -> str:
    """Extract plain text from PDF or DOCX bytes."""
    name = filename.lower()

    if name.endswith(".pdf"):
        text_parts = []
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                text_parts.append(page.extract_text() or "")
        return "\n".join(text_parts).strip()

    if name.endswith(".docx"):
        document = docx.Document(io.BytesIO(file_bytes))
        return "\n".join(p.text for p in document.paragraphs).strip()

    raise ValueError("Unsupported file type. Upload a .pdf or .docx file.")
