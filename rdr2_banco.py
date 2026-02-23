import json
import os

ARQUIVO = 'rdr2-personagens.json'

def carregar_dados():
    if os.path.exists(ARQUIVO):
        with open(ARQUIVO, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"gangue": {"van_der_linde": []}}

def salvar_dados(dados):
    with open(ARQUIVO, 'w', encoding='utf-8') as f:
        json.dump(dados, f, indent=4, ensure_ascii=False)

dados = carregar_dados()

# Create: adicionar Lenny
dados["gangue"]["van_der_linde"].append({
    "id": 11,
    "nome": "Lenny",
    "idade": 25,
    "sexo": "masculino",
    "personalidade": "calmo, leal, habilidoso",
    "historia": "Lenny é um membro da gangue Van der Linde que é conhecido por sua calma e habilidades de caça e sobrevivência. Ele é leal à gangue e muitas vezes atua como um caçador e rastreador.",
    "habilidades": ["caça", "rastreamento", "resistência física", "sobrevivência", "combate corpo a corpo"],
    "fraquezas": ["dificuldade em lidar com conflitos violentos", "tendência a ser reservado", "dificuldade em confiar nos outros"]
})
salvar_dados(dados)

# Read: listar membros da gangue
for p in dados["gangue"]["van_der_linde"]:
    print(f"ID: {p['id']}, Nome: {p['nome']}, Idade: {p['idade']}, Sexo: {p['sexo']}")

# Update: adicionar tuberculose à fraqueza de Arthur
for p in dados["gangue"]["van_der_linde"]:
    if p['nome'] == 'Arthur':
        p['fraquezas'].append('tuberculose')
salvar_dados(dados)

# Delete: remover membro da gangue
dados["gangue"]["van_der_linde"] = [p for p in dados["gangue"]["van_der_linde"] if p['nome'] != 'Sadie Adler']
salvar_dados(dados)