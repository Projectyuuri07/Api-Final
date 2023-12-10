from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random
import csv

matriz = {}
cartas_acertas = set()

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

try:
    open('Text.csv', 'x')
    with open("Text.csv", "w") as arquivo:
        arquivo.write("JOGADOR,TEMPO\n") 
except:
    pass

@app.route("/ranking", methods=['GET'])
def ranking():
    with open("Text.csv", "r") as arquivo:
        ranking = []
        for linha in arquivo:
            ranking.append(linha.split(','))
    return jsonify(ranking)

@app.route("/ranking", methods=['POST'])
def add_ranking():
    with open("Text.csv", "a") as arquivo:
        arquivo.write(request.json['jogador'] + ',' + request.json['tempo'] + '\n')
    return jsonify({'message': 'Ranking atualizado com sucesso'}), 200


@app.route("/list", methods=['GET'])
def listarCartas():
    posicoes = list(matriz.keys())
    random.shuffle(posicoes)
    
    cartas = [{'id': id, 'posicao': pos, 'imagem': matriz[pos]} for id, pos in enumerate(posicoes, start=1)]
    return jsonify(cartas)

@app.route("/add", methods=['POST'])
def adicionarJogador():
    pass


@app.route("/acertar/<int:carta1_id>/<int:carta2_id>", methods=['DELETE'])
def acertarCarta(carta1_id, carta2_id):
    print(f"Received DELETE request for card ID: {carta1_id} e {carta2_id}")

    if carta1_id and carta2_id in matriz.items():
        cartas_acertas.add(carta1_id, carta2_id)
        
        if len(cartas_acertas) == 2:
            for carta in cartas_acertas:
                del matriz[carta]
            
            cartas_acertas.clear()
        
        return jsonify({'message': f'Carta {carta1_id} e {carta2_id} acertadas e excluídas'}), 200
    else:
        return jsonify({'error': f'Carta {carta1_id} e {carta2_id} não encontradas'}), 404



if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
