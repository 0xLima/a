// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/*
    Zapster Token is essential for the Zapster ecosystem.
    It is used for voting in the ZAPSTER IMPROVEMENNT PROPOSALS,
    STAKING REWARDS and more use cases in the future.
*/

contract ZapsterToken is Ownable2Step, ERC20 {
    constructor() Ownable2Step() ERC20("Zapster", "ZPZ") {
        _mint(msg.sender, 10000000000 * 10**18);
    }
}
