import * as tf from "@tensorflow/tfjs";
import { LayersModel, Tensor } from "@tensorflow/tfjs";
import { lesionClasses, Result } from "./interfaces";

/**
 * convert a base64 encoded image to a HTMLImageElement
 * @param src base64 encoded image
 * @returns HTMLImageElement
 */
export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    // init image
    const img = new Image();

    // set up onload-callback
    img.onload = () => resolve(img);

    // set up onerror-ballback
    img.onerror = reject;

    // initiate loading
    img.src = src;
  });
}

/**
 * Runs the prediction of a given img on a given model and returns the predicition array
 * @param img HTMLImageElement with base64 encoded src
 * @param model loaded TensorFlow.js model
 * @returns Result[] of the prediction
 */
export async function predictImage(
  img: HTMLImageElement,
  model: LayersModel
): Promise<Result[]> {
  // configure model
  const offset = tf.scalar(127.5);
  const tensor = tf.browser
    .fromPixels(img)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .sub(offset)
    .div(offset)
    .expandDims();

  // run prediction
  const predictions = await (model.predict(tensor) as Tensor).data();

  // map prediction to make it easier to understand for the user
  let results: Result[] = Array.from(predictions)
    // map the index to the specific lesion class and prepend the propability
    .map((p, i) => {
      return {
        lclass: lesionClasses[i],
        probability: p
      } as Result;
    })
    // sort the lesions according to their probability
    .sort((a, b) => b.probability - a.probability)
    // remove every lesion after the 3rd
    .slice(0, 3)
    // remove lesions with a propability less or equal than 0.1%
    .filter(x => x.probability > 0.001);
  return results;
}
