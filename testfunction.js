const grilleAvecGagnant1 = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["X", "X", "X", "X", "", "", ""],
];

const grilleAvecGagnant2 = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["X", "", "", "", "", "", ""],
  ["X", "", "", "", "", "", ""],
  ["X", "", "", "", "", "", ""],
  ["X", "", "", "", "", "", ""],
];

const grilleAvecGagnant3 = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "X", "", "", ""],
  ["", "", "X", "", "", "", ""],
  ["", "X", "", "", "", "", ""],
  ["X", "", "", "", "", "", ""],
];

const grilleAvecGagnant4 = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "X", "", "", ""],
  ["", "", "X", "O", "", "", ""],
  ["", "O", "O", "O", "", "", ""],
  ["X", "O", "O", "O", "O", "", ""],
];

const grilleSansGagnant = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "X", "", "", ""],
  ["", "", "X", "O", "", "", ""],
  ["", "O", "O", "O", "", "", ""],
  ["X", "O", "O", "X", "O", "", ""],
];

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
    for (let i = 0; i < gridLength; i++){
      for (let h = 0; h < gridhup; h++){
        let target = grid[i][h];
        if (target !== "") {
          for (let j = 1; j < 4; j++) {
            let I = i + j * d1;
            let H = h + j * d2;
            if (I < 0 || I >= gridLength || H < 0 || H >= gridhup) {
              break;
            }
            if (grid[I][H] !== target) {
              break;
            }
            if (j === 3) {
              return target;
            }
          }
        }
      }
    }
  }
}

// Testons nos grilles
let resultat;

resultat = checkWinner(grilleAvecGagnant1);
console.log("====== grilleAvecGagnant1 ", resultat); // doit retourner "X"

resultat = checkWinner(grilleAvecGagnant2);
console.log("====== grilleAvecGagnant2 ", resultat); // doit retourner "X"

resultat = checkWinner(grilleAvecGagnant3);
console.log("====== grilleAvecGagnant3 ", resultat); // doit retourner "X"

resultat = checkWinner(grilleAvecGagnant4);
console.log("====== grilleAvecGagnant4 ", resultat); // doit retourner "O"

resultat = checkWinner(grilleSansGagnant);
console.log("====== grilleSansGagnant ", resultat); // doit retourner ""
