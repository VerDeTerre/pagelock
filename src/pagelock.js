import CryptoJS from 'crypto-js';
import Handlebars from 'handlebars';

import decrypterTemplate from './decrypter.html';
import decrypter from '../dist.decrypter/decrypter.js.inline';

export default function encrypt(plaintext, key) {
    if (!key) {
        throw 'Can not encrypt without key';
    }

    const ciphertext = CryptoJS.AES.encrypt(plaintext, key);
    const result = Handlebars.compile(decrypterTemplate)({
        decrypter: decrypter,
        ciphertext: ciphertext
    });

    return result;
}