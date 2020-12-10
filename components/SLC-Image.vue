<template>
  <div class="slc-image">
    <NuxtLink to="/">
      <div class="cross-button">
        <img src="~assets/etc/cross.svg" alt="" />
      </div>
    </NuxtLink>
    <div class="bg">
      <img :src="src" alt="" />
    </div>
    <img id="fg" :src="src" alt="" />
    <div class="overlay-box" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class SLCImage extends Vue {
  get src(): string {
    return this.$store.getters.src;
  }
}
</script>

<style>
.cross-button {
  position: fixed;
  z-index: 10;
  top: 40px;
  left: 5vw;
  width: 40px;
  height: 40px;
  border-radius: 50px;
}
.slc-image {
  position: relative;
  height: 300px;
  margin-bottom: -35px;
}
.slc-image .bg {
  z-index: -1;
  position: absolute;
  height: inherit;
  width: 100vw;
  background: red;
  overflow: hidden;
}
.slc-image .bg img {
  transform: scale(1.2);
  filter: blur(5px) brightness(75%);
  height: inherit;
  width: inherit;
  object-fit: cover;
  object-position: center;
}

.slc-image img#fg {
  position: absolute;
  top: 0;
  left: 0;
  height: inherit;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.slc-image .overlay-box {
  position: absolute;
  width: 100vw;
  height: 30px;
  background: #fff;
  border-radius: 30px 30px 0 0;
  bottom: 0;
  z-index: 5;
}
</style>
