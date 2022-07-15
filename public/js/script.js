function showTheme() {
  // Check Local Storage then apply dark theme if it's active
}

function showContent() {
  document.body.style.visibility = 'visible';
  document.body.style.opacity = 1;
}

window.addEventListener('DOMContentLoaded', function () {
  showTheme();
  showContent();
});