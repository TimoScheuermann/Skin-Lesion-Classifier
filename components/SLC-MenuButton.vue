<template>
  <NuxtLink class="slc-menu-button" v-if="to && icon" :to="to">
    <img v-if="icon === 'cross'" src="~assets/cross.svg" alt="" />
    <img v-else-if="icon === 'back'" src="~assets/back.svg" alt="" />
  </NuxtLink>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class SLCMenuButton extends Vue {
  @Prop() to!: any;
  @Prop() icon!: string;
}
</script>

<style>
.slc-menu-button {
  position: fixed;
  display: block;
  top: calc(20px + env(safe-area-inset-top));
  left: 5vw;
  width: 40px;
  height: 40px;
  z-index: 100;
  border-radius: 50px;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s ease-in-out;
}
.slc-menu-button img {
  width: 40px;
  height: 40px;
}
.slc-menu-button:hover {
  opacity: 1;
}
</style>
