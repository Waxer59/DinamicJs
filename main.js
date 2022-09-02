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
  try {
    const html = newHtml();
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
      list-style: none;
      color: #cecece;
    }
    </style>
    </head>
    <body>

    <div id="logger-container">
      <ul id="logger">

      </ul>
    </div>

    <script>
    const logger = document.querySelector('#logger');
    logger.innerHTML = '';
    try {
        console.stdlog = console.log.bind(console);
        console.logs = [];
        console.log = function(){
            console.logs.push(Array.from(arguments));
            // console.stdlog.apply(console, arguments);
        }
        ${js}
        console.logs.map((log)=>{
          logger.innerHTML += '<li>'+log+'</li>'
        })
      } catch (error) {
      logger.innerHTML = '<li>' + error + '</li>'
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
