<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <img src="~/assets/logo.svg" alt="" />
      </div>
      <div class="title">Skin Lesion Recogition</div>
      <div class="version">1.1</div>
    </div>

    <div class="hero">
      <!-- <video
        src="https://assets.mixkit.co/videos/preview/mixkit-light-in-the-background-of-a-virtual-3d-database-19630-large.mp4"
        playsinline
        autplay="autplay"
        loop="loop"
        muted="muted"
        ref="video"
      ></video> -->
      <div class="title">
        Wähle ein Bild aus
        <div class="select-image">
          <label for="image-input">
            <i class="ti-file-image" />
            Bild wählen
          </label>
          <input
            :disabled="!modelsLoaded | loaded | analyzing"
            id="image-input"
            type="file"
            @change="fileChanged"
          />
        </div>
      </div>
    </div>

    <div class="group">
      <!-- <input
        type="radio"
        name="rb"
        id="rb1"
        @input="select(2)"
        :disabled="!modelsLoaded"
      />
      <label for="rb1">Model V2</label>
      <input
        :disabled="!modelsLoaded"
        type="radio"
        name="rb"
        id="rb2"
        @input="select(3)"
      />
      <label for="rb2">Model V3</label> -->
      <input
        :disabled="!modelsLoaded"
        checked="checked"
        type="radio"
        name="rb"
        id="rb3"
        @input="select(4)"
      />
      <label for="rb3">Model V4</label>
      <input
        :disabled="!modelsLoaded"
        type="radio"
        name="rb"
        id="rb4"
        @input="select(6)"
      />
      <label for="rb4">Model V6</label>
    </div>

    <div class="content">
      <p v-if="!modelsLoaded">Modelle werden geladen...</p>
      <p v-else-if="!src">Warte bis ein Bild ausgewählt wurde...</p>
      <div v-else class="analyzer">
        <div class="preview">
          <img :src="src" />
        </div>
        <div v-if="analyzing" class="running">
          <h3>Bild wird analysiert...</h3>
          <div class="lds-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-else-if="analyzed" class="result">
          <h2>Analyse abgeschlossen</h2>
          <div class="results">
            <div class="result-item" v-for="r in result" :key="r.class">
              <div class="result-head">
                <div class="result-title">{{ r.desc }}</div>
                <div class="result-prob">
                  {{ Math.round(r.probability * 100000) / 1000 }}%
                </div>
              </div>
              <div class="result-description">{{ r.class }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import * as tf from "@tensorflow/tfjs";
import { LayersModel, Rank, Tensor } from "@tensorflow/tfjs";

interface Result {
  probability: number;
  class: string;
  desc: string;
}

@Component
export default class Old extends Vue {
  private model: null | LayersModel = null;
  private modelV2: null | LayersModel = null;
  private modelV3: null | LayersModel = null;
  private modelV4: null | LayersModel = null;
  private modelV6: null | LayersModel = null;
  private modelsLoaded: boolean = false;
  private analyzing: boolean = false;
  private analyzed: boolean = false;
  private modelV: number = 2;
  public src = "";
  public result: Result[] = [];

  public TARGET_CLASSES: Record<number, string> = {
    0: "Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowen’s disease) [akiec]",
    1: "Basal Cell Carcinoma [bcc]",
    2: "Benign Keratosis [bkl]",
    3: "Dermatofibroma [df]",
    4: "Healthy",
    5: "Melanoma [mel]",
    6: "No Skin",
    7: "Melanocytic Nevi [nv]",
    8: "Vascular skin lesion [vasc]"
  };

  public TARGET_DESCRIPTIONS: Record<number, string> = {
    0: "Die aktinische Keratose, auch aktinische Präkanzerose oder solare Keratose oder Licht-Keratose (von griechisch ακτίς (aktis, „Strahl“, aktinisch: durch Strahlung hervorgerufen (siehe auch Aktinometer)) und von griechisch κέρας (kéras, „Horn“)), ist eine lichtbedingte Hautveränderung. Es handelt sich um eine durch langjährige intensive Einwirkung von Sonnenlicht (UV-Strahlung) verursachte chronische Schädigung der verhornten Oberhaut,[1] typischerweise mit rötlichen, fest haftenden Schuppen auf der Haut. Die Hautschädigung schreitet nur langsam fort, kann aber nach Jahren in eine Form des Hautkrebses übergehen.",
    1: "Der Basalzellenkrebs (Basaliom; Basalzellkarzinom; Epithelioma basocellulare; engl.: basal cell carcinoma, basalioma, basal cell epithelioma) ist eine bösartige Krebserkrankung der Haut, die sich aus Stammzellen im Bereich der Haarfollikel sowie interfollikulär in den basalen Schichten der Epidermis entwickelt.[1] Bevorzugte Lokalisationen sind der Sonne ausgesetzte Gesichtsregionen wie Stirn, Nase oder Ohren. Manchmal wird der Basalzellenkrebs als Abgrenzung zum „schwarzen Hautkrebs“ (Malignes Melanom) auch „heller Hautkrebs“ oder „weißer Hautkrebs“ genannt.",
    2: "Die seborrhoische Keratose (Synonyme: Seborrhoische Warze, Alterswarze, Verruca seborrhoica, Basalzellpapillom) ist der häufigste gutartige Tumor der Haut. Er entwickelt sich meist in der zweiten Lebenshälfte, die Häufigkeit seines Auftretens nimmt mit steigendem Alter zu. Fast alle Menschen entwickeln im Laufe des Lebens eine bis mehrere seborrhoische Keratosen, wobei beide Geschlechter gleich häufig betroffen sind.",
    3: "Ein Dermatofibrom (Syn.: kutanes fibröses Histiozytom, Fibroma simplex, Fibroma durum, hartes Fibrom) ist ein häufig vorkommender gutartiger Tumor der Haut (Dermis). Die kleine, bis zu einem Zentimeter durchmessende Hautwucherung tritt vorzugshalber an Armen und Beinen sowie am Rumpf auf. Sie besteht aus Ansammlungen von Bindegewebszellen (Fibrohistiocyten) mit dazwischengelagerten Kollagenfaserbündeln.",
    4: "Gesund",
    5: "Das maligne Melanom (von altgriechisch μέλας „schwarz“), auch kurz Melanom, Melano(zyto)blastom oder schwarzer Hautkrebs (engl.: [malignant] melanoma) genannt, ist ein hochgradig bösartiger Tumor der Pigmentzellen (Melanozyten). Er neigt dazu, früh Metastasen über Lymph- und Blutbahnen zu streuen, und ist die am häufigsten tödlich verlaufende Hautkrankheit mit weltweit stark steigender Anzahl an Neuerkrankungen.",
    6: "Kein Hautbild.",
    7: "Ein Pigmentnävus (manchmal auch: Melanozytennävus oder melanozytärer Nävus) ist eine begrenzte, gutartige Fehlbildung der Haut, die im Gegensatz zu anderen Arten von Nävi aus pigmentbildenden Melanozyten oder verwandten Zelltypen besteht und daher meist eine braune oder bräunliche Farbe aufweist. Es gibt zahlreiche Unterarten von Pigmentnävi.",
    8: "Vascular skin lesion [vasc]"
  };

  mounted() {
    this.reset();
    this.loadModels();
  }

  public select(v: number) {
    if (v === 2) {
      this.model = this.modelV2;
    } else if (v === 3) {
      this.model = this.modelV3;
    } else if (v === 4) {
      this.model = this.modelV4;
    } else if (v === 6) {
      this.model = this.modelV6;
    }
    this.modelV = v;
  }

  private async loadModels() {
    // this.modelV2 = await tf.loadLayersModel("models/v2/model.json");
    // this.modelV3 = await tf.loadLayersModel("models/v3/model.json");
    this.modelV4 = await tf.loadLayersModel("models/v4/model.json");
    this.modelV6 = await tf.loadLayersModel("models/v6/model.json");
    this.model = this.modelV4;
    this.modelsLoaded = true;
  }

  public reset() {
    this.analyzing = false;
    this.analyzed = false;
    this.src = "";
    this.result = [];
  }

  public fileChanged(e: Event) {
    this.reset();
    const files = (e.target as HTMLInputElement).files;
    const reader = new FileReader();

    reader.onload = async () => {
      this.analyzing = true;
      const dataURL = reader.result;
      this.src = dataURL as string;

      var i = new Image();
      i.onload = async () => {
        const offset = tf.scalar(127.5);
        const tensor = tf.browser
          .fromPixels(i)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .sub(offset)
          .div(offset)
          .expandDims();

        if (this.model) {
          const predictions = await (this.model.predict(
            tensor
          ) as Tensor).data();
          this.result = Array.from(predictions)
            .map((p, i) => {
              return {
                probability: p,
                class: this.TARGET_DESCRIPTIONS[
                  i + (this.modelV === 6 && i > 5 ? 1 : 0)
                ],
                desc: this.TARGET_CLASSES[
                  i + (this.modelV === 6 && i > 5 ? 1 : 0)
                ]
              } as Result;
            })
            .sort((a, b) => b.probability - a.probability);
          console.log(this.result);
          this.result = this.result
            .slice(0, 3)
            .filter(x => x.probability > 0.001);

          this.analyzed = true;
          this.analyzing = false;
        }
      };
      i.src = this.src;
    };

    if (files && files[0]) reader.readAsDataURL(files[0]);
  }
}
</script>
