var origBoard;
const humanPlayer ="O";
const aiPlayer = "X";
const winCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
];
const cells = document.querySelectorAll('.cell');

startGame();

function startGame(){
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	//removing everything in previous game before a new game
	for(i = 0; i<cells.length;i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');//since we need to remove winning square's colour
		//before each replay
		cells[i].addEventListener('click',turnClick,false);
	}
}

function turnClick(square){
	//console.log(square.target.id);
	turn(square.target.id, humanPlayer);
}

function turn(squareId,player){
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard,player);
	if(gameWon) gameOver(gameWon);
}

function checkWin(board,player){
	//didnt take origboard coz board will vary 
	let plays = board.reduce((a,e,i)=>
		(e===player)? a.concat(i) : a,[]);
	let gameWon = null;
	for(let [index,win] of winCombos.entries()){
		if(win.every(ele=>plays.indexOf(ele)>-1)){
			gameWon = {index:index , player:player};//taking the index of wincombo and player 
			break;
		}
	}

	return gameWon;

}

function gameOver(gameWon){
	//higlight all the squares won by the player and make another click impossible
	for(let index of winCombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor = 
		gameWon.player==humanPlayer ? "blue" : "red";
	}

	for(var i = 0 ;i<cells.length;i++){
		cells[i].removeEventListener('click',turnClick,false);
	}
}


//basic AI
function AI(origBoard){

}