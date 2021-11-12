const CONTAMINATEDZONESCHEMA = require('../models/contaminatedZone');
const zones = require('./zones');

const seedContaminatedZones = () => {
    try {
        zones.map(item => {
            const details = new CONTAMINATEDZONESCHEMA({  
                "lat": item.lat,
                "long": item.long,
                "name": item.name,
                "contanment": item.contanment
            });
            details.save().then(result => result).catch(err => err);
        });
        return true;
    } catch (error) {
        console.log('error')
    }
}

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
  
    const angularDistance =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * factor) * Math.cos(lat2 * factor) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const chordLength = 2 * Math.atan2(Math.sqrt(angularDistance), Math.sqrt(1 - angularDistance));
  
    const EARTH_RADIUS_KM = 6371; // appxoximate radius in km
    const KM_TO_MILES = 0.621371; // 1 km = 0.621371 miles
  
    const distance = EARTH_RADIUS_KM * chordLength * KM_TO_MILES;
    return distance <= fenceRadius;
  };
  

module.exports = {
    seedContaminatedZones,
    isUserLocationWithInArea
}