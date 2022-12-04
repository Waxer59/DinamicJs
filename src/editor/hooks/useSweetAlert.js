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
  return {
    throwToast,
    throwAlert
  };
};
