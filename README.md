# <img src="https://api.timos.design:3002/drive/file/0cf423d2fce449af8a474bdf4ac7a126.png" /> **Skin Lesion Classifier**

## Table of Contents

  - [General](#general)
  - [Training via Google Colab](#training-via-google-colab)
  - [Nuxt.js Frontend (Client)](#nuxtjs-frontend-client)
  - [Learnings](#learnings)

___
## General
Dieses Repo umfasst den kompletten Quelltext für den Client. Das Training des Modells geschieht über Google Colab. Hierfür wurde ein [Colab Notebook](https://colab.research.google.com/drive/17mIJ3YnYgui5P1YPK7T0H7BlZnKz6wCD) angelegt.

___
## Training via Google Colab
Das Notebook kann [hier](https://colab.research.google.com/drive/17mIJ3YnYgui5P1YPK7T0H7BlZnKz6wCD) eingesehen und bearbeitet werden  

1. Daten erhalten und vorbereiten
    1. Ordnerstruktur erstellen  
    Hierbei werden für jede Läsionsart (inkl. gesund) ein Ordner für die Trainingsdaten und ein Ordner für die Validierungsdaten erstellt. Diese werden später mit den Datensätzen befüllt.
    2. Kaggle Token in Laufzeit laden  
    Hierzu wird ein [Kaggle Account](https://www.kaggle.com/) benötigt. Sobald dieser erstellt wurde benötigt man einen API Token, um die Datensätze von Kaggle in Google Colab zu importieren. Diesn erhält man, indem man auf sein Profilbild (oben rechts) klickt, im Drop-Down Menu auf Account klickt und dann runter bis zur Sektion API scrollt. Dort angekommen kann per ***Create API Token*** ein neuer Token erstellt werden. Die JSON Datei herunterladen und die Variable ***token*** in Google Colab bearbeiten.
    3. Datensätze herunterladen  
    Für das Modell werden 2 Datensätze heruntergeladen zum einem [HAM10000](https://www.kaggle.com/kmader/skin-cancer-mnist-ham10000) und [HAM10000-extended](https://www.kaggle.com/moohsassin/ba-ham10000-extended-nns). In HAM 10000 befinden sich die einzelnen Bilder der Hautläsionen. HAM10000-extended ist ein erweiterter Datensatz, welcher neben den Verweisen zu HAM10000 auch Bilder gesunder Haut enthält und auf diese ebenfalls verweist.
    4. Datensätze entpacken
    5. Datensätze in vorher erstellte Ordner verteilen

2. Einstellungen des Trainigs festlegen
    1. Data Augmentation  
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
      
    2. Batchgröße festlegen (Anzahl der Samples in einem Batch)
    Die Verwendung einer moderaten Batch-Größe hilft dahingehend, einen sanfteren Lernprozess für das Modell zu erreichen. Eine Batch-Größe von 32 oder 64 Trainingsdaten wird in den meisten Fällen eine glatte Lernkurve liefern. Es gilt jedoch: Je größer ein Batch, desto mehr Arbeitsspeicher wird benötigt, um diesen unterzubringen.

> Ein Training von Grund auf erfordert oftmals eine große Datenmenge und Rechenressourcen. Transfer-Lernen ist eine Technik, die vieles hiervon abkürzen kann. Dies ist möglich,  da ein Teil eines Modells, das bereits für eine verwandte Aufgabe trainiert wurde, in einem neuen Modell wiederverwendet wird. Hierdurch spart man Zeit und erhält schnell die gewünschten Ergebnisse.So wurde für das Modell das sogenannte Modell „mobilenet v1.00_224 verwendet, welches ein vortrainiertes Modell für Bildklassifizierungen ist.

  3. Festlegung der Anzahl der Schichten, die neu trainiert werden sollen (Hier 5)
    
````py
x = mobile.layers[-6].output
````

   4. Festlegung der "Trainingsziele"

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

  5. Festlegung der Initialgewichte

    `````py
    class_weights={
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
  6. Festlegung, nach welchem Kriterium trainiert werden soll

````py
checkpoint = ModelCheckpoint(filepath, monitor='val_top_2_accuracy', verbose=1, 
                             save_best_only=True, mode='max')

reduce_lr = ReduceLROnPlateau(monitor='val_top_2_accuracy', factor=0.5, patience=2, 
                                   verbose=1, mode='max', min_lr=0.00001)
````

Hierzu wurde der Fokus bei diesem Modell die Top-2-Genauigkeit gelegt. Gleichzeitig kann hier auch die Lerngeschwindigkeit geregelt werden, sollte es im Verlauf zu keinen positiven Änderungen der Genauigkeit kommen

3. Validierung des Trainings  
Für die Validierung werden mehrere Kennzahlen ausgegeben. Zum einen die einzelnen Genauigkeiten der letzten Epoche, zum andere werden auch Grafen gezeichnet. Hierzu zählen Grapfen der Top-1 bis Top-3 Genauigkeit, bei welchen die Validierung mit den Trainingswerten verglichen werden und ein Graf, der die Confusion Matrix abbildet.

4. Konvertierung des Keras Modells
Als letzter Schritt konvertiert das Colab Notebook das entstandene Keras (.h5) Modell zu einem TensorFlow.js (.json und .dat) Modell. Diese benötigten Dateien werden alle zu einem Zip Archiv kombiniert und können im Anschluss im Datei-Browser des Notebooks gefunden und heruntergeladen werden. Dieses ZIP enthält alle Informationen, die das Frontend benötigt, um das Modell zu laden und zu verwenden.

___
## Nuxt.js Frontend (Client)
TODO

___
## Learnings
TODO
