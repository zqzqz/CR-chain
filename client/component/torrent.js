var WebTorrent = require('webtorrent');

var Torrent = {
    client: null,
    current_file: {},
    torrent: null,
    message: [],

    onTorrent: function (torrent) {
        console.log("torrent!")
        Torrent.log('Got torrent metadata!')
        Torrent.log(
        'Torrent info hash: ' + torrent.infoHash + ' ' +
        '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
        '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
        )
        // Print out progress every 5 seconds
        var interval = setInterval(function () {
            Torrent.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
            if ((torrent.progess * 100) == 100) {
                clearInterval(interval)
                Torrent.current_file.hash = torrent.magnetURI;
                $('#upload-form').find('#upload').trigger('upload-done');
            }
        }, 2000)

        torrent.on('done', function () {
            console.log("enter done")
            Torrent.log('Progress: 100%')
            clearInterval(interval)
            // Render all files into to the page
            torrent.files.forEach(function (file) {
                file.appendTo('.Torrent.log')
                Torrent.log('(Blob URLs only work if the file is loaded from a server. "http//localhost" works. "file://" does not.)')
                file.getBlobURL(function (err, url) {
                    if (err) return Torrent.log(err.message)
                    Torrent.log('File done.')
                    Torrent.log('<a href="' + url + '">Download full file: ' + file.name + '</a>')
                })
            })
            Torrent.fid = torrent.infoHash;
        })    
    },

    onSeed: function (torrent) {
        Torrent.log('Got torrent metadata!')
        Torrent.log(
        'Torrent info hash: ' + torrent.infoHash + ' ' +
        '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> '
        )
        Torrent.fid = torrent.infoHash;
        torrent.on('infoHash', function () {
            Torrent.log('Progress: 100%')
            Torrent.fid = torrent.infoHash;
        })
    },

    log: function(str) {
        console.log(str);
        var i = Torrent.message.length - 10;
        if (i > 0) {
            Torrent.message.splice(0, 1);
        }
        Torrent.message.push('<p>'+str+'</p>');
    },

    init: function() {
        Torrent.client = new WebTorrent();
        console.log("webtorrent client setup")
        Torrent.client.on('error', function (err) {
            console.error('ERROR: ' + err.message)
        });
    },

    clear: function() {
        Torrent.fid = "";
        Torrent.message = [];
    }
}


module.exports = Torrent;
