let cartasViradas = [];

// Flippar as cartas
export function flipCards() {
  var cards = document.querySelectorAll('.scene--card');

  cards.forEach((card) => {
    card.addEventListener('click', function () {
      // Verificar se já há 2 cartas viradas
      if (cartasViradas.length < 2) {
        card.classList.toggle('is-flipped');
        cartasViradas.push(card);
        
      // Verificar se duas cartas foram viradas
      if (cartasViradas.length === 2) {
        combinacao();
        }
      }
    });
  });
}

// Função combinacao
export function combinacao() {
  const [carta1, carta2] = cartasViradas;

  if (carta1.dataset.card === carta2.dataset.card) {
    travarCarta(carta1)
    travarCarta(carta2)
    sumirCarta(carta1)
    sumirCarta(carta2)
  } else {
    // Aguardar um tempo antes de esconder as cartas
    setTimeout(() => {
      carta1.classList.remove('is-flipped');
      carta2.classList.remove('is-flipped');
    }, 1000);
  }

  // Resetar lista de cartas viradas
  cartasViradas = [];
}


//Realiza a combinação de cartas iguais
export function travarCarta() {
}

//Faz as cartas já combinadas sumirem
// export function sumirCarta(carta) {
//   const index = parseInt(carta.dataset.cardIndex);

  // Envia uma requisição DELETE para o servidor
//   fetch(`/delete/${index}`, {
//       method: 'DELETE',
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log(data.message);  // Exibe a mensagem do servidor no console
//   })
//   .catch(error => {
//       console.error('Erro ao enviar requisição DELETE:', error);
//   });

//   // Remove a carta do DOM
//   carta.remove();
// }
