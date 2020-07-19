import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Game from './component/Game'
import 'bootstrap/dist/css/bootstrap.min.css';
import Start from './component/Start'

export default class App extends Component{

	render(){
		return(
			<React.Fragment>
			<div className= "text-title">
			<Link to="/"><img src="img/title.png" alt="Tally Ho!"/></Link></div>
	        <Switch>
	          <Route exact path="/" component={Start}></Route>
	          <Route path="/game" state = { {playerA, playerB} } component={Game}></Route>
	        </Switch>
			</React.Fragment>
	    );
	}
}


