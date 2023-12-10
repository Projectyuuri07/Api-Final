export function carregarImagemDaApi() {
  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let cartasAPI = [];
    let cartasViradas = [];

    fetch('http://192.168.3.199:5000/list')
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
                  } else {
                    fetch(`http://192.168.3.199:5000/acertar/${cartasViradas[0].id}`, {
                      method: 'DELETE',
                    })
                      .then(response => {
                        console.log('Response status:', response.status);
                        return response.json();
                      })
                      .then(data => {
                        console.log('Server response:', data);
                        if (data.message) {
                          console.log(data.message);
                        } else {
                          console.error('Unexpected server response:', data);
                        }
                      })
                      .catch(error => console.error('Error:', error));
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
