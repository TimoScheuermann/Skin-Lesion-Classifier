<template>
  <div class="slc-details">
    <div result max-width>
      <SLCImage />
      <SLCMenuButton icon="back" to="/classifier" />

      <h1>{{ information.name }}</h1>
      <p>{{ information.description }}</p>
    </div>

    <SLCFooter />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import SLCFooter from "~/components/SLC-Footer.vue";
import SLCImage from "~/components/SLC-Image.vue";
import SLCMenuButton from "~/components/SLC-MenuButton.vue";
import { descriptions } from "~/static/descriptions";
import { LesionClass, SLInformation } from "~/static/interfaces";

@Component({
  components: {
    SLCFooter,
    SLCImage,
    SLCMenuButton
  }
})
export default class SLCDetails extends Vue {
  // Returns the lesion from the given url paramter
  get lesion(): LesionClass {
    return this.$route.params.lesion as LesionClass;
  }

  // Returns the information of the given lesion
  get information(): SLInformation {
    return descriptions[this.lesion];
  }
}
</script>

<style>
.slc-details p {
  padding: 0 5vw;
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
