// Flippar as cartas
export function flipCards() {
  var cards = document.querySelectorAll('.card');

  cards.forEach((card)=>{
    card.addEventListener( 'click', function() {
      card.classList.toggle('is-flipped');
    });
  });
}
