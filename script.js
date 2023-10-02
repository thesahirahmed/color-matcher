document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const givenColor = document.getElementById("givenColor");
    const mixerColor = document.getElementById("mixerColor");
    const mixRedSlider = document.getElementById("mixRedSlider");
    const mixGreenSlider = document.getElementById("mixGreenSlider");
    const mixBlueSlider = document.getElementById("mixBlueSlider");
    const mixRedInput = document.getElementById("mixRedInput");
    const mixGreenInput = document.getElementById("mixGreenInput");
    const mixBlueInput = document.getElementById("mixBlueInput");
    const checkButton = document.getElementById("checkButton");
    const resetButton = document.getElementById("resetButton");
    const hintButton = document.getElementById("hintButton");
    const message = document.getElementById("message");
    const container = document.querySelector(".container");

    // Initial slider values
    let redSliderValue = 0;
    let greenSliderValue = 0;
    let blueSliderValue = 0;

    // Update the mixerColor based on slider values
    function updateMixerColor() {
        const redValue = (redSliderValue * 255) / 100;
        const greenValue = (greenSliderValue * 255) / 100;
        const blueValue = (blueSliderValue * 255) / 100;
        const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        mixerColor.style.backgroundColor = color;
    }

    // Event listeners for slider changes
    mixRedSlider.addEventListener("input", function () {
        redSliderValue = parseInt(mixRedSlider.value);
        updateMixerColor();
    });
    mixGreenSlider.addEventListener("input", function () {
        greenSliderValue = parseInt(mixGreenSlider.value);
        updateMixerColor();
    });
    mixBlueSlider.addEventListener("input", function () {
        blueSliderValue = parseInt(mixBlueSlider.value);
        updateMixerColor();
    });

    // Event listeners for input box changes
    mixRedInput.addEventListener("input", function () {
        redSliderValue = parseInt(mixRedInput.value);
        if (redSliderValue < 0) redSliderValue = 0;
        if (redSliderValue > 100) redSliderValue = 100;
        mixRedSlider.value = redSliderValue;
        updateMixerColor();
    });

    mixGreenInput.addEventListener("input", function () {
        greenSliderValue = parseInt(mixGreenInput.value);
        if (greenSliderValue < 0) greenSliderValue = 0;
        if (greenSliderValue > 100) greenSliderValue = 100;
        mixGreenSlider.value = greenSliderValue;
        updateMixerColor();
    });

    mixBlueInput.addEventListener("input", function () {
        blueSliderValue = parseInt(mixBlueInput.value);
        if (blueSliderValue < 0) blueSliderValue = 0;
        if (blueSliderValue > 100) blueSliderValue = 100;
        mixBlueSlider.value = blueSliderValue;
        updateMixerColor();
    });

    // Rest of the JavaScript code (check, reset, hint buttons) remains the same.

    // Generate a random color and update the givenColor
    function generateRandomColor() {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    // Update the givenColor with a random color on page load
    givenColor.style.backgroundColor = generateRandomColor();

    // Event listener for the Check button
    checkButton.addEventListener("click", function () {
        const givenColorValue = givenColor.style.backgroundColor;
        const mixerColorValue = mixerColor.style.backgroundColor;

        // Convert the color values to RGB arrays
        const givenColorArray = givenColorValue.match(/\d+/g).map(Number);
        const mixerColorArray = mixerColorValue.match(/\d+/g).map(Number);

        // Define a tolerance for color matching (e.g., 5)
        const tolerance = 5;

        // Check if the colors are approximately equal within the tolerance
        const isMatching =
            Math.abs(givenColorArray[0] - mixerColorArray[0]) <= tolerance &&
            Math.abs(givenColorArray[1] - mixerColorArray[1]) <= tolerance &&
            Math.abs(givenColorArray[2] - mixerColorArray[2]) <= tolerance;

        if (isMatching) {
            message.textContent = "Correct! You matched the color!";
        } else {
            message.textContent = "Try again. The color does not match.";
        }
    });

    // Event listener for the Reset button
    resetButton.addEventListener("click", function () {
        // Reset slider values to 0
        redSliderValue = 0;
        greenSliderValue = 0;
        blueSliderValue = 0;

        // Update the slider positions
        mixRedSlider.value = redSliderValue;
        mixGreenSlider.value = greenSliderValue;
        mixBlueSlider.value = blueSliderValue;

        // Update the mixerColor
        updateMixerColor();

        // Clear the message
        message.textContent = "";

        // Generate a new random color and update the givenColor
        givenColor.style.backgroundColor = generateRandomColor();
    });

    // Event listener for the Hint button
    hintButton.addEventListener("click", function () {
        // Get the given color values
        const givenColorValue = givenColor.style.backgroundColor;
        const givenColorArray = givenColorValue.match(/\d+/g).map(Number);

        // Calculate the hint values based on the given color within the 0-100 range
        const hintRed = Math.min(100, Math.floor((givenColorArray[0] * 100) / 255));
        const hintGreen = Math.min(100, Math.floor((givenColorArray[1] * 100) / 255));
        const hintBlue = Math.min(100, Math.floor((givenColorArray[2] * 100) / 255));

        // Display the hint values to the user
        const hintMessage = `Hint: To achieve the given color, enter Red: ${hintRed}, Green: ${hintGreen}, Blue: ${hintBlue}.`;
        message.textContent = hintMessage;
    });
});
