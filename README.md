# CR-chain
homework project - software engineering

## Depenencies
* npm & nodejs
* truffle
* mongodb

## Prepare Environment
The basic environment is nodejs, along with database and browser plugin. Theoretically windows and linux both works...Let's use linux.  
* Install node first (recommend to install using latest version deb package rather than apt)  
* Install npm (```apt-get install npm``` is fine. A toolkit to manage nodejs packages. Other packages can be installed easily by npm)  
* Install Truffle (ethereum contract framework) ```npm install -g truffle``` (See truffle website for more info)  
* Install mongodb (search "mongodb" on browser directly)  
* Install browser plugin Metamask (chrome or firefox)  
Now you are ready to go!

## Get started
* compile contract and setup ethereum testnet
```bash
cd contract/contracts
truffle develop  # enter console, default to listen port 9545
>> compile
>> migrate
```

* start database
```bash
mongod --dbpath={your path}
mongo   # interact with db in another terminal
```

* install nodejs packages
```bash
npm install
```

* run browser server
```bash
npm run bro
```
listen to port 3000

* run client
```bash
npm run cli
```
listen to port 3001

## Notes
* If you want to install other nodejs packages, install them locally.
```bash
npm install {package name} --save
 ```
* Our client may use Metamask plugin which is available in Chrome or Firefox. See [Truffle Tutorial](http://truffleframework.com/tutorials/pet-shop)
* We mainly use web3 package to implement ethereum contract Apps. Also there is python implementation of web3.
* ```webtorrent``` has been included in package.json. see [WebTorrent doc](https://webtorrent.io/docs)
