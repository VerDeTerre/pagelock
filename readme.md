Pagelock
========

Pagelock generates self-decryptable password-protected web pages that can be posted publicly without exposing the content.

Pages are encrypted using AES algorithm (as implemented by [crypto-js](https://www.npmjs.com/package/crypto-js)). This should provide good security as long as the password is kept safe. However, Pagelock is intended more for basic privacy than robust security--think a curtain rather than a vault. The value of Pagelock is in the ability to create self-contained documents that include the logic for their own decryption, which means no special server-side infrastructure is necessary.

## How to build

Pagelock is a Node project that uses webpack to transpile and bundle its JavaScript. The steps for building from scratch are as follows:

1. Clone the repo
2. Run `npm run build`
    This script will do the following:

    * Build the decryption script to be embedded in the resulting page
    * Build and bundle the main script

    These steps may also be executed individually with the following commands:

    * `npm run build-decrypter`
    * `npm run build`

    Both will be executed with this command:
    
    `npm run build-all`

3. To run, you have a number of options. For testing purposes, you can run the webpack development server with `npm run start`, which will make the tool available at http://localhost:8080. You may also open the index.html file under dist directly from your browser. Or you make serve the dist folder using a web server of your choice.

## Usage

The interface has three main sections, as described below:

### Key

The key or password is used to encrypt your document. When you load the page, the field will populate with a randomly generated key ([a UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)). If you wish, you may use the "Generate New Key" button to randomly create another, or you may enter your own arbitrary text. Clicking the "Copy to Clipboard" button will send the key to your system's clipboard. The text may also be selected as copied directly.

### Input

The document you wish to encrypt goes in the Input text box. You may paste text directly or upload a file from your computer by clicking the "Upload File" button. The "Encrypt" button will use the key specified above to encrypt the input and send it the output, discussed below.

### Output

The Output text box contains the full contents of the self-decryptable web page. The "Preview" button will open the encrypted page in a new window. The "Download" button will prompt you to enter a filename (with a randomly generated default) and will save the file to your downloads folder. The "Copy to Clipboard" button will send the text to the system clipboard, which can then be pasted into a file. You may also copy the text directly.

### Using the generated file

The generated file can be sent to a recipient or placed on a webserver, where it can be accessed by a browser. Upon opening the file and entering the key the contents will be decrypted and displayed.

Alternatively, the key may be included in the link itself. If, for example, the address of the file is

    http://www.example.com/my-encrypted-file.html

and the password is "hello", the file will be automatically decrypted when visiting the URL with a question mark and the key appended, like so:

    http://www.example.com/my-encrypted-file.html?hello

Keep in mind that anyone with the link including the key will be able to view the file.