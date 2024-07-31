// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IZapsterScore.sol";
import "./interfaces/ILoanToValueRatio.sol";

import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract LoanToValueRatio is Ownable2Step, ILoanToValueRatio {
    IZapsterScore private _zapsterScore;
    uint8 public constant base = 10;

    uint160 minLTV = 1000;
    uint160 maxLTV = 1200;

    uint256 public zapsterScorePrice0 = 1000 * 1e18;
    uint256 public zapsterScorePrice1 = 3000 * 1e18;

    constructor() Ownable2Step() {}

    function getBase() public pure override returns (uint8) {
        return base;
    }

    function getRelativeLTV(address user, uint256 amount)
        public
        view
        override
        returns (uint160)
    {
        uint160 ltvRatio = getLTV(user);

        if (amount > zapsterScorePrice1) return maxLTV;

        if (amount > zapsterScorePrice0) {
            uint160 average = ((maxLTV + minLTV) / 2);
            if (ltvRatio <= average) return average;
        }

        return ltvRatio;
    }

    function getLTV(address user) public view override returns (uint160) {
        uint16 score = _zapsterScore.getScore(user);
        uint160 range = maxLTV - minLTV;
        uint160 scale = ((range * score) / 100);
        return minLTV + scale;
    }

    function setZapsterScore(
        address trustScore_,
        uint160 minLTV_,
        uint160 maxLTV_
    ) public onlyOwner {
        require(minLTV_ < maxLTV_, "ERR_LTV");
        minLTV = minLTV_ * base;
        maxLTV = maxLTV_ * base;

        _zapsterScore = IZapsterScore(trustScore_);
    }
}
