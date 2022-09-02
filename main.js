import * as monaco from 'monaco-editor';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';

//* References
const code = document.querySelector('#code');
const output = document.querySelector('#output');

//* Listeners
code.addEventListener('input', () => {
  update();
});

//* Functions

const update = () => {
  const html = newHtml();
  try {
    output.setAttribute('srcdoc', html);
  } catch (error) {
    logger.innerHTML = console.logs;
  }
};

const newHtml = () => {
  const js = jsEditor.getValue();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet">
    <style>
    *{
      font-family: 'Manrope', sans-serif;
    }
    </style>
    </head>
    <body>

    <p id="logger"></p>

    <script>
    try {
        const logger = document.querySelector('#logger')
        console.stdlog = console.log.bind(console);
        console.logs = [];
        console.log = function(){
            console.logs.push(Array.from(arguments));
            // console.stdlog.apply(console, arguments);
        }
        ${js}
        logger.innerHTML = console.logs
    } catch (error) {
      logger.innerHTML = error
    }
    </script>
    </body>
    </html>
    `;
};

//* Monaco editor
window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'javascript') {
      return new JsWorker();
    }
  }
};

const jsEditor = monaco.editor.create(code, {
  value: '',
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 18,
  padding: {
    top: 16
  },
  lineNumbers: false
});

jsEditor.onDidChangeModelContent(update);
