//****************************
//    TArt 
//****************************

com_arrayman_gped_art=
{
    aTArt: new Array(),
    TART : function (alista_articulos)
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
            this.dbget_this=com_arrayman_gped_art.dbget_art;
            this.dbget_all=com_arrayman_gped_art.dbget_arts;
            this.tostring=tostring;
            this.add2list=add2list;            
            this.render_as_p=render_as_p;
            this.init = init;

            //properties
            this.url_get_art = function (){
                this.url_get_arts + '/' + this.codigo;   
            }
            this.insert_tblARTS = function(oArt)
            {
                //return com_arrayman_gped_art.insert_tblARTS(oArt);
                sql = 'insert into tblARTICULOS ' +
                '(codigo, desc, aux ) values ("' + oArt.codigo+ '","' + oArt.descrip + '","' + oArt.aux +'")';
                return sql;

            } 

            //Inicialización    
            this.init();
    },
    oArt: '',
    dbget_art: function(oArt)
    {
        oArt.list.length = 0;
        pck_Db.run_sql(pck_Db.oTDb,pck_Art.select_tblARTS);

    },
    dbget_arts: function(oArt,obs_artItem_added,obs_loaded)
    {
        oArt.list.length = 0;
        pck_Db.select_sql(pck_Db.oTDb,pck_Art.select_tblARTS,on_getData);

        function on_getData(oData)
        {
           var len =  pck_Db.oResult.rows.length;
            console.log("DEMO table: " + len + " rows found.");

            for (var i=0; i<len; i++)
            {
                console.log("Row = " + i + " ID = " + pck_Db.oResult.rows.item(i).id + " Data =  " + pck_Db.oResult.rows.item(i).data);
                if (obs_artItem_added != null)
                {
                    obs_artItem_added(oArt);
                }
            }

            if (obs_loaded != null)
            {
                obs_loaded();
            }
        }

    },
    mas:function()
    {
    },
    create_tblARTS_INE:'',
    insert_tblARTS:''
}

var pck_Art = com_arrayman_gped_art;
pck_Art.oArt = new pck_Art.TART();
//DB
    pck_Art.create_tblARTS_INE = 'CREATE TABLE IF NOT EXISTS tblARTICULOS ' + 
                '( id integer primary key autoincrement, codigo varchar, desc varchar, aux varchar )';

    pck_Art.delete_tblARTS = 'DELETE FROM tblARTICULOS ';  
    pck_Art.select_tblARTS = 'SELECT * FROM tblARTICULOS ';  
    
function init(oArt)
{
    if (this.list==null)
    {
        this.list = pck_Art.aTArt;
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
   // var s1 = '<div id="lvArts" data-role="collapsible" >' +
   //              '<h3> Articulos</h3>' +
   //              '<ul class="ul_art" data-role="listview" data-inset="true">';
   var s1 =     '<h3> Articulos</h3>' +
                '<ul class="ul_art" data-role="listview" data-inset="true">';
    var sTmp = $.templates('<li>{{>descrip}}</li>');
    var sRend = sTmp.render(data);
    s1 = s1 + sRend +'</ul>';//</div>';
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
                //$('#lbLog').html(lthis.tostring() + 'ajax_get ok');
                console.log('success');
                //lthis.add2list();

                //for (var i in c) {
                //   $("#ResultsTable tr:last").after("<tr><td>" + c[i][0] + "</td><td>" + c[i][1] + "</td><td>" + c[i][2] + "</td></tr>");
                //} 
            },
            error: function(){
                //$('#your-tweets').append('<li>There was an error loading the feed');
                alert('Error en JsonP');
                //$('#lbLog').html('Error en JsonP');
            }
     });  
}


function get_arts(obs_artItem_added,obs_loaded)
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
                        var oArt = new pck_Art.TART(lthis.list); // TArt(lthis.list);
                        oArt.codigo = item.codigo;
                        oArt.descrip = item.descrip;
                        oArt.aux = item.aux;
                        oArt.add2list();
                        if (obs_artItem_added != null)
                        {
                            obs_artItem_added(oArt);
                        }
                        //$('<li>', { text: formatItem(item) }).appendTo($('#products'));
                    });
                
                //$('#lbLog').html('ajax_get ok ' + lthis.list.length);
                console.log('success');

                if (obs_loaded != null)
                {
                    obs_loaded();
                }
                
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



