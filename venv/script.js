document.addEventListener('DOMContentLoaded', function () {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const toggleMusicButton = document.getElementById('toggleMusicButton');

    toggleMusicButton.addEventListener('click', function () {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
      } else {
        backgroundMusic.pause();
      }
    });
  });