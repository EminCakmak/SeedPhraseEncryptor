if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener("DOMContentLoaded", () => {
    const seed = document.getElementById("seed");
    const password = document.getElementById("password");
    const encryptBtn = document.getElementById("encrypt");
    const decryptBtn = document.getElementById("decrypt");
    const output = document.getElementById("output");
    const eyeIcon = document.getElementById('toggle-password');

    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        // Check for Wi-Fi connection (this works on mobile networks or on mobile devices)
        if (connection.effectiveType === "wifi" ||
            connection.effectiveType === "slow-2g" ||
            connection.effectiveType === "2g" ||
            connection.effectiveType === "3g" ||
            connection.effectiveType === "4g" ||
            connection.effectiveType === "5g"
        ) {
            const warningMessage = document.getElementById('warning-message');
            warningMessage.style.display = 'block';  // Show the message
            warningMessage.style.opacity = '1';  // Make it visible

            // Hide the success message after 2 seconds
            setTimeout(function () {
                warningMessage.style.opacity = '0';  // Fade out
                setTimeout(function () {
                    warningMessage.style.display = 'none';  // Hide it
                }, 500);  // Delay for opacity transition
            }, 5000);  // Wait 2 seconds before fading out
        }
    }

    function updateButtonState() {
        const filled = seed.value.trim() !== "" && password.value.trim() !== "";
        encryptBtn.disabled = !filled;
        decryptBtn.disabled = !filled;
    }

    seed.addEventListener("input", updateButtonState);
    password.addEventListener("input", updateButtonState);

    encryptBtn.addEventListener("click", async () => {
        const encryptedText = await encrypt(seed.value, password.value);
        output.value = encryptedText;
    });

    decryptBtn.addEventListener("click", async () => {
        try {
            const decryptedText = await decrypt(seed.value, password.value);
            output.value = decryptedText;
        } catch (error) {
            output.value = "Decryption failed!";
        }
    });

    eyeIcon.addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('toggle-password');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'; // Show password
            eyeIcon.innerHTML = '&#128065;'; // Change to "eye" icon for visibility
        } else {
            passwordInput.type = 'password'; // Hide password
            eyeIcon.innerHTML = '&#128274;'; // Change to "eye-slash" icon for hidden
        }
    });

    output.addEventListener('click', function () {
        const outputText = document.getElementById('output');
        outputText.select();
        outputText.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        //alert('Copied to clipboard: ' + outputText.value);
        // Show the success message
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';  // Show the message
        successMessage.style.opacity = '1';  // Make it visible

        // Hide the success message after 2 seconds
        setTimeout(function () {
            successMessage.style.opacity = '0';  // Fade out
            setTimeout(function () {
                successMessage.style.display = 'none';  // Hide it
            }, 500);  // Delay for opacity transition
        }, 1000);  // Wait 2 seconds before fading out
    });
});