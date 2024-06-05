// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract HotelBooking {
    address payable public owner;
    uint private room_price = 0.01 ether;
    mapping(uint => bool) public booked_dates;
    mapping(uint => address) public booker;


    constructor() {
        owner = payable(msg.sender); 
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function get_room_price() public view returns(uint){
        return room_price;
    }

    function setroom_price(uint _newPrice) public onlyOwner {
        room_price = _newPrice;
    }

   function bookRoom(uint _date) public payable {
    require(msg.value == room_price, "Please submit the correct amount of ETH");
    require(!booked_dates[_date], "This date is already booked");
    booked_dates[_date] = true;
    booker[_date] = msg.sender; 
        }


    function checkAvailability(uint _date) public view returns(bool) {
        return !booked_dates[_date];
    }

    function cancelBooking(uint _date) public {
    require(msg.sender == booker[_date], "Only the booker can cancel this reservation");
    require(booked_dates[_date], "This date is not booked");
    booked_dates[_date] = false;
    booker[_date] = address(0); 
        }


    function withdrawFunds() public onlyOwner {
        owner.transfer(address(this).balance);
    }
}