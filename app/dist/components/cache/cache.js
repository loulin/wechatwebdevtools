"use strict";function init(){var e=require("../../lib/react.js"),a=require("../../cssStr/cssStr.js"),c=e.createClass({displayName:"Cache",render:function(){var c="cache"===this.props.show?{}:a.displayNone;return e.createElement("div",{className:"cache",style:c},e.createElement("div",{className:"cache-hd"},e.createElement("p",{className:"cache-hd-item"},"type"),e.createElement("p",{className:"cache-hd-item"},"name"),e.createElement("p",{className:"cache-hd-item"},"file version"),e.createElement("p",{className:"cache-hd-item"},"info"),e.createElement("p",{className:"cache-hd-item"},e.createElement("a",{href:"javascript:;"},"清除记录"))),e.createElement("div",{className:"cache-bd"},e.createElement("div",{className:"cache-log"},e.createElement("div",{className:"cache-log-item"},"123"),e.createElement("div",{className:"cache-log-item"},"312"),e.createElement("div",{className:"cache-log-item"},"132"),e.createElement("div",{className:"cache-log-item"},"132"))))}});_exports=c}var _exports;init(),module.exports=_exports;