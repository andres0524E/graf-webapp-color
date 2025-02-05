document.addEventListener('DOMContentLoaded', function() {
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const redInput = document.getElementById('red-input');
    const greenInput = document.getElementById('green-input');
    const blueInput = document.getElementById('blue-input');
    const colorBox = document.getElementById('color-box');
    const hexCode = document.getElementById('hex-code');
    const colorPicker = document.getElementById('color-picker');

    // Función para actualizar el color basado en sliders
    function updateColor() {
        const red = parseInt(redSlider.value);
        const green = parseInt(greenSlider.value);
        const blue = parseInt(blueSlider.value);

        // Actualizar los valores de los inputs
        redInput.value = red;
        greenInput.value = green;
        blueInput.value = blue;

        // Generar el color en RGB
        const color = `rgb(${red}, ${green}, ${blue})`;
        colorBox.style.backgroundColor = color;

        // Convertir a hexadecimal
        const hex = rgbToHex(red, green, blue);
        hexCode.value = hex;
        colorPicker.value = hex;
    }

    // Función para convertir RGB a hexadecimal
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    // Función para convertir hexadecimal a RGB
    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    // Actualizar sliders cuando el usuario elige un color en el input color
    colorPicker.addEventListener('input', function() {
        const rgb = hexToRgb(colorPicker.value);
        redSlider.value = rgb.r;
        greenSlider.value = rgb.g;
        blueSlider.value = rgb.b;
        updateColor();
    });

    // Event listeners para los controles deslizantes
    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    // Event listeners para los campos de texto
    redInput.addEventListener('input', function() {
        const value = Math.min(255, Math.max(0, parseInt(redInput.value) || 0));
        redSlider.value = value;
        updateColor();
    });

    greenInput.addEventListener('input', function() {
        const value = Math.min(255, Math.max(0, parseInt(greenInput.value) || 0));
        greenSlider.value = value;
        updateColor();
    });

    blueInput.addEventListener('input', function() {
        const value = Math.min(255, Math.max(0, parseInt(blueInput.value) || 0));
        blueSlider.value = value;
        updateColor();
    });

    // Inicializar el color al cargar la página
    updateColor();
});
