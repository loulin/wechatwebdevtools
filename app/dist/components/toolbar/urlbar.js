"use strict";function init(){var t,e=require("../../lib/react.js"),s=(require("../../cssStr/cssStr.js"),require("../../actions/webviewActions.js")),a=require("../../stroes/windowStores.js"),i=require("../../actions/windowActions.js"),r=require("./urlcomplete.js"),o=e.createClass({displayName:"Urlbar",getInitialState:function(){var t=!!this.props.project;return{webviewID:0,url:"",disabled:t,autoIndex:0,autocomplete:[]}},loadUrl:function(t){t=t||this.getCurrentUrl(),t=t.trim();var e=this.state.webviewID;"about:blank"===t?s.setWebviewAction(e,{act:"reLoad"}):(i.setAutoComplete(t),s.getA8keyWebview(e,{url:t,isSync:!0,from:"urlbar"})),this.setState({autocomplete:[]})},getAutoComplete:function(t){var e=t.trim(),s=/^http:\/\//.test(e),i=/^https:\/\//.test(e),r=s||i,o=[],n=a.getAutoComplete();return n.forEach(function(t){e.length>4&&(r?/^https?:\/\//.test(t)||(t=s?"http://"+t:"https://"+t):t=t.replace(/^https?:\/\//,"")),0===t.indexOf(e)&&o.indexOf(t)===-1&&o.push(t)}),o},handleKeyUp:function(t){var e=t.target,s=t.keyCode;this.state.webviewID;if(13===s)e.selectionStart=e.value.length,this.loadUrl();else if(40===s||38===s){var a=this.state.autoIndex,i=this.getCurrentUrl(),r=38===s;if(r)a--,a=a<=0?0:a;else{var o=this.state.autocomplete.length;a++,a=a>=o?o-1:a}this.setState({autoIndex:a,url:i},function(){setTimeout(function(){e.selectionStart=e.value.length},17)})}else 8===s&&(e.dataset.changeFrom="backspace")},handleChange:function(t){var e=this,s=t.target,a=s.value,i="backspace"===s.dataset.changeFrom,r=this.getAutoComplete(a);this.state.webviewID;if(i)return s.dataset.changeFrom="",void this.setState({url:a,autocomplete:r});var o=r[0]&&!i?r[0]:a;this.setState({url:o,autocomplete:r},function(){var t=o.indexOf(a)+a.length;t!==o.length&&(e.refs.urlinput.selectionStart=t,e.refs.urlinput.selectionEnd=o.length)})},handleBlur:function(){var e=this;t=setTimeout(function(){e.setState({autocomplete:[]})},100)},handleFocus:function(){var t=this.getCurrentUrl(),e=this.getAutoComplete(t);this.setState({autocomplete:e})},handleOnClick:function(){this.loadUrl()},getCurrentUrl:function(){return this.state.url},autoClick:function(e){clearTimeout(t);var s=e.currentTarget,a=s.dataset,i=a.index,r=this.state.autocomplete[i];this.setState({url:r,autocomplete:[]}),this.loadUrl(r)},_changeWebviewID:function(t){this.setState({webviewID:t})},_changeUrl:function(t){this.props.project&&(t=t.replace(".html",".wxml")),this.setState({url:t})},_focusAddressbar:function(t){this.refs.urlinput.select(),this.refs.urlinput.focus()},_disAbleURLbar:function(){this.setState({disabled:!0})},_ableURLbar:function(){this.setState({disabled:!1})},componentDidMount:function(){a.on("CHANGE_WEBVIEW_URL",this._changeUrl),a.on("FOCUS_ADDRESSBAR",this._focusAddressbar),a.on("DISABLE_URLBAR",this._disAbleURLbar),a.on("ABLE_URLBAR",this._ableURLbar)},componentWillUnmount:function(){a.removeListener("CHANGE_WEBVIEW_URL",this._changeUrl),a.removeListener("FOCUS_ADDRESSBAR",this._focusAddressbar),a.removeListener("DISABLE_URLBAR",this._disAbleURLbar),a.removeListener("ABLE_URLBAR",this._ableURLbar)},render:function(){var t=(this.state.webviewID,this.state.url);return e.createElement("div",{className:"toolbar-location"},e.createElement("input",{className:"toolbar-location-input",type:"text",ref:"urlinput",disabled:this.state.disabled,onKeyDown:this.handleKeyUp,onBlur:this.handleBlur,onFocus:this.handleFocus,value:t,onChange:this.handleChange}),e.createElement("div",{className:"toolbar-location-refresh"},e.createElement("i",{className:"toolbar-location-refresh-icon"})),e.createElement("div",{className:"toolbar-location-history"},e.createElement("i",{className:"toolbar-location-history-icon"})),e.createElement(r,{autoClick:this.autoClick,autocomplete:this.state.autocomplete,autoIndex:this.state.autoIndex}))}});_exports=o}var _exports;init(),module.exports=_exports;