// ESTE É O JAVASCRIPT COM A LÓGICA DO JOGO DA MEMÓRIA, TELA ONDE HÁ AS CARTAS

const grade = document.querySelector('.grid');
const jogador = document.querySelector('.player');
const tempo = document.querySelector('.timer');

//lógica


// FLIPPAR AS CARTAS
var cards = document.querySelectorAll('.card');

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});

// ATIVAR E DESATIVAR MÚSICA NO NAVEGADOR
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

// TEMPORIZADOR

let segundos = 0
function temporizador() {
  // Calcula os minutos e segundos
  let contagemMinutos = Math.floor((segundos % 3600) / 60);
  let contagemSegundos = segundos % 60;

  // Adiciona um zero à esquerda se for necessário
  contagemMinutos = contagemMinutos < 10 ? '0' + contagemMinutos : contagemMinutos;
  contagemSegundos = contagemSegundos < 10 ? '0' + contagemSegundos : contagemSegundos;

  // Atualiza o conteúdo do elemento de temporizador
  tempo.textContent = `${contagemMinutos}:${contagemSegundos}`;

  // Incrementa o contador de segundos
  segundos++;
}

setInterval(temporizador, 900);

// CLICK EM APENAS 2 CARTAS

