pragma solidity ^0.4.17;

contract Register {
    struct File {
        bytes20 fid;
        string title;
        address owner;
    }

    mapping(bytes20 => File) fileList;

    event CreateFile(address _owner, bytes20 _fid);

    function TinyGame() public {

    }

    function createFile(bytes20 _fid, string _title) public {
        File storage newFile = fileList[_fid];
        newFile.fid = _fid;
        newFile.title = _title;
        newFile.owner = msg.sender;
        fileList[_fid] = newFile;
        CreateFile(msg.sender, _fid);
    }

    function getFile(bytes20 _fid) public returns (string, address) {
        File storage file = fileList[_fid];
        return (file.title, file.owner);
    }
}
