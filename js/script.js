// Initialize Google Maps
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

// Initialize the hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
    } else {
        console.error('Hamburger or mobileNav element not found.');
    }
});

document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.mobile-nav').classList.toggle('active');
});

