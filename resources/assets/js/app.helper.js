export var calculateDistanceBetweenTwoPoint = function(address1, address2, callback){
	var directionsService = new google.maps.DirectionsService();

	var request = {
		origin      : address1, // a city, full address, landmark etc
		destination : address2,
		travelMode  : google.maps.DirectionsTravelMode.DRIVING
	};

	directionsService.route(request, function(response, status) {
		if ( status == google.maps.DirectionsStatus.OK ) {
			console.log(response.routes[0].legs[0].distance);
			if(callback)
				callback(response.routes[0].legs[0].distance);
		}
		else {
			
		}
	});
};

export var convertAddressToMapPoint = function(address, callback){
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode( { 'address' : address }, function( results, status ) {
        if( status == google.maps.GeocoderStatus.OK ) {
        	callback(_.first(results));
        } else {
            console.error('ConvertAddressToMapPoint: Geocode was not successful for the following reason: ' + status);
        }
    });
};
