async function buscarCartas() {
try {
    const response = await axios.get('http://192.168.0.105:5000/list');  // Altere a URL conforme necessário
    const cartas = response.data;

    // Embaralhar as cartas
    const cartasEmbaralhadas = cartas.sort(() => Math.random() - 0.5);

    // Preencher o contêiner com as cartas
    const cartaContainer = document.getElementById('cartaContainer');
    cartasEmbaralhadas.forEach((carta, index) => {
    const divCarta = document.createElement('div');
    divCarta.className = 'card';

    // Adicionar a posição original como um atributo da div
    divCarta.setAttribute('data-posicao-original', carta.posicao);

    divCarta.innerHTML = `<div class="card_face card_face--front"><img class="verso" src="../img/verso.png" alt=""></div>
                            <div class="card_face card_face--back"><img src="${carta.imagem}" alt="Carta"></div>`;
    cartaContainer.appendChild(divCarta);
    });

} catch (error) {
    console.error('Erro ao buscar cartas:', error);
}
}

// Chame a função para buscar as cartas quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    buscarCartas();
});