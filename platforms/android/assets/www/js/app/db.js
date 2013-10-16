com_arrayman_gped_db = 
{
	TDb : function()
	{
		this.nombre='gped';
		this.version='0.00';
		this.displayname='Gped DB';
		this.size = 1048576; //1MB 1000;//
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
	oResult : '',
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
	select_sql :function(oTDb,select_sql,observer)
	{
		if (oTDb.oMyDB.transaction == null)
		{
			//oTDb.oMyDB = oTDb.openDatabase(oTDb);
			oTDb.openDatabase(oTDb);
		}

		function do_select(oTran)
		{
			oTran.executeSql(
				select_sql,
				[],
				function(oTran,oResult) //success
				{
					console.log("Returned rows = " + oResult.rows.length);	
					com_arrayman_gped_db.oResult = oResult;	
					if (observer != null)
						observer(oResult);
				},
				error_select
			);
		};
		
		function error_select()
		{
			console.log("error " + err.code + ' ' + err.message);
		};

		oTDb.oMyDB.transaction(do_select, error_select);
	},
	run_sql : function(oTDb,sql,observer)
	{	
		if (oTDb.oMyDB.transaction == null)
		{
			//oTDb.oMyDB = oTDb.openDatabase(oTDb);
			oTDb.openDatabase(oTDb);
		}
		
		oTDb.oMyDB.transaction(
			function (oTran)
			{
				console.log(sql);
				oTran.executeSql(sql);
			},
			function(err)
			{
				//alert("error " + err.code + ' ' + err.message);
				console.log("error ejecutando " + sql + err.code + ' ' + err.message);
				if (observer != null)
					observer('no se pudo insertar');
			},
			function()
			{
				if (observer != null)
					observer();	//ok 
			}
		);
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

				oTran.executeSql(pck_Art.create_tblARTS_INE);

				oTran.executeSql(pck_Ped.create_tblPEDS_INE);

				oTran.executeSql(pck_Ped.create_tblArtXPED_INE);

			},
			function(err) //callback error
			{
				alert("error " + err.code + ' ' + err.message);
			},
			function() //callback OK
			{
				//alert("se creo tabla tblARTICULOS ");
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