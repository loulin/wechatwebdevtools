"use strict";function init(){var t=require("../dispatcher/dispatcher.js"),i={upSdkErrNum:function(i,e){t.dispatch({actionType:"UP_SDK_ERRNUM",webviewID:i,errNum:e})},changeDevtools:function(){t.dispatch({actionType:"CHANGE_DEVTOOLS"})},showTipsMsg:function(i){t.dispatch({actionType:"SHOW_TIPS_MSG",opt:i})},updataProxySetting:function(i,e){t.dispatch({actionType:"UPDATA_PROXY_SETTING",proxyType:i,callback:e})},showJSONview:function(i){t.dispatch({actionType:"SHOW_JSON_VIEW",data:i})},showAbout:function(){t.dispatch({actionType:"SHOW_ABOUT_LAYER"})},showLoginLayer:function(){t.dispatch({actionType:"SHOW_LOGIN_LAYER"})},resize:function(i){t.dispatch({actionType:"WINDOW_RESIZE",height:i})},bodyClick:function(i){t.dispatch({actionType:"BODY_CLICK",event:i})},upDateUserInfo:function(i){t.dispatch({actionType:"UPDATA_USER_INFO",info:i})},clearUserInfo:function(){t.dispatch({actionType:"CLEAR_USER_INFO"})},upTicket:function(i,e){t.dispatch({actionType:"UP_USER_TICKET",newticket:i,ticketExpiredTime:e})},delTicket:function(){t.dispatch({actionType:"DEL_USER_TICKET"})},setAutoComplete:function(i){t.dispatch({actionType:"SET_AUTO_COMPLETET",url:i})},showSetting:function(){t.dispatch({actionType:"SHOW_SETTING"})},focusAddressBar:function(i){t.dispatch({actionType:"FOCUS_ADDRESSBAR",webviewID:i})},clearAddressHistory:function(i){t.dispatch({actionType:"CLEAR_ADDRESSBAR_HISTORY",data:i})},disAbleURLBar:function(){t.dispatch({actionType:"DISABLE_URLBAR"})},ableURLBar:function(){t.dispatch({actionType:"ABLE_URLBAR"})},saveSetting:function(i){t.dispatch({actionType:"SAVE_SETTING",data:i})},changeUrl:function(i,e){t.dispatch({actionType:"CHANGE_WEBVIEW_URL",url:i,webviewID:e})},closeWebviewDevtools:function(i){t.dispatch({actionType:"CLOSE_WEBVIEW_DEVTOOLS",webviewID:i})},openWebviewDevtools:function(i,e,c){t.dispatch({webviewID:i,actionType:"OPEN_WEBVIEW_DEVTOOLS",webview:e,webviewOffset:c})},setWebviewInfo:function(i){t.dispatch({actionType:"WINDOW_SET_WEBVIEW_INFO",data:i})},appEnterBackground:function(){t.dispatch({actionType:"APP_ENTER_BACKGROUND"})},appEnterForeground:function(){t.dispatch({actionType:"APP_ENTER_FOREGROUND"})},clickToolsbar:function(i){t.dispatch({actionType:"CLICK_TOOLSBAR",clickkey:i})},operateMusicPlayer:function(i){t.dispatch({actionType:"OPERATE_MUSIC_PLAY",opt:i})},getMusicPlayerState:function(i){t.dispatch({actionType:"GET_MUSIC_PLAY_STATE",callback:i})},startDebuggee:function(i,e){t.dispatch({actionType:"START_WEBVIEW_DEBUGGEE",webviewID:i,data:e})},changeWebviewID:function(i){t.dispatch({actionType:"WINDOW_CHANGE_WEBVIEW_ID",webviewID:i})},getWeappError:function(i,e,c){t.dispatch({actionType:"WINDOW_GET_WEBAPP_ERROR",webviewID:i,url:e,errStr:c})}};_exports=i}var _exports;init(),module.exports=_exports;