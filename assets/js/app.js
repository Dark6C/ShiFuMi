let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("score-joueur");
let scoreOrdinateur = document.getElementById("score-ordinateur");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];
let oswordBtn = document.getElementById("osword");
let oshieldBtn = document.getElementById("oshield");
let owandBtn = document.getElementById("owand");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");
let scoreO = 0;
let scoreJ = 0;
let winrate = document.getElementById("winrate")

const jouerManche = (e) => {
  let choix = e.target.closest(".btn-joueur");

  btnJoueur.forEach((btn) => {
    btn.classList.add("desactivated");
    btn.removeEventListener("click", jouerManche);
  });

  choix.classList.remove("desactivated");
  choix.classList.add("active");

  let choixJoueur = choix.id;

  let choixOrdi = faireChoixOrdinateur();

  verifierGagnant(choixJoueur, choixOrdi);

  nextBtn.style.visibility = "visible";
};

const EPEE = "sword";
const BOUCLIER = "shield";
const BAGUETTE = "wand";

const faireChoixOrdinateur = () => {
  // 0 = épée
  // 1 = bouclier
  // 2 = baguette

  let nbAleatoire = Math.floor(Math.random() * 3);

  switch (nbAleatoire) {
    case 0:
      oswordBtn.classList.add("active");
      return EPEE;
    case 1:
      oshieldBtn.classList.add("active");
      return BOUCLIER;
    default:
      owandBtn.classList.add("active");
      return BAGUETTE;
  }
};

const verifierGagnant = (choixJoueur, choixOrdi) => {
  if (choixJoueur == choixOrdi) {
    message.textContent = "Egalité !";
    return;
  }

  if (choixJoueur == EPEE) {
    if (choixOrdi == BOUCLIER) {
      return victoireOrdinateur();
    } else if (choixOrdi == BAGUETTE) {
      return victoireJoueur();
    }
  }

  if (choixJoueur == BOUCLIER) {
    if (choixOrdi == BAGUETTE) {
      return victoireOrdinateur();
    } else if (choixOrdi == EPEE) {
      return victoireJoueur();
    }
  }

  if (choixJoueur == BAGUETTE) {
    if (choixOrdi == EPEE) {
      return victoireOrdinateur();
    } else if (choixOrdi == BOUCLIER) {
      return victoireJoueur();
    }
  }
};


const victoireOrdinateur = () => {
  message.textContent = "L'ordinateur gagne...";
  scoreO++;
  scoreOrdinateur.textContent = scoreO;
  const pourcentage = calculerPourcentageVictoire();
 winrate.textContent = `Votre winrate est de : ${pourcentage} %`;
  scoreOrdinateur.textContent = scoreO;
  const computerWinSound = document.getElementById("computerWinSound");
  computerWinSound.play();
};

const victoireJoueur = () => {
  message.textContent = "Vous avez gagné ! :)";
  scoreJ++;
  scoreJoueur.textContent = scoreJ;
  const pourcentage = calculerPourcentageVictoire();
winrate.textContent = `Votre winrate est de : ${pourcentage} %`;
  const playerWinSound = document.getElementById("playerWinSound");
  playerWinSound.play();
};

const preparerNouvelleManche = () => {
  btnJoueur.forEach((btn) => {
    btn.classList.remove("desactivated");
    btn.classList.remove("active");

    btn.addEventListener("click", jouerManche);
  });

  nextBtn.style.visibility = "hidden";

  oswordBtn.classList.remove("active");
  oshieldBtn.classList.remove("active");
  owandBtn.classList.remove("active");

  message.textContent = "A vous de jouer !";
};

nextBtn.addEventListener("click", preparerNouvelleManche);

btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche));

resetBtn.addEventListener("click", () => {
  scoreJoueur.textContent = 0;
  scoreJ = 0;
  scoreOrdinateur.textContent = 0;
  scoreO = 0;
winrate.textContent =  'Votre winrate est de  : 0.0%'
  preparerNouvelleManche();
});

const calculerPourcentageVictoire = () => {
  const totalGames = scoreJ + scoreO;
  if (totalGames === 0) {
    return 0;
  }
  const pourcentage = (scoreJ / totalGames) * 100;
  return pourcentage.toFixed(1);
};
