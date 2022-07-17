// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DracmaCoin {
    string public name = 'Dracma Coin';
    string public symbol = 'DRC';
    uint256 public totalSupply = 18e28;
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approve(
        address indexed _from,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }


    function approve(address _spender, uint256 _value)
        external
        returns (bool success)
    {
        require(_value <= balanceOf[msg.sender]);
        allowance[msg.sender][_spender] = _value;
        emit Approve(msg.sender, _spender, _value);
        return true;
    }

    function transfer(address _to, uint256 _value)
        external
        returns (bool success)
    {
        require(_value <= balanceOf[msg.sender]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);
        require(_value <= balanceOf[_from]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}
