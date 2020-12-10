<template>
  <div class="slc-classifier">
    <slc-image />
    <div v-if="classifying">
      <div class="center">
        <h1>Analyse läuft...</h1>
        <slc-loader />
      </div>
    </div>
    <div v-else>
      <div class="center">
        <h1>Ergebnis</h1>
      </div>
      <slc-result
        v-for="(r, i) in result"
        :key="r.lclass"
        :percentage="r.probability"
        :position="i + 1"
        :lesion="r.lclass"
      />
    </div>

    <div class="button" v-if="!classifying">
      <NuxtLink to="/">
        <slc-button title="Anderes Bild verwenden" />
      </NuxtLink>
    </div>

    <slc-footer />
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

@Component({
  components: {
    "slc-image": SLCImage,
    "slc-footer": SLCFooter,
    "slc-loader": SLCLoader,
    "slc-result": SLCResult,
    "slc-button": SLCButton
  }
})
export default class SLCClassifier extends Vue {
  beforeMount() {
    if (this.src.length === 0 || !this.$store.getters.modelLoaded) {
      this.$router.push({ name: "index" });
    }
  }
  async mounted() {
    if (this.result.length === 0) {
      const image = await loadImage(this.src);
      const result: Result[] = await predictImage(
        image,
        this.$store.getters.model
      );
      this.$store.commit("updateResult", result);
    }
  }

  get src(): string {
    return this.$store.getters.src || "";
  }

  get classifying(): boolean {
    return this.result.length === 0;
  }

  get result(): Result[] {
    return this.$store.getters.result;
  }
}
</script>

<style>
.slc-classifier .button {
  position: fixed;
  bottom: 35px;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s;
}

.fade-move {
  position: absolute;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter {
  transform: translateX(30px);
}
.fade-leave-to {
  transform: translateX(-30px);
}
</style>
