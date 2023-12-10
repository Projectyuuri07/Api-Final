export function carregarImagemDaApi() {
  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let cartasAPI = [];
    let cartasViradas = [];
    let cartasReveladas = 0;

    fetch('http://192.168.15.129:5000/list')
      .then(response => response.json())
      .then(data => {
        cartasAPI = data;

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
                      // Define a imagem de volta para o verso
                      cartaElement.setAttribute('src', '../img/verso.png');
                      c.revelada = false;
                    });
                  } else {
                    // Esconde as cartas acertadas após um tempo
                    cartasViradas.forEach(c => {
                      const cartaElement = document.querySelector(`[data-id="${c.id}"]`);
                      cartaElement.classList.add('hidden');
                    });

                    // Incrementa o contador de cartas reveladas
                    cartasReveladas += 2;

                    // Verifica se todas as cartas foram reveladas
                    if (cartasReveladas === 18) {
                      // Exibe a mensagem de parabéns
                      alert('Parabéns! Você encontrou todas as cartas!');
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
