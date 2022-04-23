//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FileStorage {
    string private ipfshash;

    function set(string memory x) public {
        ipfshash = x;
    }

    function get() public view returns (string memory) {
        return ipfshash;
    }
}
