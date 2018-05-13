pragma solidity ^0.4.17;

contract Register {
    struct File {
        bytes20 fid;
        string title;
        address owner;
    }

    mapping(bytes20 => File) fileList;

    event CreateFile(address owner, bytes20 fid, string title);

    function Register() public {

    }

    function createFile(bytes20 _fid, string _title) public {
        File storage newFile = fileList[_fid];
        newFile.fid = _fid;
        newFile.title = _title;
        newFile.owner = msg.sender;
        fileList[_fid] = newFile;
        CreateFile(msg.sender, _fid, _title);
    }

    function getFile(bytes20 _fid) public view returns (string, address) {
        File storage file = fileList[_fid];
        return (file.title, file.owner);
    }
}
