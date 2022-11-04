let player;
function Player(classType, maxHealth, mana, strength, agility, speed) {
    this.classType = classType;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
    this.level = 1;
    this.exp = 0;
    this.gold = 0;

    this.nextLevelXp = PlayerMoves.nextLevel(this);
}

let PlayerMoves = {
    calcAttack: function () {
        // Who attacks first?
        let getPlayerSpeed = player.speed;
        let getEnemySpeed = enemy.speed;

        let isCrit = false;

        // Player attacks!
        let playerAttack = function () {
            let calcBaseDamae;
            if (player.mana > 0) {
                calcBaseDamae = player.strength * player.mana / 1000;
            } else {
                calcBaseDamae = player.strength * player.agility / 1000;
            }
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            let calcOutputDamage = calcBaseDamae + offsetDamage;

            // Critical hit 
            let criticalHitChance = Math.random();
            console.log("Crit chance " + criticalHitChance);
            if (criticalHitChance > 0.75) {
                console.log("crit");
                isCrit = true;
                calcOutputDamage = calcOutputDamage * 2;
            }

            // Number of hits
            let numberOfHits = Math.floor(Math.random() * Math.floor(player.agility / 10) / 2) + 1;
            let attackValues = [calcOutputDamage, numberOfHits];

            return attackValues;
        }

        let enemyAttack = function () {
            let calcBaseDamae;
            if (enemy.mana > 0) {
                calcBaseDamae = enemy.strength * enemy.mana / 1000;
            } else {
                calcBaseDamae = enemy.strength * enemy.agility / 1000;
            }
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            let calcOutputDamage = calcBaseDamae + offsetDamage;
            // Number of hits
            let numberOfHits = Math.floor(Math.random() * Math.floor(enemy.agility / 10) / 2) + 1;
            let attackValues = [calcOutputDamage, numberOfHits];
            return attackValues;
        }

        let playerWin = function () {
            console.log(player.nextLevelXp)
            getPlayerHealth.innerHTML = `Health: ${player.health}`;
            getEnemyHealth.innerHTML = `Health: 0`;
            let expGained = GameManager.randomizeExp();
            let goldGained = GameManager.randomizeGold();
            player.exp += expGained;
            player.gold += goldGained;
            gameText.innerHTML = `<p>You win! Gold found: ${goldGained}c. Exp gained: ${expGained}</p>`;
            getActions.innerHTML = `<a href=#" class="btn-prefight" onclick="GameManager.endFight()">Done</a>`;
            while (PlayerMoves.readyToLevelUp()) {
                PlayerMoves.playerLevelUp();
            }
        }

        let playerLose = function () {
            getPlayerHealth.innerHTML = `Health: 0`;
            getEnemyHealth.innerHTML = `Health: ${enemy.health}`;
            if (player.gold - 5 < 0) {
                player.gold = 0;
            } else {
                player.gold -= 5;
            }
            gameText.innerHTML = `<p>You Lost! Gold lost: -5c.</p>`
            getActions.innerHTML = `<a href=#" class="btn-prefight" onclick="GameManager.endFight()">Done</a>`;
        }



        // Get player and enemy health to change later

        let getPlayerHealth = document.querySelector(".health-player");
        let getEnemyHealth = document.querySelector(".health-enemy");

        // Get Text
        let gameText = document.querySelector(".text")
        let getActions = document.querySelector('.actions');
        // Initiate attacks!

        let playerAttackValues;
        let enemyAttackValues;
        let totalDamage;

        let text = '<div>';

        if (getPlayerSpeed >= getEnemySpeed) {
            playerAttackValues = playerAttack();
            totalDamage = playerAttackValues[0] * playerAttackValues[1];
            enemy.health = enemy.health - totalDamage;
            if (isCrit) {
                text += `<p>You hit crit ${playerAttackValues[0]} damage ${playerAttackValues[1]} times</p>`
                isCrit = false;
            } else {
                text += `<p>You hit ${playerAttackValues[0]} damage ${playerAttackValues[1]} times</p>`
            }
            if (enemy.health <= 0) {
                return playerWin()
            } else {
                getPlayerHealth.innerHTML = `Health: ${player.health}`;
                getEnemyHealth.innerHTML = `Health: ${enemy.health}`;
            }
            // Enemy Attacks
            enemyAttackValues = enemyAttack()
            totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
            enemy.health = enemy.health - totalDamage;
            text += `<p>Enemy hit ${enemyAttackValues[0]} damage ${enemyAttackValues[1]} times</p>`

            if (player.health <= 0) {
                return playerLose()
            } else {
                getPlayerHealth.innerHTML = `Health: ${player.health}`;
            }
        } else if (getEnemySpeed > getPlayerSpeed) {
            enemyAttackValues = enemyAttack();
            totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
            player.health = player.health - totalDamage;
            text += `<p>Enemy hit ${enemyAttackValues[0]} damage ${enemyAttackValues[1]} times</p>`
            if (player.health <= 0) {
                return playerLose()
            } else {
                getPlayerHealth.innerHTML = `Health: ${player.health}`;
                getEnemyHealth.innerHTML = `Health: ${enemy.health}`;
            }
            // Player Attacks
            playerAttackValues = playerAttack()
            totalDamage = playerAttackValues[0] * playerAttackValues[1];
            enemy.health = enemy.health - totalDamage;
            if (isCrit) {
                text += `<p>You hit crit ${playerAttackValues[0]} damage ${playerAttackValues[1]} times</p>`
                isCrit = false;
            } else {
                text += `<p>You hit ${playerAttackValues[0]} damage ${playerAttackValues[1]} times</p>`
            }
            if (enemy.health <= 0) {
                return playerWin()
            } else {
                getEnemyHealth.innerHTML = `Health: ${enemy.health}`;
            }
            text += `</div>`;
            gameText.innerHTML = text;
        }
    },
    playerRest: function () {
        if (player.gold >= 5) {
            if (player.health < player.maxHealth) {
                alert("Player rested and is now full health");
                player.health = player.maxHealth;
                player.gold = player.gold - 5;
                GameManager.setPlayerProfile();
            }
            else if (player.health == player.maxHealth) {
                alert("You are already full health!");
            }
        }
        else {
            alert("You do not have sufficient gold!")
        }
    },
    playerFlee: function () {
        GameManager.endFight()
    },
    nextLevel: function (player) {
        return Math.floor(0.05 * (player.level ^ 3) + 0.8 * (player.level ^ 2) + 2 * player.level)
    },
    readyToLevelUp: function () {
        return player.exp >= player.nextLevelXp;
    },
    playerLevelUp: function () {
        player.nextLevelXp = this.nextLevel(player);
        player.level += 1;
        player.maxHealth += 5;
        player.health += 5;
        player.strength += 1;
        player.agility += 1;
        player.speed += 1;
    }


}
