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
          </style>
      </head>
      <body>
          <div id="logger-container">
            <ul id="logger">
            </ul>
          </div>
          <script type="module">
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
            }

            ${code.replace(/^(?!.*import).*$/gm, '')}
            try{
              ${code.replace(
                /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/gm,
                ''
              )}
            }catch(e){
              logger.innerHTML += '<li><p class="error">'+e+'</p></li>'
            }
            if(consoleLogs){
              consoleLogs.forEach((log)=>{
                let logs = [];
                log.forEach((log)=>{
                  if(String(log).trim() == '' && typeof log == 'string'){
                    logs.push("' '");
                    return;
                  }
                  if(typeof log == 'object'){
                    logs.push(JSON.stringify(log));
                    return;
                  }
                  if(typeof log == 'function'){
                    losgs.push(log.toString());
                    return;
                  }
                  if(typeof log == 'object object'){
                    logs.push(JSON.stringify(log));
                    return;
                  }
                  if(typeof log == 'undefined'){
                    logs.push("undefined");
                    return;
                  }
                  logs.push(log);
                })
                logger.innerHTML += '<li><p> Log: '+logs.join(' , ')+'</p></li>'
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
