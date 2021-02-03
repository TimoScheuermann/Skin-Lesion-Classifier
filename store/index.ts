import * as tf from "@tensorflow/tfjs";
import { LayersModel } from "@tensorflow/tfjs";
import { Result } from "~/static/interfaces";

export const state = () => ({
  // our model
  model: undefined,
  // model loading
  modelLoading: false,
  // base64 encoded input image
  src: "",
  // results after model has run its prediction
  result: [] as Result[]
});

export const getters = {
  /**
   * returns the loaded model or null
   * @param state
   */
  model(state: any): LayersModel | null {
    return state.model;
  },
  /**
   * returns wheather the model has been loaded or not
   * @param state
   */
  modelLoaded(state: any): boolean {
    return !!state.model;
  },
  /**
   * return the base64 encoded input image
   * @param state
   */
  src(state: any): string {
    return state.src;
  },
  /**
   * returns an empty array or the results after the model has predicted an image
   * @param state
   */
  result(state: any): Result[] {
    return state.result;
  }
};

export const mutations = {
  /**
   * loads the model
   * @param state
   */
  async loadModel(state: any) {
    // load the model if it hasnt loaded or isnt loading
    if (!state.model && !state.modelLoading) {
      state.modelLoading = true;

      // path to store and load the model from
      const indexeddb = "indexeddb://slc-model";
      const modelPath = "models/v6/model.json";

      // try to load the model from local storage
      try {
        state.model = await tf.loadLayersModel(indexeddb);
        console.log("Model loaded from ", indexeddb);
      } catch (error) {
        // model not inside local storage => load from server

        // load model
        const model: LayersModel = await tf.loadLayersModel(modelPath);
        console.log("Model loaded from ", modelPath);

        // save model in local storage
        model.save(indexeddb);

        // store model in application-store
        state.model = model;
      }
    }
  },
  /**
   * another image has been selected via the input field on /index.html
   * @param state
   * @param src base64 encoded input image
   */
  srcLoaded(state: any, src: string) {
    // reset results, due to new image
    state.result = [];
    // update src
    state.src = src;
  },
  /**
   * model has succesfully predicted an image
   * @param state
   * @param result Mapped Results of the model
   */
  updateResult(state: any, result: Result[]) {
    // update result
    state.result = result;
  }
};
