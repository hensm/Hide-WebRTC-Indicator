const { Cu } = require("chrome");

Cu.import("resource:///modules/webrtcUI.jsm");
const global = Cu.getGlobalForObject(webrtcUI);
let _orig_getGlobalIndicator;


function replace() {
	if (!_orig_getGlobalIndicator) {
		_orig_getGlobalIndicator = global.getGlobalIndicator;
	}

	global.getGlobalIndicator = function() {
		let _orig_openWindow = Services.ww.openWindow;
		Services.ww.openWindow = undefined;
		let ret = _orig_getGlobalIndicator.apply(global);
		Services.ww.openWindow = _orig_openWindow;

		return ret;
	};
}

function restore() {
	global.getGlobalIndicator = _orig_getGlobalIndicator;
}


exports.main = function(options, callbacks) {
	replace();
}
exports.onUnload = function() {
	restore();
}
