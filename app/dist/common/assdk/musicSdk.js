"use strict";function init(){function e(e,t){i.sendASSDK("getMusicPlayerState",e,t)}function t(e,t){i.sendASSDK("operateMusicPlayer",e,t)}var i=require("../../actions/webviewActions.js");_exports={},_exports.exec=function(i,r){var s=i.sdkName;"getMusicPlayerState"===s?e(i,r):"operateMusicPlayer"===s&&t(i,r)}}var _exports;init(),module.exports=_exports;