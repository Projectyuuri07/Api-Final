// Virar cartas
const img = document.createElement('grid img');
img.forEach((item) => {
    item.addEventListener('click', () => {
    item.setAttribute('src', 'http://192.168.0.105:5000');
  })
})






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
