export function carregarImagemDaApi() {
  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let cartasAPI = []; // Variável para armazenar as informações da API
    let cartasViradas = []; // Array para armazenar as cartas viradas

    // Faz a requisição à API apenas uma vez
    fetch('http://192.168.0.105:5000/list')
      .then(response => response.json())
      .then(data => {
        cartasAPI = data;

        // Adiciona o evento de clique para cada carta
        cards.forEach(card => {
          card.addEventListener('click', function () {
            const cardId = card.getAttribute('data-id');
            const carta = cartasAPI.find(c => c.id == cardId);

            // Verifica se a carta já foi revelada
            if (!carta.revelada && cartasViradas.length < 2) {
              card.setAttribute('src', carta.imagem);
              carta.revelada = true; // Marca a carta como revelada
              cartasViradas.push(carta);

              // Se tiver virado 2 cartas, verifica se são iguais
              if (cartasViradas.length === 2) {
                setTimeout(() => {
                  if (cartasViradas[0].imagem !== cartasViradas[1].imagem) {
                    // Se as cartas não forem iguais, vira de volta
                    cartasViradas.forEach(c => {
                      document.querySelector(`[data-id="${c.id}"]`).setAttribute('src', '../img/verso.png');
                      c.revelada = false; // Marca as cartas como não reveladas
                    });
                  }
                  // Limpa o array de cartas viradas após verificar
                  cartasViradas = [];
                }, 1000); // Aguarda 1 segundo antes de verificar
              }
            }
          });
        });
      })
      .catch(error => console.error('Erro ao carregar dados da API:', error));
  });
}


