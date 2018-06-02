$(function() {
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
                MyPage.waitForSeed(data.hash).then(function(fid) {
                    clearInterval(MyPage.interval_seed);
                    App.createFile('0x'+fid, formData.get('title'), formData.get('keyword'), formData.get('summary'), '0x'+data.hash);
                });
            },
            error: function(err) {
                alert('file creation failed!');
            }
        });
    });
})

var MyPage = {
    interval_seed: null,
    loadPage: function() {
        $.ajax({
            url:'/query/file',
            type: 'GET',
            data: {owner:App.account},
            success: function(data) {
                var data = JSON.parse(data);
                var myfile = $('#myfile');
                var template = $('#fileTemplate');
                for (var i=0; i<data.length; i++) {
                    template.find('.title').text(data[i].title);
                    template.find('.keyword').text(data[i].keyword);
                    template.find('.summary').text(data[i].summary);
                    template.find('.fid').text(data[i].fid);
                    template.find('.hash').text(data[i].hash);
                    template.find('.owner').text(data[i].owner);
                    myfile.append(template.html());
                }

                $('.handle').each(function(index, element) {
                    $(this).click(function() {
                        var handler = $(this).siblings('.handler').text();
                        var fid = $(this).siblings('.fid').text();
                        console.log("fid", fid);
                        var price = 0;
                        if (handler.length < 40) {
                            var msg=prompt("Choose a price: ","");
                            if(msg) {
                                price = parseInt(msg);
                                App.newHandler(fid, price);
                            } else {
                                alert("Incorrect price number!")
                            }
                        } else {
                            alert("The handler is already in function!")
                        }
                    });                        
                });
            },
            error: function(err) {
                console.error(err);
            }
        })
    },

    waitForSeed: function(hash) {
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
}