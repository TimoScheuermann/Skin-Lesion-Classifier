import { LesionClass, SLDescription } from "./interfaces";

export const descriptions: Record<LesionClass, SLDescription> = {
  BCC: {
    name: "Basalzellkarzinom",
    short:
      "ist eine häufige Variante des epithelialen Hautkrebses, die selten metastasiert, aber unbehandelt zerstörerisch...",
    full:
      "ist eine häufige Variante des epithelialen Hautkrebses, die selten metastasiert, aber unbehandelt zerstörerisch wächst. Es tritt in verschiedenen morphologischen Varianten auf (flach, knötchenförmig, pigmentiert, zystisch)."
  },
  HEALTHY: {
    name: "Gesund",
    short:
      "Es konnte keine Läsion der Haut erkannt werden. Solltest du dir dennoch unsicher sein, kannst du Versuchen...",
    full:
      "Es konnte keine Läsion der Haut erkannt werden. Solltest du dir dennoch unsicher sein, kannst du Versuchen einen erneuten Scan der betroffenen Region durchführen. Hierzu ist ein anderer Winkel hilfreich."
  },
  MEL: {
    name: "Melanom",
    short:
      "ist ein bösartiges Neoplasma, das von Melanozyten abstammt und in verschiedenen Varianten auftreten...",
    full:
      "ist ein bösartiges Neoplasma, das von Melanozyten abstammt und in verschiedenen Varianten auftreten kann. Wenn es in einem frühen Stadium exzidiert wird, kann es durch einfache chirurgische Exzision geheilt werden. Melanome können invasiv oder nicht invasiv (insitu) sein."
  },
  AKIEC: {
    name: "Aktinische Keratosen",
    short:
      "und intrepithaeliale Karzinome sind häufige nicht-invasive Varianten des Plattenepithelkarzinoms...",
    full:
      "und intrepithaeliale Karzinome sind häufige nicht-invasive Varianten des Plattenepithelkarzinoms, die lo-kal und ohne Operation behandelt werden können. Da beide Typen durch UV-Licht induziert werden, ist die umgebende Haut in der Regel durch schwere Sonnenschäden gekennzeichnet."
  },
  BKL: {
    name: "Benign Keratosis",
    short:
      "auch Alterswarze genannt, ist der häufigste gutartige Tumor der Haut. Er entwickelt sich meist in der zweiten...",
    full:
      "Die seborrhoische Keratose (Synonyme: Seborrhoische Warze, Alterswarze, Verruca seborrhoica, Basalzellpapillom) ist der häufigste gutartige Tumor der Haut. Er entwickelt sich meist in der zweiten Lebenshälfte, die Häufigkeit seines Auftretens nimmt mit steigendem Alter zu. Fast alle Menschen entwickeln im Laufe des Lebens eine bis mehrere seborrhoische Keratosen, wobei beide Geschlechter gleich häufig betroffen sind."
  },
  DF: {
    name: "Dermatofibrom",
    short:
      "ist eine gutartige Hautläsion, die entweder als gutartige Proliferation oder als Entzün-dungsreaktion auf ein...",
    full:
      "ist eine gutartige Hautläsion, die entweder als gutartige Proliferation oder als Entzün-dungsreaktion auf ein minimales Trauma betrachtet wird. Die häufigste dermatoskopi-sche Darstellung sind retikuläre Linien an der Peripherie mit einem zentralen weißen Fleck, der eine Fibrose zeigt."
  },
  NV: {
    name: "Melanocytic Nevi",
    short:
      "sind gutartige Neubildungen von Melanozyten und treten in einer Unzahl von Varianten auf. Die Varianten können...",
    full:
      "sind gutartige Neubildungen von Melanozyten und treten in einer Unzahl von Varianten auf. Die Varianten können sich aus dermatoksopischer Sicht deutlich unterschei-den. Im Gegensatz zum Melanom sind sie in der Regel symmetrisch in Bezug auf die Verteilung von Farbe und Struktur."
  },
  VASC: {
    name: "Vaskulären Hautläsion",
    short:
      "reichen im Datensatz von Kirschangiomen über Angiokeratome bis hin zu pyogenen Granulomen. Angiome sind dermatos...",
    full:
      "reichen im Datensatz von Kirschangiomen über Angiokeratome bis hin zu pyogenen Granulomen. Angiome sind dermatoskopisch durch eine rote oder violette Farbe und feste, gut umschriebene Strukturen gekennzeichnet, die als rote Klumpen oder Lakunen bekannt sind."
  }
};
