// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {

  address public manager = msg.sender;
  address[] public players;

  function getPlayers() public view returns (address[] memory) {
    return players;
  }

  function enter() public payable {
    require(msg.sender != manager);
    require(msg.value == .1 ether);

    players.push(msg.sender);
  }

  function pickWinner() public {
    require(msg.sender == manager);
    require(players.length >= 1);

    uint index = random() % players.length;
    payable(players[index]).transfer(address(this).balance);

    players = new address[](0);
  }

  function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
  }

}
