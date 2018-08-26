		var tam;
		var farmacias = [];
		var distancias = [];
		var estouAqui;
		var p = 0;
		var l = 0;
		var aux = 0;
		var lim = 0;
		var tm2;
		var tm3;
		var tm5;
		var liberado = false;
		var liberTel = false;
		
		document.addEventListener("deviceready", onDeviceReady, false)

        function onDeviceReady() {
                FastClick.attach(document.body);
                ga_storage._setAccount('UA-102229152-1'); //Replace with your own
				ga_storage._trackPageview('/index.html');
				
				checkConnection();
				try{
					var push = PushNotification.init({
					
					android: {
						senderID: "521237507632"
					},
					browser: {
						pushServiceURL: 'http://push.api.phonegap.com/v1/push'
					},
					ios: {
						alert: "true",
						badge: "true",
						sound: "true"
					},
					windows: {}
					});

					push.on('registration', function(data) {
						
												
						
						var regID = data.registrationId;
						
						
					});

					push.on('notification', function(data) {
						//alert('oi2');
						//alert(data.message);
						navigator.notification.alert(
							data.message,  // message
							alertDismissed,         // callback
							'Notificação',            // title
							'OK'                  // buttonName
						); 	
						// data.title,
						// data.count,
						// data.sound,
						// data.image,
						// data.additionalData
					});

					push.on('error', function(e) {
						//alert('iiii');
						alert (e.message)
					});
				}catch(ex){
					alert(ex.message)
				}
				
				function alertDismissed() {
							// do somethings
				}
        }
		
		
		$(document).ready(function(){
			$('#busca').on('change', function (event) {
				if ($('#busca').val() !=="")
				localStorage.setItem("busca",$('#busca').val())
				location.href = "produtos.html";
			});
			tam = $('.ui-content').css('height')
			tam = tam.replace('px','')
			tam = parseInt(tam) /2 + 'px';
			$('.ui-content').css('height',tam)
						
		});
		
		function carregarFarmacias(local){
		
										
						
						try{
								
								 var request = {
									location: local,
									radius: '1200',
									types: ['pharmacy']
								  };

								  //service = new google.maps.places.PlacesService(map);
								  
								  var service = new google.maps.places.PlacesService(document.createElement('div'));
											
								  service.nearbySearch(request, callback);
								  function callback(results, status) {
									
									
									  if (status == google.maps.places.PlacesServiceStatus.OK) {
										farmacias = results;
										
																	

										liberado = true;
										
								
											tm2 = setInterval(function(){ 
												var i = p;
												
												if (p == farmacias.length) clearInterval(tm2)
												//alert(farmacias[i])
												var endereco = farmacias[i].vicinity;
												
													if (liberado){
														liberado = false;
														CalculaDistancia(estouAqui, endereco)
																					
													}
													
											}, 100);
												
											tm3 = setInterval(function(){ 
						
													lim = lim +1;
																							
																	
											}, 1000);
									
										}else{
											var html = '<li class="itRemedios" style="padding-left: 8px;"><p class="wrap1">Nenhuma farmácia nas proximidades.</p></li>';
											$('#listview').append(html);
											$("#listview").listview("refresh");
											clearInterval(tm2)
											clearInterval(tm)
											clearInterval(tm3)
											$('.aguarde').remove();
										}
								  }
							
								
						}catch(ex){
							//alert(ex.message)
							if (ex.message == 'JSON.parse: unexpected end of data at line 3 column 1 of the JSON data'){
								
								var html = '<li class="itRemedios" style="padding-left: 8px;"><p class="wrap1">Nenhuma farmácia nas proximidades.</p></li>';
								$('#listview').append(html);
								$("#listview").listview("refresh");
								clearInterval(tm2)
								clearInterval(tm)
								clearInterval(tm3)
								$('.aguarde').remove();
							}
							
						}
								
					
				 
		}
		
		var tm = setInterval(function(){ 
			
			//if (p == farmacias.length-2 || lim >= 5) {

			if (p == farmacias.length && farmacias.length >0 || lim >= 5) {


				
				//try{
					
					clearInterval(tm2)
					clearInterval(tm)
					clearInterval(tm3)
														farmacias.sort(function(a,b) {if (b.distancia != undefined && a.distancia != undefined)return (parseFloat(a.distancia.replace(',','.')) > parseFloat(b.distancia.replace(',','.'))) ? 1 : ((parseFloat(b.distancia.replace(',','.')) > parseFloat(a.distancia.replace(',','.'))) ? -1 : 0);} );
														liberTel = true;
														farmacias.sort(function(a,b) {if (b.distancia != undefined && a.distancia != undefined)return (parseFloat(a.distancia.replace(',','.')) > parseFloat(b.distancia.replace(',','.'))) ? 1 : ((parseFloat(b.distancia.replace(',','.')) > parseFloat(a.distancia.replace(',','.'))) ? -1 : 0);} );
														farmacias.sort(function(a,b) {if (b.distancia != undefined && a.distancia != undefined)return (parseFloat(a.distancia.replace(',','.')) > parseFloat(b.distancia.replace(',','.'))) ? 1 : ((parseFloat(b.distancia.replace(',','.')) > parseFloat(a.distancia.replace(',','.'))) ? -1 : 0);} );
														for (var x=0;x<p;x++){
															
															if (farmacias[x].telefone == undefined){
																if (farmacias[x].distancia !== undefined ){
																	if (farmacias[x].distancia.indexOf("km") == -1) farmacias[x].distancia =  farmacias[x].distancia.replace("0,0","");
																	var tel=""
																	var endereco = farmacias[x].vicinity 
																	var html = '<li class="itRemedios" style="padding-left: 8px;"><p class="wrap1">' + farmacias[x].name + '</p><p class="wrap2">' + endereco + '</p><div id = div_' + farmacias[x].place_id + '><a id =' + farmacias[x].place_id + '  class="wrap4 ui-btn" href="tel:' + farmacias[x].telefone +'">Carregando...</a></div><p class="wrap3">'+ farmacias[x].distancia +'</p></li>';
																
																	
																	$('#listview').append(html);
																	$("#listview").listview("refresh");
																	$('a').removeClass('ui-btn-icon-right ui-icon-carat-r')
																	$('.ui-listview>li').css("border-bottom","solid")
																	$('.ui-listview>li').css("border-width","1px")
																	$('.ui-listview>li').css("border-color","#D0D0D0")
																
																}
															} else{
																if (farmacias[x].distancia !== undefined ){
																	if (farmacias[x].distancia.indexOf("km") == -1) farmacias[x].distancia =  farmacias[x].distancia.replace("0,0","");
															
																	var tel=""
																	var endereco = farmacias[x].vicinity 
																	var html = '<li class="itRemedios" style="padding-left: 8px;"><p class="wrap1">' + farmacias[x].name + '</p><p class="wrap2">' + endereco + '</p><a id =' + farmacias[x].place_id + ' class="wrap4 ui-btn" href="tel:' + farmacias[x].telefone +'">' +  farmacias[x].telefone +'</a><p class="wrap3">'+ farmacias[x].distancia +'</p></li>';
																	
																	
																	$('#listview').append(html);
																	$("#listview").listview("refresh");
																	$('a').removeClass('ui-btn-icon-right ui-icon-carat-r')
																	$('.ui-listview>li').css("border-bottom","solid")
																	$('.ui-listview>li').css("border-width","1px")
																	$('.ui-listview>li').css("border-color","#D0D0D0")
																
																}
															}
														}
														
														$('.aguarde').remove();
					
				
					
					
					
				//}catch(ex){
//					alert(ex.message)
	//			}
				
			}
			
							
		}, 600);
		
		
			var tm5 = setInterval(function(){ 
				   if (farmacias[l] != undefined && liberTel){
										liberTel = false;		
										var service = new google.maps.places.PlacesService(document.createElement('div'));
										service.getDetails({
											  placeId: farmacias[l].place_id
												}, function(place, status) {
												  if (status === google.maps.places.PlacesServiceStatus.OK) {
													//alert(farmacias[l].place_id)				  
													farmacias[l].telefone = place.formatted_phone_number
													if (farmacias[l].telefone == undefined){
														$('#' + farmacias[l].place_id).remove()
													} else{
														$('#' + farmacias[l].place_id).attr("href","tel:" + farmacias[l].telefone)
														$('#' + farmacias[l].place_id).html('Tel: ' + farmacias[l].telefone);
														$('#' + farmacias[l].place_id).css('visibility', 'visible');
													}
													
													l = l+1;	
													liberTel = true;		
													if (l == farmacias.length) {
														localStorage.setItem("farmacias",JSON.stringify(farmacias));
														clearInterval(tm5)
													}
												}
										});
				   }	
								   
																	
																
			}, 300);
		
		
		
		//
		
		
		if ( navigator.geolocation ) {
				function success(pos) {
					
					 GetAddress(pos.coords.latitude, pos.coords.longitude);			
				}
				function fail(error) {
					//drawMap(defaultLatLng);  // Failed to find location, show default map
				}
				// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
				navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
			
		}
		
		function GetAddress(lat,lng) {

				var latlng = new google.maps.LatLng(lat, lng);
				var geocoder = geocoder = new google.maps.Geocoder();
				geocoder.geocode({ 'latLng': latlng }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[1]) {

							//endereco = results[0].formatted_address + ' ' + results[1].formatted_address;

							obj = results[0];
							
							estouAqui= obj.address_components[1].short_name + ',' + obj.address_components[0].short_name + ' - ' + obj.address_components[2].short_name + ' - ' + obj.address_components[3].short_name;
							var cep = obj.address_components[7].short_name;
							//var latlng2 = new google.maps.LatLng(-23.001333, -43.366054);
							
							
							carregarFarmacias(latlng);

						}
					}
				});
		}	
		
		 function CalculaDistancia(origem,destino) {
				
                //Instanciar o DistanceMatrixService
				//destino = "RUA MARQUES DE ABRANTES, 34 - FLAMENGO - RIO DE JANEIRO"
                var service = new google.maps.DistanceMatrixService();
                //executar o DistanceMatrixService
				
                service.getDistanceMatrix(
                  {
                      //Origem
                      origins: [origem],
                      //Destino
                      destinations: [destino],
                      //Modo (DRIVING | WALKING | BICYCLING)
                      travelMode: google.maps.TravelMode.DRIVING,
                      //Sistema de medida (METRIC | IMPERIAL)
                      unitSystem: google.maps.UnitSystem.METRIC
                      //Vai chamar o callback
                  }, callback);
        }
            //Tratar o retorno do DistanceMatrixService
        function callback(response, status) {
				//alert('verificando')
                //Verificar o Status
                if (status != google.maps.DistanceMatrixStatus.OK){
                    //Se o status não for "OK"
                    //$('#litResultado').html(status);
					//distancias.push("N")
                }else {
                    //Se o status for OK
                    //Endereço de origem = response.originAddresses
                    //Endereço de destino = response.destinationAddresses
					//alert(nome)
					try{ 
						
						var Distancia = response.rows[0].elements[0].distance.text
						
						if (Distancia.indexOf("km") == -1) Distancia = "0,0" + Distancia
						farmacias[p].distancia = Distancia
						
						
					}catch(ex){}
                   
                    //Duração = response.rows[0].elements[0].duration.text
					
					//return Distancia;
                    
                }
				liberado = true;
				p = p+1;
        }
		
	
		
		function checkConnection() {
			try{
					
				
				var networkState = navigator.connection.type;
		 
				var states = {};
				states[Connection.UNKNOWN]  = 'Unknown connection';
				states[Connection.ETHERNET] = 'Ethernet connection';
				states[Connection.WIFI]     = 'WiFi connection';
				states[Connection.CELL_2G]  = 'Cell 2G connection';
				states[Connection.CELL_3G]  = 'Cell 3G connection';
				states[Connection.CELL_4G]  = 'Cell 4G connection';
				states[Connection.CELL]     = 'Cell generic connection';
				states[Connection.NONE]     = 'No network connection';
				
				if (states[networkState]=='No network connection') {
					var html = '<li class="itRemedios" style="padding-left: 8px;"><p class="wrap1">Sem conexão disponível.</p><a class="wrap5 ui-btn" href="#" onclick="semCon()">Tentar novamente</a></li>';
					$('#listview').append(html);
					$("#listview").listview("refresh");
					$('a').removeClass('ui-btn-icon-right ui-icon-carat-r')
					$('.ui-listview>li').css("border-bottom","solid")
					$('.ui-listview>li').css("border-width","1px")
					$('.ui-listview>li').css("border-color","#D0D0D0")
					$('.aguarde').remove();
				}
				
			}catch(ex){
				alert(ex.message)		
			}
			 
		}
		
		function semCon(){ window.location.href= 'index.html';}
		
		