// Botão de mutar/desmutar música de fundo
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

// Botão iniciar jogo
document.addEventListener('DOMContentLoaded', function () {
    const iniciarJogoButton = document.getElementById('iniciar');
    const nomeInput = document.getElementById('NomeUsuario');

    iniciarJogoButton.addEventListener('click', function (event) {
        if (nomeInput.value.trim() === '') {
            alert('Por favor, insira seu nome antes de iniciar o jogo.');
            event.preventDefault();
        } else {
            location.href = 'game.html';
            temporizador()
        }
    });
});