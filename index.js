
const MINVAL = 1;
const MAXVAL = 6;

/*  megfogom azokat a HTML elemeket, ahova írni akarok */
const eredmenyELEM = document.getElementById("eredmeny")
console.log(eredmenyELEM)
const jatekELEM = document.getElementById("jatek")
const ujELEM = document.getElementById("uj")

function checkInput() {
    let plrs = document.getElementById("plrs").value;
    plrs = Number(plrs);
    /* ez nem kell, mertnem tud mást, csak számot beadni.  if (isNaN(plrs)) {
         console.log("Sorry, I don't understand that. Try again.");
        
     } */
    return plrs;
}




function roll(plr) {
    const currRoll = Math.floor(Math.random() * (MAXVAL - MINVAL + 1)) + MINVAL;
    jatekELEM.innerHTML += `<p>It looks like you rolled a ${currRoll}.</p>`;

    if (currRoll === 1) {
        jatekELEM.innerHTML += `<p>Sadly this means you cannot continue rolling and your points are gone. Sorry!</p>`;
        PTS[plr] = 0;
        winner();
    } else {
        PTS[plr] += currRoll;
        jatekELEM.innerHTML += `<p>Because your roll wasn't a 1, your roll's value has been added to your points.</p>`;
        jatekELEM.innerHTML += `<p class="kiemel">Your points: ${PTS[plr]}.</p>`;
    }

    return currRoll;
}

ujELEM.addEventListener("click", init)
let PLRS = checkInput();
let PTS = {};

function init() {
    PTS = {};
    PLRS = checkInput();
    jatekELEM.innerHTML = ""
    eredmenyELEM.innerHTML = ""
    const elem = document.getElementById("kerdes");
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
    for (let i = 0; i < PLRS; i++) {
        PTS[i] = 0;
    }
    console.log(PLRS)
    console.log(PTS)
    newRound()
}
function newRound() {
    let currRoll;
    let rolling = true;
    for (let plr = 0; plr < PLRS; plr++) {
        jatekELEM.innerHTML += `<hr>`;
        jatekELEM.innerHTML += `<p>It is <span class="kiemel">Player  ${plr + 1}'s </span>turn. Let's see what you roll...</p>`;

        currRoll = roll(plr);
        if (currRoll === 1) {
            rolling = false
        }
        jatekELEM.innerHTML += `<hr>`;
        // while (rolling && currRoll !== 1) {
        //let again = readline.question("Do you wish to roll again? [yes || no]: ");


        /* if (again === "yes") {
            console.log("Alright, rolling the die again...\n\n");
            currRoll = roll(plr);
        } else if (again === "no") {
            rolling = false;
            console.log(`Player ${plr + 1} has finished rolling.\n\n`);
            
            if (plr + 1 !== plrs) {
                console.log(`Moving on to Player ${plr + 2}...\n\n`);
            }
        } */
        // }
    }
    const elem = document.getElementById("kerdes");
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
    if (rolling) {
        
        jatekELEM.innerHTML += `<div id="kerdes"><span> Do you wish to roll again?</span><button class="yes">Yes</button> <button class="no">No</button></div> `;
        const yesELEM = document.querySelector(".yes")
        const noELEM = document.querySelector(".no")
        console.log(yesELEM)
        yesELEM.addEventListener("click", function () {
            jatekELEM.innerHTML += `<p>Alright, rolling the die again...</p>`;
            newRound();

        })
        noELEM.addEventListener("click", function () {
            winner()

        })
    }
}
function winner() {
    let highestScorer = {};
    let max = 0;

    for (let value of Object.values(PTS)) {
        if (value > max) {
            max = value;
        }
    }

    for (let [key, value] of Object.entries(PTS)) {
        if (value === max) {
            highestScorer[parseInt(key) + 1] = value;
        }
    }

    eredmenyELEM.innerHTML += `<p>All players have now finished rolling. Let's see the winner(s)...</p>`;

    const winners = Object.keys(highestScorer);
    const winnersPts = Object.values(highestScorer);

    if (winners.length === 1) {
        eredmenyELEM.innerHTML += `<p>The winner is  <span class="kiemel"> Player ${winners[0]} with ${winnersPts[0]} points!</span></p>`;
    } else {
        eredmenyELEM.innerHTML += `<p>The winners are  <span class="kiemel">Players ${winners.join(", ")} with ${winnersPts[0]} points </span>each in a ${winners.length}-way tie!</p>`;
    }

}
