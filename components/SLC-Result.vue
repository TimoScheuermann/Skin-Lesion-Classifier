<template>
  <div class="slc-result">
    <div class="percentage" :style="'color: ' + color">{{ probability }}%</div>
    <div class="info">
      <h3>{{ information.name }}</h3>
      <p>{{ information.description }}</p>
      <NuxtLink :to="'details/' + lesion">
        Mehr erfahren
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { descriptions } from "~/static/descriptions";
import { LesionClass, SLInformation } from "~/static/interfaces";

@Component
export default class SLCResult extends Vue {
  @Prop() percentage!: number;
  @Prop() lesion!: LesionClass;
  @Prop() position!: number;

  get probability(): number {
    return Math.round(this.percentage * 1000) / 10;
  }

  get color(): string {
    if (this.position === 1) return "#FFD700";
    if (this.position === 2) return "#C9CAD9";
    return "#8C7853";
  }

  get information(): SLInformation {
    return descriptions[this.lesion];
  }
}
</script>

<style>
.slc-result {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 5px;
  padding: 0 5vw;
  margin-bottom: 20px;
}
.slc-result:last-child {
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
}

.slc-result .percentage {
  display: grid;
  place-content: center;
  font-weight: bolder;
  font-size: 25px;
}

.slc-result .info h3 {
  margin: 0;
}
.slc-result .info p {
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.slc-result .info a {
  color: #08f;
}
</style>
