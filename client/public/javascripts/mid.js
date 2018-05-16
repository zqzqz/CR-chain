var interval_seed = null;

$('#upload-form').on('click', '#create', function() {
    var formData = new FormData($("#upload-form")[0]);

    $.ajax({
        url: '/file',
        type: 'POST',
        data: formData,
        timeout: 1000000,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data.hash)
            waitForSeed(data.hash).then(function(fid) {
                clearInterval(interval_seed);
                App.createFile('0x'+fid, formData.get('title'), formData.get('keyword'), formData.get('summary'), '0x'+data.hash);
            });
        },
        error: function(err) {
            alert('file creation failed!');
        }
    });
});

function waitForSeed(hash) {
    return new Promise(function(resolve, reject) {
        // Print out progress every 2 seconds
        interval_seed = setInterval(function () {
            $.ajax({
                url: '/file/seed',
                type: 'GET',
                data: hash,
                success: function(data) {
                    $('.torrent-status').empty();
                    $('.torrent-status').append('<p>waiting for torrent seed ... </p>');
                    $('.torrent-log').empty();
                    for (var i=0; i<data.message.length; i++) {
                        $('.torrent-log').append(data.message[i]);
                    }
                    if (data.fid != "") {
                        resolve(data.fid);
                    }
                },
                error: function(err) {
                    // pass
                }
            })
        }, 2000)
    })
}