from flask import Flask, jsonify, request
from flask_cors import CORS
import random

matriz = {}
cartas_viradas = set()

########### MATRIZ 4x3 ###########

matriz = {(0,0): '/img/cell.png', (0,1): '/img/android18.png', (0,2): '/img/frizza.png', (0,3): '/img/gohan.png',
            (1,0): '/img/goku.png',     (1,1): '/img/kuririn.png', (1,2): '/img/cell.png',         (1,3): '/img/android18.png',
            (2,0): '/img/frizza.png',   (2,1): '/img/gohan.png',   (2,2): '/img/goku.png',         (2,3): '/img/kuririn.png',
            (3,0): '/img/videl.jpg',    (3,1): '/img/trunks.jpg',  (3,2): '/img/majinboo.jpg',    (3,3): '/img/videl.jpg',
            (4,0): '/img/trunks.jpg',   (4,1): '/img/majinboo.jpg'}

################################

app = Flask(__name__)
CORS(app)

@app.route("/list", methods=['GET'])
def listarCartas():
    posicoes = list(matriz.keys())
    random.shuffle(posicoes)
    
    cartas = [{'id': id, 'posicao': pos, 'imagem': matriz[pos]} for id, pos in enumerate(posicoes, start=1)]
    return jsonify(cartas)

@app.route("/add/<int:posicao>", methods=['PUT'])
def adicionarJogador(posicao):
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
