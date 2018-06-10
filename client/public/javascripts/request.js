$(function(){
    $('#search').click(function(){
        var searchOptions = {}
        if($('#fid').val().length>0){
            searchOptions.fid = $('#fid').val()
        }
        if($('#title').val().length>0){
            searchOptions.title = $('#title').val()
        }
        if($('#owner').val().length>0){
            searchOptions.owner = $('#owner').val()
        }
        if($('#keyword').val().length>0){
            searchOptions.keyword = $('#keyword').val()
        }
        console.log(searchOptions)
        $.ajax({
            url: '/query/file',
            type: 'GET',
            data: searchOptions,
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
        var data = JSON.parse(data);
        var searchList = $('#searchList');
        var template = $('#searchItem');
        searchList.empty();
        for (var i=0; i<data.length; i++) {
            if (typeof(data[i].handler[0]) === 'undefined') continue;
            template.find('.title').text(data[i].title);
            template.find('.keyword').text(data[i].keyword);
            template.find('.summary').text(data[i].summary);
            template.find('.fid').text(data[i].fid);
            template.find('.hash').text(data[i].hash);
            template.find('.owner').text(data[i].owner);
            template.find('.handler').text(data[i].handler[0].hid);
            template.find('.price').text(data[i].handler[0].price);
            searchList.append(template.html());
        }
        
        $('.request').each(function(index, element) {
            $(this).click(function() {
                var fid = $(this).siblings('.fid').text();
                var address = $(this).siblings('.handler').text();
                var price = parseInt($(this).siblings('.price').text());
                var msg = prompt("Your message: ","");
                if(msg) {
                    App.requestHandler(address, msg, price);
                } else {
                    App.requestHandler(address, "", price);
                }
                
            });                        
        });
    }
}