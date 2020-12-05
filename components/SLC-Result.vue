<template>
  <div class="slc-result">
    <div class="percentage" :style="'color: ' + color">{{ probability }}%</div>
    <div class="info">
      <h3>{{ lesion }}</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo nulla
        assumenda sed inventore libero blanditiis voluptatibus ullam!<br />
        <a href="">Mehr erfahren</a>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class SLCResult extends Vue {
  @Prop() percentage!: number;
  @Prop() lesion!: string;
  @Prop() position!: number;

  get probability(): number {
    return Math.round(this.percentage * 10000) / 100;
  }

  get color(): string {
    if (this.position === 1) return "#FFD700";
    if (this.position === 2) return "#C9CAD9";
    return "#8C7853";
  }
}
</script>

<style>
.slc-result {
  display: grid;
  grid-template-columns: 100px 1fr;
  padding: 0 5vw;
  margin-bottom: 20px;
}
.slc-result .percentage {
  display: grid;
  place-content: center;
  font-weight: bolder;
  font-size: 30px;
}

.slc-result .info h3 {
  margin: 0;
}
.slc-result .info p {
  margin: 0;
}
.slc-result .info a {
  color: #08f;
}
</style>
