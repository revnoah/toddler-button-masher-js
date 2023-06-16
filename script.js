// Define your sound files
const soundFiles = [];
for (let i = 1; i <= 30; i++) {
  const filename = `game_over_${String(i).padStart(2, '0')}.mp3`;
  soundFiles.push(filename);
}

// Generate a random bright color
function generateRandomBrightColor() {
	const saturation = 100; // Maximum saturation for vibrant colors
	const lightness = 50; // Medium lightness for balanced colors
	const color = `hsl(${Math.random() * 360}, ${saturation}%, ${lightness}%)`;
	return color;
}

// Create a class for your application
class KeyPressApp {
	constructor() {
		this.displayElement = document.getElementById('display');
		this.audioElements = soundFiles.map(soundFile => this.createAudioElement(soundFile));
		this.currentColor = '';

		this.changeBackground();
		this.setupEventListeners();
	}

	createAudioElement(soundFile) {
		const audioElement = document.createElement('audio');
		audioElement.src = 'sounds/' + soundFile;
		document.body.appendChild(audioElement);
		return audioElement;
	}

	getRandomElementFromArray(array) {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}

	changeBackground() {
		const randomColor = generateRandomBrightColor();
		document.body.style.backgroundColor = randomColor;
		this.currentColor = randomColor;
	}

	displayKeyPressed(key) {
		const contrastColor = this.getContrastColor(this.currentColor);
		this.displayElement.style.color = contrastColor;
		this.displayElement.innerText = this.getDisplayText(key).toUpperCase();
	}

	getContrastColor() {
		// Get the brightness value of the current color
		const brightness = this.getBrightness(this.currentColor);

		// Determine contrast color based on brightness
		const isLightColor = brightness > 0.5; // Adjust the threshold as desired

		return isLightColor ? '#000000' : '#ffffff';
	}

	getBrightness(color) {
		// Extract RGB values from the color
		const rgb = this.hexToRgb(color);
		const { r, g, b } = rgb;

		// Calculate the brightness based on RGB values
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;

		// Normalize the brightness value between 0 and 1
		const normalizedBrightness = brightness / 255;

		return normalizedBrightness;
	}

	hexToRgb(hex) {
		// Remove the leading '#' if present
		const hexWithoutHash = hex.replace('#', '');

		// Split the hex value into RGB components
		const r = parseInt(hexWithoutHash.substr(0, 2), 16);
		const g = parseInt(hexWithoutHash.substr(2, 2), 16);
		const b = parseInt(hexWithoutHash.substr(4, 2), 16);

		// Return an object with the RGB values
		return { r, g, b };
	}

	getDisplayText(key) {
		if (key === ' ') {
			return 'SPACE';
		} else {
			const displayText = key.length === 1 ? key : key.toUpperCase();
			return displayText;
		}
	}

	handleKeyPress(event) {
		const key = event.key;
		const audioElement = this.getRandomElementFromArray(this.audioElements);

		this.displayKeyPressed(key);
		audioElement.play();
		this.changeBackground();
	}

	handleMouseClick(event) {
		const audioElement = this.getRandomElementFromArray(this.audioElements);

		this.displayKeyPressed('CLICK');
		audioElement.play();
		this.changeBackground();
	}

	handleMouseScroll(event) {
		const audioElement = this.getRandomElementFromArray(this.audioElements);

		this.displayKeyPressed('SCROLL');
		audioElement.play();
		this.changeBackground();
	}

	setupEventListeners() {
		document.addEventListener('keydown', this.handleKeyPress.bind(this));
		document.addEventListener('click', this.handleMouseClick.bind(this));
		document.addEventListener('contextmenu', this.handleMouseClick.bind(this)); // For right-click
		document.addEventListener('wheel', this.handleMouseScroll.bind(this));
	}
}

// Create an instance of the KeyPressApp class
const app = new KeyPressApp();
