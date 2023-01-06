import { useProtectCode } from './useProtectCode';

export const useCodePreviewer = () => {
  const { protectCode } = useProtectCode();

  const update = (output, code) => {
    try {
      output.setAttribute('srcdoc', newHtml(protectCode(code)));
    } catch (error) {}
  };

  const newHtml = (code) => {
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
            }
            html{
            font-size: clamp(16px, 3vw, 28px); 
            }
            p{
            padding: 5px 0;
            font-size: 1rem;
            margin: 0;
            }
            .error{
            color: #ff3333;
            }
            .logger{
              padding-left:40px;
              margin: 16px 0;
            }
            .log-el{
              margin-bottom:25px;
            }
            pre{
              margin:0;
              display:inline;
            }
          </style>
      </head>
      <body>
          <div id="logger-container">
            <div id="logger" class="logger">
            </div>
          </div>
          <script defer>
          const logger = document.querySelector('#logger');
            window.onerror = function (e) {
              logger.innerHTML = '<div class="log-el"><p class="error">'+e+'</p></div>'
            };
          </script>
          <script type="module" defer>
            function prettyPrint(obj) {
              if(!obj){
                return "<pre>" + obj + "</pre>";
              }
                let jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg,
                    self = this;
                return '<pre class="json-pre"><code>' +
                    JSON.stringify(obj, null, 3)
                        .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
                        .replace(/</g, '&lt;').replace(/>/g, '&gt;') +
                    '</code></pre>';
            }
            const logger = document.querySelector('#logger');

            logger.innerHTML = '';
            let consoleLogs = [];

            console.stdlog = console.log.bind(console);
            
            // Overriding console.* functions
            console.log = function(){
            consoleLogs.push(Array.from(arguments));
            // console.stdlog.apply(console, arguments);
            }

            console.error = function(){
            consoleLogs.push(Array.from(arguments));
            // console.stdlog.apply(console, arguments);
            }

            console.warn = function(){
            consoleLogs.push(Array.from(arguments));
            // console.stdlog.apply(console, arguments);
            }

            console.info = function(){
            consoleLogs.push(Array.from(arguments));
            // console.stdlog.apply(console, arguments);
            }

            console.table = function(){
            consoleLogs.push(Array.from(arguments));
            // console.stdlog.apply(console, arguments);
            }

            console.clear = function(){
            consoleLogs = [];
            // console.stdlog.apply(console, arguments);
            };
            ${code.replace(/^(?!.*import).*$/gm, '')}
            try{
              ${code.replace(
                /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/gm,
                ''
              )}
            }catch(e){
              logger.innerHTML += '<div class="log-el"><p class="error">'+e+'</p></div>'
            }
            if(consoleLogs){
              consoleLogs.forEach((logArr)=>{
                let logs = [];
                logArr.forEach((log)=>{
                  logs.push(prettyPrint(log));
                })
              logger.innerHTML += '<div class="log-el">'+logs.toString().replace(/[,]/g,",&nbsp&nbsp")+'</div>'
              })
            }
          </script>
      </body>
    </html>
   `;
  };

  return {
    update
  };
};
