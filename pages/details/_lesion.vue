<template>
  <div class="slc-details">
    <slc-image />
    <slc-footer />
    <div class="center">
      <NuxtLink to="/classifier">
        <div class="back-button">
          <img src="~assets/etc/back.svg" alt="" />
        </div>
      </NuxtLink>
      <h1>{{ description.name }}</h1>
    </div>
    <div class="content">
      <p>
        {{ description.full }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import SLCButton from "~/components/SLC-Button.vue";
import SLCFooter from "~/components/SLC-Footer.vue";
import SLCImage from "~/components/SLC-Image.vue";
import { descriptions } from "~/static/descriptions";
import { LesionClass, SLDescription } from "~/static/interfaces";

@Component({
  components: {
    "slc-footer": SLCFooter,
    "slc-image": SLCImage
  }
})
export default class SLCDetails extends Vue {
  get lesion(): LesionClass {
    return this.$route.params.lesion as LesionClass;
  }

  get description(): SLDescription {
    return descriptions[this.lesion];
  }
}
</script>
<style>
.slc-details .center {
  padding: 0 5vw;
  position: relative;
}
.slc-details .back-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50px;
}
.slc-details .back-button img {
  width: inherit;
  height: inherit;
}
.content {
  padding: 0 5vw;
}
</style>
