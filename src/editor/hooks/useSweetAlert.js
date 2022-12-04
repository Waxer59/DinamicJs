import Swal from 'sweetalert2';

const customClass = {
  popup: 'alerts',
  validationMessage: 'alerts'
};
const Toast = Swal.mixin({
  toast: true,
  customClass,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export const useSweetAlert = () => {
  const throwToast = (icon, title) => {
    Toast.fire({
      heightAuto: false,
      icon,
      title
    });
  };

  const throwAlert = async (title, inputLabel, icon) => {
    const { value } = await Swal.fire({
      title,
      customClass,
      icon,
      heightAuto: false,
      input: 'text',
      inputLabel,
      showCloseButton: true,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      }
    });

    return value;
  };

  const throwConfig = async ({
    fontLigatures,
    minimap,
    fontSize,
    lineNumbers,
    theme,
    mouseWheelZoom
  }) => {
    const { value } = await Swal.fire({
      title: 'Configuration',
      customClass,
      heightAuto: false,
      html: `
      <style>
        .config {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        select{
          border-radius: 5px;
          padding: 2px;
          border: 1px solid #ccc;
          outline: none;
          border: none;
          background: rgba( 255, 255, 255, 0.5 );
          backdrop-filter: blur( 20px );
          -webkit-backdrop-filter: blur( 20px );
          border-radius: 10px;
        }
        input[type="number"] {
          padding: 2px;
          border: 1px solid #ccc;
          text-align: center;
          outline: none;
          border: none;
          background: rgba( 255, 255, 255, 0.5 );
          backdrop-filter: blur( 20px );
          -webkit-backdrop-filter: blur( 20px );
          border-radius: 10px;
        }
        input[type="checkbox"] {
          margin: 0;
          padding: 0;
          width: 1rem;
          height: 1rem;
          outline: none;
          border: none;
          background: rgba( 255, 255, 255, 0.5 );
          backdrop-filter: blur( 20px );
          -webkit-backdrop-filter: blur( 20px );
          border-radius: 10px;
        }
      </style>
        <div class="config">
          <div class="config__item">
            <label for="config__theme">Theme</label>
            <select id="config__theme">
              <option value="dark">Dark</option>
              <option value="light" ${
                theme === 'vs' ? 'selected="selected"' : ''
              }>Light</option>  
            </select>
          </div>
          <div class="config__item">
            <label for="config__lineNumbers">Line numbers</label>
            <select id="config__lineNumbers">  
              <option value="off">off</option>
              <option value="on" ${
                lineNumbers === 'on' ? 'selected="selected"' : ''
              }>on</option>
              <option value="relative" ${
                lineNumbers === 'relative' ? 'selected="selected"' : ''
              }>relative</option>
              <option value="interval" ${
                lineNumbers === 'interval' ? 'selected="selected"' : ''
              }>interval</option>
            </select>
          </div>
          <div class="config__item">
            <label for="config__fontLigatures">Font ligatures</label>
            <input type="checkbox" id="config__fontLigatures" name="fontLigatures" ${
              fontLigatures ? 'checked' : ''
            }>
          </div>
          <div class="config__item">
            <label for="config__mouseWheelZoom">Mouse wheel zoom</label>
            <input type="checkbox" id="config__mouseWheelZoom" name="mouseWheelZoom" ${
              mouseWheelZoom ? 'checked' : ''
            }>
          </div>
          <div class="config__item">
            <label for="config__minimap">Minimap</label>
            <input type="checkbox" id="config__minimap" name="minimap" ${
              minimap.enabled ? 'checked' : ''
            }>
          </div>
          <div class="config__item">
            <label for="config__fontSize">Font size</label>
            <input id="config__fontSize" type="number" min="1" max="100" value="${fontSize}">
          </div>
        </div>
          `,
      showCloseButton: true,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      preConfirm: () => {
        const theme =
          document.getElementById('config__theme').value === 'dark'
            ? 'vs-dark'
            : 'vs';
        const lineNumbers = document.getElementById(
          'config__lineNumbers'
        ).value;
        const fontLigatures = document.getElementById(
          'config__fontLigatures'
        ).checked;

        const minimap = document.getElementById('config__minimap').checked;
        const fontSize = document.getElementById('config__fontSize').value;
        const mouseWheelZoom = document.getElementById(
          'config__mouseWheelZoom'
        ).checked;

        return {
          theme,
          lineNumbers,
          fontLigatures,
          minimap: {
            enabled: minimap
          },
          fontSize,
          mouseWheelZoom
        };
      }
    });
    return { ...value };
  };
  return {
    throwToast,
    throwAlert,
    throwConfig
  };
};
