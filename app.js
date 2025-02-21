const GameRulesBTN = document.querySelector(
	".GameMenu > .button > button:last-child"
);

const pupupUI = document.getElementById("pupup");
const GameMunuUI = document.getElementById("GameMenu");
const navMenu = document.querySelector("nav > button:nth-child(1)");
const grideDiv = document.querySelectorAll(".gride > div");

GameRulesBTN.addEventListener("click", () => {
	CreatRulesAndShowRules();
});

navMenu.addEventListener("click", () => {
	CreatPauseUIAndShowPauseUI();
});

// Varaible du jeux
let ScoreJ1 = 0;
let ScoreJ2 = 0;
let Colum = 0;
let Turn = 0;
let timer = 0;
let GrideGameDiv = [];
let GrideGameGrid = [];
setupGride();

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
		`Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, ordiagonally).`,
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

	createlement("button", { class: "hm" }, "RESTART", div);

	createlement("button", { class: "hm" }, "QUIT GAME", div);

	ReumeGame.addEventListener("click", () => {
		pupupUI.style.display = "none";
		MainDiv.remove();
	});
}

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

function setupGride() {
	let space = 0;
	for (let i = 0; i < 6; i++) {
		GrideGameDiv.push([]);
		GrideGameGrid.push([]);
	}
	for (let i = 0; i < 42; i++) {
		if (space == 6) {
			space = 0;
		}
		GrideGameGrid[space].push([]);
		GrideGameDiv[space].push(grideDiv[i]);
		space++;
	}
}
