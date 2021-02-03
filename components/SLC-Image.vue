<template>
  <div class="slc-image">
    <div class="background" :style="style" />
    <img :src="src" alt="" />
    <div class="footer" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class SLCImage extends Vue {
  // Returns the src of the inserted image
  get src(): string {
    return this.$store.getters.src;
  }

  // Returns the css style to display the image
  get style(): string {
    return `background-image: url(${this.src})`;
  }
}
</script>

<style>
.slc-image {
  height: calc(300px + env(safe-area-inset-top));
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  overflow: hidden;
}

.slc-image .background {
  height: inherit;
  padding: inherit;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(10px);
  transform: scale(1.1);
}

.slc-image img {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  object-position: center;
  object-fit: contain;
  height: 300px;
}

.slc-image .footer {
  position: absolute;
  background: #fff;
  border-radius: 20px 20px 0 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
}
</style>
