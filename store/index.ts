import * as tf from "@tensorflow/tfjs";
import { LayersModel } from "@tensorflow/tfjs";
import { Result } from "~/static/interfaces";

export const state = () => ({
  model: undefined,
  modelLoading: false,
  src: "",
  result: [] as Result[]
});

export const getters = {
  model(state: any): LayersModel {
    return state.model;
  },
  modelLoaded(state: any): boolean {
    return !!state.model;
  },
  src(state: any): string {
    return state.src;
  },
  result(state: any): Result[] {
    return state.result;
  }
};

export const mutations = {
  async loadModel(state: any) {
    if (!state.model && !state.modelLoading) {
      state.modelLoading = true;
      state.model = await tf.loadLayersModel("models/v6/model.json");
    }
  },
  srcLoaded(state: any, src: string) {
    state.result = [];
    state.src = src;
  },
  updateResult(state: any, result: Result[]) {
    state.result = result;
  }
};
