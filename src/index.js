import Uuid from 'uuid';

import encrypt from './pagelock';

const key = document.getElementById('key');
const generateKeyButton = document.getElementById('generate-key');
const copyKeyToClipboard = document.getElementById('copy-key-to-clipboard');

const input = document.getElementById('input');
const select = document.getElementById('select');
const selectFileButton = document.getElementById('select-file');
const encryptButton = document.getElementById('encrypt');

const output = document.getElementById('output');
const previewButton = document.getElementById('preview');
const saveButton = document.getElementById('save');
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

select.addEventListener('change', (event) => {
    if (select.files && select.files[0]) {
        const reader = new FileReader();
        reader.readAsText(select.files[0]);
        reader.onload = (event) => {
            input.value = event.target.result;
            encryptButton.click();
        };
    }
    select.value = null;
});

selectFileButton.addEventListener('click', (event) => {
    event.preventDefault();
    resetOutput();
    select.click();
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

saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const blob = new Blob([output.value], {
        type: 'text/html'
    });

    const defaultFilename = 'pagelock-' + Uuid.v4() + '.html';
    const filename = prompt('Save as...', defaultFilename);

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