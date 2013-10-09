/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 //import com_arrayman_gped_db from 'db.js';
var oApp = 
{
	//var name = 'oApp';
	init:function($p1){
		console.log('init '+ this + '  ' + $p1);
		//alert('init '+ this + '  ' + $p1);
		
		this.EnlazaEventos();
		this.version = 'v1.00.00';
		
	},
	
	EnlazaEventos:function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		//alert('EnlazaEventos' + this.name);
		console.log('EnlazaEventos' + this.name);
	},
	
	onDeviceReady: function(id){
		//alert('onDeviceReady' + this.name);
		console.log('onDeviceReady' + this.name);
        oApp.receivedEvent('deviceready');

        //oTDb = new pck_Db.TDb();
        pck_Db.oTDb.openDatabase();
		alert('dispositivo listo');
	},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
