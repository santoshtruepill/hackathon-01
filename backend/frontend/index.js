let lastLocation = null;
function getCurrentPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const latlng = { lat: coords.latitude, lng: coords.longitude };
      if (
        lastLocation &&
        lastLocation.lat === latlng.lat &&
        lastLocation.lng === latlng.lng
      ) {
        return;
      }

      lastLocation = latlng;
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: new google.maps.LatLng(latlng.lat, latlng.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: latlng,
        radius: 5000,
      });

      fetch(
        `http://localhost:5000/getContaminationAreaAndAlertWithIn5KmAnd100mts?lat=${latlng.lat}&lng=${latlng.lng}`
      )
        .then((response) => response.json())
        .then(({ in5Km, in10mt }) => {
          for (m of in5Km) {
            new google.maps.Marker({
              position: { lat: m.lat, lng: m.long },
              map,
            });
          }

          if (in10mt.length > 0) {
            showAlert();
          }
        });
    });
  }
}

setInterval(getCurrentPosition, 5000);
getCurrentPosition();
