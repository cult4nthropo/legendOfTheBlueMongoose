var you;

var enemies = [
	{name: "Giant Rat", level: 1, healthpoints: 20, armor: "none", weapon: "Bites", lootLevel: 1},
	{name: "Wolf", level: 2, healthpoints: 25, armor: "none",  weapon: "Bites", lootLevel: 1},
	{name: "Bandit", level: 2, healthpoints: 45, armor: "Clothes", weapon: "Dagger", lootLevel: 2},
	{name: "Giant Spider", level: 3, healthpoints: 50, armor: "none", weapon: "Bites", lootLevel: 2},
	{name: "Lake Constance Mosquito", level: 4, healthpoints: 50, armor: "none", weapon: "Bites", lootLevel: 1},
	{name: "Goblin", level: 3, healthpoints: 25, armor: "none", weapon: "Arrow", lootLevel:2},
	{name: "Black Knight", level: 4, healthpoints: 50, armor: "Steel Armor", weapon: "Long Sword", lootLevel: 4},
	{name: "Tree Monster", level: 4, healthpoints: 75, armor: "none", weapon: "Roots", lootLevel: 4},
	{name: "Genie", level: 5, healthpoints: 80, armor: "none", weapon: "Magic Spell", lootLevel: 5},
	{name: "Mongoose Magician", level: 5, healthpoints: 80, armor: "Mage Robe", weapon: "Magic Spell", lootLevel: 5},
	{name: "Blue Mongoose Knight", level: 6, healthpoints: 90, armor: "Cursed Armor", weapon: "Poisoned Sword", lootLevel: 6},
	{name: "Saber Tooth Tiger", level: 6, healthpoints: 110, armor: "none", weapon: "Saber Tooth", lootLevel: 6},
	{name: "The Blue Mongoose", level: 7, healthpoints: 150, armor: "Chitinous Shell", weapon: "Poison Ray", lootLevel: 7}
];

var weapons = [
	{weaponType: "Bites", damage: [1, 5], weaponLevel: 1, cost: 0},
	{weaponType: "Poison Ray", damage: [7,20], weaponLevel: 7, cost: 0},
	{weaponType: "Fists", damage: [1, 5], weaponLevel: 1, cost: 0},
	{weaponType: "Dagger", damage: [3,7], weaponLevel: 2, cost: 25},
	{weaponType: "Short Sword", damage: [5, 10], weaponLevel: 3, cost: 75},
	{weaponType: "Long Sword", damage: [7, 12], weaponLevel: 4, cost: 125},
	{weaponType: "Arrow", damage: [3, 7], weaponLevel: 3, cost: 15},
	{weaponType: "Roots", damage: [5, 8], weaponLevel: 4, cost: 0},
	{weaponType: "Magic Spell", damage: [7, 9], weaponLevel: 5, cost: 100},
	{weaponType: "Poisoned Sword", damage: [11, 15], weaponLevel: 6, cost: 150},
	{weaponType: "Saber Tooth", damage: [11, 15], weaponLevel: 6, cost: 0}
];

var armor = [
	{armorType: "none", protection: 0, cost: 0},
	{armorType: "Chitinous Shell", protection: 10, cost: 0},
	{armorType: "Clothes", protection: 1, cost: 0},
	{armorType: "Leather Armor", protection: 2, cost: 50},
	{armorType: "Studded Leather Armor", protection: 4, cost: 200},
	{armorType: "Steel Armor", protection: 7, cost: 400},
	{armorType: "Cursed Armor", protection: 15, cost: 500},
	{armorType: "Mage Robe", protection: 15, cost: 400}
]

function Hero () {
	var name = "Hero";
	var level = 1;
	var healthpoints = 100;
	var xp = 0;
	var coins = 0;
	var armorType = "Leather Armor";
	var weaponType = "Fists";
	
	//hero: getters and setters
	return {

		toString : function () {
			//iterates through the public proberties of Hero, which will be only the methods
			var str = "{";
			for (var property in this) {
				//takes all the getters
				if (property.indexOf("get") == 0) {
					var value = this[property]()
					if (typeof value === "string") {
						str += "\"" + property.substring(3) + "\"" + ": \"" + (this[property]()) + "\", ";
					} else {
						str +=  "\"" +property.substring(3) +"\"" + ": " + (this[property]()) + ", ";
					}
				}
			}
			str = str.substring(0, str.length - 2) + "}";
			
			return str;
		},
		getName : function () {
			return name;
		},
		setName: function (val) {
			if (typeof val !== "string")
				return;
			name = val;
		},
		getLevel : function () {
			return level;
		},
		setLevel : function (val) {
			if (typeof val !== "number")
				return;
			level = val;
		},
		getHealthpoints : function () {
			return healthpoints;
		},
		setHealthpoints : function (val) {
			if (typeof val !== "number")
				return;
			healthpoints = val;
		},
		getXp : function () {
			return xp;
		},
		setXp : function (val) {
			if (typeof val !== "number")
				return
			xp = val;
		},
		getCoins : function () {
			return coins;
		},
		setCoins : function (val) {
			if (typeof val !== "number")
				return;
			coins = val;
		},
		getArmorType : function () {
			return armorType;
		},
		setArmorType : function (val) {
			if (typeof val !== "string")
				return;
			armorType = val;
		},
		getWeaponType : function () {
			return weaponType;
		},
		setWeaponType : function (val) {
			if (typeof val !== "string")
				return;
			weaponType = val;
		}
	};
}


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
	
	localStorage.setItem("Hero", you);
}

//shows the hero stats in the status bar
function updateStatusbar () {
	var status = document.getElementById("status");
	status.innerHTML = "health: " + you.getHealthpoints() +
	" | XP: " + you.getXp() +
	" | lvl: " + you.getLevel() +
	" | coins: " + you.getCoins() +
	" | weapon: " + you.getWeaponType() +
	" | armor: " + you.getArmorType();
}

function startFighting() {
	
}

function goToStore() {
	
}