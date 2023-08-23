const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router
    .get('/getAll' , dbController.getAllData)
    .post('/insert' , dbController.insertNewRecord)
    .patch('/update' , dbController.updateRecord)
    .delete('/delete/:id' , dbController.deleteRecord)
    .get('/get/:id' , dbController.getRecordById);


module.exports = router;