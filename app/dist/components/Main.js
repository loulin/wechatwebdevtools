"use strict";function init(){var e=require("../lib/react.js"),t=require("./popup/popup.js"),s=require("./menubar/menubar.js"),r=require("./toolbar/toolbar.js"),o=require("./sidebar/sidebar.js"),i=require("./develop/develop.js"),p=require("./detail/detail.js"),n=require("./setting/setting.js"),a=require("./toast/toast.js"),c=require("./edit/edit.js"),h=require("./dialog/dialog.js"),u=require("./about/about.js"),l=require("../stroes/windowStores.js"),j=e.createClass({displayName:"Main",getInitialState:function(){return{show:"debug",showSetting:!1}},optProject:function(e){this.setState({show:e})},showSetting:function(){this.setState({showSetting:!this.state.showSetting})},componentDidMount:function(){l.on("SHOW_SETTING",this.showSetting)},render:function(){return e.createElement("div",{className:"main"},e.createElement(s,{appQuit:this.props.appQuit,appMin:this.props.appMin,appMax:this.props.appMax,showSetting:this.showSetting,project:this.props.project}),e.createElement(r,{project:this.props.project}),e.createElement("div",{className:"body"},e.createElement(o,{project:this.props.project,optProject:this.optProject}),e.createElement(i,{show:this.state.show,optDebugger:this.optDebugger,project:this.props.project}),e.createElement(c,{show:this.state.show,project:this.props.project}),e.createElement(p,{project:this.props.project,show:this.state.show})),e.createElement(a,null),e.createElement(n,{show:this.state.showSetting,showSetting:this.showSetting}),e.createElement(h,null),e.createElement(t,null),e.createElement(u,null))}});_exports=j}var _exports;init(),module.exports=_exports;