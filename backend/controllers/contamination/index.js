const isUserLocationWithInArea = (
  userLocation,
  latitude,
  longitude,
  fenceRadius
) => {
  const [lat1, lon1] = userLocation;
  const lat2 = latitude;
  const lon2 = longitude;

  const factor = Math.PI / 180;
  const dLat = (lat2 - lat1) * factor;
  const dLon = (lon2 - lon1) * factor;

  // Haversine formula: https://www.movable-type.co.uk/scripts/latlong.html
  const angularDistance =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * factor) *
      Math.cos(lat2 * factor) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const chordLength =
    2 * Math.atan2(Math.sqrt(angularDistance), Math.sqrt(1 - angularDistance));

  const EARTH_RADIUS_KM = 6371; // appxoximate radius in km
  const KM_TO_MILES = 0.621371; // 1 km = 0.621371 miles

  const distance = EARTH_RADIUS_KM * chordLength * KM_TO_MILES;
  return distance <= fenceRadius;
};

exports.getContaminationAreaAndAlertWithIn5KmAnd100mts = (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  const in5Km = [];
  const in10mt = [];

  const data = [
    {
      lat: 19.0971904,
      long: 72.8891392,
      name: "The Regenza by Tunga",
      contanment: true,
    },
    {
      lat: 19.0663369,
      long: 72.9998197,
      name: "Big Bazaar-INORBIT MALLS",
      contanment: true,
    },
  ];

  for (d of data) {
    if (isUserLocationWithInArea([d.lat, d.long], lat, lng, 5)) {
      in5Km.push(d);
    }

    if (isUserLocationWithInArea([d.lat, d.long], lat, lng, 0.1)) {
      in10mt.push(d);
    }
  }

  return res.json({ in5Km, in10mt });
};
