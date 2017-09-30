import CryptoJS from 'crypto-js';

function getKeyFromUrl() {
    const url = location.href;
    const match = url.match(/\?([^?]*)$/);
    if (match) {
        const [, key] = match;
        return key;
    }
}

function getKeyFromInput() {
    return document.getElementById('key').value;
}

function decrypt(key) {
    if (!key) {
        return;
    }

    try {
        const ciphertext = document.getElementById('ciphertext').innerText;
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        document.open();
        document.write(plaintext);
    } catch (e) {
        const error = document.createElement('div');
        error.innerText = 'Could not decrypt page with specified key';
        error.className = 'error';
        document.getElementById('key-entry').prepend(error);
    }
}

document.getElementById('decrypt').addEventListener('click', (event) => {
    event.preventDefault();
    decrypt(getKeyFromInput());
});

function clearError() {
    const errors = document.getElementsByClassName('error');
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    };
}

const key = document.getElementById('key');

key.addEventListener('change', (event) => {
    clearError();
});

key.addEventListener('keyup', (event) => {
    clearError();
});

window.addEventListener('load', (event) => {
    const key = getKeyFromUrl();
    if (key) {
        decrypt(key);
    } else {
        document.getElementById('key').focus();
    }
});