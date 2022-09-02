import * as monaco from 'monaco-editor';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { encode, decode, isValid } from 'js-base64';
import Split from 'split.js'

//* Variables
const { pathname } = window.location
const urlCode = pathname.replace(/^./, "");
var base64Code;
try {
  base64Code = isValid(urlCode)? decode(urlCode) : '';
} catch (error) {
  base64Code = '';
  window.history.pushState('code', '', '/'); 
}
//* References
const code = document.querySelector('#code');
const output = document.querySelector('#output');

//* Functions

const update = () => {
  try {
    const html = newHtml();
    output.setAttribute('srcdoc', html);
  } catch (error) {}
};

const newHtml = () => {
  const js = jsEditor.getValue();

  //* Update url to save all the code
  base64Code = encode(js);
  window.history.pushState('code', '', `/${base64Code}`); // change url

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet">
    <style>
    ::-webkit-scrollbar {
        width: 10px;
      }
    ::-webkit-scrollbar-track {
        background: transparent;
      }
    ::-webkit-scrollbar-thumb {
        background: #5c5c5c;
        border-radius: 5px;
      }
    ::-webkit-scrollbar-thumb:hover {
        background: #6c6c6c;
      }
    *{
      font-family: 'Manrope', sans-serif;
      list-style: none;
      color: #cecece;
      font-size: 24px;
    }
    p{
      padding: 5px 0;
      margin: 0;
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
          logger.innerHTML += '<li><p>'+log+'</p></li>'
        })
      } catch (error) {
        logger.innerHTML = '<li><p>' + error + '</p></li>'
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
  value: base64Code,
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 18,
  padding: {
    top: 16
  },
  automaticLayout: true, // resize the code area
  minimap: {
    enabled: false
  },
  lineNumbers: false
});

jsEditor.onDidChangeModelContent(update);


//* SplitJS
Split(['#code-container', '#output-container']);
