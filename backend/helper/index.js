const CONTAMINATEDZONESCHEMA = require('../models/contaminatedZone');
const zones = require('./zones');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const databasename = "hackathon-db"; // Database name

const dropContaminatedZoneCollectionAndSeedData = () => {
    MongoClient.connect(url).then((client) => {

        const connect = client.db(databasename);

        // Collection name
        const collection = connect.collection("contaminationzones");

        collection.drop();  // Dropping the collection

        console.log("Dropping successful");
        seedContaminatedZones();
    }).catch((err) => {
        console.log(err.Message);
    });
};

const seedContaminatedZones = async () => {
    try {
        zones.map(async item => {
            const details = new CONTAMINATEDZONESCHEMA({
                "lat": item.lat,
                "long": item.long,
                "name": item.name,
                "contanment": item.contanment
            });
            await details.save().then(result => result).catch(err => err);
        });
        console.log('Data seeded Successfully');
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
    isUserLocationWithInArea,
    dropContaminatedZoneCollectionAndSeedData
}