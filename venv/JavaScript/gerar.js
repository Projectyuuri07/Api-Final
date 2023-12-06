export async function carregarImagensDaApi() {
  try {
    const response = await fetch('http://192.168.18.81:5000/list');
    const cartas = await response.json();

    const cartasElement = document.querySelectorAll('.card__face--back');

    cartasElement.forEach((faceBack, index) => {
      const imagem = document.createElement('img');
      imagem.src = cartas[index].imagem;
      imagem.alt = 'Imagem da carta';

      faceBack.innerHTML = '';
      faceBack.appendChild(imagem);
    });
  } catch (error) {
    console.error('Erro ao carregar imagens da API:', error);
  }
}

window.onload = carregarImagensDaApi;
