//****************************
//    TArt 
//****************************
var aTArt = new Array();

var TArt = function TART(alista_articulos)
        {
            //campos
            this.codigo='';
            this.descrip='';
            this.aux='';
            this.cant=0;

            this.list = alista_articulos ;//aTArt;

            //constantes
            this.url_get_arts = 'http://test.arrayman.com/pgGped/api/products';//'localhost:1573/api/products';//
            //this.url_get_art = this.url_get_arts + '/' + this.codigo; 
            //Metodos
            this.get_this=get_art;
            this.get_all=get_arts;
            this.tostring=tostring;
            this.add2list=add2list;            
            this.render_as_p=render_as_p;
            this.init = init;

            //properties
            function url_get_art(){
                this.url_get_arts + '/' + this.codigo;   
            }
            //Inicialización    
            this.init();
        };

function init(oArt)
{
    if (this.list==null)
    {
        this.list = aTArt;
    }
}        

function render_as_p()
{
    var s='';
    this.list.forEach(function(oitem) 
    {
        s=s+'<p> '+ oitem.descrip + '</p>';
    });
    return s;
}

function render_as_tmpl(data,stmpl)
{
   // var titleTemplate = $.templates( "<tr><td colspan=3>{{>name}}</td></tr>" ),
   // detailTemplate = $.templates( "<tr><td>{{>name}}</td><td>Released: {{>releaseYear}}</td><td>director: {{>director}}</td></tr>" ),
    var s1= '<ul class="ul_art" data-role="listview" data-inset="true">';
    var sTmp = $.templates('<li>{{>descrip}}</li>');
    var sRend = sTmp.render(data);
    s1 = s1 + sRend +'</ul>';
    return s1;
}

function add2list()
{
    this.list.push(this);
}
function tostring()
{
    return this.codigo + ' ' + this.descrip;
};

function get_art(cod)
{
    var url =  this.url_get_arts + '/' + cod; 
    
    console.log('get_art');

    //jQuery.support.cors = true;
    var lthis = this;
     $.ajax(
     {
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: url, 
            data: '{}', 
            dataType: "json",
            success: function(oItem) 
            {
                lthis.codigo = oItem.codigo;
                lthis.descrip = oItem.descrip;
                lthis.aux = oItem.aux;
                //var s = lthis.tostring;
                $('#lbLog').html(lthis.tostring() + 'ajax_get ok');
                console.log('success');
                //lthis.add2list();

                //for (var i in c) {
                //   $("#ResultsTable tr:last").after("<tr><td>" + c[i][0] + "</td><td>" + c[i][1] + "</td><td>" + c[i][2] + "</td></tr>");
                //} 
            },
            error: function(){
                //$('#your-tweets').append('<li>There was an error loading the feed');
                alert('Error en JsonP');
                $('#lbLog').html('Error en JsonP');
            }
     });  
}


function get_arts()
{
    var url =  this.url_get_arts + '/'; 
    
    console.log('get_artS');

    //jQuery.support.cors = true;
    var lthis = this;
     $.ajax(
     {
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: url, 
            data: '{}', 
            dataType: "json",
            success: function(oItem) 
            {
                $.each(oItem, function (key, item) 
                    {
                        // Add a list item for the product.
                        var oArt = new TArt(lthis.list);
                        oArt.codigo = item.codigo;
                        oArt.descrip = item.descrip;
                        oArt.aux = item.aux;
                        oArt.add2list();
                        //$('<li>', { text: formatItem(item) }).appendTo($('#products'));
                    });
                
                $('#lbLog').html('ajax_get ok ' + lthis.list.length);
                console.log('success');
                
                //lthis.add2list();

                //for (var i in c) {
                //   $("#ResultsTable tr:last").after("<tr><td>" + c[i][0] + "</td><td>" + c[i][1] + "</td><td>" + c[i][2] + "</td></tr>");
                //} 
            },
            error: function(){
                //$('#your-tweets').append('<li>There was an error loading the feed');
                alert('Error en JsonP');
                $('#lbLog').html('Error en JsonP');
            }
     });  
}



