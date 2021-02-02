<template>
  <div class="slc-home">
    <SLCBatch />
    <div class="center">
      <h1>Skin Lesion<br />Classifier</h1>
      <div class="trans">
        <transition name="fade" mode="out-in">
          <p v-if="!modelLoaded">Modell wird geladen</p>
          <div v-else>
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
  mounted() {
    this.$store.commit("loadModel");
  }

  get modelLoaded(): boolean {
    return this.$store.getters.modelLoaded;
  }

  public fileChanged(e: Event): void {
    console.log("Files changed");
    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length == 0) return;

    const reader = new FileReader();
    reader.onload = async () => {
      console.log("File loaded");
      const src = reader.result as string;
      this.$store.commit("srcLoaded", src);
      this.$router.push({ name: "classifier" });
    };
    console.log("Loading File");
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
