const containerCartas = document.querySelector('.container-cartas')
const URLApi = 'http://192.168.0.105:5000'

/* REQUISIÇÃO GET */

function exibirCartas(cartas) {
    var cartasContainer = document.getElementById('cartas-container');

    cartas.forEach(function (carta) {
        var cartaElemento = document.createElement('div');
        cartaElemento.innerHTML = '<p>ID: ' + carta.id + '</p><img src="' + carta.imagem + '" alt="Carta ' + carta.id + '">';
        cartasContainer.appendChild(cartaElemento);
    });
}

axios.get(URLApi + '/list')
    .then((response) => {
        var respostaJSON = response.data;
        exibirCartas(respostaJSON);
    })
    .catch((error) => {
        console.log('Erro na requisição GET', error);
    });