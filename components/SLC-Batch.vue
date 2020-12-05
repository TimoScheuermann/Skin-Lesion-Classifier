<template>
  <div class="slc-batch">
    <img src="~/assets/etc/batch.svg" alt="" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class SLCBatch extends Vue {}
</script>

<style>
.slc-batch {
  margin-top: 30px;
  text-align: center;
}
.slc-batch img {
  height: 211px;
  width: 211px;
}
</style>
