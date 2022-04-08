const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();console.log(accounts)

  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({ from: accounts[1], value: web3.utils.toWei('0.001', 'ether') });

    const players = await lottery.methods.getPlayers().call();

    assert.equal(1, players.length);
    assert.equal(accounts[1], players[0]);
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({ from: accounts[1], value: web3.utils.toWei('0.001', 'ether') });
    await lottery.methods.enter().send({ from: accounts[2], value: web3.utils.toWei('0.001', 'ether') });
    await lottery.methods.enter().send({ from: accounts[3], value: web3.utils.toWei('0.001', 'ether') });

    const players = await lottery.methods.getPlayers().call();

    assert.equal(3, players.length);
    assert.equal(accounts[1], players[0]);
    assert.equal(accounts[2], players[1]);
    assert.equal(accounts[3], players[2]);
  });

  it('requires a minimun amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({ from: accounts[1], value: 100 });

      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('only manager can call pickWinner', async () => {
    try {
      await lottery.methods.enter().send({ from: accounts[1], value: web3.utils.toWei('0.001', 'ether') });
      await lottery.methods.pickWinner().send({ from: accounts[2] });

      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('sends money to the winner and resets the players array', async () => {
    await lottery.methods.enter().send({ from: accounts[1], value: web3.utils.toWei('0.001', 'ether') });
    const initialBalance = await web3.eth.getBalance(accounts[1]);

    await lottery.methods.pickWinner().send({ from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(accounts[1]);

    const difference = finalBalance - initialBalance;

    const finalBalanceOfContract = await web3.eth.getBalance(lottery.options.address);
    const players = await lottery.methods.getPlayers().call();

    assert(difference > web3.utils.toWei('0.0009', 'ether'));
    assert.equal(0, finalBalanceOfContract);
    assert.equal(0, players.length);
  });
});
