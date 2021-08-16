export default function handleClickClipboard() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);

  const popup = document.getElementById('myPopup');
  popup.classList.remove('hide');
  popup.classList.toggle('show');

  const time = 3000;

  setTimeout(() => {
    popup.classList.toggle('hide');
    popup.classList.remove('show');
  }, time);
}
