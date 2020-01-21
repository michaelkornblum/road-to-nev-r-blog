const path = require("path");

exports.setFileLocation = fileName => 
	path.join(path.dirname(process.mainModule.filename), "data", fileName);
