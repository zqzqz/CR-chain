var DHT = require('bittorrent-dht');

var dht = new DHT();
dht.listen(20000, function() {
    console.log("dht now listening");
});

dht.on('peer', function (peer, infoHash, from) {
    // pass
});

var dht_handler = {
    put: function(value) {
        return new Promise(function(resolve, reject) {
            dht.put({v: value}, function (err, hash) {
                if (err) {
                    reject("error in DHT put");
                } else {
                    resolve(hash);
                }
            });
        });
    },

    get: function(hash) {
        return new Promise(function(resolve, reject) {
            dht.put(hash, {}, function (err, res) {
                if (err) {
                    reject("error in DHT get");
                } else {
                    resolve(res);
                }
            });
        });
    }
};

module.exports = dht_handler;