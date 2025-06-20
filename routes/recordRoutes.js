const express = require('express');
const router = express.Router();
const controller = require('../controllers/recordController');

// Define CRUD routes
router.post('/', controller.createRecord);         // Create
router.get('/', controller.getAllRecords);         // Read all
router.get('/:id', controller.getRecordById);      // Read one
router.put('/:id', controller.updateRecord);       // Update
router.delete('/:id', controller.deleteRecord);    // Delete

module.exports = router;