const express = require('express');
const { getContaminationAreaAndAlertWithIn5KmAnd100mts } = require('../controllers/contamination')
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: `welcome to backend`});
})

router.get("/getContaminationAreaAndAlertWithIn5KmAnd100mts", getContaminationAreaAndAlertWithIn5KmAnd100mts)


module.exports = router;