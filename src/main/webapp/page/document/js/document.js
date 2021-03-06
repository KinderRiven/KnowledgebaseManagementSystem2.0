/* Created by KinderRiven on 2017/3/15. */
var span_type = [
    '<span class="label label-default">',
    '<span class="label label-primary">',
    '<span class="label label-success">',
    '<span class="label label-info">',
    '<span class="label label-warning">',
    '<span class="label label-danger">'
];

function getParameter(name){

    var href = window.document.location.href;
    var pos  = href.indexOf("?");
    var param_str = href.substr(pos + 1);
    var params = param_str.split('&');

    for(var i = 0; i < params.length; i++){
        var _name = '';
        var _val  = '';
        for(var j = 0; j < params[i].length; j++){
            if(params[i][j] == '='){
                _name = params[i].substr(0, j);
                _val = params[i].substr(j + 1);
                if(_name == name){
                    return _val;
                }
            }
        }
    }
    return '';
}

function updateDocumentInfo(doc){

    console.log(doc);

    var name;

    name = document.getElementById('t-title');
    name.innerHTML = doc['name'];

    name = document.getElementById('t-content');
    name.innerHTML = '&nbsp;&nbsp;' + doc['summary'] + '...';

    name = document.getElementById('t-name');
    name.innerHTML = doc['name'];

    name = document.getElementById('t-download');
    name.innerHTML = doc['download'];

    name = document.getElementById('t-collect');
    name.innerHTML = doc['collect'];

    name = document.getElementById('t-usr');
    name.innerHTML = doc['username'];

    name = document.getElementById('t-span');

    var tags = doc['tags'];
    var str = '';
    for(var i = 0; i < tags.length; i++){
        str += span_type[i%6] + tags[i] + '</span>&nbsp;'
    }
    str += '<button type="button" class="btn btn-link">编辑</button>';
    name.innerHTML = str;

    name = document.getElementById('t-date');
    var time = new Date(doc['modify']).Format("yyyy-MM-dd");
    name.innerHTML = time;
}

function getDocument(doc_id){

    $.ajax({
        url : '/doc_get.action',
        type: 'post',
        timeout: 10000,
        dataType : 'json',
        data :{
            'doc_id' : doc_id
        },
        success: function(data){
            //console.log(data);
            updateDocumentInfo(data);
        },
        error: function(data){
            console.log("拉取文件列表失败");
        }
    });
}

function updateSimInfo(data){

    var sim_list = document.getElementById('sim-list');

    var list = '<a class=" list-group-item list-group-item-danger">相关文件</a>';

    for(var i = 0; i < data.length; i++){
        var item = '<a href="' + '/page/document/html/document.html?id='+ data[i].id + '" class="list-group-item">';
        item += '<span class="glyphicon glyphicon-file">&nbsp;</span>';
        item += data[i].name;
        item += '</a>';
        sim_list.innerHTML += item;
    }

}

function getSimDocument(doc_id){

    $.ajax({
        url : '/get_sim_list.action',
        type: 'post',
        timeout: 10000,
        dataType : 'json',
        data :{
            'doc_id' : doc_id
        },
        success: function(data){
            updateSimInfo(data);
        },
        error: function(data){
            console.log("拉取文件列表失败");
        }
    });
}

$(document).ready(function(){

    var doc_id = getParameter("id");
    console.log(doc_id);
    getDocument(doc_id);
    getSimDocument(doc_id);
});