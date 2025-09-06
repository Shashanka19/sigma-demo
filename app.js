let gameSeq = [];
let userSeq = [];

let btns = ["red", "blue", "green", "orange"];
let started = false;
let level = 0;
let score = 0;

let h2 = document.querySelector("h2");
let scoreDisplay = document.getElementById("score");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    console.log("Game sequence:", gameSeq);
    gameFlash(randBtn);
}

function checkAns() {
    let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Correct");

        if (userSeq.length === gameSeq.length) {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            setTimeout(levelUp, 1000);
        }
    } else {
        console.log("Wrong");
        h2.innerText = `Game Over! Final Score: ${score} | Press any key to restart`;

        // Flash red background
        document.body.classList.add("wrong");
        setTimeout(() => {
            document.body.classList.remove("wrong");
        }, 200);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.classList[1];
    userSeq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0;
    scoreDisplay.innerText = `Score: 0`;
}
