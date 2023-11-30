const URLApi = 'http://192.168.0.105:5000'


// REQUISIÇÃO GET //
function exibirCartas(cartas) {
    var cartasContainer = document.getElementById('container-cartas');

    cartas.forEach(function (carta) {
        var cartaElemento = document.createElement('img');
        cartaElemento.src = carta.imagem;
        cartaElemento.id = 'Carta ' + carta.id;
        cartaElemento.className = 'carta';
        cartaElemento.style.left = carta.posicao[0] * 120 + 'px';
        cartaElemento.style.top = carta.posicao[1] * 160 + 'px';
        cartasContainer.appendChild(cartaElemento);
        //cartasContainer é o elemento pai, e o filho do elemento é o nó a ser adicionado (cartaElemento).
    });
}

//utilizando a biblioteca axios
axios.get(URLApi + '/list')
    .then((response) => {
        var respostaJSON = response.data;
        exibirCartas(respostaJSON);
    })
    .catch((error) => {
        console.log('Erro na requisição GET', error);
    });

