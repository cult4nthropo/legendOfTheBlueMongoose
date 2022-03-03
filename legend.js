var you;

var weapons = [
	{weaponType: "Fists", damage: [1, 5], weaponLevel: 1, cost: 0},
	{weaponType: "Dagger", damage: [3,7], weaponLevel: 1, cost: 25},
	{weaponType: "Short Sword", damage: [5, 10], weaponLevel: 2, cost: 75}
];

var armor = [
	{armorType: "Clothes", protection: 0, cost: 0},
	{armorType: "Leather Armor", protection: 2, cost: 50},
	{armorType: "Studded Leather Armor", protection: 4, cost: 200}
]

function Hero () {
	var name = "Hero";
	var level = 1;
	var healthpoints = 100;
	var coins = 0;
	var armorType = "Clothes";
	var weaponType = "Fists";
	
	//getters and setters to the hero object
	return {
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
		setHealtpoints : function (val) {
			if (typeof val !== "number")
				return;
			healthpoints = val;
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
}

function startFighting() {
	
}

function goToStore() {
	
}