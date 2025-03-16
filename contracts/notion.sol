// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract NotDefteri {

    struct Not {
        address yazar;
        string not;
        uint256 zamanDamgasi;
    }

    Not[] public notlar;

    event NotEklendi(uint indexed notId, address yazar, string not, uint256 zamanDamgasi);

    function NotEkle(string memory _not) public {
        require(bytes(_not).length > 0, "Not bos olamaz.");

        notlar.push(Not(msg.sender, _not, block.timestamp));

        emit NotEklendi(notlar.length - 1, msg.sender, _not, block.timestamp);
    }

    function tumNotlariGetir() public view returns (Not[] memory) {
        return notlar;
    }

    function toplamNotSayisi() public view returns (uint256) {
        return notlar.length;
    }
}
