import React, {Component} from 'react';
import Board from './Board';

// 카드를 깔때마다 캐릭터 남은 개수가 뜨면 좋을까.?
// 이동하는데 잘못 누른거면???
// 못먹는애, 못가는곳 으로 이동하려하면 disable 캐릭터마다 갈 수 있는 칸 정해져잇음 
// 자기 캐릭터가 아닌 애를 누르면 disable
// start js에서 가위바위보 결과 가져오기 -> 이거 하다가 개망했음

// 글을 그림으로 바꿀것

// 다 오픈하면 나가야함 -> 나가는 방법은?
// 24번쨰 칸에서 다른 곳으로 이동이 안됨....

export default class Game extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			prev: -1,
			open: false,
			playerA: null,
			playerB: null,
			stepNumber: 0,
			history: [ //this is the board
				{squares: Array(49).fill(null)}
			],
			cards: ["여우","여우","여우","여우","여우","여우",
			 "곰","곰","나무꾼","나무꾼", 
			 "사냥꾼↑","사냥꾼↑","사냥꾼↓","사냥꾼↓","사냥꾼→","사냥꾼→","사냥꾼←","사냥꾼←",
			 "오리","오리","오리","오리","오리","오리","오리",
			 "꿩","꿩","꿩","꿩","꿩","꿩","꿩","꿩",
			 "나무","나무","나무","나무","나무","나무","나무","나무","나무","나무",
			 "나무","나무","나무","나무","나무", "나무"],
			 A:[],
			 B:[],
			 count: 0, 
			 endStep: 0
		}
	}

	//componentDidMount () {
	    //const { handle } = this.props.match.params
	    //const { playerA, playerB } = this.props.location.state;
	    //console.log(playerA, playerB);

	    //(playerA) => {this.setState(()=> (playerA))};
	  //}



	handleClick(i){
		console.log(this.state.playerA);
		

		if(this.state.open === false){
			this.setState({
			open:true
			});
			shuffle(this.state.cards); 
		}

		const history = this.state.history.slice(0, this.state.stepNumber +1);
		const current = history[history.length-1];
		const squares = current.squares.slice();


		squares[24] = 'X';  //클릭하기 전부터 초기화 되어있을 순 없나?
		if(!squares[i]){ //오픈할때
			squares[i] = this.state.cards[i];
			this.setState({
				playerA: !this.state.playerA,
				playerB: !this.state.playerB,
				history: history.concat({
					squares: squares
				}),
				stepNumber: history.length,
				count: this.state.count +1
			})
		}else { //먹거나 이동할때
			if(this.state.prev === -1){ //처음 눌린애
				if(squares[i]==='X' || squares[i]==='||' ||squares[i]==='==' || squares[i]==='나무') {
					alert("can't move this tile!!!");
					return;  // 플레이어나 card 바뀌는지 확인 (제대로 break되나 확인)
				}
				this.setState({
					playerA: !this.state.playerA,
					playerB: !this.state.playerB,
					prev: squares[i],
					history: history.concat({squares: squares}),
					stepNumber: history.length
				});
				if(i ===3 || i === 45) squares[i] = '||';
				else if(i===27|| i===21) squares[i] = '==';
				else squares[i] = 'X';
			}else{ 
				if(squares[i]!=='X' && squares[i]!=='||' &&squares[i]!=='==' && this.state.playerA) this.setState({A: this.state.A.concat(this.state.cards[i])}); 
				else if(squares[i]!=='X' && squares[i]!=='||' &&squares[i]!=='==' && this.state.playerB) this.setState({B: this.state.B.concat(this.state.cards[i])});
				squares[i] = this.state.prev;
				this.setState({                                 
					prev: -1,                                   
					history: history.concat({squares: squares}),
					stepNumber: history.length
				});
				
			}
		}

		console.log(this.state.count);
		console.log(this.state.stepNumber);
		//다 오픈 됬을때

		if(this.state.count === 47) {
			alert("나가기 시작!!!!!");
		}
		if(this.state.count === 48){
			this.setState({endStep: this.state.endStep + 1});
		}
		if(this.state.endStep === 3) {
			alert("game over"); // 다른 클릭 disable하고 각자 먹은거 계산해주기 + 나간것도 계산해주기
			calculate(this.state.A.slice());
			calculate(this.state.B.slice());
		}

	}


	render(){
		const history = this.state.history;  
		const current = history[this.state.stepNumber];
		//const squares = current.squares.slice();
		const a = this.state.A;
		const b = this.state.B;
		console.log(current.squares);



		if(this.state.playerB===true){

			return (	
				<div className="game">
					<div className="row">
						<div className="col">
						
						</div>
						<Board onClick={(i)=>this.handleClick(i)}
						squares={current.squares} > 
						</Board>
						<div className="col-10 mx-auto col-md-6 my-3">
						<img className="player" src="img/playerB.png" alt="Player B"/>
						<div className="text-title">{b}</div>
						</div>
					</div>
				</div>
			)
		}
		if(this.state.playerA===true){

			return (	
				<div className="game">
					<div className="row">
						<div className="col">
						<img className="player" src="img/playerA.png" alt="Player A"/>
						<div className="text-title">{a}</div>
						</div>
						<Board onClick={(i)=>this.handleClick(i)}
						squares={current.squares} > 
						</Board>
						<div className="col-10 mx-auto col-md-6 my-3">
						
						</div>
					</div>
				</div>
			)
		}
	}
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function calculate(array){
	console.log(array);

}


