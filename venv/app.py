from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

########### MATRIZ 3X4 ###########

matriz = {}
matriz[(0,0)] = 0
matriz[(0,1)] = 0
matriz[(0,2)] = 0
matriz[(1,0)] = 0
matriz[(1,1)] = 0
matriz[(1,2)] = 0
matriz[(2,0)] = 0
matriz[(2,1)] = 0
matriz[(2,2)] = 0
matriz[(3,0)] = 0
matriz[(3,1)] = 0
matriz[(3,2)] = 0

print(matriz[(0,0)],
matriz[(0,1)],
matriz[(0,2)])

print(matriz[(1,0)],
matriz[(1,1)],
matriz[(1,2)])

print(matriz[(2,0)],
matriz[(2,1)],
matriz[(2,2)])

print(matriz[(3,0)],
matriz[(3,1)],
matriz[(3,2)])

##################################

app = Flask(__name__)
CORS(app)

#não faço ideia de como fazer pra listar IMAGENS com JSON
@app.route("/list", methods=['GET'])
def listarTarefas():    
    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records')    
    return jsonify(tarefas)