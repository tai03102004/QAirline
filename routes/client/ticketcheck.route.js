const express = require('express');
const router = express.Router();
const checkController = require('../../controllers/client/ticketcheck/ticketcheck.controller');

router.get('/', checkController.index);
router.get('/:ticketId', checkController.find);
router.delete('/delete-ticket/:ticketId', checkController.deleteticket);

module.exports = router;