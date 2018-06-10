pragma solidity ^0.4.17;
import "./Handler.sol";


contract Register {
    struct File {
        bytes20 fid;
        string title;
        string keyword;
        string summary;
        bytes20 hash;
        address owner;
        uint status;
    }

    struct FHandler {
        Handler addr;
        uint status;
    }

    mapping(bytes20 => File) fileList;
    mapping(bytes20 => FHandler) handlers;

    event CreateFile(address owner, bytes20 fid, string title, 
                     string keyword, string summary, bytes20 hash);
    event DeleteFile(address owner, bytes20 fid);
    event NewHandler(address hid, address owner, bytes20 fid, uint price);
    event RequestHandler(address hid, address from, string message);
    event RespondHandler(address hid, address from, string password);
    event CancelRequest(address hid, address from);

    function Register() public {

    }

    function createFile(bytes20 _fid, string _title, string _keyword, 
                        string _summary, bytes20 _hash) public {
        File storage newFile = fileList[_fid];
        //require(newFile.status == 0);
        newFile.fid = _fid;
        newFile.title = _title;
        newFile.owner = msg.sender;
        newFile.keyword = _keyword;
        newFile.summary = _summary;
        newFile.hash = _hash;
        newFile.status = 1;
        fileList[_fid] = newFile;
        CreateFile(msg.sender, _fid, _title, _keyword, _summary, _hash);
    }

    function getFile(bytes20 _fid) public view returns (string, string, string, bytes20, address,
                                                        uint) {
        File storage file = fileList[_fid];
        return (file.title, file.keyword, file.summary, file.hash, file.owner, file.status);
    }

    function getHandler(bytes20 _fid) public view returns (address, uint) {
        FHandler storage handler = handlers[_fid];
        return (handler.addr, handler.status);
    }

    function deleteFile(bytes20 _fid) public {
        File storage file = fileList[_fid];
        require(file.status > 0);
        require(file.owner == msg.sender);
        file.status = 0;
        fileList[_fid] = file;
        DeleteFile(msg.sender, _fid);
    }

    function newHandler(bytes20 _fid, uint _price) public {
        File storage file = fileList[_fid];
        require(file.status > 0 && file.owner == msg.sender);
        Handler newContract = new Handler(msg.sender, _fid, _price);
        FHandler storage handler = handlers[_fid];
        handler.addr = newContract;
        handler.status = 1;
        handlers[_fid] = handler;
        NewHandler(newContract, msg.sender, _fid, _price);
    }

    function requestHandler(address _addr, string _message) public payable {
        Handler handlerContract = Handler(_addr);
        handlerContract.requestFile.value(msg.value)(msg.sender, _message);
        RequestHandler(_addr, msg.sender, _message);
    }

    function respondHandler(address _addr, address _from, string _password) public {
        Handler handlerContract = Handler(_addr);
        handlerContract.respondFile(msg.sender, _from, _password);
        RespondHandler(_addr, _from, _password);
    }

    function cancelRequest(address _addr) public {
        Handler handlerContract = Handler(_addr);
        handlerContract.cancelRequest(msg.sender);
        CancelRequest(_addr, msg.sender);
    }

}
