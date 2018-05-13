# CR-chain
homework project - software engineering

## Depenencies
* truffle
* npm & nodejs
* mongodb

## Get started
* compile contract and setup ethereum testnet
```bash
cd contract
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
listen to 3001

## Notes
* If you want to install other nodejs packages, install them locally.
```bash
npm install {package name} --save
 ```
* Our client may use Metamask plugin which is available in Chrome or Firefox. See [Truffle Tutorial](http://truffleframework.com/tutorials/pet-shop)
* We mainly use web3 package to implement ethereum contract Apps. Also there is python implementation of web3.
* ```bittorent-dht``` has been included in package.json
