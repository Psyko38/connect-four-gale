const GameRulesBTN = document.querySelector(
	".GameMenu > .button > button:last-child"
);

const pupupUI = document.querySelector(".pupup");

GameRulesBTN.addEventListener("click", () => {
	console.log("qcbsdyufsdgvyuc");
});

function CreatRules() {
	const MainDiv = document.createElement("dialog");
	MainDiv.setAttribute("open", "");
	MainDiv.setAttribute("class", "rules");

	const h1 = document.createElement("h1");
	h1.setAttribute("class", "hl");
	h1.innerHTML = "RULES";
	MainDiv.appendChild(h1);

	const divOBJ = document.createElement("div");
	divOBJ.setAttribute("class", "obj");
	MainDiv.appendChild(divOBJ);

	const h2 = document.createElement("h2");
	h2.setAttribute("class", "hs");
	h2.innerHTML = "OBJECTIVE";
	divOBJ.appendChild(h2);

	pupupUI.appendChild(MainDiv);
}
