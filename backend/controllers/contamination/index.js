const { isUserLocationWithInArea } = require("../../helper");
const ContaminatedSchema = require("../../models/contaminatedZone");

exports.getContaminationAreaAndAlertWithIn5KmAnd100mts = async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  const in5Km = [];
  const in10mt = [];

  return await ContaminatedSchema.find({}, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.length > 0) {
        for (d of result) {
          if (isUserLocationWithInArea([d.lat, d.long], lat, lng, 5)) {
            in5Km.push(d);
          }

          if (isUserLocationWithInArea([d.lat, d.long], lat, lng, 0.1)) {
            in10mt.push(d);
          }
        }
      }
    }
    return res.json({ in5Km, in10mt });
  });
};
