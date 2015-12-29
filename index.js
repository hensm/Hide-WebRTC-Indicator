const { Cu } = require("chrome");

Cu.import("resource:///modules/webrtcUI.jsm");
const global = Cu.getGlobalForObject(webrtcUI);
let _orig_getGlobalIndicator;


function replace() {
	_orig_getGlobalIndicator = global.getGlobalIndicator;

	global.getGlobalIndicator = function() {
		return null;
	};
}

function restore() {
	global.getGlobalIndicator = _orig_getGlobalIndicator;
}


exports.main = replace;
exports.onUnload = restore