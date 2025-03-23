from flask import Flask, jsonify
import os
import json

app = Flask(__name__, static_url_path='/public', static_folder='public')

dir = os.path.join(os.getcwd(), 'public', 'games')
output = os.path.join(os.getcwd(), 'public', 'games.json')

def update():
    games = []
    for filename in os.listdir(dir):
        if filename.endswith(".swf"):
            game = {
                "name": os.path.splitext(filename)[0],
                "path": f"/public/games/{filename}"
            }
            games.append(game)

    with open(output, "w") as file:
        json.dump(games, file, indent=4)

@app.route('/update', methods=['GET'])
def update_games():
    update() 
    return jsonify({"message": "update games list"}), 200

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
