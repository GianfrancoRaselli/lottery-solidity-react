/* eslint-disable no-undef */
/* eslint-disable no-multi-str */
import web3 from './web3';

const abi =
  [
    {
      inputs: [],
      name: 'enter',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
      constant: undefined,
      payable: true,
      signature: '0xe97dcb62'
    },
    {
      inputs: [],
      name: 'getPlayers',
      outputs: [ { internalType: 'address[]', name: '', type: 'address[]' } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x8b5b9ccc'
    },
    {
      inputs: [],
      name: 'manager',
      outputs: [ { internalType: 'address', name: '', type: 'address' } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x481c6a75'
    },
    {
      inputs: [],
      name: 'pickWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
      constant: undefined,
      payable: undefined,
      signature: '0x5d495aea'
    },
    {
      inputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
      name: 'players',
      outputs: [ { internalType: 'address', name: '', type: 'address' } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xf71d96cb'
    }
  ]
;
const address = '0x5c6DE393785e0a1Df8C2A4Ea083DB861c25b70E7';

export default new web3.eth.Contract(abi, address);
