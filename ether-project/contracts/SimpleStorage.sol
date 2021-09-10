// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract SimpleStorage {
    uint256 public placeCount = 0;

    constructor() {}

    struct Rent {
        uint256 id;
        address payable creator;
        string image;
        string location;
        string state;
        uint256 price;
        bool rented;
        address payable rentMan;
        string description;
        bool paid;
        bool deletePlace;
    }

    mapping(uint256 => Rent) public allPlaces;

    event placeCreated(
        uint256 id,
        address creator,
        string location,
        string state,
        uint256 price,
        bool rented
    );

    function changeRent(uint256 _id) public {
        address _owner = msg.sender;
        allPlaces[_id].rentMan = payable(_owner);
        allPlaces[_id].rented = !allPlaces[_id].rented;
    }

    function deletePlace(uint256 _id) public {
        allPlaces[_id].deletePlace = !allPlaces[_id].deletePlace;
    }

    function resetAll() public {
        for (uint256 i = 1; i <= placeCount; i++) {
            allPlaces[i].rented = false;
            allPlaces[i].paid = false;
            allPlaces[i].rentMan = allPlaces[i].creator;
        }
    }

    function rentAndPay(uint256 _id) public payable {
        address payable _seller = allPlaces[_id].creator;
        // require(_id > 0 && _id < placeCount);
        // require(msg.value >= allPlaces[_id].price);
        // require(_seller != msg.sender);
        payable(address(_seller)).transfer(msg.value);
        allPlaces[_id].paid = true;
    }

    function setPlace(
        address payable _creator,
        string memory _image,
        string memory _location,
        string memory _state,
        uint256 _price,
        string memory _description
    ) public {
        placeCount++;
        allPlaces[placeCount] = Rent(
            placeCount,
            _creator,
            _image,
            _location,
            _state,
            _price,
            false,
            _creator,
            _description,
            false,
            false
        );
        emit placeCreated(
            placeCount,
            _creator,
            _location,
            _state,
            _price,
            false
        );
    }
}
