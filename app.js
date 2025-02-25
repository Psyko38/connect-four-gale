/* Sélection des éléments DOM */
const GameRulesBTN = document.querySelector(
  ".GameMenu > .button > button:last-child"
);

const GameMenuUI = document.querySelector(".GameMenu");
const pupupUI = document.getElementById("pupup");
const GameMunuUI = document.getElementById("GameMenu");
const navMenu = document.querySelector("nav > button:nth-child(1)");
const grideDiv = document.querySelectorAll(".gride > div");
const TimerScreen = document.querySelector(
  ".info > div:nth-child(1) > p:nth-child(2)"
);
const GameHUD = document.querySelectorAll(".gamehud > .arrow > button");
const GameTurnUI = document.querySelector(".info > div:first-child");
const GameTurnText = document.querySelector(
  ".info > div:first-child > p:first-child"
);
const UIinfoGame = document.querySelector(".info");

/* Variables du jeu */
let ScoreJ1 = 0;
let ScoreJ2 = 0;
let Colum = 0;
let Turn = 0;
let TimerCounter = 0;
let TimerInterval;
let PlayersName = "";
let GrideGameDiv = [];
let GrideGameGrid = [];

/* Initialisation */
startGame();
setupGride();

/* Écouteurs d’événements */
GameRulesBTN.addEventListener("click", () => {
  CreatRulesAndShowRules();
});

navMenu.addEventListener("click", () => {
  CreatPauseUIAndShowPauseUI();
});

/* Écouteur d’événements pour les touches du clavier */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    if (Colum < 5) {
      Colum++;
      MoveArrow(Colum);
    }
  } else if (e.key === "ArrowLeft") {
    if (Colum > 0) {
      Colum--;
      MoveArrow(Colum);
    }
  } else if (e.key === " ") {
    let moveSuccessful = false;
    if (Turn === 0) {
      moveSuccessful = AddCircele(Colum, "r");
    } else {
      moveSuccessful = AddCircele(Colum, "y");
    }
    if (moveSuccessful) {
      nextTurn(); // Appel à nextTurn()
      checkWinner(GrideGameGrid);
    }
  }
});

/* --- Déclaration des fonctions --- */

/* Création et affichage de la popup des règles */
function CreatRulesAndShowRules() {
  GameMunuUI.style.display = "none";
  pupupUI.style.backgroundColor = "var(--Dark-Purple)";
  pupupUI.style.display = "flex";

  const MainDiv = createlement(
    "dialog",
    { class: "rules", open: "" },
    "",
    pupupUI
  );
  MainDiv.style.display = "unset";

  createlement("h1", { class: "hl" }, "RULES", MainDiv);

  const obj = createlement("div", { class: "obj" }, "", MainDiv);
  createlement("h2", { class: "hs" }, "OBJECTIVE", obj);
  createlement(
    "p",
    {},
    "Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, ordiagonally).",
    obj
  );

  const htp = createlement("div", { class: "htp" }, "", MainDiv);
  createlement("h2", { class: "hs" }, "HOW TO PLAY", htp);

  const ol = createlement("ol", {}, "", htp);
  createlement("li", {}, "Red goes first in the first game.", ol);
  createlement(
    "li",
    {},
    "Players must alternate turns, and only one disc canbe dropped in each turn.",
    ol
  );
  createlement(
    "li",
    {},
    "he game ends when there is a 4-in-a-row or astalemate.",
    ol
  );
  createlement(
    "li",
    {},
    "The starter of the previous game goes second on thenext game.",
    ol
  );

  const ButtonChekGameRule = createlement("button", {}, "", MainDiv);
  createlement(
    "img",
    { src: "../assets/Chek.svg", alt: "ok" },
    "",
    ButtonChekGameRule
  );

  ButtonChekGameRule.addEventListener("click", () => {
    GameMunuUI.style.display = "grid";
    pupupUI.style.backgroundColor = "var(--Dark-Purple)";
    pupupUI.style.display = "flex";
    MainDiv.remove();
  });
}

/* Création et affichage de l'UI de pause */
function CreatPauseUIAndShowPauseUI() {
  GameMunuUI.style.display = "none";
  pupupUI.style.backgroundColor = "#00000080";
  pupupUI.style.display = "flex";

  const MainDiv = createlement(
    "div",
    { class: "pause", open: "" },
    "",
    pupupUI
  );
  MainDiv.style.display = "unset";

  createlement("h2", { class: "hl" }, "PAUSE", MainDiv);

  const div = createlement("div", { class: "button" }, "", MainDiv);
  const ReumeGame = createlement(
    "button",
    { class: "hm" },
    "CONTINUE GAME",
    div
  );
  const RestartBTN = createlement("button", { class: "hm" }, "RESTART", div);
  const QuitGame = createlement("button", { class: "hm" }, "QUIT GAME", div);

  ReumeGame.addEventListener("click", () => {
    pupupUI.style.display = "none";
    MainDiv.remove();
  });

  RestartBTN.addEventListener("click", () => {
    startGame();
    pupupUI.style.display = "none";
    MainDiv.remove();
  });

  QuitGame.addEventListener("click", () => {
    pupupUI.style.backgroundColor = "var(--Dark-Purple)";
    MainDiv.remove();
    GameMenuUI.style.display = "grid";
  });
}

/* Fonction utilitaire pour créer un élément */
function createlement(type, parms, inenrhtml, destination) {
  const elemnt = document.createElement(type);
  for (const key in parms) {
    elemnt.setAttribute(key, parms[key]);
  }
  elemnt.innerHTML = inenrhtml;
  if (destination) {
    destination.appendChild(elemnt);
  }
  return elemnt;
}

/* Mise en place de la grille de jeu */
function setupGride() {
  let space = 0;
  for (let i = 0; i < 6; i++) {
    GrideGameDiv.push([]);
    GrideGameGrid.push([]);
  }
  for (let i = 0; i < 42; i++) {
    if (space === 6) {
      space = 0;
    }
    GrideGameGrid[space].push([]);
    GrideGameDiv[space].push(grideDiv[i]);
    space++;
  }
}

/* Vérification du gagnant dans la grille */
function checkWinner(grid) {
  const gridLength = grid.length;
  const gridhup = grid[0].length;
  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonale Up
    [-1, 1], // diagonale Down
  ];

  for (let [d1, d2] of directions) {
    for (let i = 0; i < gridLength; i++) {
      for (let h = 0; h < gridhup; h++) {
        let target = grid[i][h];
        if (target !== "") {
          let WiniD = [];
          WiniD.push([i, h]);
          for (let j = 1; j < 4; j++) {
            let I = i + j * d1;
            let H = h + j * d2;
            WiniD.push([I, H]);
            if (I < 0 || I >= gridLength || H < 0 || H >= gridhup) {
              break;
            }
            if (grid[I][H] !== target) {
              break;
            }
            if (j === 3) {
              ShowWinner(WiniD);
            }
          }
        }
      }
    }
  }
}

function ShowWinner(list) {
  for (let i = 0; i < list.length; i++) {
    let x = list[i][0];
    let y = list[i][1];
    GrideGameDiv[x][y].classList.add("winner");
  }
  stopGame();
}

/* Démarrage du jeu */
function startGame() {
  GameTurnUI.style.backgroundImage = "url(assets/Player1-1.svg)";
  GameTurnText.innerHTML = "PLAYER 1’S TURN";
  ScoreJ1 = 0;
  ScoreJ2 = 0;
  Colum = 0;
  Turn = 0;
  Timer = 0;
  PlayersName = "";
  GrideGameDiv = [];
  GrideGameGrid = [];
}

/* Gestion du temps */
function Timers(time) {
  if (TimerInterval) {
    clearInterval(TimerInterval);
  }
  TimerCounter = time;
  TimerScreen.innerHTML = TimerCounter + "s";
  TimerInterval = setInterval(() => {
    TimerCounter--;
    if (TimerCounter === 0) {
      clearInterval(TimerInterval);
      placeRandomPiece();
    }
    TimerScreen.innerHTML = TimerCounter + "s";
  }, 1000);
}

function placeRandomPiece() {
  let randomColumn;
  let moveSuccessful = false;

  for (let i = 0; i < 6; i++) {
    randomColumn = Math.floor(Math.random() * 6);
    if (Turn === 0) {
      moveSuccessful = AddCircele(randomColumn, "r");
    } else {
      moveSuccessful = AddCircele(randomColumn, "y");
    }
    if (moveSuccessful) {
      break;
    }
  }
  nextTurn();
  checkWinner(GrideGameGrid);
}

/* Imprime les coups sur la grid de div */
function PrintGride() {
  for (let i = 0; i < GrideGameGrid.length; i++) {
    for (let y = 0; y < 7; y++) {
      if (GrideGameDiv[i] && GrideGameDiv[i][y]) {
        if (GrideGameGrid[i][y] == "r") {
          GrideGameDiv[i][y].style.backgroundColor = "var(--Red)";
        } else if (GrideGameGrid[i][y] == "y") {
          GrideGameDiv[i][y].style.backgroundColor = "var(--Yellow)";
        } else {
          GrideGameDiv[i][y].style.backgroundColor = "var(--Purple)";
        }
      }
    }
  }
}

/* Ajoute les pions au bonne endroit */
function AddCircele(List, Player) {
  let a = 0;
  let place = false;
  for (let i = 0; i < GrideGameGrid[List].length + 1; i++) {
    a = GrideGameGrid[List].length - i;
    if (GrideGameGrid[List][a] == "") {
      GrideGameGrid[List][a] = Player;
      PrintGride();
      Colum = 0;
      MoveArrow(Colum);
      place = true;
      break;
    }
  }
  return place;
}

function MoveArrow(Line) {
  for (let i = 0; i < GameHUD.length; i++) {
    GameHUD[i].innerHTML = "";
  }
  if (Turn == 0) {
    GameHUD[Line].innerHTML = `<img src="assets/Player1.svg" alt="Box ${
      Line + 1
    }" />`;
  } else {
    GameHUD[Line].innerHTML = `<img src="assets/Player2.svg" alt="Box ${
      Line + 1
    }" />`;
  }
}

function nextTurn() {
  if (Turn === 0) {
    Turn = 1;
    GameTurnUI.style.backgroundImage = "url(assets/Player2-1.svg)";
    GameTurnText.innerHTML = "PLAYER 2’S TURN";
  } else {
    Turn = 0;
    GameTurnUI.style.backgroundImage = "url(assets/Player1-1.svg)";
    GameTurnText.innerHTML = "PLAYER 1’S TURN";
  }
  Timers(15);
  MoveArrow(Colum); // Mettre à jour la couleur de GameHUD
}

function stopGame() {
  clearInterval(TimerInterval);
}

function createVictoryBanner(PlayerName) {
  GameTurnUI.display = "none";
  const Maindiv = createlement(
    "div",
    { class: "victory-banner" },
    "",
    UIinfoGame
  );
  if (PlayerName === "r") {
    createlement("p", { class: "hl" }, `PLAYER 1 wins!`, Maindiv);
  } else if (PlayerName === "y") {
    createlement("p", { class: "hl" }, `PLAYER 2 wins!`, Maindiv);
  }
  createlement("h2", { class: "hxs" }, "WINS", Maindiv);

  const playAgainButton = createlement(
    "button",
    { class: "hxs" },
    "PLAY AGAIN",
    Maindiv
  );

  playAgainButton.addEventListener("click", () => {
    startGame();
    Maindiv.remove();
  });
}
