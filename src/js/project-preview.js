function playPreview() {
  if (typeof this.play === 'function') {
    this.play();
  }
}

function listenerPreviews() {
  const previews = document.querySelectorAll('.project__preview');
  previews.forEach(function (preview) {
    preview.addEventListener('click', playPreview);
  });
}

const observer = new MutationObserver(listenerPreviews);
observer.observe(document.querySelector('.section-projects'), {
  childList: true,
  subtree: true
});

listenerPreviews();