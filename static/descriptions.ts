import { LesionClass, SLInformation } from "./interfaces";

export const descriptions: Record<LesionClass, SLInformation> = {
  BCC: {
    name: "Basalzellkarzinom",
    description:
      "Das Basalzellkarzinom (BCC, engl. basal cell carcinoma) ist eine häufige Variante des epithelialen Hautkrebs, welcher selten metastasiert, aber unbehandelt zerstörerisch wächst. Es tritt in verschiedenen morphologischen Varianten auf (flach, knötchenförmig, pigmentiert oder zystisch), welche von Lallas et al. (2014) näher beschrieben werden."
  },
  HEALTHY: {
    name: "Gesund",
    description:
      "Es konnte keine Läsion der Haut erkannt werden. Solltest du dir dennoch unsicher sein, kannst du versuchen einen erneuten Scan der betroffenen Region durchzuführen. Hierzu ist ein anderer Winkel hilfreich."
  },
  MEL: {
    name: "Melanom",
    description:
      "Das Melanom (MEL, engl. Melanoma) ist ein bösartiges Neoplasma, das von Melanozyten abstammt und in verschiedenen Varianten auftreten kann. Wenn es in einem frühen Stadium exzidiert wird, kann es durch einfache chirurgische Exzision geheilt werden. Melanome können invasiv oder nicht invasiv (insitu) auftreten."
  },
  AKIEC: {
    name: "Aktinische Keratosen",
    description:
      "Aktinische Keratosen (Solare Keratosen) und intrepithaeliale Karzinome (AKIEC, engl. Actinic Keratoses and Intraepithelial Carcinoma) sind häufige nicht-invasive Varianten des Plattenepithelkarzinoms, die lokal und ohne Operation behandelt werden können. Da beide Typen durch UV-Licht induziert werden, ist die umgebende Haut in der Regel durch schwere Sonnenschäden gekennzeichnet."
  },
  BKL: {
    name: "Benign Keratosis",
    description:
      "Die „benigne Keratose“ (BKL, engl. Benign Keratosis) ist eine generische Klasse. In dieser ist die seborrhoische Keratose („senile Warze“), solare Lentigo, die als flache Variante der seborrhoischen Keratose betrachtet werden kann und flechtenplanusähnliche Keraotose einzuordnen. Diese Untergruppen sehen dermatoskopisch unterschiedlich aus, dennoch wurden sie in diesem Datensatz zusammengefasst, da sie biologisch ähnlich und histopathologisch oft unter demselben Oberbegriff zu finden sind."
  },
  DF: {
    name: "Dermatofibrom",
    description:
      "Das Dermatofibrom (DF, engl. Dermatofibroma) ist eine gutartige Hautläsion, die entweder als gutartige Proliferation oder als Entzündungsreaktion auf ein minimales Trauma betrachtet wird. Die häufigste dermatoskopische Darstellung sind retikuläre Linien an der Peripherie mit einem zentralen weißen Fleck, der eine Fibrose zeigt."
  },
  NV: {
    name: "Melanocytic Nevi",
    description:
      "Melanozytäre Nävi (NV, engl. melanocytic nevi) sind gutartige Neubildungen von Melanozyten und treten in einer Vielzahl von Varianten auf. Die Varianten können sich aus dermatoskopischer Sicht deutlich unterscheiden. Im Gegensatz zum Melanom sind diese in der Regel symmetrisch in Bezug auf die Verteilung von Farbe und Struktur"
  },
  VASC: {
    name: "Vaskulären Hautläsion",
    description:
      "Die vaskulären Hautläsionen (VASC, engl. Vascular skin lesion) im Datensatz reichen von Kirschangiomen über Angiokeratome186 bis hin zu pyogenen Granulomen.187 Angiome sind dermatoskopisch durch eine rote oder violette Farbe und feste, gut umschriebene Strukturen gekennzeichnet, die als rote Klumpen oder Lakunen bekannt sind."
  }
};
