"""Konversi PRICELIST SAHABAT INSURANCE.docx -> public/data/katalog-body-repair.json
Pakai: python -I scripts/build_harga.py "<path docx>"
"""
import sys, re, json, html, zipfile

src = sys.argv[1]
x = zipfile.ZipFile(src).read("word/document.xml").decode("utf8")
rows = []
for r in re.findall(r"<w:tr[ >].*?</w:tr>", x, re.S):
    cells = re.findall(r"<w:tc>.*?</w:tc>", r, re.S)
    rows.append([html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", c))).strip() for c in cells])

RULES = [
    ("AC", r"^AC SYSTEM|^SERVICE AC|KOMPRESSOR AC|PULLY AC"),
    ("Roda & Velg", r"^VELG|^DOP RODA|BAN SEREP|^SPOORING"),
    ("Mesin & Sistem", r"SYSTEM$|^ENGINE|^TRANSMISI|^KARTER|^KNALPOT|^PROPELLER|^PULLY|^REAR AXLE|^TURUN MESIN"),
    ("Kaca & Spion", r"^B/P KACA|^REGULATOR KACA|SPION"),
    ("Interior & Salon", r"^B/P JOK|^B/P ANTENNA|^INTERIOR|^SALON|^SERVICE JOK|DASHBOARD|^PLAFON|^LANTAI|^RANGKA DUDUKAN JOK|PANEL LANTAI BAGASI|DECK TRIM"),
    ("Bumper & Grille", r"^BUMPER|^EXT\. BUMPER|^TANDUK|^GRILLE|^KEDOK"),
    ("Rangka & Chasis", r"^CHASIS|^RANGKA|^BRACKET|^BRAKET|^TIANG|^REPAIR|^BULL ?HEAD|^BULLHEAD|^APPRON|^BODY MATI"),
    ("Engsel, Handle & Kunci", r"^ENGSEL|^HANDLE|^KUNCI|^LOCK|^TUTUP BENSIN"),
    ("Trim & Aksesori", r"^SPOILER|^MOULDING|^LIST|^MUDGUARD|^COVER|^FOOT ?STEP|^PELIPIT"),
]
def kategori(n):
    for k, pat in RULES:
        if re.search(pat, n): return k
    return "Panel Body"

KEEP = {"AC","B/P","P/S","LH","RH","R","R12","R134","O.","ECU"}
def title(n):
    out = []
    for w in n.split(" "):
        base = re.sub(r"[()+.,]", "", w)
        out.append(w if base in KEEP or w in KEEP or re.fullmatch(r"R\d+", base)
                   else re.sub(r"[A-Za-z]+", lambda m: m.group(0).capitalize(), w))
    return " ".join(out)

items = []
for r in rows[2:]:
    if len(r) == 3 and r[0].isdigit() and re.fullmatch(r"[\d.]+", r[2]):
        items.append({"id": int(r[0]), "nama": title(r[1]), "kategori": kategori(r[1]), "biaya": int(r[2].replace(".", ""))})

catatan = [re.sub(r"^\d+\.\s*", "", c).rstrip(";.") for r in rows for c in r if re.match(r"^\d+\.\s", c)]
json.dump({"judul": "Katalog Body Repair - PT Asuransi Sahabat Artha Proteksi",
           "catatan": catatan, "items": items},
          open("public/data/katalog-body-repair.json", "w", encoding="utf8"), ensure_ascii=False, indent=1)
from collections import Counter
print(len(items), "item"); print(Counter(i["kategori"] for i in items)); print(catatan)
