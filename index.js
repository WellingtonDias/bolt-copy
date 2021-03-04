const {basename} = require("path");
const fs = require("fs");

module.exports = function(TASK,OPTIONS)
{
	if (bolt.isNotObject(OPTIONS)) bolt.throwError(`copy: Bad formatted task "${TASK}"`);
	if (!("input" in OPTIONS)) bolt.throwError(`copy: "input" not defined in task "${TASK}"`);
	if (!("output" in OPTIONS)) bolt.throwError(`copy: "output" not defined in task "${TASK}"`);
	if (bolt.isNotString(OPTIONS.output)) bolt.throwError(`copy: Bad formatted "output" "${OPTIONS.output}" in task "${TASK}"`);

	const files = bolt.resolvePath(OPTIONS.input,{directory: false});

	if (helper.isNotPath(OPTIONS.output)) fs.mkdirSync(OPTIONS.output,{recursive: true});
	 if (helper.isNotDirectory(OPTIONS.output)) bolt.throwError(`copy: Invalid "output" "${OPTIONS.output}" in task "${TASK}"`);
	let directory = OPTIONS.output;
	if (directory.charAt(directory.length - 1) !== "/") directory += "/";

	for (let file of files) fs.copyFileSync(file,directory + basename(file));
};
