export function jogoIniciado() {
    document.addEventListener('DOMContentLoaded', function () {
        const nomeUsuario = localStorage.getItem('nomeUsuario');
        const tempo = document.querySelector('.timer');
        const musicaBatalha = document.getElementById('backgroundMusic');
        const musicaVitoria = new Audio('../musicas/musicafinal.mp3');
        let temporizadorInterval;
        let recordeTempo;

        function iniciarTemporizador() {
            if (tempo) {
                let segundos = 0;

                temporizadorInterval = setInterval(() => {
                    let contagemMinutos = Math.floor((segundos % 3600) / 60);
                    let contagemSegundos = segundos % 60;

                    contagemMinutos = contagemMinutos < 10 ? '0' + contagemMinutos : contagemMinutos;
                    contagemSegundos = contagemSegundos < 10 ? '0' + contagemSegundos : contagemSegundos;

                    tempo.textContent = `${contagemMinutos}:${contagemSegundos}`;
                    segundos++;
                }, 1000);
            } else {
                console.error('Elemento com a classe "timer" não encontrado no DOM.');
            }
        }

        const cards = document.querySelectorAll('.card');
        let cartasAPI = [];
        let cartasViradas = [];
        let cartasReveladas = 0;

        fetch('http://192.168.0.105:5000/list')
            .then(response => response.json())
            .then(data => {
                cartasAPI = data;
                iniciarTemporizador();

                cards.forEach(card => {
                    card.addEventListener('click', function () {
                        const cardId = card.getAttribute('data-id');
                        const carta = cartasAPI.find(c => c.id == cardId);

                        if (!carta.revelada && cartasViradas.length < 2) {
                            card.setAttribute('src', carta.imagem);
                            card.classList.add('flipped');
                            carta.revelada = true;
                            cartasViradas.push(carta);

                            if (cartasViradas.length === 2) {
                                setTimeout(() => {
                                    if (cartasViradas[0].imagem !== cartasViradas[1].imagem) {
                                        cartasViradas.forEach(c => {
                                            const cartaElement = document.querySelector(`[data-id="${c.id}"]`);
                                            cartaElement.classList.remove('flipped');
                                            cartaElement.setAttribute('src', '../img/verso.png');
                                            c.revelada = false;
                                        });
                                    } else {
                                        cartasViradas.forEach(c => {
                                            const cartaElement = document.querySelector(`[data-id="${c.id}"]`);
                                            cartaElement.classList.add('hidden');
                                        });

                                        cartasReveladas += 2;

                                        if (cartasReveladas === 18) {
                                            alert("Parabéns! Você descobriu todas as cartas!");
                                            clearInterval(temporizadorInterval);
                                            recordeTempo = tempo.textContent;

                                            musicaBatalha.pause();
                                            musicaVitoria.play();

                                            registrarJogador(nomeUsuario, recordeTempo);

                                            const modal = document.getElementById('myModal');
                                            modal.style.display = 'flex';

                                        }
                                    }

                                    cartasViradas = [];
                                }, 1000);
                            }
                        }
                    });
                });
            })
            .catch(error => console.error('Erro ao carregar dados da API:', error));
    });
}

export function registrarJogador(nomeUsuario, recordeTempo) {
    if (nomeUsuario) {
        const novoJogador = {
            "Jogador": nomeUsuario,
            "Tempo": recordeTempo
        };

        // Salve o tempo convertido para segundos
        novoJogador.Tempo = parseInt(recordeTempo.split(":")[0]) * 60 + parseInt(recordeTempo.split(":")[1]);

        SalvarCSV(novoJogador);
    } else {
        console.error('Elemento com ID "NomeUsuario" não encontrado.');
    }

    function SalvarCSV(novoJogador) {
        axios.post('http://192.168.0.105:5000/add', novoJogador)
            .then(response => {
                console.log(response.data);

            })
            .catch(error => {
                console.error('Erro na requisição POST', error);
            });
    }
}

const tabela = document.querySelector('.table-content')

/* REQUISIÇÃO GET */
axios.get('http://192.168.0.105:5000/ranking').then((response) => {
    getData(response.data)
}).catch((error) => {
    console.log('Erro na requisição GET', error)
});

function getData(data){
    data.map((item) => {
        tabela.innerHTML += `
            <tr class="conteudo">
                <th class="text-center align-middle infoplayer">${item.JOGADOR}</th>
                <td class="text-center align-middle infoplayer">${item.TEMPO}</td>
            </tr>
        `
    })

}