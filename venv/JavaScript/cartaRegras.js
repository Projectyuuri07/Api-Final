export function jogoIniciado() {
  document.addEventListener('DOMContentLoaded', function () {
    const tempo = document.querySelector('.timer');

    // Músicas
    const musicaBatalha = document.getElementById('backgroundMusic');
    const musicaVitoria = new Audio('../musicas/musicafinal.mp3');

    let temporizadorInterval;

    function iniciarTemporizador() {
      if (tempo) {
        let segundos = 0;

        temporizadorInterval = setInterval(() => {
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
        }, 1000);
      } else {
        console.error('Elemento com a classe "timer" não encontrado no DOM.');
      }
    }

    const cards = document.querySelectorAll('.card');
    let cartasAPI = [];
    let cartasViradas = [];
    let cartasReveladas = 0;

    fetch('http://192.168.0.19:5000/list')
      .then(response => response.json())
      .then(data => {
        cartasAPI = data;
        iniciarTemporizador(); // Inicia o temporizador quando as imagens são carregadas

        cards.forEach(card => {
          card.addEventListener('click', function () {
            const cardId = card.getAttribute('data-id');
            const carta = cartasAPI.find(c => c.id == cardId);

            if (!carta.revelada && cartasViradas.length < 2) {
              card.setAttribute('src', carta.imagem);
              card.classList.add('flipped');
              carta.revelada = true;
              cartasViradas.push(carta);

              if (cartasViradas.length === 2) {
                setTimeout(() => {
                  if (cartasViradas[0].imagem !== cartasViradas[1].imagem) {
                    cartasViradas.forEach(c => {
                      const cartaElement = document.querySelector(`[data-id="${c.id}"]`);
                      cartaElement.classList.remove('flipped');
                      cartaElement.setAttribute('src', '../img/verso.png');
                      c.revelada = false;
                    });
                  } else {
                    cartasViradas.forEach(c => {
                      const cartaElement = document.querySelector(`[data-id="${c.id}"]`);
                      cartaElement.classList.add('hidden');
                    });

                    cartasReveladas += 2;

                    if (cartasReveladas === 18) {
                      alert("Parabéns! Você descobriu todas as cartas!");
                      // Pausa o temporizador quando o jogador ganha
                      clearInterval(temporizadorInterval);

                      musicaBatalha.pause();
                      musicaVitoria.play();

                      const modal = document.getElementById('myModal');
                      modal.style.display = 'flex';
                    }
                  }

                  cartasViradas = [];
                }, 1000);
              }
            }
          });
        });
      })
      .catch(error => console.error('Erro ao carregar dados da API:', error));
  });
}
