const express = require('express');

const {
	getEntryIndex,
	getAddEntry,
	getEditEntry,
	getSavedEntry,
	getDeleteEntry,
	getDeletedEntry,
	getDuplicateEntry,
} = require('../controllers/entry/get');

const {
	postAddEntry,
	postEditEntry,
	postDeleteEntry,
} = require('../controllers/entry/post');

// Create router
const router = express.Router();

// GET requests

// Index request
router.get('/entries', getEntryIndex);

// Add requests
router.get('/entry/add', getAddEntry);

// Edit requests
router.get('/entry/edit', getEditEntry);

// Request for added / edited entries
router.get('/entry/saved', getSavedEntry);

// Delete requests
router.get('/entry/delete', getDeleteEntry);
router.get('/entry/deleted', getDeletedEntry);

// Error requests
router.get('/entry/duplicate', getDuplicateEntry);

// POST requests
router.post('/entry/add/:categoryId', postAddEntry);
router.post('/entry/edit/:id', postEditEntry);
router.post('/entry/delete/:id', postDeleteEntry);

// Export router to app
module.exports = router;
