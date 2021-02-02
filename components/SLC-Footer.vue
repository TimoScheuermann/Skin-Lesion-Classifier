<template>
  <div class="slc-footer">
    <img src="~/assets/etc/footer.svg" alt="" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class SLCFooter extends Vue {}
</script>

<style>
.slc-footer {
  position: fixed;
  bottom: -10px;
  z-index: 20;
}
.slc-footer img {
  height: 150px;
  width: 100vw;
}
</style>
