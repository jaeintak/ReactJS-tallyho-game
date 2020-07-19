import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Start extends Component{

	//button 예쁘게 만들기
	//playerB 가 옆으로 감
	constructor(props){
		super(props);
		this.state = { 
			playerA: false,
			playerB: false
		}
	}


	
	handleClick(){
		var random = Math.ceil(Math.random() * 2);
		if(random===1) {
			this.setState({playerA: true});
			alert("Player A goes first!");
		}
		else{
			this.setState({playerB: true})
			alert("Player B goes first!");
		}
	}

	render(){
		return(

			<div className= "text-title">
				<a href="https://www.ultraboardgames.com/tally-ho/game-rules.php"><img src="img/howto.png" alt="How to Play"/></a>
				<div className = "row">
					<div className="col-10 mx-auto col-md-6 my-3">
						<img src="img/bear_fox.png" alt="bear fox"/>
						<img src="img/playerA.png" alt="Player A"/></div>
					<div className="col-10 mx-auto col-md-6 my-3">
						<img src="img/hunter_lumber.png" alt="Player A"/>
						<img src="img/playerB.png" alt="Player B"/></div>

				</div>
					<button onClick={()=>this.handleClick()}><img src="img/rsp.png" alt="Winner"/></button>
					<Link to='/game'><img src="img/start.png" alt="Start"/></Link>
			</div>
			);
	}
}