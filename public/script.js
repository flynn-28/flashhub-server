document.addEventListener("DOMContentLoaded", () => {
    const gameList = document.getElementById("games");
    const gamePlayer = document.getElementById("player");
    const gameTitle = document.getElementById("title");
    const fullscreenBtn = document.getElementById("fullscreenToggle");
    const uploadButton = document.getElementById("uploadButton");
    const fileInput = document.getElementById("fileInput");
    const ruffle = window.RufflePlayer.newest();

    fetch('/public/games.json')
        .then(response => response.json())
        .then(games => {
            games.forEach(game => {
                const gameItem = document.createElement("button");
                gameItem.textContent = game.name;
                gameItem.onclick = () => playGame(game.name, game.path);
                gameList.appendChild(gameItem);
            });
        });

    function playGame(name, path) {
        gameTitle.textContent = name;
        gamePlayer.innerHTML = '';  
        const rufflePlayer = ruffle.createPlayer();  
        gamePlayer.appendChild(rufflePlayer);
        rufflePlayer.load(path); 

        stylePlayer(rufflePlayer);
    }

    uploadButton.addEventListener("click", () => {
        fileInput.click();  
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/x-shockwave-flash') {
            const objectURL = URL.createObjectURL(file);
            gameTitle.textContent = "Uploaded Content"; 

            gamePlayer.innerHTML = '';  

            const rufflePlayer = ruffle.createPlayer();  
            gamePlayer.appendChild(rufflePlayer);  
            rufflePlayer.load(objectURL);  

            stylePlayer(rufflePlayer);
        } else {
            alert("upload swf file");
        }
    });

    fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            gamePlayer.requestFullscreen().catch(err => {
                alert(`fullscreen error: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    function stylePlayer(rufflePlayer) {
        rufflePlayer.style.width = '100%';
        rufflePlayer.style.height = '100%';
        rufflePlayer.style.borderRadius = '8px';
        rufflePlayer.style.border = '2px solid #ddd';
        rufflePlayer.style.backgroundColor = '#eee';
    }
});
