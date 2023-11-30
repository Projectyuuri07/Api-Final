const grade = document.querySelector('.grid');
const jogador = document.querySelector('.player');
const tempo = document.querySelector('.timer');


let primeiraCarta = ''
let segundaCarta = ''

var cards = document.querySelectorAll('.card');

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});