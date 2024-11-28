/**
 * Preprocess image using Canvas API
 * @param {HTMLImageElement} image - The image to preprocess.
 * @returns {HTMLCanvasElement} Processed canvas element.
 */

export function preprocessImage(image) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to get 2D context from canvas.");
  }

  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the uploaded image onto the canvas
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Convert image to grayscale
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
    data[i] = data[i + 1] = data[i + 2] = gray;
  }

  // Apply binarization (thresholding)
  for (let i = 0; i < data.length; i += 4) {
    const value = data[i] > 128 ? 255 : 0; // Adjust threshold value as needed
    data[i] = data[i + 1] = data[i + 2] = value;
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
}
