function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

async function generateKey(password, keyUsage) {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode("change-this-to-whatever-you-want"),
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        [keyUsage]
    );
}

async function encrypt(text, password) {
    const key = await generateKey(password, "encrypt");
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoder.encode(text)
    );
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedData), iv.length);
    return arrayBufferToBase64(combined.buffer);
}

async function decrypt(encryptedBase64, password) {
    const key = await generateKey(password, "decrypt");
    const encryptedBuffer = base64ToArrayBuffer(encryptedBase64);
    const iv = new Uint8Array(encryptedBuffer.slice(0, 12));
    const encryptedData = encryptedBuffer.slice(12);
    const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
    );
    return new TextDecoder().decode(decryptedData);
}
