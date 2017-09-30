import Uuid from 'uuid';

import encrypt from './pagelock';

const key = document.getElementById('key');
const generateKeyButton = document.getElementById('generate-key');
const copyKeyToClipboard = document.getElementById('copy-key-to-clipboard');

const input = document.getElementById('input');
const upload = document.getElementById('upload');
const uploadFileButton = document.getElementById('upload-file');
const encryptButton = document.getElementById('encrypt');

const output = document.getElementById('output');
const previewButton = document.getElementById('preview');
const downloadButton = document.getElementById('download');
const copyOutputToClipboardButton = document.getElementById('copy-output-to-clipboard');

function resetOutput() {
    output.value = null;
}

key.addEventListener('keyup', (event) => {
    resetOutput();
});

generateKeyButton.addEventListener('click', (event) => {
    event.preventDefault();
    key.value = Uuid.v4();
});

copyKeyToClipboard.addEventListener('click', (event) => {
    event.preventDefault();
    key.select();
    document.execCommand('copy');
});

upload.addEventListener('change', (event) => {
    if (upload.files && upload.files[0]) {
        const reader = new FileReader();
        reader.readAsText(upload.files[0]);
        reader.onload = (event) => {
            input.value = event.target.result;
            encryptButton.click();
        };
    }
    upload.value = null;
});

uploadFileButton.addEventListener('click', (event) => {
    event.preventDefault();
    resetOutput();
    upload.click();
});

encryptButton.addEventListener('click', (event) => {
    event.preventDefault();
    output.value = encrypt(input.value, key.value);
});

input.addEventListener('keyup', (event) => {
    resetOutput();
});

previewButton.addEventListener('click', (event) => {
    event.preventDefault();
    const w = window.open();
    w.document.write(output.value);
    w.document.close();
});

copyOutputToClipboardButton.addEventListener('click', (event) => {
    event.preventDefault();
    output.select();
    document.execCommand('copy');
});

downloadButton.addEventListener('click', (event) => {
    event.preventDefault();
    const blob = new Blob([output.value], {
        type: 'text/html'
    });

    const defaultFilename = 'pagelock-' + Uuid.v4() + '.html';
    const filename = prompt('Download as...', defaultFilename);

    if (filename) {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    }
});

window.addEventListener('load', (event) => {
    generateKeyButton.click();
});