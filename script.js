let whiteGuy = {
    name: "Whitcher",
    armour: 0.1,
    damage: 10,
    agility: 1,
    health: 100,
    type: "",
    money: 0,
    imageUrl: "./assets/img/white_Hair.png"
}
let blackGuy = {
    name: "Black Overlord",
    armour: 0.1,
    damage: 10,
    agility: 1,
    health: 100,
    type: "",
    money: 0,
    imageUrl: "./assets/img/black_Hair.png"
}
let archerEasy = {
    name: "archer 1",
    armour: 0.1,
    agility: 1,
    health: 100,
    type: "",
    money: 0,
    imageUrl: "./assets/img/archer_skilet.png"
}
let archerStrong = {
    name: "archer 2",
    armour: 0.1,
    agility: 1,
    health: 100,
    type: "",
    money: 0,
    imageUrl: "./assets/img/archer_skilet2.png"
}

let hero;
let intervalHeroAttack;
let intervalHit;
let intervalEnemyAttackAnim;

function init() {

    const heroArray = [whiteGuy, blackGuy]
    const enemyArray = [archerEasy, archerStrong]

    let heroIndex = prompt("Выберете героя 0 - Whitcher, 1 - Black Overlord")
    hero = heroArray[heroIndex]
    console.log(hero)
    document.getElementById("hero").style.backgroundImage = `url(${hero.imageUrl})`;
    updateStats()

    get("attack").onclick = animateHeroAttack;
    get("enemy-hit").onclick = animationHit

}

window.onload = function () {
    init()
    console.log(randomInteger(1, 100))
}

function updateStats() {
    get("hero-name").innerHTML = " name: " + hero.name;
    get("hero-damage").innerHTML = " damage: " + hero.damage;
    get("hero-armour").innerHTML = " armour: " + hero.armour;
    get("hero-money").innerHTML = " money: " + hero.money;
    get("hero-health").innerHTML = " health: " + hero.health;
}

function get(item) {
    return document.getElementById(item)
}

function randomInteger(min, max) {
    let randomInt = min + Math.floor(Math.random() * (max + 1 - min))
    return randomInt
}

function animateHeroAttack() {
    let position = 100;
    const interval = 100;
    const diff = 425;

    get("hero").style.transform = "translate(200px, -60px)";
    let intervalHeroAttack = setInterval(() => {
        get("hero").style.backgroundPosition = `-${position}px -3095px`;
        if (position < 2400) {
            position += diff
        } else {
            position = 100
            get("hero").style.backgroundPosition = `-${position}px -3095px`;
            get("hero").style.transform = "translate(0px, 0px)";
            animationHit("enemy", "damage-enemy-container", 34)
            setTimeout(() => {
                animateEnemyAttack()
            }, 2000)
            stopAnimations(intervalHeroAttack)
        }
    }, interval);

}

function animateEnemyAttack() {
    let position = -0;
    const interval = 170;
    const diff = 415;
    // document.getElementById("enemy").style.transform = "translate(100px,-150px)"
    intervalEnemyAttackAnim = setInterval(() => {

        document.getElementById("enemy").style.backgroundPosition =
            `-${position}px -2505px`;

        if (position < 2000) {
            position = position + diff;
        } else {
            position = -0;
            document.getElementById("enemy").style.backgroundPosition =
                `-0px -2505px`;
            animationHit("hero", "damage-hero-container", 34)
            stopAnimations(intervalEnemyAttackAnim)
        }

    }, interval);
}

function animationHit(character, damageContainer, damage) {
    let position = 0;
    const interval = 140;
    const diff = 5;

    intervalHit = setInterval(() => {

        get(character).style.transform = `translate(0px, -${position}px)`;
        get(damageContainer).innerHTML = damage;
        get(damageContainer).style.display = "block";
        get(damageContainer).style.transform = `translate(0px, -${position}px)`;


        if (position < 30) {
            position = position + diff;
        } else {
            position = 0;
            get(character).style.transform = "translate(0px,0px)"
            get(damageContainer).style.transform = "translate(0px,0px)"
            get(damageContainer).style.display = "none";
            stopAnimations(intervalHit);
        }
    }, interval)
}
    function stopAnimations(item) {
        clearInterval(item);
    }