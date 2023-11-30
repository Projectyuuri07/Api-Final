const grade = document.querySelector('.grid');
const jogador = document.querySelector('.player');
const tempo = document.querySelector('.timer');


let primeiraCarta = ''
let segundaCarta = ''

var cards = document.querySelectorAll('.card');

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const backgroundMusic = document.getElementById('backgroundMusic');
  const toggleMusicButton = document.getElementById('toggleMusicButton');
  const muteIcon = document.getElementById('mute');

  toggleMusicButton.addEventListener('click', function () {
      if (backgroundMusic.paused) {
          backgroundMusic.play();
          muteIcon.classList.remove('bi-volume-mute');
          muteIcon.classList.add('bi-volume-up');
      } else {
          backgroundMusic.pause();
          muteIcon.classList.remove('bi-volume-up');
          muteIcon.classList.add('bi-volume-mute');
      }
  });
});