from flask import Flask, jsonify, request
from flask_cors import CORS
import random

matriz = {}
cartas_viradas = set()

########### MATRIZ 4x3 ###########

matriz = {
    (0, 0): '../img/androide17.jpg', (0, 1): '../img/androide17.jpg', (0, 2): '../img/berrus.png', (0, 3): '../img/berrus.png',
    (1, 0): '../img/frezza.jpg', (1, 1): '../img/frezza.jpg', (1, 2): '../img/gohan.png', (1, 3): '../img/gohan.png',
    (2, 0): '../img/goku.jpg', (2, 1): '../img/goku.jpg', (2, 2): '../img/majinBoo.jpg', (2, 3): '../img/majinBoo.jpg',
    (3, 0): '../img/picollo.jpg', (3, 1): '../img/picollo.jpg', (3, 2): '../img/vegeta.jpg', (3, 3): '../img/vegeta.jpg',
    (4,0): '../img/cell.jpg', (4,1): '../img/cell.jpg'
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



@app.route("/delete/<int:index>", methods=['DELETE'])
def deletarCartas(index):
    if index in cartas_viradas:
        cartas_viradas.remove(index)
        return jsonify({"message": "Carta removida com sucesso!"})
    else:
        return jsonify({"message": "Carta não encontrada!"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
