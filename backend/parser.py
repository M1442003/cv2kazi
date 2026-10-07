import io
import pdfplumber
import docx

try:
    from pdf2image import convert_from_bytes
    import pytesseract
    OCR_AVAILABLE = True
except ImportError:
    OCR_AVAILABLE = False


def extract_text(file_bytes: bytes, filename: str) -> str:
    """Extract plain text from PDF or DOCX bytes, with OCR fallback."""
    name = filename.lower()

    if name.endswith(".pdf"):
        return _extract_pdf(file_bytes)

    if name.endswith(".docx"):
        return _extract_docx(file_bytes)

    raise ValueError("Unsupported file type. Upload a .pdf or .docx file.")


def _extract_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF, using OCR if text-based extraction fails."""
    # Try text-based extraction first
    text_parts = []
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                text_parts.append(page.extract_text() or "")
    except Exception:
        pass

    text = "\n".join(text_parts).strip()

    # If too little text, try OCR
    if len(text) < 100 and OCR_AVAILABLE:
        try:
            print("[parser] text extraction returned little/nothing — running OCR")
            images = convert_from_bytes(file_bytes, dpi=200)
            ocr_parts = []
            for img in images:
                ocr_parts.append(pytesseract.image_to_string(img, lang="eng+swa"))
            ocr_text = "\n".join(ocr_parts).strip()
            if len(ocr_text) > len(text):
                print(f"[parser] OCR extracted {len(ocr_text)} chars")
                return ocr_text
        except Exception as e:
            print(f"[parser] OCR failed: {e}")

    return text


def _extract_docx(file_bytes: bytes) -> str:
    document = docx.Document(io.BytesIO(file_bytes))
    return "\n".join(p.text for p in document.paragraphs).strip()