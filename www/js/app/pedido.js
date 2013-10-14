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

        function init(oPed)
        {
            if (this.list==null)
            {
                this.list = com_arrayman_gped_ped.aTPed;
            }
        }   

        //constantes
        //this.url_get_peds = 'http://test.arrayman.com/pgGped/api/peds';
        
        //Metodos
            // this.get_this=get_art;
            // this.get_all=get_arts;
            // this.tostring=tostring;
            //this.add2list=add2list;            
        function add2list()
        {
            this.list.push(this);
        }
        // this.render_as_p=render_as_p;
        // this.init = init;

        //properties
        function url_get_ped(){
            this.url_get_peds + '/' + this.codigo;   
        }


        //Inicialización    
        this.init();
    },
    mas:function()
    {
    },
    create_tblPEDS_INE:'',
    create_tblArtXPED_INE:'',
    oPed : ''
}

var pck_Ped = com_arrayman_gped_ped;
oPed = new pck_Ped.TPED();
//DB
    pck_Ped.create_tblPEDS_INE = 'CREATE TABLE IF NOT EXISTS tblPEDS ' + 
        '( id integer primary key autoincrement, codigo varchar, descrip varchar, aux varchar )';

    pck_Ped.create_tblArtXPED_INE = 'CREATE TABLE IF NOT EXISTS tblArtXPED ' + 
        '( id integer primary key autoincrement, ped_cod varchar, art_cod varchar, cantidad integer )';



