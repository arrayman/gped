com_arrayman_gped_db = 
{
	TDb : function()
	{
		this.nombre='gped';
		this.version='0.00';
		this.displayname='Gped DB';
		this.size = 1048576; //1MB
		//seccion PRIVATE
		this.oMyDB='';
		
		//this.openDatabase = com_arrayman_gped_db.openDatabase;
		this.openDatabase = function ()
		{
			this.oMyDB=com_arrayman_gped_db.openDatabase(this);
			com_arrayman_gped_db.createTableS_INE(this);
		} 
	},
	oTDb: '',
	kk: 'kk',
	openDatabase : function (oTDb)
	{	//SIN hacer un new. this sera el namespace.!!!!
		var _lthis='';
		if (oTDb == null)
		{
			_lthis = this;
		}
		else
		{
			_lthis = oTDb;
		}

		_lthis.oMyDB = window.openDatabase(_lthis.nombre,_lthis.version,_lthis.displayname,_lthis.size);
		_lthis.oMyDB.midummy='lio';
		return _lthis.oMyDB;
	},
	
	createTableS_INE : function(oTDb)
	{
		// myDB.executeSql(‘CREATE TABLE IF NOT EXISTS table1 (id unique, firstname
		// varchar, lastname varchar)’);
		var _lthis='';
		if (oTDb == null)
		{
			_lthis = this;
		}
		else
		{
			_lthis = oTDb;
		}

		_lthis.oMyDB.transaction(
			function(oTran) //sentenciaS sql
			{ 
				var sSql = 'CREATE TABLE IF NOT EXISTS tblARTICULOS ' + 
				'( id integer primary key autoincrement, codigo varchar, desc varchar, aux varchar )';

				oTran.executeSql(pck_Ped.create_tblPEDS_INE);

				oTran.executeSql(sSql);
				sSql = 'INSERT INTO tblARTICULOS ' +
				' (codigo, desc, aux) VALUES ("0000110", "desc:carniceria","110")';

				oTran.executeSql(sSql);

			},
			function(err) //callback error
			{
				alert("error " + err.code + ' ' + err.message);
			},
			function() //callback OK
			{
				alert("se creo tabla tblARTICULOS ");
			}
		);
	
	},
	mas:function()
	{

	}

}

var pck_Db = com_arrayman_gped_db;
pck_Db.oTDb = new pck_Db.TDb();
//var oTDb = new pck_Db.TDb();

// function openDatabase (oTDb)
// {
// 	if (oTDb == null)
// 	{
// 		_lthis = this;
// 	}
// 	else
// 	{
// 		_lthis = oTDb;
// 	}

// 	_this.oMyDB = window.openDatabase(_this.nombre,_this.version,_this.displayname,_this.size);

// 	return _this.oMyDB;
// }
//com.arrayman.gped.db;
//var oDb com_arrayman_gped_db;





// var myDB = window.openDatabase(“photos”, “1.0”, “Photos DB”, 1000000);

// myDB.executeSQL(‘SELECT * FROM table1’);

// myDB.executeSql(‘DROP TABLE IF EXISTS table1)’);



// myDB.executeSql(‘INSERT INTO TABLE (id, firstname, lastname) VALUES (1,
// “Thomas “, “Myer “)’);

// myDB.executeSql(‘DELETE FROM TABLE where id=1’);


// myDB.transaction(populateDB, errorDB, successDB);
// function populateDB(tx) {
// tx.executeSql(‘DROP TABLE IF EXISTS table1’);
// tx.executeSql(‘CREATE TABLE IF NOT EXISTS table1 (id unique, data varchar)’);
// tx.executeSql(‘INSERT INTO table1 (id, data) VALUES (1, “testing 1”)’);
// tx.executeSql(‘INSERT INTO table1 (id, data) VALUES (2, “testing 2”)’);
// }
// function errorDB(err) {
// alert(“Error processing SQL: “+err);
// }
// function successDB() {
// alert(“success!”);
// }