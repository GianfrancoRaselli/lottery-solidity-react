const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { mnemonic_phrase, infura_url } = require('./config');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(mnemonic_phrase, infura_url);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);
  const deployedContract = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });
  console.log('Contract deployed to ', deployedContract.options.address);

  console.log(abi);
  
  provider.engine.stop();
};

deploy();
