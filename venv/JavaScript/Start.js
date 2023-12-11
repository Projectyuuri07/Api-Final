// Botão iniciar jogo
export function iniciarJogo() {
    document.addEventListener('DOMContentLoaded', function () {
        const iniciarJogoButton = document.getElementById('iniciar');
        const nomeInput = document.getElementById('NomeUsuario');

        iniciarJogoButton.addEventListener('click', function (event) {
            if (nomeInput.value.trim() === '') {
                alert('Por favor, insira seu nome antes de iniciar o jogo.');
                event.preventDefault();
            } else {
                location.href = 'game.html';
            }
        });
    });
}

export function voltarInicio() {
    document.addEventListener('DOMContentLoaded', function () {
        const voltarInicioButton = document.getElementById('voltarInicio');

        voltarInicioButton.addEventListener('click', function () {
            location.href = 'inicio.html';
        });
    });
}