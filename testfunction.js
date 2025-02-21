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

function checkWinner(grille) {}

let resultat = "";

resultat = checkWinner(grilleAvecGagnant1); // retourne "X"
resultat = checkWinner(grilleAvecGagnant2); // retourne "X"
resultat = checkWinner(grilleAvecGagnant3); // retourne "X"
resultat = checkWinner(grilleAvecGagnant4); // retourne "O"
resultat = checkWinner(grilleSansGagnant); // retourne ""
