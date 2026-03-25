// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DrugTraceability {
    // Drug structure
    struct Drug {
        uint256 id;
        string name;
        string batchId;
        uint256 quantity;
        uint256 manufactureDate;
        uint256 expiryDate;
        address manufacturer;
        address currentOwner;
        DrugStatus status;
        bool exists;
    }

    // Drug status enum
    enum DrugStatus {
        Manufactured,
        InTransit,
        Delivered,
        Recalled
    }

    // Role enum
    enum Role {
        None,
        Manufacturer,
        Distributor,
        Pharmacy,
        Hospital
    }

    // State variables
    mapping(uint256 => Drug) public drugs;
    mapping(uint256 => address[]) public drugHistory;
    mapping(address => Role) public userRoles;
    mapping(address => bool) public registeredUsers;
    
    uint256 public drugCount;
    address public admin;

    // Events
    event DrugRegistered(
        uint256 indexed drugId,
        string name,
        string batchId,
        address indexed manufacturer
    );
    
    event DrugTransferred(
        uint256 indexed drugId,
        address indexed from,
        address indexed to,
        uint256 timestamp
    );
    
    event DrugStatusChanged(
        uint256 indexed drugId,
        DrugStatus newStatus
    );
    
    event UserRegistered(
        address indexed userAddress,
        Role role
    );

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyRegistered() {
        require(registeredUsers[msg.sender], "User not registered");
        _;
    }

    modifier onlyDrugOwner(uint256 _drugId) {
        require(drugs[_drugId].currentOwner == msg.sender, "Not the drug owner");
        _;
    }

    modifier drugExists(uint256 _drugId) {
        require(drugs[_drugId].exists, "Drug does not exist");
        _;
    }

    // Constructor
    constructor() {
        admin = msg.sender;
        userRoles[admin] = Role.Manufacturer;
        registeredUsers[admin] = true;
    }

    // Register a new user
    function registerUser(address _user, Role _role) public onlyAdmin {
        require(!registeredUsers[_user], "User already registered");
        require(_role != Role.None, "Invalid role");
        
        userRoles[_user] = _role;
        registeredUsers[_user] = true;
        
        emit UserRegistered(_user, _role);
    }

    // Register a new drug (only manufacturers)
    function registerDrug(
        string memory _name,
        string memory _batchId,
        uint256 _quantity,
        uint256 _manufactureDate,
        uint256 _expiryDate
    ) public onlyRegistered returns (uint256) {
        require(
            userRoles[msg.sender] == Role.Manufacturer,
            "Only manufacturers can register drugs"
        );
        require(_expiryDate > _manufactureDate, "Invalid expiry date");
        
        drugCount++;
        
        drugs[drugCount] = Drug({
            id: drugCount,
            name: _name,
            batchId: _batchId,
            quantity: _quantity,
            manufactureDate: _manufactureDate,
            expiryDate: _expiryDate,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            status: DrugStatus.Manufactured,
            exists: true
        });
        
        drugHistory[drugCount].push(msg.sender);
        
        emit DrugRegistered(drugCount, _name, _batchId, msg.sender);
        
        return drugCount;
    }

    // Transfer drug to another entity
    function transferDrug(uint256 _drugId, address _to) 
        public 
        onlyRegistered 
        drugExists(_drugId) 
        onlyDrugOwner(_drugId) 
    {
        require(registeredUsers[_to], "Recipient not registered");
        require(_to != msg.sender, "Cannot transfer to yourself");
        
        Drug storage drug = drugs[_drugId];
        drug.currentOwner = _to;
        drug.status = DrugStatus.InTransit;
        
        drugHistory[_drugId].push(_to);
        
        emit DrugTransferred(_drugId, msg.sender, _to, block.timestamp);
    }

    // Update drug status
    function updateDrugStatus(uint256 _drugId, DrugStatus _status)
        public
        onlyRegistered
        drugExists(_drugId)
        onlyDrugOwner(_drugId)
    {
        drugs[_drugId].status = _status;
        emit DrugStatusChanged(_drugId, _status);
    }

    // Get drug information
    function getDrugInfo(uint256 _drugId)
        public
        view
        drugExists(_drugId)
        returns (
            uint256 id,
            string memory name,
            string memory batchId,
            uint256 quantity,
            uint256 manufactureDate,
            uint256 expiryDate,
            address manufacturer,
            address currentOwner,
            DrugStatus status
        )
    {
        Drug memory drug = drugs[_drugId];
        return (
            drug.id,
            drug.name,
            drug.batchId,
            drug.quantity,
            drug.manufactureDate,
            drug.expiryDate,
            drug.manufacturer,
            drug.currentOwner,
            drug.status
        );
    }

    // Get drug history (all owners)
    function getDrugHistory(uint256 _drugId)
        public
        view
        drugExists(_drugId)
        returns (address[] memory)
    {
        return drugHistory[_drugId];
    }

    // Get user role
    function getUserRole(address _user) public view returns (Role) {
        return userRoles[_user];
    }

    // Check if drug is expired
    function isExpired(uint256 _drugId)
        public
        view
        drugExists(_drugId)
        returns (bool)
    {
        return block.timestamp > drugs[_drugId].expiryDate;
    }

    // Get all drugs owned by an address
    function getDrugsByOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 count = 0;
        
        // Count drugs owned by the address
        for (uint256 i = 1; i <= drugCount; i++) {
            if (drugs[i].currentOwner == _owner && drugs[i].exists) {
                count++;
            }
        }
        
        // Create array and populate
        uint256[] memory ownedDrugs = new uint256[](count);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= drugCount; i++) {
            if (drugs[i].currentOwner == _owner && drugs[i].exists) {
                ownedDrugs[index] = i;
                index++;
            }
        }
        
        return ownedDrugs;
    }
}
