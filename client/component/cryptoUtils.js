var crypto = require('crypto');

var default_iv = '2624750004598718';

var Utils = {
    AES_encrypt: function(key, iv, data) {
        var civ = iv;
        if (iv == 0 || iv == null) {
            civ = default_iv;
        }
        var cipher = crypto.createCipheriv('aes-128-cbc', key.toString('hex'), civ);
        var crypted = cipher.update(data, 'binary', 'binary');
        crypted += cipher.final('binary');
        return crypted;
    },

    AES_decrypt: function(key, iv, crypted) {
        var civ = iv;
        if (iv == 0 || iv == null) {
            civ = default_iv;
        }
        var decipher = crypto.createDecipheriv('aes-128-cbc', key.toString('hex'), civ);
        var decoded = decipher.update(crypted, 'binary', 'binary');
        decoded += decipher.final('binary');
        return decoded;
    }
};

module.exports = Utils;