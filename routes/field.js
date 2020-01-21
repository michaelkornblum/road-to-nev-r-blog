const express = require("express");

const {
	getFieldIndex,
	getFieldSettings,
	getAddedField,
	getWillEditField,
	getEditField,
	getEditedField,
	getDeleteField,
	getDeletedField,
	getMovedField,
	getConfiguredField,
	getDuplicateName,
} = require("../controllers/field/get");

const {
	postAddField,
	postMoveUpField,
	postMoveDownField,
	postConfigField,
	postEditField,
	postDeleteField,
} = require("../controllers/field/post");

// Create Router
const router = express.Router();

// GET Requests

// Index request
router.get("/fields", getFieldIndex);

// Add request
router.get("/field/added", getAddedField);

// Edit requests
router.get("/field/will-edit", getWillEditField);
router.get("/field/edit", getEditField);
router.get("/field/edited", getEditedField);

// Settings requests
router.get("/field/settings", getFieldSettings);
router.get("/field/configured", getConfiguredField);

// Delete Requests
router.get("/field/delete", getDeleteField);
router.get("/field/deleted", getDeletedField);

// Move Request
router.get("/field/moved", getMovedField);

// Error Request
router.get("/field/duplicate", getDuplicateName);

// POST requests
router.post("/field/add/:categoryId", postAddField);
router.post("/field/edit/:id", postEditField);
router.post("/field/config/:id/:mode", postConfigField);
router.post("/field/delete/:id", postDeleteField);
router.post("/field/move-up/:id", postMoveUpField);
router.post("/field/move-down/:id", postMoveDownField);

module.exports = router;
