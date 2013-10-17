com_arrayman_gped_ped=
{
    aTPed: new Array(),
    TPED : function (alista_pedidos)
    {
        //campos
        this.codigo='';
        this.fecha='';
        this.descrip='';
            
        this.list = alista_pedidos ;//aTPed;

        this.init = function init()
        {
            if (this.list==null)
            {
                this.list = com_arrayman_gped_ped.aTPed;
            }
        }   

        //constantes
        
        //Metodos
        this.add2list = function add2list()
        {
            this.list.push(this);
        }
    
        //properties
        function url_get_ped(){
            this.url_get_peds + '/' + this.codigo;   
        }

        this.db_Crud = pck_Ped.db_Crud;

        //Inicialización    
        this.init();
    },
    // dbget_ped: function(oPed)
    // {
    //     //oArt.list.length = 0;
    //     pck_Db.run_sql(pck_Db.oTDb,pck_Ped.cRud_tblPEDS);

    // },
    dbget_peds: function(poPed,obs_artItem_added,obs_loaded)
    {
        poPed.list.length = 0;
        pck_Db.select_sql(pck_Db.oTDb,pck_Ped.cRud_tblPEDS,on_getData);

        function on_getData(oData)
        {
           var len =  pck_Db.oResult.rows.length;
            console.log("tblPEDS: " + len + " registros encontrados.");

            for (var i=0; i<len; i++)
            {
                var oitem = pck_Db.oResult.rows.item(i);
                //console.log("Row = " + i + " ID = " + oitem.id + " Data =  " + oitem.desc);
                // Add a list item for the product.

                var oPed = new pck_Ped.TPED(poPed.list); // TArt(lthis.list);
                oPed.id = oitem.id; 
                oPed.codigo = oitem.codigo;
                oPed.descrip = oitem.descrip;
                oPed.fecha =  oitem.fecha;
                oPed.add2list();

                if (obs_artItem_added != null)
                {
                    obs_artItem_added(oPed);
                }
            }

            if (obs_loaded != null)
            {
                obs_loaded();
            }
        }

    },
    render_as_tmpl : function(data,stmpl)
    {        //<a href="index.html" data-role="button" data-icon="delete" data-iconpos="notext" onclick="grid_click()">borrar</a>
        function botones(id)
        {
            //return '<a href="index.html" data-role="button" data-icon="delete" data-iconpos="notext" onclick="grid_click('+ id +')">borrar</a>';
        }
        var sTmp = $.templates( '<div class="ui-block-a"> ' + 
                                    '<div data-role="controlgroup" data-type="horizontal" data-mini="true">' +
                                        '<a href="" data-role="button" data-icon="delete" data-iconpos="notext" onclick="grid_click({{>id}},' + 'b' + ')">borrar</a>' + 
                                        '<a href="" data-role="button" data-icon="check" data-iconpos="notext" onclick="grid_click({{>id}},' + 'g' + ')">grabar</a>' + 
                                        '<a href="" data-role="button" data-icon="arrow-d" data-iconpos="notext" onclick="grid_click(1,d)">Down</a>' +
                                     '</div>' + 
                                '</div>' +
                                '<div class="ui-block-b">{{>codigo}} </div>' + 
                                '<div class="ui-block-c">{{>descrip}} </div>');

        var sRend = sTmp.render(data);
        
        return sRend;
    },
    mas:function()
    {
    },
    db_Crud_tblPEDS:function(oPed)
    {
        sql = 'insert into tblPEDS ' +
                '(codigo, descrip, fecha ) values ("' + oPed.codigo+ '","' + oPed.descrip + '","' + oPed.fecha +'")';
                return sql;
    },
    create_tblPEDS_INE:'',  
    create_tblArtXPED_INE:'',
    cruD_tblPEDS:'', //delete
    cruD_tblArtXPED:'', //delete
    cRud_tblPEDS:'', //recovery

    oPed : ''
}

var pck_Ped = com_arrayman_gped_ped;
    pck_Ped.oPed = new pck_Ped.TPED();

//DB
    pck_Ped.create_tblPEDS_INE = 'CREATE TABLE IF NOT EXISTS tblPEDS ' + 
        '( id integer primary key autoincrement, codigo varchar, descrip varchar, fecha varchar )';

    pck_Ped.create_tblArtXPED_INE = 'CREATE TABLE IF NOT EXISTS tblArtXPED ' + 
        '( id integer primary key autoincrement, ped_cod varchar, art_cod varchar, cantidad integer )';



    pck_Ped.cruD_tblPEDS = 'DELETE FROM tblPEDS ';  
    pck_Ped.cruD_tblArtXPED = 'DELETE FROM tblArtXPED ';  

    pck_Ped.cRud_tblPEDS = 'SELECT * FROM tblPEDS ';  

    

// function render_as_tmpl(data,stmpl)
// {
//    // var titleTemplate = $.templates( "<tr><td colspan=3>{{>name}}</td></tr>" ),
//    // detailTemplate = $.templates( "<tr><td>{{>name}}</td><td>Released: {{>releaseYear}}</td><td>director: {{>director}}</td></tr>" ),
//    // var s1 = '<div id="lvArts" data-role="collapsible" >' +
//    //              '<h3> Articulos</h3>' +
//    //              '<ul class="ul_art" data-role="listview" data-inset="true">';
//    var s1 =     '<h3> Articulos</h3>' +
//                 '<ul class="ul_art" data-role="listview" data-inset="true">';
//     var sTmp = $.templates('<li>{{>descrip}}</li>');
//     var sRend = sTmp.render(data);
//     s1 = s1 + sRend +'</ul>';//</div>';
//     return s1;
// }