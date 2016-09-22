"use strict";function init(){var e=require("../../lib/react.js"),t=require("../../lib/react-dom.js"),r=require("./toolbar.js"),i=require("./scanDialog.js"),s=require("./webviewtab.js"),o=require("./webview.js"),a=require("../../weapp/utils/tools.js"),n=require("../../utils/file.js"),c=require("../../stroes/webviewStores.js"),l=(require("../../stroes/windowStores.js"),require("../../actions/windowActions.js")),p=require("../../actions/webviewActions.js"),u=(require("../../stroes/projectStores.js"),require("../../cssStr/cssStr.js")),v=require("../../common/log/log.js"),f=require("../../common/request/request.js"),g=require("./actions/simulatorActions.js"),d=require("./webviewBackwardMask.js"),h=require("../../utils/tools.js"),w=require("url"),b=require("../../config/urlConfig.js"),m=0,S=0,_=e.createClass({displayName:"Controller",getInitialState:function(){var e="app/html/about.html",t={},r=c.getOffset();if(this.props.project){var i=this.props.project;e=a.getWeappURL(i);try{t=a.getProjectConfig(i).tabBar||{}}catch(s){}}return{currentWebviewID:0,showCard:!1,tabBar:t,showTabBar:!1,href:e,offset:r,cardInfo:{},list:{0:{href:e,dataURI:"",preWebviewID:0}}}},setAnimateImg:function(e,r){var i=document.createElement("div");if(r.dataURI){var s=document.createElement("img");i.appendChild(s),s.src=r.dataURI}i.className="simulator-animate-png";var o=t.findDOMNode(this.refs["webview"+this.state.currentWebviewID]),a=o.getBoundingClientRect(),n=a.top,c=a.left,l=a.height,p=a.width;e?i.style.cssText="background-color:"+r.color+";width:"+p+"px;height:"+l+"px;top:"+n+"px;left:"+c+"px;transform:translate3d("+p+"px,0,0)":i.style.cssText="margin-top:42px;width:"+p+"px;height:"+l+"px;top:"+n+"px;left:"+c+"px;transform:translate3d(0,0,0)",global.contentDocumentBody.appendChild(i);i.offsetTop;return i},postAppRoute:function(e,t,r){if(this.props.project){e=e.replace(/http\:\/\/.*?\//,"");var i=e.match(/(([^\?]*)(\?([^\/]*))?)$/),s="",o={};if(i){s=i[2]||"index.wxml";for(var a=(i[4]||"").split("&"),n=0;n<a.length;++n){var c=a[n].split("=");2==c.length&&(o[c[0]]=c[1])}}this.getSimulatorActions("S_POSTMSG_TO_AS",null,{eventName:"onAppRoute",type:"ON_APPLIFECYCLE_EVENT",data:{path:s,query:o,openType:r},webviewID:t})}},goBack:function(e,r,i,s){var o=this;if(s=s||1,this.props.project||!r.canGoBack()||i){var a,n,c,l=function(){if(0===e)return{v:void 0};for(n=e,c=[];s--&&o.state.list[n]&&0!=n;)c.push(n),a=o.state.list[n],n=a.prevWebviewID;o.state.list[n]||(n=0);var r=t.findDOMNode(o.refs["webview"+e]),i=r.querySelector(".webviewbody"+e);i.captureVisibleRegion(function(e){var r=o.setAnimateImg(!1,{dataURI:e}),s=i.offsetWidth,a=Object.assign({},o.state.list);for(var l in c)delete a[c[l]];o.setState({list:a,currentWebviewID:n},function(){r.addEventListener("transitionend",function(){global.contentDocumentBody.removeChild(r);var e=t.findDOMNode(o.refs["webview"+n]),i=e.querySelector(".webviewbody"+n);o.postAppRoute(i.src,o.state.currentWebviewID,"navigateBack");for(var s in c)o.getSimulatorActions("S_DELETE_WEBVIEW",null,{webviewID:c[s]});o.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW",null,{webviewID:n})}),r.style.transform="translate3d("+s+"px,0,0)"})})}();if("object"===("undefined"==typeof l?"undefined":_typeof(l)))return l.v}else r.back()},_openNewWebview:function(e){var t=this,r=e.webviewID,i=e.url,s=e.showUrl,o=a.getPageJSON(this.props.project,i),n=o.backgroundColor||"#ffffff",c=this.setAnimateImg(!0,{color:n});c.style.transform="translate3d(0,0,0)",c.addEventListener("transitionend",function(){c.parentNode.removeChild(c),m++;var e=Object.assign({},t.state.list);e[m]={prevWebviewID:r,showUrl:s,href:i},t.setState({currentWebviewID:m,list:e}),t.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW",null,{webviewID:m})})},_openNewWindowWebview:function(e){var t=this,r=e.webviewID,i=e.url,s=e.showUrl,o=this.props.project,n=a.getWeappURL(o,{justHost:!0});i=w.resolve(n,i);var c={currentWebviewID:r};if("number"!=typeof r){r=++m;var l=Object.assign({},this.state.list);l[r]={showUrl:!!s,hideBack:!0,href:i},c.list=l}return this.setState(c,function(){t.postAppRoute(i,r,"switchTab"),t.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW",null,{webviewID:r})}),r},_webviewSDK:function(e,t,r,i){if(v.info("Webview.js WEBVIEW_SDK "+e+", "+JSON.stringify(t)+", "+r+", "+JSON.stringify(i)),"openUrlWithExtraWebview"===r){this._openNewWebview({webviewID:e,url:t.args.url,showUrl:!0});var s=c.getWebviewPorts();for(var o in s){var a=s[o];a.postMessage({sdkName:"onAppRoute",data:{},to:"appservice"})}}},_changeWebviewID:function(e){this.setState({currentWebviewID:e})},_setWebviewInfo:function(e){var t=0,r=this.state.tabBar,i=r.list||[];t=i.length<=5&&i.length>=3?60:0,e.height&&this.setState({offset:{height:e.height-t,width:e.width,dpr:e.dpr}})},_setWebviewSnapshot:function(e,t){var r=Object.assign({},this.state.list);r[e].dataURI=t,this.setState({list:r})},_postMessageToAllWebview:function(e){var t=this,r=e.webviewIds||[],i=0===r.length;setTimeout(function(){e.act="sendMsgFromAppService";var s=void 0;s=i?Object.keys(t.state.list):r,s.forEach(function(r){t.getSimulatorActions("S_SET_ACTION",r,e)})},17)},_getShortUrl:function(e){var t="";if(this.props.project){var r=this.props.project;t=a.getWeappURL(r,{justHost:!0})}return e.replace(t,"")},_asSdk:function(e,r,i){var s=this;if("redirectTo"===e){var o=this.state.currentWebviewID,a=t.findDOMNode(this.refs["webview"+o]),u=a.querySelector(".webviewbody"+o);u.src=r.args.url,i({errMsg:"redirectTo:ok",url:this._getShortUrl(r.args.url),webviewId:o})}else if("navigateTo"===e){var v=this.state.currentWebviewID;this._openNewWebview({webviewID:v,url:r.args.url,showUrl:!0}),i({errMsg:"navigateTo:ok",url:this._getShortUrl(r.args.url),webviewId:m+1})}else if("navigateBack"===e)!function(){var e=s.state.currentWebviewID,o=t.findDOMNode(s.refs["webview"+e]),a=o.querySelector(".webviewbody"+e);s.goBack(s.state.currentWebviewID,a,!1,r.args.pages||1),setTimeout(function(){i({errMsg:"navigateBack:ok",url:s._getShortUrl(a.src)})},200)}();else if("setNavigationBarTitle"===e)!function(){var e=s.state.currentWebviewID,t=r.args;setTimeout(function(){s.getSimulatorActions("S_SET_WEBVIEW_MARGIN",e,{name:"sdk-barTitle",value:t.title||""}),i({errMsg:"setNavigationBarTitle:ok"})},0)}();else if("showNavigationBarLoading"===e)!function(){var e=s.state.currentWebviewID;r.args;setTimeout(function(){s.getSimulatorActions("S_SET_WEBVIEW_MARGIN",e,{name:"sdk-showNavigationBarLoading"}),i({errMsg:"showNavigationBarLoading:ok"})},0)}();else if("hideNavigationBarLoading"===e)!function(){var e=s.state.currentWebviewID;r.args;setTimeout(function(){s.getSimulatorActions("S_SET_WEBVIEW_MARGIN",e,{name:"sdk-hideNavigationBarLoading"}),i({errMsg:"hideNavigationBarLoading:ok"})},0)}();else if("getLocation"===e)f({url:"http://apis.map.qq.com/ws/location/v1/ip?key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB",needToken:-1},function(e,t,r){var s={};e||200!==t.statusCode||(r=JSON.parse(r),0==r.status&&(s={latitude:r.result.location.lat,longitude:r.result.location.lng},s.errMsg="getLocation:ok")),s.errMsg||(s.errMsg="getLocation:fail; timeout"),i(s)});else if("openLocation"===e)!function(){var e=s.state.currentWebviewID;f({url:"http://apis.map.qq.com/ws/location/v1/ip?key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB",needToken:!1},function(t,r,o){var a={};t||200!==r.statusCode||(o=JSON.parse(o),0==o.status&&(a={latitude:o.result.location.lat,longitude:o.result.location.lng},s._openNewWebview({webviewID:e,url:"http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:"+a.latitude+","+a.longitude+"&key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB&referer=wxdevtools",showUrl:!0}),a.errMsg="openLocation:ok")),a.errMsg||(a.errMsg="openLocation:fail; timeout"),i(a)})}();else if("getNetworkType"===e)i({errMsg:"getNetworkType:ok",networkType:c.getNetworkType()});else if("getSystemInfo"===e){var g=c.getInfo();i({errMsg:"getSystemInfo:ok",model:g.model,pixelRatio:g.dpr,windowWidth:g.width,windowHeight:g.height,language:"zh_CN",version:"6.3.9"})}else if("login"===e){var d="";if(this.props.project){var w=this.props.project;d=w.appid}var _={scope:["snsapi_base"]};f({url:b.jsLoginURL+"?appid="+d,method:"post",body:JSON.stringify(_),needToken:1},function(e,t,r){var s={},o="";e||200!==t.statusCode||(r=JSON.parse(r),r.baseresponse&&(0==r.baseresponse.errcode?(s={code:r.code},s.errMsg="login:ok"):o=r.baseresponse.errmsg)),s.errMsg||(s.errMsg="login:fail; "+o),i(s)})}else if("getMusicPlayerState"===e){r.args;setTimeout(function(){l.getMusicPlayerState(function(e){e.errMsg="getMusicPlayerState:ok",i&&i(e)})},0)}else if("operateMusicPlayer"===e)!function(){var e=r.args;setTimeout(function(){l.operateMusicPlayer(e),i({errMsg:"operateMusicPlayer:ok"})},0)}();else if("scanCode"===e)!function(){var e=function s(e){i("ok"==e.msg?{errMsg:"scanCode:ok",result:e.result,scanType:e.scanType}:"cancel"==e.msg?{errMsg:"scanCode:cancel"}:{errMsg:"scanCode:"+e.msg}),c.removeListener("SCAN_CODE_RETURN",s)},t=r.args;setTimeout(function(){p.showScanCodeDialog(t),c.on("SCAN_CODE_RETURN",e)},0)}();else if("operateWXData"===e)!function(){var e="",t=r.args;if(s.props.project){var o=s.props.project;e=o.appid}f({url:b.jsOperateWXDATAURL+"?appid="+e,method:"post",body:JSON.stringify({data:JSON.stringify(t.data||{})}),needToken:1},function(r,o,a){var n={},l="";if(console.log(a),!r&&200===o.statusCode&&(a=JSON.parse(a),a.baseresponse))if(0==a.baseresponse.errcode)try{n.data=JSON.parse(a.data),n.errMsg="operateWXData:ok"}catch(p){n.errMsg="operateWXData:fail"}else if(a.baseresponse.errcode==-12e3){var u,v=function(){u=S++;var r=function o(r,s,a){n.errMsg=a?"operateWXData:ok":"operateWXData:cancel";var l=s[0];if(a&&l.checked){var p={data:JSON.stringify(t.data||{}),grant_scope:l.scope};f({url:b.jsOperateWXDATAURL+"?appid="+e,method:"post",body:JSON.stringify(p),needToken:1},function(e,t,r){var s={};if(!e&&200===t.statusCode&&(r=JSON.parse(r),r.baseresponse&&0===r.baseresponse.errcode))try{s.data=JSON.parse(r.data),s.errMsg="operateWXData:ok"}catch(o){s.errMsg="operateWXData:fail"}s.errMsg||(s.errMsg="operateWXData:fail; "),i(s)})}else i(n);c.removeListener("AUTHORIZE_SDK_RETURN_"+r,o)};return c.on("AUTHORIZE_SDK_RETURN_"+u,r),s.getSimulatorActions("S_AUTHORIZE_SDK",s.state.currentWebviewID,{authorizeSdkId:u,url:a.appicon_url+"/0",appname:a.appname,scope_list:[a.scope]}),{v:void 0}}();if("object"===("undefined"==typeof v?"undefined":_typeof(v)))return v.v}else l=a.baseresponse.errmsg;n.errMsg||(n.errMsg="operateWXData:fail; "+l),i(n)})}();else if("authorize"===e)!function(){var e="";if(s.props.project){var t=s.props.project;e=t.appid}var o=r.args,a={scope:o.scope||[]};f({url:b.jsAuthorizeURL+"?appid="+e,method:"post",body:JSON.stringify(a),needToken:1},function(t,r,o){var a={},n="";if(!t&&200===r.statusCode&&(o=JSON.parse(o),o.baseresponse))if(a.body=o,0==o.baseresponse.errcode)a.errMsg="authorize:ok";else if(o.baseresponse.errcode==-12e3){var l,p=function(){l=S++;var t=function r(t,s,o){if(a.errMsg=o?"authorize:ok":"authorize:cancel",o){for(var n=[],l=0;l<s.length;++l){var p=s[l];p.checked&&n.push(p.scope)}console.log(s);var u={scope:n};f({url:b.jsAuthorizeConfirmURL+"?appid="+e,method:"post",body:JSON.stringify(u),needToken:1},function(e,t,r){var s={};e||200!==t.statusCode||(r=JSON.parse(r),r.baseresponse&&0===r.baseresponse.errcode&&(s.errMsg="authorize:ok")),s.errMsg||(s.errMsg="authorize:fail; "),i(s)})}else i(a);c.removeListener("AUTHORIZE_SDK_RETURN_"+t,r)};return c.on("AUTHORIZE_SDK_RETURN_"+l,t),s.getSimulatorActions("S_AUTHORIZE_SDK",s.state.currentWebviewID,{authorizeSdkId:l,url:o.appicon_url+"/0",appname:o.appname,scope_list:o.scope_list}),{v:void 0}}();if("object"===("undefined"==typeof p?"undefined":_typeof(p)))return p.v}else n=o.baseresponse.errmsg;a.errMsg||(a.errMsg="authorize:fail; "+n),i(a)})}();else if("saveFile"===e){var W=r.args,I=W.tempFilePath;if(I){var E=n.saveFileForever(I);i(E===!1?{errMsg:"saveFile:fail"}:{errMsg:"saveFile:ok",savedFilePath:E})}else i({errMsg:"saveFile:fail"})}else if("chooseImage"===e||"chooseVideo"===e){var D="chooseImage"===e?"image/*":"video/*";h.chooseFile({accept:D,multiple:!0,sucCall:function(t){var r=s.props.project,o=t.target.value.split(";"),a=o.length;if(a>9)return void i({errmsg:e+":fail"});var c=[];o.forEach(function(e){c.push(n.copyFileToTemp(e,r.hash))});var l={errMsg:e+":ok",tempFilePaths:c};i(l)},cancelCall:function(t){var r={errMsg:e+":fail"};i(r)}})}},_upWebviewStatus:function(e,t){this.upCurrentWebviewURL(t.url)},upCurrentWebviewURL:function(e){if(this.props.project){var t=a.getFileNameFromUrl(e,this.props.project),r=this.state.tabBar,i=r.list||[],s=!!i.find(function(e){return e.pagePath===t.replace(/\.wxml$/,"")}),o=c.getOffset();s&&(o.height=o.height-45),this.setState({showTabBar:!!s,offset:o})}},addAsWebview:function(e){this.asWebviewID=e},getSimulatorActions:function(e,r,i){var s={currentWebviewID:this.state.currentWebviewID};if(g(e,r,i,s),"S_CHANGE_CURRENT_WEBVIEW"===e){var o=i.webviewID;if(o===this.state.currentWebviewID){var a=t.findDOMNode(this.refs["webview"+o]),n=a.querySelector("webview"),c=n.src;this.upCurrentWebviewURL(c),l.changeUrl(c,o)}}},componentDidMount:function(){c.on("WEBVIEW_SDK",this._webviewSDK),c.on("CHANGE_WEBVIEW_ID",this._changeWebviewID),c.on("SET_WEBVIEW_INFO",this._setWebviewInfo),c.on("AS_PUBLISH",this._postMessageToAllWebview),c.on("SEND_AS_SDK",this._asSdk),c.on("SET_WEBVIEW_SNAPSHOT",this._setWebviewSnapshot),c.on("UP_WEBVIEW_STATUS",this._upWebviewStatus)},componentWillUnmount:function(){c.removeListener("WEBVIEW_SDK",this._webviewSDK),c.removeListener("CHANGE_WEBVIEW_ID",this._changeWebviewID),c.removeListener("SET_WEBVIEW_INFO",this._setWebviewInfo),c.removeListener("AS_PUBLISH",this._postMessageToAllWebview),c.removeListener("SEND_AS_SDK",this._asSdk),c.removeListener("SET_WEBVIEW_SNAPSHOT",this._setWebviewSnapshot),c.removeListener("UP_WEBVIEW_STATUS",this._upWebviewStatus)},render:function(){var t=[];for(var a in this.state.list){var n=a==this.state.currentWebviewID?{}:u.webviewDisplayNone,c=this.state.list[a];t.push(e.createElement("div",{key:a,style:n},e.createElement(o,{project:this.props.project,offset:this.state.offset,ref:"webview"+a,href:c.href,hideBack:!!c.hideBack,webviewID:a,goBack:this.goBack,addAsWebview:this.addAsWebview,getSimulatorActions:this.getSimulatorActions,postAppRoute:this.postAppRoute})))}var l={width:this.state.offset.width,margin:"0 auto"};return e.createElement("div",{className:"simulator-wrapper"},e.createElement(r,{getSimulatorActions:this.getSimulatorActions,list:this.state.list,currentWebviewID:this.state.currentWebviewID}),e.createElement(i,{currentWebviewID:this.state.currentWebviewID}),t,e.createElement("div",{style:l},e.createElement(s,{project:this.props.project,_openNewWindowWebview:this._openNewWindowWebview,tabBar:this.state.tabBar,showTabBar:this.state.showTabBar,currentWebviewID:this.state.currentWebviewID})),e.createElement(d,null))}});_exports=_}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_exports;init(),module.exports=_exports;