// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookingStorage {
    event BookingSubmitted(
        address indexed user,
        string ipfsHash,
        uint256 timestamp
    );

    struct Booking {
        address user;
        string ipfsHash;
        uint256 timestamp;
    }

    Booking[] public bookings;

    function submitBooking(string calldata ipfsHash) external {
        bookings.push(Booking(msg.sender, ipfsHash, block.timestamp));
        emit BookingSubmitted(msg.sender, ipfsHash, block.timestamp);
    }

    function getBooking(uint256 index) external view returns (address, string memory, uint256) {
        Booking memory b = bookings[index];
        return (b.user, b.ipfsHash, b.timestamp);
    }

    function getBookingsCount() external view returns (uint256) {
        return bookings.length;
    }
}
