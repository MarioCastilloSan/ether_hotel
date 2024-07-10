// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract HotelBooking {
    address payable public owner;
    
    enum RoomType { SuitePresidencial, HabitacionEjecutiva, SuiteJardin, HabitacionDobleDeluxe, HabitacionRomantica, SuitePanoramica, HabitacionEstandar, HabitacionLoft, SuiteBienestar }
    
    struct Room {
        uint basePrice;
        bool isBooked;
        address booker;
        uint startDate;
        uint endDate;
    }
    
    mapping(RoomType => mapping(uint => Room)) public rooms;
    
    constructor() {
        owner = payable(msg.sender);
        // Inicializar precios base
        rooms[RoomType.SuitePresidencial][0].basePrice = 0.05 ether;
        rooms[RoomType.HabitacionEjecutiva][0].basePrice = 0.04 ether;
        rooms[RoomType.SuiteJardin][0].basePrice = 0.035 ether;
        rooms[RoomType.HabitacionDobleDeluxe][0].basePrice = 0.03 ether;
        rooms[RoomType.HabitacionRomantica][0].basePrice = 0.025 ether;
        rooms[RoomType.SuitePanoramica][0].basePrice = 0.045 ether;
        rooms[RoomType.HabitacionEstandar][0].basePrice = 0.02 ether;
        rooms[RoomType.HabitacionLoft][0].basePrice = 0.015 ether;
        rooms[RoomType.SuiteBienestar][0].basePrice = 0.05 ether;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }
    
    function setRoomPrice(RoomType roomType, uint _newPrice) public onlyOwner {
        rooms[roomType][0].basePrice = _newPrice;
    }
    
    function calculatePrice(RoomType roomType, uint numDays, bool applyDiscount) public view returns (uint) {
        uint price = rooms[roomType][0].basePrice + (numDays * 0.01 ether);
        if (applyDiscount) {
            return price / 2;
        }
        return price;
    }

    function bookRoom(RoomType roomType, uint startDate, uint endDate, bool applyDiscount) public payable {
        uint numDays = (endDate - startDate) / 1 days + 1;
        uint totalPrice = calculatePrice(roomType, numDays, applyDiscount);
        require(msg.value == totalPrice, "Incorrect amount of ETH sent");

        for (uint date = startDate; date <= endDate; date += 1 days) {
            require(!rooms[roomType][date].isBooked, "One or more dates are already booked");
        }

        for (uint date = startDate; date <= endDate; date += 1 days) {
            rooms[roomType][date].isBooked = true;
            rooms[roomType][date].booker = msg.sender;
            rooms[roomType][date].startDate = startDate;
            rooms[roomType][date].endDate = endDate;
        }
    }
    
    function checkAvailability(RoomType roomType, uint startDate, uint endDate) public view returns (bool) {
        for (uint date = startDate; date <= endDate; date += 1 days) {
            if (rooms[roomType][date].isBooked) {
                return false;
            }
        }
        return true;
    }
    
    function cancelBooking(RoomType roomType, uint startDate, uint endDate) public {
        for (uint date = startDate; date <= endDate; date += 1 days) {
            require(msg.sender == rooms[roomType][date].booker, "Only the booker can cancel this reservation");
            require(rooms[roomType][date].isBooked, "This date is not booked");
            rooms[roomType][date].isBooked = false;
            rooms[roomType][date].booker = address(0);
            rooms[roomType][date].startDate = 0;
            rooms[roomType][date].endDate = 0;
        }
    }
    
    function withdrawFunds() public onlyOwner {
        owner.transfer(address(this).balance);
    }
}
