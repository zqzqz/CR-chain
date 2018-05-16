# DOC
实现了一个基本功能：fileCreate。打通了client合约调用，client torrent上传，browser监听，browser写查数据库以及client调用browser的web API。搭建好环境之后，仿照示例扩展功能即可。使用nodejs一把梭的话，环境安装好node&npm和数据库即可。

## contract
* 目录```/contract```是truffle标准目录
    * ```/contracts``` 合约sol文件
    * ```/migrations``` truffle部署合约的自动脚本
    * ```/test``` 测试脚本，使用```truffle test```执行
* 使用方法
```bash
cd contract/contracts
truffle develop
> migrate
```

## client-contract interfaces
* 需要使用Metamask，该插件会在前端注入web3对象。
* 关键文件 ```/client/public/javascripts/app.js``` 参考fileCreate方法
* 接口调用成功会在前端弹出插件对话框。如果gas值很大，可能合约方法出错，调用将失败。

## client-torrent interfaces
* 使用nodejs webtorrent 见文件```/client/component/torrent.js```，尚未完善。
* 上传使用seed方法，下载使用add方法，分别调用回调函数onSeed，onTorrent。
* 上传文件使用/file路径，调用链：```public/myfile.js```,```routes/file.js```,```component/torrent.js```  
* 为了在前端实时反馈后端进度，使用/file/seed路径，返回当前torrent状态。前端可以每n秒访问一次。

## browser-contract listening
* 事件监听见```/browser/component/event.js```，将监听得到的数据存入数据库。
* 数据库见 ```/browser/database/models.js```，目前只包含file，还需进一步设计。库名chaindb。

## client-browser query
* browser: ```/browser/routes/index.js```
* client: ```/client/routes/query.js```

## notes
* 重新启动truffle develop rpc可能导致transaction标识变化，从而Metamask交易提交失败或者browser监听失败。建议每次重新用Mnemonic恢复账户，如果还不行，卸载Metamask重装。如果再不行，一定是程序错了。
* mongodb是非关系数据库，属性可以存数组等，不必遵守关系表的原则。也不用设置主键，会自己生成。
* 加密写了些基本的方法，但现版本没有用。这种表面看不到的是优先级最低的。
* 可以稍微注意nodejs的代码风格，缩进4字符，加（还是不加）分号，ES5等。我的风格就很差。
* contract在目录```/contract/contracts```才能编译通过，未解决。
* client应用需要将```/contract/build/contracts```中的json文件copy到```/client/public/jsons```，尚未找到好办法。
* 如果被刘毙了，我TM想哭。


