from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random

matriz = {}
cartas_viradas = []

########### MATRIZ 3X4 ###########

matriz = {(0, 0): '/img/cell.png', (0, 1): '/img/android18.png', (0, 2): '/img/frizza.png',
          (1, 0): '/img/gohan.png', (1, 1): '/img/goku.png', (1, 2): '/img/kuririn.png',
          (2, 0): '/img/cell.png', (2, 1): '/img/android18.png', (2, 2): '/img/frizza.png',
          (3, 0): '/img/gohan.png', (3, 1): '/img/goku.png', (3, 2): '/img/kuririn.png'}

##################################

app = Flask(__name__)
CORS(app)

@app.route("/list", methods=['GET'])
def listarCartas():
    #pegar as posicoes da matriz e coloca-los numa lista
    posicoes = list(matriz.keys())

    # vai embaralhar as cartas
    random.shuffle(posicoes)
    
    # retornando um JSON
    cartas = [{'id': id, 'posicao': pos, 'imagem': matriz[pos]} for id, pos in enumerate(posicoes, start=1)]
    return jsonify(cartas)

# @app.route("/add", methods=['PUT'])
# def loginJogador():
#     pass

# @app.route("/delete/<int:id>/<int:id>", methods=['DELETE'])
# def deletarCartas():
#     pass

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)