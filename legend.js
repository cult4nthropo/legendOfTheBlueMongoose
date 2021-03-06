var you;

var enemies = [
	{ enemyType: "Giant Rat", level: 1, healthpoints: 20, armor: "None", weapon: "Bites", lootLevel: 1 },
	{ enemyType: "Wolf", level: 2, healthpoints: 25, armor: "None", weapon: "Bites", lootLevel: 1 },
	{ enemyType: "Bandit", level: 2, healthpoints: 45, armor: "Clothes", weapon: "Dagger", lootLevel: 2 },
	{ enemyType: "Giant Spider", level: 3, healthpoints: 50, armor: "None", weapon: "Bites", lootLevel: 2 },
	{ enemyType: "Lake Constance Mosquito", level: 4, healthpoints: 50, armor: "None", weapon: "Bites", lootLevel: 1 },
	{ enemyType: "Goblin", level: 3, healthpoints: 25, armor: "None", weapon: "Arrow", lootLevel: 2 },
	{ enemyType: "Black Knight", level: 4, healthpoints: 50, armor: "Steel Armor", weapon: "Long Sword", lootLevel: 4 },
	{ enemyType: "Tree Monster", level: 4, healthpoints: 75, armor: "None", weapon: "Roots", lootLevel: 4 },
	{ enemyType: "Genie", level: 5, healthpoints: 80, armor: "None", weapon: "Spell", lootLevel: 5 },
	{ enemyType: "Mongoose Magician", level: 5, healthpoints: 80, armor: "Mage Robe", weapon: "Spell", lootLevel: 5 },
	{ enemyType: "Blue Mongoose Knight", level: 6, healthpoints: 90, armor: "Enchanted Leather Armor", weapon: "Poisoned Sword", lootLevel: 6 },
	{ enemyType: "Saber Tooth Tiger", level: 6, healthpoints: 110, armor: "None", weapon: "Saber Tooth", lootLevel: 6 },
	{ enemyType: "The Blue Mongoose", level: 7, healthpoints: 150, armor: "Chitinous Shell", weapon: "Poison Ray", lootLevel: 7 }
];

var weapons = [
	{ weaponType: "Bites", damage: [1, 5], weaponLevel: 0, cost: 0 },
	{ weaponType: "Poison Ray", damage: [7, 20], weaponLevel: 0, cost: 0 },
	{ weaponType: "Fists", damage: [1, 5], weaponLevel: 0, cost: 0 },
	{ weaponType: "Dagger", damage: [3, 7], weaponLevel: 2, cost: 25 },
	{ weaponType: "Short Sword", damage: [5, 10], weaponLevel: 3, cost: 75 },
	{ weaponType: "Long Sword", damage: [7, 12], weaponLevel: 4, cost: 125 },
	{ weaponType: "Arrow", damage: [3, 7], weaponLevel: 3, cost: 15 },
	{ weaponType: "Roots", damage: [5, 8], weaponLevel: 0, cost: 0 },
	{ weaponType: "Spell", damage: [7, 9], weaponLevel: 0, cost: 100 },
	{ weaponType: "Poisoned Sword", damage: [11, 15], weaponLevel: 6, cost: 150 },
	{ weaponType: "Saber Tooth", damage: [11, 15], weaponLevel: 0, cost: 0 }
];

var armor = [
	{ armorType: "None", protection: 0, cost: 0 },
	{ armorType: "Chitinous Shell", protection: 10, cost: 0 },
	{ armorType: "Clothes", protection: 1, cost: 0 },
	{ armorType: "Leather Armor", protection: 2, cost: 50 },
	{ armorType: "Studded Leather Armor", protection: 4, cost: 200 },
	{ armorType: "Steel Armor", protection: 7, cost: 400 },
	{ armorType: "Enchanted Leather Armor", protection: 15, cost: 500 },
	{ armorType: "Mage Robe", protection: 15, cost: 400 }
]

function Hero() {
	var name = "Hero";
	var level = 1;
	var healthpoints = 100;
	var xp = 0;
	var coins = 0;
	var armorType = "Leather Armor";
	var weaponType = "Fists";

	//hero: getters and setters
	return {

		toString: function () {
			//iterates through the public proberties of Hero, which will be only the methods
			var str = "{";
			for (var property in this) {
				//takes all the getters
				if (property.indexOf("get") == 0) {
					var value = this[property]()
					if (typeof value === "string") {
						str += "\"" + property.substring(3) + "\"" + ": \"" + (this[property]()) + "\", ";
					} else {
						str += "\"" + property.substring(3) + "\"" + ": " + (this[property]()) + ", ";
					}
				}
			}
			str = str.substring(0, str.length - 2) + "}";

			return str;
		},
		getName: function () {
			return name;
		},
		setName: function (val) {
			if (typeof val !== "string")
				return;
			name = val;
		},
		getLevel: function () {
			return level;
		},
		setLevel: function (val) {
			if (typeof val !== "number")
				return;
			level = val;
		},
		getHealthpoints: function () {
			return healthpoints;
		},
		setHealthpoints: function (val) {
			if (typeof val !== "number")
				return;
			healthpoints = val;
		},
		getXp: function () {
			return xp;
		},
		setXp: function (val) {
			if (typeof val !== "number")
				return
			xp = val;
		},
		getCoins: function () {
			return coins;
		},
		setCoins: function (val) {
			if (typeof val !== "number")
				return;
			coins = val;
		},
		getArmorType: function () {
			return armorType;
		},
		setArmorType: function (val) {
			if (typeof val !== "string")
				return;
			armorType = val;
		},
		getWeaponType: function () {
			return weaponType;
		},
		setWeaponType: function (val) {
			if (typeof val !== "string")
				return;
			weaponType = val;
		}
	};
}

/**
 * initializes the game when the html file loads
 * gets the hero stats from local storage
 * updates status bar
 */
function init() {
	//hits the hero constructor at the very beginning
	you = new Hero();
	var hero = localStorage.getItem("Hero", you);

	if (hero) {
		var heroObj = JSON.parse(hero);

		for (var property in heroObj) {
			var str = "";
			var value = heroObj[property];
			if (typeof value === "string") {
				str += "you.set" + property + "(\"" + value + "\")";
			} else {
				str += "you.set" + property + "(" + value + ")";
			}
			eval(str);
		}
	}
	updateStatusbar();
}

/**
 * writes the current hero stats in the status bar
 */
function updateStatusbar() {
	var status = document.getElementById("status");
	status.innerHTML = "health: " + you.getHealthpoints() +
		" | XP: " + you.getXp() +
		" | lvl: " + you.getLevel() +
		" | coins: " + you.getCoins() +
		" | weapon: " + you.getWeaponType() +
		" | armor: " + you.getArmorType();
}

/**
 * sets the current level
 * @returns the level progress
 */
function checkForLevelUpProgress() {
	var levelUp = [0, 300, 600, 1200, 2400, 4800, 9600, 19200]
	var currentXp = you.getXp();
	for (var i = 0; i < levelUp.length; i++) {
		if (currentXp >= levelUp[i]) {
			var currentLevel = i + 1;
			you.setLevel(currentLevel);
			updateStatusbar();
			localStorage.setItem("Hero", you);
		}
	}
	var nextLevelProgress = (currentXp - levelUp[you.getLevel() - 1]) / (levelUp[you.getLevel()] - levelUp[you.getLevel() -1]);
	return nextLevelProgress;
}

/**
 * Choose an enemy that matches your current level
 * Therefore:
 * 1. get your level with level progress
 * Therefore: create an array or formula to define your level progress which will be defined by your XP
 * 	  If you are about 15% (the return value of checkForLevelUpProgress() has to be at least 0.85) 
 *    before hitting the next level the enemy could have your level + 1
 * 2. Create an enemy array with matching enemies
 * 3. Chose a random anemy from this array
 */
function findEnemyToFight() {
	var fightingLevel = you.getLevel();
	var levelProgress = checkForLevelUpProgress();
	var enemiesToFight = [];
	


	for (var i = 0; i < enemies.length; i++) {
		if (levelProgress <= 0.15) {
			if (enemies[i].level == (fightingLevel -1) || (enemies [i].level == fightingLevel)) {
				enemiesToFight.push(enemies[i]);
			}
		}else if (levelProgress >= 0.85) {
			if ((enemies[i].level == fightingLevel +1) || (enemies[i].level == fightingLevel)) {
				enemiesToFight.push(enemies[i]);
			}
		} else {
			if (enemies[i].level == fightingLevel) {
				enemiesToFight.push(enemies[i]);
			}
		}
		
	}
	function randomNumber(min, max) {
		var randomEnemy = Math.floor((Math.random() * max) + min);
		return randomEnemy;
	}

	var enemyToFight = enemiesToFight[randomNumber(0, (enemiesToFight.length))];
	return enemyToFight;
}

function startFighting() {

	var enemy = findEnemyToFight();
	document.getElementById("theEnemy").innerHTML = "You encountered a " + enemy.enemyType;
	//write the stats of the enemy beneeth the hero status bar
	var enemyHealth = enemy.healthpoints;
	document.getElementById("enemyStatus").innerHTML = "Enemy: " + enemy.enemyType +
		" | lvl: " + enemy.level +
		" | health: " + enemyHealth +
		" | armor: " + enemy.armor +
		" | weapon: " + enemy.weapon +
		" | loot level: " + enemy.lootLevel;

}


function attack(enemy) {
	
}
//Write a function for the attacking with an initiative who starts first
//Write a function for attacking which updates the stats of the enemy and the hero
//Write a runaway function with a possible failure, which gives the enemy the initiative of attacking again

function goToStore() {

}