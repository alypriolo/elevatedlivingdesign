function initMap() {
    var location = {lat: 38.897957, lng: -77.036560};  // Example location (White House)
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
