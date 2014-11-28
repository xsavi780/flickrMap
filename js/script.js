var centerPoint = [40.68025, -74.00155];

var map = L.map('map').setView(centerPoint, 13);

L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

var marker = L.marker([40.68025, -74.00155]).addTo(map);
marker.bindPopup("Larry's house").openPopup();

var flickerAPICall = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1b5f00b9d960f3d609069a883711b1bc&lat=40.68&lon=-73.96&radius=5&extras=geo&format=json&nojsoncallback=1&auth_token=72157649060385170-b5782d06a8a409f6&api_sig=7a0c182923d146cf6552fb7bc9edba37";



$.getJSON(flickerAPICall,function(data){
	
	var photoArray = data.photos.photo;
	console.log(photoArray);
	//iterate over each 311 complaint, add a marker to the map
	for(var i=0; i<photoArray.length; i++) {

		var marker = photoArray[i];
		//var icon = getIcon(marker);
		 
		var photoUrl = "https://farm"
			+ marker.farm
			+ ".staticflickr.com/"
			+ marker.server
			+ "/"
			+ marker.id
			+ "_"
			+ marker.secret
			+ ".jpg";

		L.marker( [marker.latitude, marker.longitude],{
			photoUrl:photoUrl
		})
			.bindPopup(
					"<a href = '" 
					+ photoUrl
					+ "'>"
					+ marker.title
					+ "</a>"
				)
			.on('click', function(e) {
				console.log(e);
				console.log("photoUrl was called!");
				$('#photoBox').css('background-image','url(\'' + e.target.options.photoUrl + "')");
			})
			.addTo(map);
	}



});

