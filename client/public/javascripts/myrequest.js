var MyPage = {
    interval_seed: null,
    loadPage: function() {
        $.ajax({
            url:'/query/request',
            type: 'GET',
            data: {owner:App.account$},
            success: function(data) {
                var data = JSON.parse(data);
                var myrequest = $('#myrequest');
                var template = $('#requestItem');
                for (var i=0; i<data.length; i++) {
                    template.find('.title').text(data[i].title);
                    template.find('.keyword').text(data[i].keyword);
                    template.find('.summary').text(data[i].summary);
                    template.find('.fid').text(data[i].fid);
                    template.find('.hash').text(data[i].hash);
                    template.find('.owner').text(data[i].owner);
                    template.find('.handler').text(data[i].handler);
                    template.find('.price').text(data[i]._price);
                    myrequest.append(template.html());
                }
            },
            error: function(err) {
                console.error(err);
            }
        })
    }
}
