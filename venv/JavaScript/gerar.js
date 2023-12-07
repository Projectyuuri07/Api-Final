// Criamos uma função assíncrona
/* Esta função é declarada como assíncrona utilizando 'async' para lidar com operações assíncronas,
como a requisição HTTP com 'fetch'. O uso de 'await' garante que a execução do código aguarde
a conclusão da operação assíncrona antes de prosseguir. Isso é essencial para garantir a ordem
correta de execução, evitando problemas de acesso a dados que ainda não foram recuperados.*/

export async function carregarImagensDaApi() {
  try {
      const response = await fetch('http://192.168.0.105:5000/list');
      const cartasAPI = await response.json();

      const cartasElements = document.querySelectorAll('.card__face--back');

      cartasElements.forEach((faceDeTras, index) => {
          const imagem = document.createElement('img');
          imagem.src = cartasAPI[index].imagem;

          faceDeTras.appendChild(imagem);

          faceDeTras.addEventListener('click', () => virarCarta(index, cartasElements));
      });
  } catch (error) {
      console.error('Erro ao carregar imagens da API:', error);
  }
}

function virarCarta(index, todasCartas) {
  todasCartas.forEach((carta, i) => {
      const cartaImagem = carta.querySelector('img');
      if (i !== index) {
          cartaImagem.classList.add('oculta');
      }
  });

  todasCartas[index].querySelector('img').classList.remove('oculta');
}
