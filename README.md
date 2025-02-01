# SeedPhrase Encryptor

## Overview

The **SeedPhrase Encryptor** is a tool designed for safely storing your seed phrases or recovery words for cryptocurrency wallets. The purpose of this tool is to **encrypt** and **decrypt** your seed phrase easily, ensuring that you can safely back it up without the fear of losing access to your funds.

When thinking about how to store my wallet's recovery phrase securely and have a backup with peace of mind, I came up with a solution: encrypt the phrase using a password that only I know. Then, I can store the encrypted phrase on NFC cards and share them with my family members as a backup.

This tool allows you to:
- **Encrypt** your seed phrase with a password.
- **Decrypt** the encrypted seed phrase with the password.
- No sensitive data is stored on any server or database. Everything happens directly on your browser, ensuring maximum privacy and security.

## How it Works

- The tool uses client-side JavaScript to encrypt and decrypt the seed phrase.
- **No libraries or frameworks** are used—it's just plain HTML, CSS, and JavaScript.
- The encryption and decryption work directly in your browser, and no data is sent to any server.
- Once encrypted, you can store the encrypted seed phrase on any physical medium, like NFC cards, USB drives, or paper, as a backup.
- You can give the backup to your trusted family members in case you ever need help retrieving your funds.

## Features

- **Simple User Interface**: A minimal, user-friendly design.
- **No Data Stored**: Everything works entirely client-side. Your data never leaves your device.
- **Backup and Security**: Securely encrypt your seed phrase and have peace of mind with a backup you can trust.

## Usage

1. **Encrypt your seed phrase**:
   - Enter your seed phrase in the first input field.
   - Enter a password that only you know (this will be used to encrypt the seed phrase).
   - Press the "Encrypt" button to generate the encrypted seed phrase.
   - The encrypted phrase can then be written on your NFC cards or any other backup method.

2. **Decrypt your seed phrase**:
   - Enter the encrypted seed phrase in the first input field.
   - Enter the same password you used for encryption.
   - Press the "Decrypt" button to reveal the original text.

## Important Notes

- **No Database**: The tool does not store any data. All data is processed in your browser.
- **Client-Side Encryption**: The encryption and decryption process happens entirely on the client side, ensuring that your data never leaves your device.
- **Security**: Keep your password safe! If someone else gains access to your password, they will be able to decrypt your seed phrase.

## Technologies Used

- **HTML**: For the structure of the page.
- **CSS**: For styling the page.
- **JavaScript**: For the encryption and decryption functionality.
- **No external frameworks or libraries** are used, keeping everything lightweight and simple.

## How to Run Locally

1. Clone or download this repository to your local machine.
2. Open the `index.html` file in your browser.
3. Use the tool to encrypt and decrypt your seed phrase.


## License

This project is not under any license. Do whatever you want with it. idgaf
