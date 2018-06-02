$(function(){
    $('#search').click(function(){
        var searchOptions = {}
        if($('#fid').val().length>0){
            searchOptions['fid'] = $('#fid').val()
        }
        if($('#title').val().length>0){
            searchOptions['title'] = $('#title').val()
        }
        if($('#owner').val().length>0){
            searchOptions['owner'] = $('#owner').val()
        }
        if($('#keyword').val().length>0){
            searchOptions['keyword'] = $('#keyword').val()
        }
        console.log(searchOptions)
        // var data = [{
        //     title: 'hhhh',
        //     keyword: 'www',
        //     summary: 'aaa',
        //     fid: '111',
        //     hash: '5555',
        //     owner: '123',
        //     handler: '963',
        //     price: '5'
        // }]
        // MyPage.showItems(data)
        $.ajax({
            url: '/query/file',
            type: 'GET',
            data: searchOptions,
            timeout: 1000000,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log("aaaaa")
                MyPage.showItems(data)
            },
            error: function(err) {
                alert('search failed!');
            }
        });
    });
})

var MyPage = {
    loadPage: function(){},
    showItems: function(data){
        console.log(data)
        //var data = JSON.parse(data);
        var searchList = $('#searchList');
        var template = $('#searchItem');
        for (var i=0; i<data.length; i++) {
            template.find('.title').text(data[i].title);
            template.find('.keyword').text(data[i].keyword);
            template.find('.summary').text(data[i].summary);
            template.find('.fid').text(data[i].fid);
            template.find('.hash').text(data[i].hash);
            template.find('.owner').text(data[i].owner);
            template.find('.handler').text(data[i].handler);
            template.find('.price').text(data[i].price);
            searchList.append(template.html());
        }
        
        $('.request').each(function(index, element) {
            $(this).click(function() {
                var requestFid = $(this).siblings('.fid').text();
                console.log("fid", fid);
                $.ajax({
                    url: '/request',
                    type: 'POST',
                    data: requestFid,
                    timeout: 1000000,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        console.log(data)
                        alert('Request successfully!\nPlease wait for response.')                
                    },
                    error: function(err) {
                        alert('request failed!');
                    }
                });
            });                        
        });
    }
}