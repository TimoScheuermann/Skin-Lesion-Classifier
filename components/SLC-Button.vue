<template>
  <div class="slc-button">
    {{ title }}
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class SLCButton extends Vue {
  @Prop() title!: string;
}
</script>

<style>
.slc-button {
  background: #08f;
  user-select: none;
  display: inline-block;
  padding: 7.5px 20px;
  border-radius: 7.5px;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  white-space: nowrap;
}
.slc-button:hover {
  box-shadow: 4px 8px 20px rgba(0, 0, 0, 0.19);
}
.slc-button:active {
  filter: brightness(110%);
}
</style>
