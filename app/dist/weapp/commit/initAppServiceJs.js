"use strict";function init(){var e=require("fs"),r=require("path"),n=require("glob");_exports=function(t,o,i){var u=o.isBuildForTest,a=t.projectpath;try{!function(){var t=r.join(a,"app.json"),o=JSON.parse(e.readFileSync(t,"utf8")),s=o.pages||[];n("**/*.js",{nodir:!0,cwd:a,ignore:["node_modules/**/*"]},function(n,t){try{for(var o=[],c=[],p=["var __wxAppData = {};\n            var __wxRoute;\n            var __wxRouteBegin"],l={},f=0,v=s.length;f<v;f++){var _=s[f]+".js",d=r.join(a,_),h=e.readFileSync(d,"utf8");l[_]=!0,p.push("__wxRoute = '"+_.replace(/\.js$/,"")+"';__wxRouteBegin = true"),p.push('define("'+_+'", function(require, module){\n              '+h+"\n            })"),p.push('require("'+_+'")')}for(var j=0,g=t.length;j<g;j++){var x=t[j];if(!l[x]){var q=r.join(a,x),w=e.readFileSync(q,"utf8");"app.js"===x?c.push(w):o.push('define("'+x+'", function(require, module){\n                '+w+"\n              })")}}var y=o.concat(c).concat(p),S=y.join(";");u?i(null,"try{\n"+S+"\n}catch(e){console.error(e)}"):i(null,S)}catch(n){i("生成 appservice.js 错误，错误信息: "+n.toString())}})}()}catch(s){i("生成 appservice.js 错误，错误信息: "+s.toString())}}}var _exports;init(),module.exports=_exports;