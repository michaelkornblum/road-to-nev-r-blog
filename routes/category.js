const express = require("express");

const {
	getCategoryIndex,
	getAddedCategory,
	getEditCategory,
	getEditedCategory,
	getDeleteCategory,
	getDeletedCategory,
	getDuplicateCategory,
	getNoFields,
} = require("../controllers/category/get");

const {
	postAddCategory,
	postEditCategory,
	postDeleteCategory,
} = require("../controllers/category/post");

// Create router
const router = express.Router();

// GET requests

// Index request
router.get("/", getCategoryIndex);

// Add requests
router.get("/category/added", getAddedCategory);

// Edit requests
router.get("/category/edit", getEditCategory);
router.get("/category/edited", getEditedCategory);

// Delete requests
router.get("/category/delete", getDeleteCategory);
router.get("/category/deleted", getDeletedCategory);

// Error requests
router.get("/category/duplicate", getDuplicateCategory);
router.get("/category/no-fields", getNoFields);

// POST requests
router.post("/category/add", postAddCategory);
router.post("/category/edit/:id", postEditCategory);
router.post("/category/delete/:id", postDeleteCategory);

// Export router to app
module.exports = router;
