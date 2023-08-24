import pptxgen from 'pptxgenjs';
import { loadImage } from 'canvas';
import { fileURLToPath } from 'url';
import path from 'path';

const ppt = new pptxgen();

async function processImages (imagePaths) {
	for (const imagePath of imagePaths) {
		const image = await loadImage(imagePath);

		const slide = ppt.addSlide();

		// Add image to slide
		slide.addImage({
			path: imagePath,
			x: 0,
			y: 0,
			w: '100%',
			h: '100%',
		});
	}

	// Save PPT file
	const __filename = fileURLToPath(import.meta.url);
	const outputPath = path.join(path.dirname(__filename), 'output.pptx');
	ppt.writeFile(outputPath, () => {
		console.log('PPT file created successfully.');
	});
}

const imagePaths = [
	'./img/slide1.jpg',
	'./img/slide2.jpg',
	'./img/slide3.jpeg'
];

processImages(imagePaths);
