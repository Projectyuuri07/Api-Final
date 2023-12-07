// Adapte a função de clique nas cartas no seu arquivo index.js

let flippedCards = []; // Array para armazenar cartas viradas

// Evento de clique nas cartas
const imgElements = document.querySelectorAll('.grid img');
imgElements.forEach((item) => {
  item.addEventListener('click', async () => {
    const cardId = item.getAttribute('data-id');

    // Verifique se a carta já foi virada ou se há duas cartas já viradas
    if (!item.classList.contains('flipped') && flippedCards.length < 2) {
      // Adicione a classe "flipped" para aplicar o efeito de flip
      item.classList.add('flipped');

      // Adicione a carta ao array de cartas viradas
      flippedCards.push({ id: cardId, element: item });

      // Se duas cartas foram viradas, compare-as
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        // Verifique se as imagens das cartas são iguais
        if (card1.element.src === card2.element.src) {
          // Cartas iguais, aguarde um curto período e remova-as pela API
          setTimeout(async () => {
            await removeCardsFromAPI(card1.id, card2.id);
            flippedCards = []; // Limpe o array de cartas viradas
          }, 300);
        } else {
          // Cartas diferentes, aguarde um curto período e vire-as de volta para o verso
          setTimeout(() => {
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            flippedCards = []; // Limpe o array de cartas viradas
          }, 600);
        }
      }
    }
  });
});

// Função para remover cartas pela API
async function removeCardsFromAPI(cardId1, cardId2) {
  try {
    // Chame sua API para remover as cartas com os IDs fornecidos
    await fetch(`http://192.168.0.105:5000/delete/${cardId1}`, { method: 'DELETE' });
    await fetch(`http://192.168.0.105:5000/delete/${cardId2}`, { method: 'DELETE' });

    // Chame a função para buscar e exibir as cartas atualizadas após algum tempo
    setTimeout(fetchAndDisplayCards, 400);
  } catch (error) {
    console.error('Erro ao remover as cartas:', error);
  }
}
