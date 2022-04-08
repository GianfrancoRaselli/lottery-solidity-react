import React, { Component } from "react";
import "./App.css";
import lottery from "./lottery";
import web3 from "./web3";

class App extends Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    message: ''
  }

  render() {
    return (
      <div className="App">
        <h1>Lottery Contract</h1>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <h4>Want to try your luck?</h4>
        <p>You have to send 0.1 ether to play!</p>
        <button onClick={this.onEnter}>Enter</button>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onPickWinner}>Pick a Winner</button>

        <hr />

        <h2>{this.state.message}</h2>

      </div>
    );
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    
    this.setState({ manager, players, balance });
  }

  onEnter = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState( { message: 'Waiting on transaction success...' });

    await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('0.1', 'ether') });

    this.setState( { message: 'You have been entered!' });
  }

  onPickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState( { message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    this.setState( { message: 'A winner has been picked!' });
  }

}

export default App;
