const CONTAMINATEDZONESCHEMA = require('../models/contaminatedZone');
const zones = require('../helper/zones');

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

module.exports = {
    seedContaminatedZones
}