pragma solidity ^0.4.17;

contract Handler {

    address public owner;
    bytes20 public fid;
    uint public price;

    address[] public users;

    struct Request {
        string message;
        uint status;
    }

    mapping(address => Request) requests;

    event RequestFile(address from, string message);
    event RespondFile(address from, string password);
    event CancelRequest(address from);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier onlyRegister {
        //require(msg.sender == "register address");
        _;
    }

    function Handler(address _owner, bytes20 _fid, uint _price) public {
        owner = _owner;
        fid = _fid;
        price = _price;
    }

    function getStatus() public view returns (address, bytes20, uint, address[]) {
        return (owner, fid, price, users);
    }

    function getRequest(address _from) public view returns (string, uint) {
        Request storage request = requests[_from];
        return (request.message, request.status);
    }

    function requestFile(address _from, string _message) public payable {
        require(msg.value == price);
        Request storage request = requests[_from];
        request.message = _message;
        request.status = 1;
        RequestFile(_from, _message);
    }

    function respondFile(address _sender, address _from, string _password) public {
        require(_sender == owner);
        Request storage request = requests[_from];
        require(request.status == 1);
        request.status = 2;
        requests[_from] = request;
        users.push(_from);
        RespondFile(_from, _password);
    }

    function cancelRequest(address _from) public {
        Request storage request = requests[msg.sender];
        require(request.status == 1);
        msg.sender.transfer(price);
        request.status = 0;
        requests[msg.sender] = request;
        CancelRequest(_from);
    }

    function withdraw(uint _ammount) public onlyOwner {
        owner.transfer(_ammount);
    }

}
