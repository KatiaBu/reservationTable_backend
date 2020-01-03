
import express from 'express';
import {getReservations, addReservation} from './reservationConreoller.js';

const router = express.Router();

router.route('/reservation').post(getReservations);
router.route('/reservation/add').post(addReservation);


module.exports = router;