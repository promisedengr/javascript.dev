pragma solidity >=0.6 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SendEther is Ownable {
  using SafeMath for uint256;
  uint256 private feeRate = 10;

  function getBalance() external view returns(uint256) {
    return msg.sender.balance;
  }

  function TransEther(address _target) external payable {
    address payable tgt = payable(_target);
    // tgt.transfer(msg.value);
    (bool success1, ) = tgt.call{value:msg.value}("");
    require(success1, "Failed to send Ether");
  }

  function TransAble(uint256 _amount) external payable returns (bool) {
    uint256 all;
    uint256 fee;
    (all, fee) = _allAmount(_amount);
    if(msg.sender.balance >= all) {
      return true;
    }
    else {
      return false;
    }
  }

  function _allAmount(uint256 _amount) private returns (uint256, uint256) {
    uint256 fee = _amount.mul(feeRate).div(100);
    return (_amount.add(fee), fee);
  }
}
