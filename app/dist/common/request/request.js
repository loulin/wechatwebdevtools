"use strict";function init(){function e(e){var r={};for(var t in e)"body"!==t&&(r[t]=e[t]);return JSON.stringify(r)}function r(e,r,t){var n=(require("../../stroes/windowStores.js").getUserInfo(),{url:l,form:JSON.stringify({openid:e,signature:r}),method:"post",needToken:-1});i(n,function(e,r,i){if(e)o.error("request.js refreshTicket error "+JSON.stringify(e)),t(e);else{o.info("request.js refreshTicket "+i),i=JSON.parse(i);var n=i.baseresponse,s=parseInt(n.errcode);if(0!==s)return o.error("request.js refreshTicket errcode: "+s),void t({type:"NOT_LOGIN"});var u=+new Date+1e3*i.ticket_expired_time,f=r.headers,c=f["debugger-newticket"];require("../../actions/windowActions.js").upTicket(c,u),t(null,c)}})}function t(e,t){function i(r){var t=s.getProxyForURL(e.url);"DIRECT"!==t&&(e.proxy="http://"+t.replace("PROXY ",""),e.tunnel=a),r(null)}function n(t){var i=e.needToken;if(i===-1)return void t(null);var n=1===i,s=require("../../stroes/windowStores.js").getUserInfo();if(!s&&n)return o.error("request.js setToken get userInfo null"),void t({type:"NOT_LOGIN"});var u=s.ticketExpiredTime,f=s.signatureExpiredTime,c=+new Date;return f<c&&n?(o.error("request.js setToken signature expired "+f+" "+c),void t({type:"NOT_LOGIN"})):void(u<c&&n?(o.error("request.js setToken ticket expired "+u+" "+c),r(s.openid,s.signature,function(r,i){r?(o.error("request.js refreshTicket error "+JSON.stringify(r)),t({type:"NOT_LOGIN"})):(e.newticket=i,t(null))})):(e.newticket=s?s.newticket:"",t(null)))}u.parallel([i,n],function(r){if(r)t(r,e);else{var i=e.needToken;i!==-1&&(e.url=e.url.indexOf("?")===-1?e.url+"?newticket="+e.newticket:e.url+"&newticket="+e.newticket),e.url=e.url.indexOf("?")===-1?e.url+"?os="+d:e.url+"&os="+d,delete e.newticket,delete e.needToken,t(null,e)}})}function i(r,s){var u=JSON.parse(JSON.stringify(r)),f=r.needToken;r.loginForc!==-1;t(r,function(r,t){r?(o.error("request.js makeRequestOpt _opt: "+e(t)+"  error: "+JSON.stringify(r)),require("../../actions/windowActions.js").clearUserInfo()):n(t,function(e,r,d){if(e)if(o.error("request.js request  "+t.url+" error "+JSON.stringify(e)),"UNABLE_TO_VERIFY_LEAF_SIGNATURE"===e.code){if(a=!confirm("当前系统代理不是安全代理，是否信任？"),!a)return t.tunnel=!1,void n(t,function(e,r,t){s(e,r,t)})}else s(e);else{var l=r.statusCode;if(200!==l)return o.error("request.js request "+t.url+" statusCode "+l),void s("网络错误 statusCode : "+l);if(1===f){var p=JSON.parse(d),N=p.baseresponse||{},O=parseInt(N.errcode);if(O===c.DEV_Need_ReLogin||O===c.NOT_LOGIN||O===c.DEV_Invalid_Signature||O===c.DEV_Expired_Signature)return o.info("request.js sendRequest get errcode "+O),s(O),void require("../../stroes/webviewStores.js").emit("NOT_LOGIN");if(O===c.INVALID_TOKEN||O===c.INVALID_LOGIN)return require("../../stroes/windowStores.js").delUserTicket(),s(O),void i(u,s)}s(e,r,d)}})})}var n=require("request"),s=require("../../utils/tools.js"),o=require("../log/log.js"),u=require("async"),f=require("../../config/urlConfig.js"),c=require("../../config/errcodeConfig.js"),d="darwin"===process.platform?"darwin":"win",l=f.refreshTicketURL,a=!0;_exports=i}var _exports;init(),module.exports=_exports;