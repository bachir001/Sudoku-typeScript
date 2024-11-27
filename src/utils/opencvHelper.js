/**
 * Preprocess image using Canvas API
 * @param {HTMLImageElement} image - The image to preprocess.
 * @returns {HTMLCanvasElement} Processed canvas element.
 */

// export function preprocessImage(image) {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     throw new Error("Unable to get 2D context from canvas.");
//   }

//   // Resize the canvas to match the image dimensions
//   canvas.width = image.width;
//   canvas.height = image.height;

//   // Draw the image onto the canvas
//   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//   // Get image data
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData.data;

//   // Convert to grayscale
//   for (let i = 0; i < data.length; i += 4) {
//     const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
//     data[i] = data[i + 1] = data[i + 2] = gray; // Apply grayscale
//   }

//   // Apply adaptive thresholding
//   const threshold = 128; // You can fine-tune this value
//   for (let i = 0; i < data.length; i += 4) {
//     const value = data[i] > threshold ? 255 : 0; // Threshold binarization
//     data[i] = data[i + 1] = data[i + 2] = value; // Apply binary values
//   }

//   ctx.putImageData(imageData, 0, 0);

//   // Process each cell and fill blanks with zeros
//   const cellSize = canvas.width / 9; // Assuming a 9x9 grid
//   for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//       const cellX = col * cellSize;
//       const cellY = row * cellSize;

//       // Extract the cell's image data
//       const cellImageData = ctx.getImageData(cellX, cellY, cellSize, cellSize);
//       const cellData = cellImageData.data;

//       // Analyze the cell to check if it's blank
//       let pixelCount = 0;
//       let nonWhitePixels = 0;

//       for (let i = 0; i < cellData.length; i += 4) {
//         pixelCount++;
//         if (cellData[i] < 250) { // Count non-white pixels
//           nonWhitePixels++;
//         }
//       }

//       // If the majority of the cell is white, treat it as blank
//       const blankThreshold = 0.1; // Adjust this to tweak blank cell detection
//       if (nonWhitePixels / pixelCount > blankThreshold) {
//         continue; // Cell contains content, do not overwrite
//       }

//       // Draw a "0" in the truly blank cell
//       ctx.font = `${cellSize * 0.6}px Arial`; // Adjust font size to fit the cell
//       ctx.fillStyle = "black";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText("0", cellX + cellSize / 2, cellY + cellSize / 2);
//     }
//   }

//   return canvas;
// }

// export function preprocessImage0(image) {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     throw new Error("Unable to get 2D context from canvas.");
//   }

//   // Resize the canvas to match the image dimensions
//   canvas.width = image.width;
//   canvas.height = image.height;

//   // Draw the image onto the canvas
//   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//   // Get image data
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData.data;

//   // Convert to grayscale
//   for (let i = 0; i < data.length; i += 4) {
//     const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
//     data[i] = data[i + 1] = data[i + 2] = gray; // Apply grayscale
//   }

//   // Apply adaptive thresholding
//   const threshold = 128; // You can fine-tune this value
//   for (let i = 0; i < data.length; i += 4) {
//     const value = data[i] > threshold ? 255 : 0; // Threshold binarization
//     data[i] = data[i + 1] = data[i + 2] = value; // Apply binary values
//   }

//   ctx.putImageData(imageData, 0, 0);

//   // Fill blank cells with zeros
//   const cellSize = canvas.width / 9; // Assuming a 9x9 grid
//   for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//       const cellX = col * cellSize;
//       const cellY = row * cellSize;

//       // Extract the cell's image data
//       const cellImageData = ctx.getImageData(cellX, cellY, cellSize, cellSize);
//       const cellData = cellImageData.data;

//       // Analyze the cell to check if it's blank
//       let pixelCount = 0;
//       let nonWhitePixels = 0;

//       for (let i = 0; i < cellData.length; i += 4) {
//         pixelCount++;
//         if (cellData[i] < 250) { // Count non-white pixels
//           nonWhitePixels++;
//         }
//       }

//       // If the majority of the cell is white, treat it as blank
//       const blankThreshold = 0.9; // Adjust this to tweak blank cell detection
//       if (nonWhitePixels / pixelCount < 1 - blankThreshold) {
//         // Draw a "0" in the blank cell
//         ctx.font = `${cellSize * 0.6}px Arial`; // Adjust font size to fit the cell
//         ctx.fillStyle = "black";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText("0", cellX + cellSize / 2, cellY + cellSize / 2);
//       }
//     }
//   }

//   return canvas;
// }

// export function preprocessImage1(image) {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     throw new Error("Unable to get 2D context from canvas.");
//   }

//   // Resize the canvas to match the image dimensions
//   canvas.width = image.width;
//   canvas.height = image.height;

//   // Draw the image onto the canvas
//   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//   // Get image data
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData.data;

//   // Convert to grayscale
//   for (let i = 0; i < data.length; i += 4) {
//     const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
//     data[i] = data[i + 1] = data[i + 2] = gray; // Apply grayscale
//   }

//   // Apply thresholding (Binarization)
//   for (let i = 0; i < data.length; i += 4) {
//     const value = data[i] > 128 ? 255 : 0; // Adjust threshold value if necessary
//     data[i] = data[i + 1] = data[i + 2] = value;
//   }

//   ctx.putImageData(imageData, 0, 0);

//   // Fill blank cells with zeros
//   const cellSize = canvas.width / 9; // Assuming a 9x9 grid
//   for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//       const cellX = col * cellSize;
//       const cellY = row * cellSize;

//       // Get the image data for the current cell
//       const cellImageData = ctx.getImageData(cellX, cellY, cellSize, cellSize);
//       const cellData = cellImageData.data;
//       let isBlank = true;

//       for (let i = 0; i < cellData.length; i += 4) {
//         if (cellData[i] < 250) { // Check for any non-white pixels
//           isBlank = false;
//           break;
//         }
//       }

//       if (isBlank) {
//         // Draw a "0" in the blank cell
//         ctx.font = `${cellSize * 0.6}px Arial`; // Adjust font size to fit the cell
//         ctx.fillStyle = "black";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText("0", cellX + cellSize / 2, cellY + cellSize / 2);
//       }
//     }
//   }

//   return canvas;
// }


export function preprocessImage(image) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to get 2D context from canvas.");
  }

  // Resize the canvas to match the image dimensions
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image onto the canvas
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Convert to grayscale
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
    data[i] = data[i + 1] = data[i + 2] = gray; // Apply grayscale
  }

  // Apply thresholding (Binarization)
  for (let i = 0; i < data.length; i += 4) {
    const value = data[i] > 128 ? 255 : 0; // Adjust threshold value if necessary
    data[i] = data[i + 1] = data[i + 2] = value;
  }

  // Apply the binarized data back to the canvas
  ctx.putImageData(imageData, 0, 0);

  // Fill blank cells with zeros
  const cellSize = canvas.width / 9; // Assuming a 9x9 grid
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cellX = col * cellSize;
      const cellY = row * cellSize;

      // Get the image data for the current cell
      const cellImageData = ctx.getImageData(cellX, cellY, cellSize, cellSize);
      const cellData = cellImageData.data;
      let isBlank = true;

      for (let i = 0; i < cellData.length; i += 4) {
        if (cellData[i] < 250) { // Check if there are any non-white pixels
          isBlank = false;
          break;
        }
      }

      if (isBlank) {
        // Analyze the cell to detect number size
        const cellImageData = ctx.getImageData(cellX, cellY, cellSize, cellSize);
        const cellData = cellImageData.data;
      
        let top = cellSize, bottom = 0, left = cellSize, right = 0;
      
        // Loop through each pixel in the cell to find bounding box of the number
        for (let y = 0; y < cellSize; y++) {
          for (let x = 0; x < cellSize; x++) {
            const index = (y * cellSize + x) * 4;
            if (cellData[index] < 255) { // Non-white pixel detected
              if (y < top) top = y;
              if (y > bottom) bottom = y;
              if (x < left) left = x;
              if (x > right) right = x;
            }
          }
        }
      
        // Calculate font size based on detected bounding box
        const detectedHeight = bottom - top;
        const detectedWidth = right - left;
        const detectedFontSize = Math.min(detectedHeight, detectedWidth) * 0.8; // Scale down slightly to fit
      
        // Set the font size dynamically
        ctx.font = `${detectedFontSize}px Arial`;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
      
        // Draw "0" in the center of the cell
        ctx.fillText("0", cellX + cellSize / 2, cellY + cellSize / 2);
      }
      
      
    }
  }

  return canvas;
}




// export function preprocessImage1(image){
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');

//   if (!ctx) {
//     throw new Error("Unable to get 2D context from canvas.");
//   }

//   // Resize the canvas to match the image dimensions
//   canvas.width = image.width;
//   canvas.height = image.height;

//   // Draw the image onto the canvas
//   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//   // Get image data
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData.data;

//   // Convert to grayscale
//   for (let i = 0; i < data.length; i += 4) {
//     const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
//     data[i] = data[i + 1] = data[i + 2] = gray; // Apply grayscale
//   }

//   // Apply thresholding
//   for (let i = 0; i < data.length; i += 4) {
//     const value = data[i] > 128 ? 255 : 0; // Adjust threshold value if necessary
//     data[i] = data[i + 1] = data[i + 2] = value;
//   }

//   ctx.putImageData(imageData, 0, 0);

//   return canvas;
// }

// export function preprocessImage(image) {
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   canvas.width = image.width;
//   canvas.height = image.height;

//   // Draw the image onto the canvas
//   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//   // Get image data
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData.data;

//   // Convert to grayscale
//   for (let i = 0; i < data.length; i += 4) {
//     const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
//     data[i] = data[i + 1] = data[i + 2] = gray; // Apply grayscale
//   }

//   // Detect blank cells and draw zeros
//   const cellSize = canvas.width / 9; // Assuming the Sudoku grid fits exactly into the canvas
//   for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//       const cellX = col * cellSize;
//       const cellY = row * cellSize;

//       // Analyze the cell for blankness (average pixel intensity)
//       const cellImageData = ctx.getImageData(cellX, cellY, cellSize, cellSize);
//       const cellData = cellImageData.data;
//       let isBlank = true;

//       for (let i = 0; i < cellData.length; i += 4) {
//         const gray = cellData[i]; // R, G, and B are the same in grayscale
//         if (gray < 240) { // If any pixel is not white enough
//           isBlank = false;
//           break;
//         }
//       }

//       if (isBlank) {
//         // Draw a "0" in the blank cell
//         ctx.font = `${cellSize * 0.6}px Arial`; // Adjust font size to fit the cell
//         ctx.fillStyle = "black";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText("0", cellX + cellSize / 2, cellY + cellSize / 2);
//       }
//     }
//   }

//   // Update the canvas with the modified image data
//   ctx.putImageData(imageData, 0, 0);

//   return canvas;
// }
