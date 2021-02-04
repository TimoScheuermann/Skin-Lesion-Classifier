# <img src="https://api.timos.design:3002/drive/file/0cf423d2fce449af8a474bdf4ac7a126.png" /> **Skin Lesion Classifier**

## Table of Contents

  - [General](#general)
  - [Training via Google Colab](#training-via-google-colab)
  - [Deployment](#deployment)
  - [Nuxt.js Frontend (Client)](#nuxtjs-frontend-client)
  - [Ablauf der Klassifizierung](#ablauf-der-klassifizierung)
  - [Learnings](#learnings)

___
## General
Dieses Repo umfasst den kompletten Quelltext für den Client. Das Training des Modells geschieht über Google Colab. Hierfür wurde ein [Colab Notebook](https://colab.research.google.com/drive/17mIJ3YnYgui5P1YPK7T0H7BlZnKz6wCD) angelegt.

___
## Training via Google Colab
Das Notebook kann [hier](https://colab.research.google.com/drive/17mIJ3YnYgui5P1YPK7T0H7BlZnKz6wCD) eingesehen und bearbeitet werden  

### Daten erhalten und vorbereiten

**Ordnerstruktur erstellen**  
Hierbei werden für jede Läsionsart (inkl. gesund) ein Ordner für die Trainingsdaten und ein Ordner für die Validierungsdaten erstellt. Diese werden später mit den Datensätzen befüllt.

**Kaggle Token in Laufzeit laden**  
Hierzu wird ein [Kaggle Account](https://www.kaggle.com/) benötigt. Sobald dieser erstellt wurde benötigt man einen API Token, um die Datensätze von Kaggle in Google Colab zu importieren. Diesn erhält man, indem man auf sein Profilbild (oben rechts) klickt, im Drop-Down Menu auf Account klickt und dann runter bis zur Sektion API scrollt. Dort angekommen kann per ***Create API Token*** ein neuer Token erstellt werden. Die JSON Datei herunterladen und die Variable ***token*** in Google Colab bearbeiten.
    
**Datensätze herunterladen**  
Für das Modell werden 2 Datensätze heruntergeladen zum einem [HAM10000](https://www.kaggle.com/kmader/skin-cancer-mnist-ham10000) und [HAM10000-extended](https://www.kaggle.com/moohsassin/ba-ham10000-extended-nns). In HAM 10000 befinden sich die einzelnen Bilder der Hautläsionen. HAM10000-extended ist ein erweiterter Datensatz, welcher neben den Verweisen zu HAM10000 auch Bilder gesunder Haut enthält und auf diese ebenfalls verweist.

**Datensätze entpacken
Datensätze in vorher erstellte Ordner verteilen

### Einstellungen des Trainigs festlegen

**Data Augmentation**  
Data Augmentation ist eine Möglichkeit den Trainingsdatensatz durch Bildmanipulation zu vergrößern. Hierbei kann ein Bild vergrößert, verschoben, gedreht und gespiegelt werden. Diese Eisntellungsmöglichkeiten können in diesem Bereich festgelegt werden (Dies sind auch die gewählten Einstellungen des aktuellen Modells):
````py
datagen = ImageDataGenerator(
        rotation_range=180,
        width_shift_range=0.1,
        height_shift_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True,
        vertical_flip=True,
        #brightness_range=(0.9,1.1),
        fill_mode='nearest')
````
      
**Batchgröße festlegen (Anzahl der Samples in einem Batch)**  
Die Verwendung einer moderaten Batch-Größe hilft dahingehend, einen sanfteren Lernprozess für das Modell zu erreichen. Eine Batch-Größe von 32 oder 64 Trainingsdaten wird in den meisten Fällen eine glatte Lernkurve liefern. Es gilt jedoch: Je größer ein Batch, desto mehr Arbeitsspeicher wird benötigt, um diesen unterzubringen.

> Ein Training von Grund auf erfordert oftmals eine große Datenmenge und Rechenressourcen. Transfer-Lernen ist eine Technik, die vieles hiervon abkürzen kann. Dies ist möglich,  da ein Teil eines Modells, das bereits für eine verwandte Aufgabe trainiert wurde, in einem neuen Modell wiederverwendet wird. Hierdurch spart man Zeit und erhält schnell die gewünschten Ergebnisse.So wurde für das Modell das sogenannte Modell „mobilenet v1.00_224 verwendet, welches ein vortrainiertes Modell für Bildklassifizierungen ist.

**Festlegung der Anzahl der Schichten, die neu trainiert werden sollen (Hier 5)**  
````py
x = mobile.layers[-6].output
````

**Festlegung der "Trainingsziele"**  
````py
# Define Top2 and Top3 Accuracy

from tensorflow.keras.metrics import categorical_accuracy, top_k_categorical_accuracy

def top_3_accuracy(y_true, y_pred):
    return top_k_categorical_accuracy(y_true, y_pred, k=3)

def top_2_accuracy(y_true, y_pred):
    return top_k_categorical_accuracy(y_true, y_pred, k=2)

def top_1_accuracy(y_true, y_pred):
    return top_k_categorical_accuracy(y_true, y_pred, k=1)
````

**Festlegung der Initialgewichte**  
````py
class_weights = {
    0: 1.25, # akiec
    1: 1.0, # bcc
    2: 1.5, # bkl
    3: 2.0, # df
    4: 1.0, # healthy
    5: 4.0, # mel
    6: 1.25, # nv,
    7: 1.0, # vasc
}
````

**Festlegung, nach welchem Kriterium trainiert werden soll**  

````py
checkpoint = ModelCheckpoint(filepath, monitor='val_top_2_accuracy', verbose=1, save_best_only=True, mode='max')
reduce_lr = ReduceLROnPlateau(monitor='val_top_2_accuracy', factor=0.5, patience=2, verbose=1, mode='max', min_lr=0.00001)
````

Hierzu wurde der Fokus bei diesem Modell die Top-2-Genauigkeit gelegt. Gleichzeitig kann hier auch die Lerngeschwindigkeit geregelt werden, sollte es im Verlauf zu keinen positiven Änderungen der Genauigkeit kommen

### Validierung des Trainings
Für die Validierung werden mehrere Kennzahlen ausgegeben. Zum einen die einzelnen Genauigkeiten der letzten Epoche, zum andere werden auch Grafen gezeichnet. Hierzu zählen Grapfen der Top-1 bis Top-3 Genauigkeit, bei welchen die Validierung mit den Trainingswerten verglichen werden und ein Graf, der die Confusion Matrix abbildet.

### Konvertierung des Keras Modells
Als letzter Schritt konvertiert das Colab Notebook das entstandene Keras (.h5) Modell zu einem TensorFlow.js (.json und .dat) Modell. Diese benötigten Dateien werden alle zu einem Zip Archiv kombiniert und können im Anschluss im Datei-Browser des Notebooks gefunden und heruntergeladen werden. Dieses ZIP enthält alle Informationen, die das Frontend benötigt, um das Modell zu laden und zu verwenden.

__
## Deployment
Für das Deployment wird [netlify](https://netlify.app/) verwendet. Mit Hilfe von netlify ist es möglich ein GitHub-Repo mit einer Netlify-App zu vernüpfen. Diese kümmert sich dann um die komplette CI/CD Pipeline und baut das Frontend bei gepushten Änderungen. Hier ist es auch gleichzeitig ganz einfach eine zuvor erworbene Domain einzubinden. Für Hobby-Projekte oder Forschung-Projekte eignet sich netlify ideal für das Deployment von Node.js Anwendungen wie Angular, Vue, React oder Nuxt.js.

___
## Nuxt.js Frontend (Client)

Die Anwendung ist unter folgender URL erreichbar: [https://slc.timos.design](https://slc.timos.design)  

Dort angekommen befindet sich der Anwendung auf der ["index.vue"](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/index.vue). Sollte er die /classifier route angegeben haben, so wird er automatisch wieder zur index zurückgeleitet. Betrachte hierzu [folgende Zeilen](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/classifier.vue#L56-L61)

### index.vue
> Direkt auf der Startseite befindet sich ein blauer Knopf, welcher es dem Anwender ermöglicht, seine eigenen Aufnahmen einer Hautläsion zu analysieren. Hier kann er auf dem Computer Bilder auswählen und auf dem Smartphone zusätzlich auch ein Foto direkt mit der Kamera aufnehmen. Sobald ein Bild ausgewählt wurde, startet die Analyse automatisch und er gelangt in den Analysebereich. Bei Fragen zur Privatsphäre oder Verwendung der App, kann er unten auf den grünen Knopf drücken und gelangt so zum FAQ-Bereich.

### faq.vue
> Im Fragen und Antworten Bereich kann der Anwender Informationen zur Verarbeitung und Nutzung finden. Neben Fragen wie „Was ist mit der Privatsphäre meiner Bilder?“ oder „Muss ich jedes Mal warten, bis das Modell geladen wurde, wenn ich die App verwende?“ gibt es hier auch Hinweise zu der Bedeutung der Prozente im Analysebereich und einfachen Fragen wie der Verwendung der App. Weiter wird hier erklärt, wie Bilder aus dem Fotoalbum ausgewählt oder mit der Kamera direkt neue Fotos aufgenommen werden können.

### classifier.vue
> Im Analysebereich angekommen, sieht der Anwender zunächst eine Ladeanimation. Ist die Analyse abgeschlossen, so werden ihm die Ergebnisse angezeigt. Diese sind nach ihrer Wahrscheinlichkeit absteigend sortiert. Neben den Prozentwerten befinden sich zusätzlich der Name der Klasse der Hautläsion und eine kurze Beschreibung dieser. Möchte der Anwender mehr zu einer in den Ergebnissen aufgelisteten Klasse erfahren, so erreicht er dies durch ein klicken auf „Mehr erfahren“ und gelangt in den Detailbereich.

### details/\_lesion.vue
> Den Detailbereich kann ein Anwender erreichen, nachdem die Analyse abgeschlossen ist und er mehr zu einer speziellen Läsionsklasse erfahren möchte. Hier findet er eine ausführlichere Beschreibung dieser. Von hier kann der Anwender jederzeit wieder zurückgehen und die Auswertung des Bildes einsehen.

__
## Ablauf der Klassifizierung

**Laden des Modells**
Bevor die Klassifizierung beginnen kann, muss das Modell zunächst geladen werden. Dies geschieht beim [initialen Laden](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/index.vue#L53-L56) der Seite. Hierzu wird der commit ***"loadModel"*** an the internen store geschickt. Dieser nimmt diesen entgegen und [prüft zunächst, ob das Modell bereits geladen wurde oder aktuell geladen wird](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/store/index.ts#L54). Ist dies nicht der Fall, so wird die ***modelLoading*** Variable des stores auf _true_ gesetzt.  

Da es vorkommen kann, das der Anwender die Seite bereits besucht hat, so wird in einem ersten Schritt versucht, das Modell aus der [indexeddb des Browsers zu laden](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/store/index.ts#L62-L64). Gelingt dies nicht, so wird das Modell aus der [Anwendung geladen](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/store/index.ts#L69) und im Anschluss in der indexeddb [gespeichert](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/store/index.ts#L73).  

Nach erfolgreichem Laden (unabhängig von der Quelle) wird das Modell im internen store gespeichert und der Anwender kann über den nun erschienen Button ein Bild für die Klassifizierung auswählen.  

**Klassifizierungsvorgang**
Sobald der Anwender ein Bild über den Button ausgewählt hat, wird dieser ["change" erkannt](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/index.vue#L17). Im Anschluss wird geprüft ob auch wirklich ein [Bild ausgewählt wurde](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/index.vue#L66-L71). Ist dies der Fall so wird ein FileReader verwendet, um die [Datei zu laden](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/index.vue#L89). Hierbei wird das Bild in einen base64 encoded string konvertiert. Dieser String wird im [internen store gespeichert](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/index.vue#L82) und der Anwender [auf /classifier weitergeleitet](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/index.vue#L85). 

Auf /classifier angekommen, wird zunächst überprüft, ob das Bild auch wirklich [im store existiert](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/classifier.vue#L56-L61). Ist dies nicht der Fall, so wird der Anwender zurück zu index.vue geschickt.  

In einem weiteren Schritt wird nun geprüft, ob dises Bild bereits klassifiziert wurde. Ist dies der Fall, so muss nicht erneut klassifiziert werden. Anderenfalls wird nun die Klassifizierung eingeleitet.  

Hier wird zunächst das base64 Bild [in ein HTML-Image-Element konvertiert](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/classifier.vue#L68), da TensorFlow.js dieses benötigt. Im Detail sieht die Konvertierung wie folgt aus (Dieser Ausschnitt ist [hier](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/static/functions.ts#L10-L24) zu finden):
```js
/**
 * convert a base64 encoded image to a HTMLImageElement
 * @param src base64 encoded image
 * @returns HTMLImageElement
 */
export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    // init image
    const img = new Image();

    // set up onload-callback
    img.onload = () => resolve(img);

    // set up onerror-ballback
    img.onerror = reject;

    // initiate loading
    img.src = src;
  });
}
```

Wurde das Bild geladen, so kann nun die Klassifizierung an sich starten. Hierzu wird die Methode [***predictImage***](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/static/functions.ts#L26-L65) aufgerufen, welche die Ergebnisse als Array von [Result](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/static/interfaces.ts#L23-L26)-Objekten zurück gibt.  

***predictImage***
Hier wird zunächst der [Tensor konfiguriert](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/static/functions.ts#L36-L44) und im Anschluss die predict Methode von TensorFlow.js [ausgeführt](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/static/functions.ts#L47). Diese liefert ein Array der Länge 8, da das Modell ursprünglich für 8 Klassen trainiert wurde. Diese sind in der gleichen Reihenfolge wie die Initialgewichte. Die Reihenfolge selbst wurde im Training festgelegt und muss hier nun [genauso übernommen werden](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/static/interfaces.ts#L12-L21).

Da unser Array nach der predict-Methode von TensorFlow.js lediglich 8 Zahlen-Werte (für den Anwender ohne Kontext) enthält, müssen diese nun gemappt werden. Hierzu werden zunächst die einfachen Zahlen (Wahrscheinlichkeiten) zu Objekten der Form [Result](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/static/interfaces.ts#L23-L26) gemapped. Der folgende Ausschnitt stammt von [hier](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/static/functions.ts#L52-L57):
```js
.map((p, i) => {
  return {
    lclass: lesionClasses[i],
    probability: p
  } as Result;
})
```

Da nun die Reihenfolge frei geändert werden kann, da die Läsions-Klasse nun neben der Wahrscheinlichkeit existiert, kann in einem nächsten Schritt "aufgeräumt" werden. Um dem Anwender nicht jede noch so gering wahrscheinliche Läsion sehen möchte, werden die Ergebniss zunächst nach ihrer Wahrscheinlichkeit sortiert und im Anschluss die 3 wahrscheinlichsten Klassen behalten.
```js
// sort the lesions according to their probability
.sort((a, b) => b.probability - a.probability)
// remove every lesion after the 3rd
.slice(0, 3)
```

Hier kann es nun vorkommen, dass unser Modell sich sehr stark für eine Klasse entschieden hat, weshalb nun noch bei den 3 besten Vorhersagen diejenigen mit einer Wahrscheinlichkeit > 0.001 (also > 0.1%) erhalten bleiben.
```js
// remove lesions with a propability less or equal than 0.1%
.filter(x => x.probability > 0.001);
```

Das entstandene Ergebnis besteht nun aus max 3 Läsionen und wird an [den Aufrufer zurück gegeben](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/classifier.vue#L71). Dieses Ergebnis wird folglich [gespeichert](https://github.com/TimoScheuermann/Skin-Lesion-Classifier/blob/main/pages/classifier.vue#L77) und dem Anwender präsentiert.  

Aufgrund des Speicherns ist es möglich, die /classifier Seite zu verlassen, um bspws. genauere Informationen zu einer Läsion zu erhalten und im Anschluss ohne Wartezeit erneut auf das Ergebnis zu blicken.

___
## Learnings

- Ich habe es leider nicht geschafft TensorFlow.js mit Vue.js zu verwenden. Tensorflow benötigt bestimmte Ressourcen, auf die man mit Vue keinen Zugriff hat. Dies liegt sehr wahrscheinlich daran, das Vue beim Client gerendert und alles verarbeitet wird und Nuxt.js das ganze Serverseitig handhabt. Deshalb musste für diesen Prototypen mit Nuxt.js gearbeitet werden.

- Der localstorage kann das Modell nicht speichern, da es zu großt ist. Die indexeddb jedoch kann dies. Hierdurch wird das n-te Laden des Modells sehr stark beschleunigt.

- Der PWA Support von Nuxt.js hat seine Vor- und Nachteile.
  - Zu den Vorteilen gehört:
    - Automatische Konvertierung des Icons in die benötigten größen
    - Schnelles Erstellen einer PWA, die Offline sehr gut funktioniert
  - Zu den Nachteilen gehört:
    - Die automatisch erstellten Icons haben keinen "erweiterten" Hintergrund. Das bedeutet, dass die größe im Allgemeinen zwar passt, bei Splash-Screens für Handys aber bspw. wird das Bild auf die benötigte Breite skaliert, die restliche Fläche (oberr- und unterhalb) des Bildes bleiben jedoch schwarz. Diese Farbe konnte bis zum aktuellen Zeitpunkt nicht geändert/festgelegt werden
    - Der Name der Anwendung, welche standardmäßig aus der package.json geladen wird, in der nuxt.config.js jedoch eingentlich geändert werden kann wurde nicht übernommen. Hierdurch wird aktuell noch der name der package.json bei der Installation "voreingetragen". Da in der package.json der name nur klein und ohne Leerzeichen geschrieben werden darf, verursacht dies einen unschönen Namen :(

- Da ich persönlich noch nicht all zu viel mit Python und ML gearbeitet habe, konnte ich keinen eleganteren Weg auf die schnelle finden, um weitere Datensätze für das Training zu verwenden. Deshalb habe ich einen neuen Datensatz auf Kaggle veröffentlicht, welcher zum einen auf den alten Datensatz in der Excel-Datei verweist und zum anderen auf die zusätzlichen Datensätze. Hier konnte ich aufgrund des gegeben Bearbeitungszeitraums nichts besseres auf die Schnelle bereitstellen.
