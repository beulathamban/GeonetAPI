console.log('geonet');

$(document).ready(function(){

	//accessing key from json file
	var myKey = JSON.parse(apiKey);
	console.log(myKey[0]);
	myKey = myKey[0].key;
	console.log(myKey);


	//ajax call for Geonet API
	$.ajax({
	  url : 'https://api.geonet.org.nz/intensity?type=reported',
		type :'GET',
		dataType :'json',
		success:function(data){
			console.log(data); // api data
			var markers =[]; // array to store coordinates for the map

			var i; // loop variable

			for (i = 0; i < data.features.length; i++) {

					var obj = {}; // object to store latitude and longitude

				 // console.log('longitude:' , data.features[i].geometry.coordinates[0]);
		  	 // console.log('latitude:' , data.features[i].geometry.coordinates[1]);

				 obj.lat = JSON.parse(data.features[i].geometry.coordinates[1]);
				 obj.lng = JSON.parse(data.features[i].geometry.coordinates[0]);

				 markers.push(obj); //pushing coordinates object into the array


			}
			console.log(markers);

			initMap(markers); // call the map

		}, error:function(){
			console.log('error');
		}

	});//ajax


//dynamically creating script tag and appending to the html body including the apikey
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key='+ myKey ;
document.getElementsByTagName('body')[0].appendChild(script);


//initMap
function initMap(allMarkers) {

	console.log(allMarkers); //coordinates

	var marker =[]; //storing allMarkers

	// The location of Wellington
	var wellington = {lat: -41.2865, lng: 174.7762};

	// The map, centered at Wellington
	var map = new google.maps.Map(
	    document.getElementById('map'), {zoom: 10, center: wellington});

	// The marker, positioned at Welliington
	var i; // loop variable


	for (i =0; i<allMarkers.length; i++) {

	  var latLng = {lat:allMarkers[i].lat , lng:allMarkers[i].lng }

		var marker = new google.maps.Marker({
			position: latLng,
			map: map
		});

    }

  }
}); //document ready
