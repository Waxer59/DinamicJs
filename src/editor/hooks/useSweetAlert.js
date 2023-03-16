import Swal from 'sweetalert2';
import { useCodeStore } from './useCodeStore';
import { useRouteUrl } from './useRouteUrl';
import { useSettingsStore } from './useSettingsStore';

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
  timerProgressBar: false
});

export const useSweetAlert = () => {
  const {
    onAddCodeSaved,
    onRemoveCodeSaved,
    activeCode,
    onCheckNameAndCode,
    onRenameCodeSaved,
    onGetCodeSavedByName,
    onSetUploadedCode
  } = useCodeStore();
  const { onSetSnippets, snippets } = useSettingsStore();
  const { encodeText } = useRouteUrl();

  const throwToast = (icon, title) => {
    Toast.fire({
      heightAuto: false,
      icon,
      title
    });
  };

  const throwAlert = async (title, inputLabel, icon) => {
    const { value } = await throwModal({
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
    mouseWheelZoom,
    snippets = []
  }) => {
    const { value } = await throwModal(
      {
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
        .config-btn{
          background: #007FFF;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          color: #FFF;
          cursor: pointer;
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
              <option value="off">Off</option>
              <option value="on" ${
                lineNumbers === 'on' ? 'selected="selected"' : ''
              }>On</option>
              <option value="relative" ${
                lineNumbers === 'relative' ? 'selected="selected"' : ''
              }>Relative</option>
              <option value="interval" ${
                lineNumbers === 'interval' ? 'selected="selected"' : ''
              }>Interval</option>
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
          <div class="config__item">
            <button class="config-btn" id="config__snippets">Config snippets</button>
          </div>
        </div>
          `,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: 'Reset',
        showDenyButton: true,
        didOpen: () => {
          const snippetsBtn = document.querySelector('#config__snippets');

          snippetsBtn.addEventListener('click', async () => {
            let htmlSavesList = '';
            snippets.forEach((snippet, index) => {
              htmlSavesList += `
                <li>
                  <button class="save-item__name" title="${snippet.label}" id="code-btn" data-name="${snippet.label}">${snippet.label}</button>
                  <div class="save-item__actions">
                  <button class="save-item__btn edit-btn" id="snippet-item__btn-${index}" data-name="${snippet.label}" title="Edit snippet" ><i class="fa-solid fa-pen-to-square"></i></button>
                  <button class="save-item__btn delete-btn" id="snippet-item__btn-${index}" data-name="${snippet.label}" title="Delete snippet" ><i class="fa-solid fa-trash"></i></button>
                  </div>
                </li>`;
            });

            await throwModal({
              title: 'Custom snippets',
              customClass,
              heightAuto: false,
              showCloseButton: true,
              showCancelButton: false,
              showConfirmButton: false,
              denyButtonText: 'Reset',
              showDenyButton: true,
              html: `
                <style>
                  .overwrite-btn{
                    background: #FFBC49 !important;
                    color: #fff;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                  }
                  .save-item__actions{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 5px;
                  }
                  .save-item__name{
                    width: 60%;
                    color: #fff;
                    background: #252627 !important;
                    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                  }
                  .save-btn{
                    background: #4caf50;
                    color: #fff;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                  }

                  .items-saved{
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 15px;
                  }

                  .items-saved li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }

                  .items-saved li button{
                    background: #4caf50;
                    color: #fff;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                  }

                  .edit-btn{
                    background: #2196f3 !important;
                  }

                  .delete-btn{
                    background: #f44336 !important;
                  }
                </style>
                  <div class="config">
                    <div class="config__item">
                    <button class="save-btn" id="save-btn">New snippet</button>
                    </div>
                    <div class="config__item">
                    <ul class="items-saved">
                      ${htmlSavesList}
                    </ul>
                    </div>
                  </div>`,
              didOpen: async () => {
                const saveBtn = document.getElementById('save-btn');
                const editBtns = document.querySelectorAll('.edit-btn');
                const deleteBtns = document.querySelectorAll('.delete-btn');

                editBtns.forEach((btn) => {
                  btn.addEventListener('click', async () => {
                    const name = await throwAlert(
                      'Editing',
                      `You are editing "${btn.getAttribute('data-name')}"`
                    );
                    if (name) {
                      onRenameCodeSaved(btn.getAttribute('data-name'), name);
                      throwToast('success', 'Saved');
                      return;
                    }
                    throwToast('error', 'Canceled');
                  });
                });

                deleteBtns.forEach((btn) => {
                  btn.addEventListener('click', async () => {
                    const snippetLabel = btn.getAttribute('data-name');
                    const name = await throwAlert(
                      'Deleting',
                      `You are deleting "${snippetLabel}" type the name to confirm`
                    );
                    if (name === snippetLabel) {
                      onSetSnippets(
                        snippets.filter(({ label }) => label !== snippetLabel)
                      );
                      throwToast('success', 'Deleted');
                      return;
                    }
                    throwToast('error', 'Canceled');
                  });
                });

                saveBtn.addEventListener('click', async () => {
                  const name = await throwAlert(
                    'New Snippet',
                    'This snippet will be saved locally'
                  );
                  if (onCheckNameAndCode(name)) {
                    throwToast('error', 'This name already exists');
                    return;
                  }
                  if (name && name.trim() !== '') {
                    onAddCodeSaved(name, encodeText(activeCode));
                    throwToast('success', 'Saved');
                  }
                });
              }
            });
          });
        },
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
      },
      async (result) => {
        if (result.isDenied) {
          await throwModal(
            {
              title: 'Are you sure?',
              customClass,
              heightAuto: false,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, reset it!'
            },
            (result) => {
              if (result.isConfirmed) {
                Swal.close();
                localStorage.removeItem('settings');
                location.reload();
              }
              return result;
            }
          );
        }
        return result;
      }
    );
    return value;
  };

  const throwLocalSaves = async (saves = []) => {
    let htmlSavesList = '';
    saves.forEach((save, index) => {
      htmlSavesList += `
      <li>
        <button class="save-item__name" title="${save.name}" id="code-btn" data-name="${save.name}">${save.name}</button>
        <div class="save-item__actions">
        <button class="save-item__btn overwrite-btn" id="save-item__btn-${index}" data-name="${save.name}" title="Overwrite" ><i class="fa-solid fa-floppy-disk"></i></button>
        <button class="save-item__btn edit-btn" id="save-item__btn-${index}" data-name="${save.name}" title="Edit name" ><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="save-item__btn delete-btn" id="save-item__btn-${index}" data-name="${save.name}" title="Delete code" ><i class="fa-solid fa-trash"></i></button>
        </div>
      </li>
      `;
    });
    await throwModal({
      title: 'Local saves',
      customClass,
      heightAuto: false,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      html: `
      <style>
        .overwrite-btn{
          background: #FFBC49 !important;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }
        .save-item__actions{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 5px;
        }
        .save-item__name{
          width: 60%;
          color: #fff;
          background: #252627 !important;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }
        .save-btn{
          background: #4caf50;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }

        .items-saved{
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
        }

        .items-saved li{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .items-saved li button{
          background: #4caf50;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }

        .edit-btn{
          background: #2196f3 !important;
        }

        .delete-btn{
          background: #f44336 !important;
        }
      </style>
        <div class="config">
          <div class="config__item">
          <button class="save-btn" id="save-btn">Save this file</button>
          </div>
          <div class="config__item">
          <ul class="items-saved">
            ${htmlSavesList}
          </ul>
          </div>
        </div>
          `,
      didOpen: async () => {
        const saveBtn = document.getElementById('save-btn');
        const editBtns = document.querySelectorAll('.edit-btn');
        const deleteBtns = document.querySelectorAll('.delete-btn');
        const overwriteBtns = document.querySelectorAll('.overwrite-btn');
        const codeBtns = document.querySelectorAll('#code-btn');

        overwriteBtns.forEach((btn) => {
          btn.addEventListener('click', async () => {
            const name = await throwAlert(
              'Overwriting',
              `You are overwriting "${btn.getAttribute('data-name')}"`
            );
            if (name) {
              onAddCodeSaved(name);
              throwToast('success', 'Saved');
              return;
            }
            throwToast('error', 'Canceled');
          });
        });

        editBtns.forEach((btn) => {
          btn.addEventListener('click', async () => {
            const name = await throwAlert(
              'Editing',
              `You are editing "${btn.getAttribute('data-name')}"`
            );
            if (name) {
              onRenameCodeSaved(btn.getAttribute('data-name'), name);
              throwToast('success', 'Saved');
              return;
            }
            throwToast('error', 'Canceled');
          });
        });

        deleteBtns.forEach((btn) => {
          btn.addEventListener('click', async () => {
            const name = await throwAlert(
              'Deleting',
              `You are deleting "${btn.getAttribute(
                'data-name'
              )}" type the name to confirm`
            );
            if (name === btn.getAttribute('data-name')) {
              onRemoveCodeSaved(name);
              throwToast('success', 'Deleted');
              return;
            }
            throwToast('error', 'Canceled');
          });
        });

        saveBtn.addEventListener('click', async () => {
          const name = await throwAlert(
            'Name the code',
            'This code will be saved locally'
          );
          if (onCheckNameAndCode(name)) {
            throwToast('error', 'This name already exists');
            return;
          }
          if (name && name.trim() !== '') {
            onAddCodeSaved(name, encodeText(activeCode));
            throwToast('success', 'Saved');
          }
        });

        codeBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const code = onGetCodeSavedByName(btn.getAttribute('data-name'));
            if (code) {
              onSetUploadedCode(code);
              throwToast('success', 'Loaded');
              return;
            }
            if (code === '') {
              throwToast('info', 'Empty code');
              return;
            }
            throwToast('error', 'Canceled');
          });
        });
      }
    });
  };

  const throwModal = async (config = {}, thenFc = (result) => result) => {
    const modal = await Swal.fire(config).then(thenFc);
    return modal;
  };

  return {
    throwToast,
    throwAlert,
    throwConfig,
    throwLocalSaves
  };
};
