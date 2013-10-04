com_arrayman_gped_db = 
{
	TDb : function()
	{
		this.name='gped';
		this.version='0.00';
		this.displayname='Gped DB';
		this.size = 1048576; //1MB
		//seccion PRIVATE
		var oMyDB;
	},
	openDatabase: function()
	{
		oMyDB = window.openDatabase(name,version,displayname,size);
	}


}

var oDb=com_arrayman_gped_db;//com.arrayman.gped.db;

// var myDB = window.openDatabase(“photos”, “1.0”, “Photos DB”, 1000000);

// myDB.executeSQL(‘SELECT * FROM table1’);

// myDB.executeSql(‘DROP TABLE IF EXISTS table1)’);

// myDB.executeSql(‘CREATE TABLE IF NOT EXISTS table1 (id unique, firstname
// varchar, lastname varchar)’);

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