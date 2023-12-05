let cartasViradas = []

//Flippar as cartas
export function flipCards() {
  var cards = document.querySelectorAll('.card');

  cards.forEach((card)=>{
    card.addEventListener( 'click', function() {
      card.classList.toggle('is-flipped');
        cartasViradas.push(card);
        if (flipCards.length === 2) {
    combinacao()};
    });
  });
}


//travar o click pra apenas 2 cartas por vez
export function combinacao() {
    const [carta1, carta2] = cartasViradas
    if (carta1.dataset.card === carta2.dataset.card) {
      carta1.removeEventListener('click', cartasViradas);
      carta2.removeEventListener('click', cartasViradas);
  } else {
      //aguardar um tempo antes de esconder as cartas
      setTimeout(() => {
          carta1.classList.remove('is-flipped');
          carta2.classList.remove('is-flipped');
      }, 1000);
  }
  //resetar lista de cartas viradas
      cartasViradas = []
  }


//Realiza a combinação de cartas iguais
export function travarCarta() {

}

//Faz as cartas já combinadas sumirem
export function sumirCarta() {
    
}

