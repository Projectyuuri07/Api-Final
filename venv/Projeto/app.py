from flask import Flask, jsonify, request
from flask_cors import CORS
import random

matriz = {}
cartas_viradas = set()

########### MATRIZ 4x3 ###########

matriz = {
    (0, 0): '../img/androide17.png', (0, 1): '../img/androide17.png', (0, 2): '../img/berrus.png', (0, 3): '../img/berrus.png',
    (1, 0): '../img/cell.png', (1, 1): '../img/cell.png', (1, 2): '../img/frezza.png', (1, 3): '../img/frezza.png',
    (2, 0): '../img/goku.png', (2, 1): '../img/goku.png', (2, 2): '../img/gohan.png', (2, 3): '../img/gohan.png',
    (3, 0): '../img/majinBoo.png', (3, 1): '../img/majinBoo.png', (3, 2): '../img/picollo.png', (3, 3): '../img/picollo.png',
    (4, 0): '../img/vegeta.jpg', (4, 1): '../img/vegeta.jpg', (4, 2): '../img/trunks.png', (4, 3): '../img/trunks.png',
}

################################

app = Flask(__name__)
CORS(app)

@app.route("/list", methods=['GET'])
def listarCartas():
    posicoes = list(matriz.keys())
    random.shuffle(posicoes)
    
    cartas = [{'id': id, 'posicao': pos, 'imagem': matriz[pos]} for id, pos in enumerate(posicoes, start=1)]
    return jsonify(cartas)

@app.route("/add", methods=['POST'])
def adicionarJogador():
    pass



@app.route("/delete/<int:posicao>", methods=['DELETE'])
def deletarCartas(posicao):
    if posicao in cartas_viradas:
        cartas_viradas.remove(posicao)
        return jsonify({"message": "Carta removida com sucesso!"})
    else:
        return jsonify({"message": "Carta não encontrada!"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
