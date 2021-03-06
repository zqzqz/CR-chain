App = {
  
    contracts: {},
    accounts: null,
    account: null,
  
    /*
     * entry function: init App.account, contract and event
     */
    init: function() {
        return App.initWeb3();
    },
  
    initWeb3: function() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 App.contracts.Register, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-gamemask")
            // Use Mist/MetaMask's provider
            web3 = new Web3(web3.currentProvider);
        } else {
            console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-gamemask");
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
        }
        return App.initContract();
    },
     
    initContract: function() { 
      
        // init contract
        $.getJSON('/jsons/Register.json', function(data) {
            artifacts = data;
            App.contracts.Register = TruffleContract(artifacts);
            App.contracts.Register.setProvider(web3.currentProvider);
            web3.eth.getAccounts(function(err, accs) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }
    
                if (accs.length == 0) {
                    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                    return;
                }
      
                App.accounts = accs;
                App.account = App.accounts[0];
                console.log("account normal: ", App.account);
                return App.loadPage();
            }); 
        });  
    },  
     
    loadPage: function() {
        MyPage.loadPage();
    },
  
    /*
     * callee of create button
     */
    createFile: function(fid, title, keyword, summary, hash) {
        App.contracts.Register.deployed().then(function(instance) {
            console.log(fid, title, keyword, summary, hash);
            instance.createFile.sendTransaction(fid, title, keyword, summary, hash, {from: App.account});
        }).then(function(value) {
            console.log("operation succeed");
        }).catch(function(e) {
            console.log(e);
            console.error("Operation failed");
        });
    },

    deleteFile: function(fid) {
        App.contracts.Register.deployed().then(function(instance) {
            instance.deleteFile.sendTransaction(fid, {from: App.account});
        }).then(function(value) {
            console.log("operation succeed");
        }).catch(function(e) {
            console.log(e);
            console.error("Operation failed");
        });
    },

    requestHandler: function(addr, message, price) {
        console.log(addr, message);
        App.contracts.Register.deployed().then(function(instance) {
            instance.requestHandler.sendTransaction(addr, message, {from: App.account, value:price});
        }).then(function(value) {
            console.log("operation succeed");
        }).catch(function(e) {
            console.log(e);
            console.error("Operation failed");
        });
    },

    respondHandler: function(addr, from, password) {
        App.contracts.Register.deployed().then(function(instance) {
            instance.respondHandler.sendTransaction(addr, from, password, {from: App.account});
        }).then(function(value) {
            console.log("operation succeed");
        }).catch(function(e) {
            console.log(e);
            console.error("Operation failed");
        });
    },

    cancelRequest: function(addr) {
        App.contracts.Register.deployed().then(function(instance) {
            instance.cancelRequest.sendTransaction(addr, {from: App.account});
        }).then(function(value) {
            console.log("operation succeed");
        }).catch(function(e) {
            console.log(e);
            console.error("Operation failed");
        });
    },

    /*
     *  create a nre Handler contarct
     */
    newHandler: function(fid, price) {
        console.log(fid, price);
        App.contracts.Register.deployed().then(function(instance) {
            instance.newHandler.sendTransaction(fid, price, {from:App.account});
        }).then(function(value) {
            console.log("operation newHandler succeed");
        }).catch(function(e) {
            console.log("operation newHandler failed", e);
        })
    },



} 
  
$(function() {
    $(window).load(function() {
        
        App.init();
    });
});


  
  
