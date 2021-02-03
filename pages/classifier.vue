<template>
  <div class="slc-classifier">
    <SLCImage />
    <template v-if="classifying">
      <SLCMenuButton to="/" icon="cross" />
      <div max-width result>
        <h1>Analyse läuft...</h1>
        <SLCLoader />
      </div>
    </template>

    <div v-else max-width result>
      <h1>Ergebnis</h1>

      <SLCResult
        v-for="(r, i) in result"
        :key="r.lclass"
        :percentage="r.probability"
        :position="i + 1"
        :lesion="r.lclass"
      />
    </div>

    <div class="button" v-if="!classifying">
      <NuxtLink to="/">
        <SLCButton title="Anderes Bild verwenden" />
      </NuxtLink>
    </div>

    <SLCFooter />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import SLCButton from "~/components/SLC-Button.vue";
import SLCFooter from "~/components/SLC-Footer.vue";
import SLCImage from "~/components/SLC-Image.vue";
import SLCLoader from "~/components/SLC-Loader.vue";
import SLCResult from "~/components/SLC-Result.vue";
import { Result } from "~/static/interfaces";
import { loadImage, predictImage } from "~/static/functions";
import SLCMenuButton from "~/components/SLC-MenuButton.vue";

@Component({
  components: {
    SLCImage,
    SLCFooter,
    SLCLoader,
    SLCResult,
    SLCButton,
    SLCMenuButton
  }
})
export default class SLCClassifier extends Vue {
  // Gets called before the view is beeing rendered
  beforeMount() {
    // If no image is inserted or the modle hasnt finished loading yet, return back to home
    if (this.src.length === 0 || !this.$store.getters.modelLoaded) {
      this.$router.push({ name: "index" });
    }
  }

  // Image is inserted and model is loaded
  async mounted() {
    // Model hasnt predicted the lesion yet
    if (this.result.length === 0) {
      // Load base64 encoded src into HTMLImageElement
      const image: HTMLImageElement = await loadImage(this.src);

      // Run model prediction (input: image itself, our loaded model)
      const result: Result[] = await predictImage(
        image,
        this.$store.getters.model
      );

      // Store prediction in store
      this.$store.commit("updateResult", result);
    }
  }

  // returns the base64 encoded image
  get src(): string {
    return this.$store.getters.src || "";
  }

  // return true if prediction is completed
  get classifying(): boolean {
    return this.result.length === 0;
  }

  // returns the stored prediction
  get result(): Result[] {
    return this.$store.getters.result;
  }
}
</script>

<style>
.slc-classifier .button {
  position: fixed;
  bottom: calc(10px + env(safe-area-inset-bottom));
  z-index: 10;
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
}

.slc-classifier .slc-footer {
  padding-bottom: env(safe-area-inset-bottom);
}

.slc-classifier .slc-footer::after {
  content: "";
  position: absolute;
  top: 140px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f5f7;
}

.slc-classifier .slc-footer img {
  height: 140px;
}
</style>
