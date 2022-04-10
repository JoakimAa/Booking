import Swal from 'sweetalert2'

export default function createDialog(title, text, icon, timer) {
  Swal.fire({
    title,
    text,
    icon,
    timer,
    timerProgressBar: true,
  })
}
