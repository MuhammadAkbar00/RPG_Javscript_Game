let GameManager = {
    getUser: function () {
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        user = loggedInUser;
        if (user && Object.keys(user).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
            location.href = '/login.html'
        }
    },
    playerSet: function () {
        player = user.player;
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = `<img src="../static/image/avatars/${player.classType.toLowerCase()}.jpeg" 
        class="img_avatar"><div><h3>${player.classType} <span class="player-level">Level ${player.level}</span></h3>
        <p class="health-player">Health: ${player.health}</p>
        <p>Mana: ${player.mana}</p>
        <p>Strength: ${player.strength}</p>
        <p>Agility: ${player.agility}</p>
        <p>Speed: ${player.speed}</p>
        <p>Experience: ${player.exp}</p>
        <p>Gold: ${player.gold}c</p>
        </div>
        `
    },
    save: function () {
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        console.log(player)
        accounts.map((account) => {
            if (account.username === user.username) {
                account.player = player;
                localStorage.setItem("loggedInUser", JSON.stringify(account))
            }
        })
        localStorage.setItem("accounts", JSON.stringify(accounts))
        this.getUser();
        alert("Player Saved")
    },
    characterSelect: function () {
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = `
        <a href="#" onclick="GameManager.setGameStart('Hasbulla')">
        <img src="static/image/avatars/hasbulla.jpeg" alt="hasbulla">
        <div>
            <h3>Hasbulla</h3>
            <p>Hasbulla is too op</p>
        </div>
    </a>
    <a href="#" onclick="GameManager.setGameStart('Zeid')">
        <img src="static/image/avatars/zeid.jpeg" alt="zeid">
        <div>
            <h3>Zeid</h3>
            <p>Zeid is too op</p>
        </div>
    </a>
    <a href="#" onclick="GameManager.setGameStart('Abdul')">
        <img src="static/image/avatars/abdul.jpeg" alt="abdul">
        <div>
            <h3>Abdul</h3>
            <p>Abdul is too op</p>
        </div>
    </a>
    <a href="#" onclick="GameManager.setGameStart('Husussy')">
        <img src="static/image/avatars/husussy.jpeg" alt="husussy">
        <div>
            <h3>Husussy</h3>
            <p>Husussy is too op</p>
        </div>
    </a>`;
    },
    setGameStart: function (classType) {
        this.getUser();
        if (user.player) {
            this.playerSet();
        } else {
            this.resetPlayer(classType);
        }
        this.setPreFight();
    },
    resetPlayer: function (classType) {
        switch (classType) {
            case "Hasbulla":
                player = new Player(classType, 200, 0, 200, 100, 50);
                break;
            case "Zeid":
                player = new Player(classType, 200, 50, 200, 100, 50);
                break;
            case "Abdul":
                player = new Player(classType, 150, 0, 200, 100, 30);
                break;
            case "Husussy":
                player = new Player(classType, 200, 0, 200, 100, 50);
                break;
        }
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = `<img src="../static/image/avatars/${classType.toLowerCase()}.jpeg" 
        class="img_avatar"><div><h3>${classType} <span class="player-level">Level ${player.level}</span></h3>
        <p class="health-player">Health: ${player.health}</p>
        <p>Mana: ${player.mana}</p>
        <p>Strength: ${player.strength}</p>
        <p>Agility: ${player.agility}</p>
        <p>Speed: ${player.speed}</p>
        <p>Experience: ${player.exp}</p>
        <p>Gold: ${player.gold}c</p>
        </div>
        `
    },
    setPlayerProfile: function () {
        let getText = document.querySelector('.text');
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = `<img src="../static/image/avatars/${player.classType.toLowerCase()}.jpeg" 
        class="img_avatar"><div><h3>${player.classType} <span class="player-level">Level ${player.level}</span></h3>
        <p class="health-player">Health: ${player.health}</p>
        <p>Mana: ${player.mana}</p>
        <p>Strength: ${player.strength}</p>
        <p>Agility: ${player.agility}</p>
        <p>Speed: ${player.speed}</p>
        <p>Experience: ${player.exp}</p>
        <p>Gold: ${player.gold}c</p>
        </div>
        `
        getText.innerHTML = ``;
        getText.style.visibility = 'hidden';
        this.setPreFight();
    },
    setPreFight: function () {
        let getHeader = document.querySelector('.header');
        let getActions = document.querySelector('.actions');
        let getArena = document.querySelector('.arena');
        getHeader.innerHTML = `<p>Task: Find an enemy!</p>`;
        getActions.innerHTML = `
        <a href=#" class="btn-prefight" onclick="GameManager.setFight()">Search for enemy!</a>
        <a href=#" class="btn-prefight" onclick="PlayerMoves.playerRest()">Rest!</a>
        <a href=#" class="btn-prefight" onclick="GameManager.save()">Save!</a>
        <a href=#" class="btn-prefight" onclick="AccountManager.logout()">Logout!</a>
        `;
        getArena.style.visibility = "visible";
    },
    setFight: async function () {
        let getText = document.querySelector('.text');
        let getHeader = document.querySelector('.header');
        let getActions = document.querySelector('.actions');
        let getEnemy = document.querySelector('.enemy');

        // Text
        getText.style.visibility = "visible";
        getText.innerHTML = `<p>Searching for enemy...</p>`;

        await new Promise(r => setTimeout(r, 1000));
        getText.innerHTML = `<p>Enemy Found...</p>`;

        // Create enemy!

        let enemy00 = new Enemy("Zeid", 100, 0, 50, 100, 100);
        let enemy01 = new Enemy("Balde", 100, 0, 50, 100, 100);
        let enemy02 = new Enemy("Abood", 100, 0, 50, 100, 100);
        let enemy03 = new Enemy("Husussy", 100, 0, 50, 100, 100);
        let enemy04 = new Enemy("Abdul", 100, 0, 50, 100, 100);
        let enemy05 = new Enemy("Yanni", 100, 0, 50, 100, 100);
        let enemyList = [enemy00, enemy01, enemy02, enemy03, enemy04, enemy05];
        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(5));
        enemy = enemyList[chooseRandomEnemy];
        getHeader.innerHTML = `<p>Task: Choose your move!</p>`
        getActions.innerHTML = `
        <a href=#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Attack</a>
        <a href=#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Defend</a>
        <a href=#" class="btn-prefight" onclick="PlayerMoves.playerFlee()">Flee</a>`;
        getEnemy.innerHTML = `<img src="../static/image/avatars/${enemy.enemyType.toLowerCase()}.jpeg" 
        class="img_avatar"><div><h3>${enemy.enemyType}</h3>
        <p class="health-enemy">Health: ${enemy.health}</p>
        <p>Mana: ${enemy.mana}</p>
        <p>Strength: ${enemy.strength}</p>
        <p>Agility: ${enemy.agility}</p>
        <p>Speed: ${enemy.speed}</p></div>
        `;
    },
    endFight: function () {
        let getHeader = document.querySelector('.header');
        let getActions = document.querySelector('.actions');
        let getArena = document.querySelector('.arena');
        let getEnemy = document.querySelector('.enemy');
        enemy = null;
        getEnemy.innerHTML = '';
        this.setPlayerProfile()
    },
    randomizeExp: function () {
        let experienceGained = Math.floor(Math.random() * Math.floor(10))
        return experienceGained;
    },
    randomizeGold: function () {
        let goldGained = Math.floor(Math.random() * Math.floor(10))
        return goldGained;
    }
}
