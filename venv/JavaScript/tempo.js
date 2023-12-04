//Temporizador
export function iniciarTemporizador() {
    const tempo = document.querySelector('.timer');
    let segundos = 0;
  
    function temporizador() {
      // Calcula os minutos e segundos
      let contagemMinutos = Math.floor((segundos % 3600) / 60);
      let contagemSegundos = segundos % 60;
      
      // Adiciona um zero à esquerda se for necessário
      contagemMinutos = contagemMinutos < 10 ? '0' + contagemMinutos : contagemMinutos;
      contagemSegundos = contagemSegundos < 10 ? '0' + contagemSegundos : contagemSegundos;
      
      // Atualiza o conteúdo do elemento de temporizador
      tempo.textContent = `${contagemMinutos}:${contagemSegundos}`;
      
      // Incrementa o contador de segundos
      segundos++;
    }
  
    setInterval(temporizador, 900);
  }