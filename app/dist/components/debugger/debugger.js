"use strict";function init(){var e=require("../../lib/react.js"),t=require("../devtools/devtools.js"),s=require("../jssdk/jssdk.js"),r=(require("../cache/cache.js"),require("../purview/purview.js")),a=require("../mobile/mobile.js"),i=require("../appservice/appservice.js"),o=require("../../cssStr/cssStr.js"),c=e.createClass({displayName:"Debugger",getInitialState:function(){return{show:this.props.project?"appservice":"devtools"}},changeShow:function(e){var t=e.currentTarget,s=t.dataset,r=s.type;this.setState({show:r})},render:function(){var c=this.state.show;this.props.project;return e.createElement("div",{className:"debugger"},e.createElement("div",{className:"debugger-tab"},e.createElement("div",{className:"debugger-tab-hd"},e.createElement("a",{style:this.props.project?o.displayNone:{},onClick:this.changeShow,"data-type":"devtools",href:"javascript:;",className:"debugger-tab-hd-item"+("devtools"===c?" debugger-tab-hd-item-active":"")},"调试"),e.createElement("a",{style:this.props.project?o.displayNone:{},onClick:this.changeShow,href:"javascript:;","data-type":"jssdk",className:"debugger-tab-hd-item"+("jssdk"===c?" debugger-tab-hd-item-active":"")},"JS-SDK"),e.createElement("a",{style:this.props.project?o.displayNone:{},onClick:this.changeShow,"data-type":"purview",href:"javascript:;",className:"debugger-tab-hd-item"+("purview"===c?" debugger-tab-hd-item-active":"")},"权限列表")),e.createElement("div",{className:"debugger-tab-bd"},e.createElement(t,{show:this.state.show}),e.createElement(i,{show:this.state.show,project:this.props.project,propshow:this.props.propshow}),e.createElement(s,{show:this.state.show}),e.createElement(r,{show:this.state.show}),e.createElement(a,{show:this.state.show}))))}});_exports=c}var _exports;init(),module.exports=_exports;