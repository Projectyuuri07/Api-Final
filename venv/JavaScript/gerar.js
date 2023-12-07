// Criamos uma função assíncrona
/* Esta função é declarada como assíncrona utilizando 'async' para lidar com operações assíncronas,
como a requisição HTTP com 'fetch'. O uso de 'await' garante que a execução do código aguarde
a conclusão da operação assíncrona antes de prosseguir. Isso é essencial para garantir a ordem
correta de execução, evitando problemas de acesso a dados que ainda não foram recuperados.*/

export async function carregarImagensDaApi() {
  try {
    const response = await fetch('http://192.168.0.105:5000/list');
    const cartasAPI = await response.json(); // Converte a resposta da requisição em formato JSON em objeto do JavaScript

    const cartasElements = document.querySelectorAll('.card__face.card__face--back');

    cartasElements.forEach((faceDeTras, index) => {
      const imagem = document.createElement('img');
      imagem.src = cartasAPI[index].imagem;

      // Adiciona a imagem com uma classe para ocultá-la inicialmente
      imagem.classList.add('oculta');
      faceDeTras.appendChild(imagem);

      // Espera o evento de clique à carta para ser virada
      faceDeTras.addEventListener('click', () => virarCarta(imagem, cartasElements));
    });
  } catch (error) {
    console.error('Erro ao carregar imagens da API:', error);
  }
}

// Função para virar a carta
function virarCarta(imagem, todasCartas) {
  // Adiciona a classe 'oculta' a todas as cartas
  todasCartas.forEach((carta) => {
    const cartaImagem = carta.querySelector('img');
    if (cartaImagem !== imagem) {
      cartaImagem.classList.add('oculta');
    }
  });

  // Remove a classe 'oculta' apenas da imagem da carta clicada
  imagem.classList.remove('oculta');
}

window.onload = carregarImagensDaApi();

