import * as tf from "@tensorflow/tfjs";
import { LayersModel, Tensor } from "@tensorflow/tfjs";
import { lesionClasses, Result } from "./interfaces";

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function predictImage(
  img: HTMLImageElement,
  model: LayersModel
): Promise<Result[]> {
  const offset = tf.scalar(127.5);
  const tensor = tf.browser
    .fromPixels(img)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .sub(offset)
    .div(offset)
    .expandDims();

  const predictions = await (model.predict(tensor) as Tensor).data();
  let results: Result[] = Array.from(predictions)
    .map((p, i) => {
      return {
        lclass: lesionClasses[i],
        probability: p
      } as Result;
    })
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3)
    .filter(x => x.probability > 0.001);
  return results;
}
