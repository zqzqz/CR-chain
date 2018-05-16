var Torrent = {
    client: null,
    current_file: {},
    torrent: null,

    onTorrent: function (torrent) {
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
        }, 5000)

        torrent.on('done', function () {
            Torrent.log('Progress: 100%')
            clearInterval(interval)
            Torrent.current_file.hash = torrent.magnetURI;
            $('#upload-form').find('#upload').trigger('upload-done');
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
        })    
    },

    onSeed: function (torrent) {
        Torrent.log('Got torrent metadata!')
        Torrent.log(
        'Torrent info hash: ' + torrent.infoHash + ' ' +
        '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
        '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
        )
        // Print out progress every 5 seconds
        var interval = setInterval(function () {
            Torrent.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
            console.log(torrent)
        }, 5000)

        torrent.on('infoHash', function () {
            Torrent.log('Progress: 100%')
            clearInterval(interval)
            Torrent.current_file.fid = torrent.infoHash;
            $('#upload-form').find('#upload').trigger('upload-done');
        })
    },

    log: function(str) {
        var e = $('.torrent-log');
        var child = e.children();
        if (child.length > 10) {
            child[0].remove();
        }
        e.append('<p>'+str+'</p>');
    },

    init: function() {
        Torrent.client = new WebTorrent();
    }
}


$(function() {
    $(window).load(function() {
        
        Torrent.init();
        Torrent.client.on('error', function (err) {
            console.error('ERROR: ' + err.message)
        })
  
    });
});
