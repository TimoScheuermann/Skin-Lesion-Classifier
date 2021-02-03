<template>
  <div class="slc-home">
    <SLCBatch />

    <div class="center">
      <h1>Skin Lesion<br />Classifier</h1>

      <div class="trans">
        <transition name="fade" mode="out-in">
          <template v-if="!modelLoaded">
            <!-- Display model loading while loading -->
            <p>Modell wird geladen</p>
          </template>
          <div v-else>
            <!-- Display file input button if model loaded -->
            <input
              @change="fileChanged"
              type="file"
              id="file"
              accept="image/png, image/jpeg"
            />

            <label for="file">
              <SLCButton title="Wähle ein Bild" />
            </label>
          </div>
        </transition>
      </div>
    </div>

    <SLCDoctor />
    <SLCFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import SLCBatch from "~/components/SLC-Batch.vue";
import SLCButton from "~/components/SLC-Button.vue";
import SLCDoctor from "~/components/SLC-Doctor.vue";
import SLCFooter from "~/components/SLC-Footer.vue";

@Component({
  components: {
    SLCFooter,
    SLCBatch,
    SLCButton,
    SLCDoctor
  }
})
export default class Home extends Vue {
  // gets called on page load
  mounted() {
    // start model loading
    this.$store.commit("loadModel");
  }

  // returns true if the model has been loaded
  get modelLoaded(): boolean {
    return this.$store.getters.modelLoaded;
  }

  // Input field has changed => init prediction
  public fileChanged(e: Event): void {
    // read files of input field
    const files = (e.target as HTMLInputElement).files;

    if (!files || files.length == 0) {
      // no files found => return
      return;
    }

    // init file reader
    const reader = new FileReader();

    // init callback if file read has processed files
    reader.onload = async () => {
      // get base64 encoded image from reader
      const src = reader.result as string;

      // store base64 encoded image in store
      this.$store.commit("srcLoaded", src);

      // start prediction by forwarding to /classifier
      this.$router.push({ name: "classifier" });
    };

    // process first file (if multiple uploaded...)
    reader.readAsDataURL(files[0]);
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s;
}

.fade-move {
  position: absolute;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.trans {
  position: relative;
  display: grid;
  place-content: center;
}

input {
  position: fixed;
  top: 0;
  transform: scale(0);
}
</style>
