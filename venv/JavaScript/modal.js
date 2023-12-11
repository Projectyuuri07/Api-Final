export function configurarModal() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "flex";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


export function jogarNovamente() {
    const jogarNovamenteButton = document.getElementById('jogarNovamente');

    jogarNovamenteButton.addEventListener('click', function () {
        location.href = 'game.html';
    });
}

export function sairJogo() {
    const sairJogoButton = document.getElementById('sairJogo');

    sairJogoButton.addEventListener('click', function () {
        location.href = 'inicio.html';
    });
}
