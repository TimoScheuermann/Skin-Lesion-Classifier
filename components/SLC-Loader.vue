<template>
  <div class="slc-loader">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="86"
      height="86"
      viewBox="0 0 86 86"
    >
      <defs>
        <style>
          .a,
          .c {
            fill: #08f;
          }
        </style>
      </defs>
      <g transform="translate(-145 -429)">
        <path
          class="a"
          d="M-1703.873-3236.135a43.205,43.205,0,0,1,14.737-14.737A10.954,10.954,0,0,1-1688-3246a11,11,0,0,1-11,11A10.954,10.954,0,0,1-1703.873-3236.135Z"
          transform="translate(1855 3686)"
        />
        <circle
          class="b"
          cx="11"
          cy="11"
          r="11"
          transform="translate(177 429)"
        />
        <path
          class="a"
          d="M-1646-3246a10.952,10.952,0,0,1,1.135-4.872,43.209,43.209,0,0,1,14.738,14.738A10.958,10.958,0,0,1-1635-3235,11,11,0,0,1-1646-3246Z"
          transform="translate(1855 3686)"
        />
        <circle
          class="c"
          cx="11"
          cy="11"
          r="11"
          transform="translate(145 461)"
        />
        <circle
          class="d"
          cx="11"
          cy="11"
          r="11"
          transform="translate(177 461)"
        />
        <circle
          class="e"
          cx="11"
          cy="11"
          r="11"
          transform="translate(209 461)"
        />
        <path
          class="f"
          d="M-1703.873-3191.865A10.954,10.954,0,0,1-1699-3193a11,11,0,0,1,11,11,10.955,10.955,0,0,1-1.135,4.872A43.208,43.208,0,0,1-1703.873-3191.865Z"
          transform="translate(1855 3686)"
        />
        <circle
          class="a"
          cx="11"
          cy="11"
          r="11"
          transform="translate(177 493)"
        />
        <path
          class="g"
          d="M-1646-3182a11,11,0,0,1,11-11,10.958,10.958,0,0,1,4.873,1.135,43.2,43.2,0,0,1-14.738,14.738A10.952,10.952,0,0,1-1646-3182Z"
          transform="translate(1855 3686)"
        />
      </g>
    </svg>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class SLCLoader extends Vue {}
</script>

<style>
@keyframes op {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg) scale(0.4);
  }
  50% {
    transform: rotate(280deg) scale(1);
  }
  to {
    transform: rotate(360deg) scale(0.4);
  }
}

.slc-loader {
  width: fit-content;
  margin: 0 auto;
}

.slc-loader svg {
  animation: spin 3s ease-in-out 0s infinite;
}
.slc-loader path,
.slc-loader circle {
  animation: op 1s ease-in-out 0s infinite alternate-reverse;
}
.slc-loader path:nth-child(1) {
  animation-delay: -0.2s;
}
.slc-loader path:nth-child(2) {
  animation-delay: -0.3s;
}
.slc-loader path:nth-child(3) {
  animation-delay: -0.6s;
}
.slc-loader path:nth-child(4) {
  animation-delay: -0.7s;
}
.slc-loader circle:nth-child(1) {
  animation-delay: -0.24s;
}
.slc-loader circle:nth-child(2) {
  animation-delay: -0.1s;
}
.slc-loader circle:nth-child(3) {
  animation-delay: -0.8s;
}
.slc-loader circle:nth-child(4) {
  animation-delay: -0.5s;
}
.slc-loader circle:nth-child(5) {
  animation-delay: -0.9s;
}
</style>
