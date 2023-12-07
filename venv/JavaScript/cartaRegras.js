export function carregarImagemDaApi() {
  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let cartasAPI = [];
    let cartasViradas = [];

    fetch('http://192.168.0.105:5000/list')
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
                      document.querySelector(`[data-id="${c.id}"]`).classList.remove('flipped');
                      document.querySelector(`[data-id="${c.id}"]`).setAttribute('src', '../img/verso.png');
                      c.revelada = false;
                    });
                  }

                  cartasViradas = [];
                }, 1000);
              }
            }
          });
        });
      })
      .catch(error => console.error('Erro ao carregar dados da API:', error));
  })
}