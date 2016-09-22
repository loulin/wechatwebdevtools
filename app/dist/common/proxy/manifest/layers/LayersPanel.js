WebInspector.LayerTreeOutline=function(treeOutline)
{WebInspector.Object.call(this);this._treeOutline=treeOutline;this._treeOutline.childrenListElement.addEventListener("mousemove",this._onMouseMove.bind(this),false);this._treeOutline.childrenListElement.addEventListener("mouseout",this._onMouseMove.bind(this),false);this._treeOutline.childrenListElement.addEventListener("contextmenu",this._onContextMenu.bind(this),true);this._lastHoveredNode=null;}
WebInspector.LayerTreeOutline.Events={LayerHovered:"LayerHovered",LayerSelected:"LayerSelected"}
WebInspector.LayerTreeOutline.prototype={selectLayer:function(layer)
{this.hoverLayer(null);var node=layer&&this._treeOutline.getCachedTreeElement(layer);if(node)
node.revealAndSelect(true);else if(this._treeOutline.selectedTreeElement)
this._treeOutline.selectedTreeElement.deselect();},hoverLayer:function(layer)
{var node=layer&&this._treeOutline.getCachedTreeElement(layer);if(node===this._lastHoveredNode)
return;if(this._lastHoveredNode)
this._lastHoveredNode.setHovered(false);if(node)
node.setHovered(true);this._lastHoveredNode=node;},update:function(layerTree)
{var seenLayers=new Map();function updateLayer(layer)
{if(seenLayers.get(layer))
console.assert(false,"Duplicate layer: "+layer.id());seenLayers.put(layer,true);var node=this._treeOutline.getCachedTreeElement(layer);var parent=layer===layerTree.contentRoot()?this._treeOutline:this._treeOutline.getCachedTreeElement(layer.parent());if(!parent)
console.assert(false,"Parent is not in the tree");if(!node){node=new WebInspector.LayerTreeElement(this,layer);parent.appendChild(node);}else{if(node.parent!==parent){node.parent.removeChild(node);parent.appendChild(node);}
node._update();}}
if(layerTree&&layerTree.contentRoot())
layerTree.forEachLayer(updateLayer.bind(this),layerTree.contentRoot());for(var node=(this._treeOutline.children[0]);node&&!node.root;){if(seenLayers.get(node.representedObject)){node=node.traverseNextTreeElement(false);}else{var nextNode=node.nextSibling||node.parent;node.parent.removeChild(node);if(node===this._lastHoveredNode)
this._lastHoveredNode=null;node=nextNode;}}},_onMouseMove:function(event)
{var node=this._treeOutline.treeElementFromPoint(event.pageX,event.pageY);if(node===this._lastHoveredNode)
return;this.dispatchEventToListeners(WebInspector.LayerTreeOutline.Events.LayerHovered,node&&node.representedObject?{layer:node.representedObject}:null);},_selectedNodeChanged:function(node)
{var layer=(node.representedObject);this.dispatchEventToListeners(WebInspector.LayerTreeOutline.Events.LayerSelected,{layer:layer});},_onContextMenu:function(event)
{var node=this._treeOutline.treeElementFromPoint(event.pageX,event.pageY);if(!node||!node.representedObject)
return;var layer=(node.representedObject);if(!layer)
return;var domNode=layer.nodeForSelfOrAncestor();if(!domNode)
return;var contextMenu=new WebInspector.ContextMenu(event);contextMenu.appendApplicableItems(domNode);contextMenu.show();},__proto__:WebInspector.Object.prototype}
WebInspector.LayerTreeElement=function(tree,layer)
{TreeElement.call(this,"",layer);this._treeOutline=tree;this._update();}
WebInspector.LayerTreeElement.prototype={onattach:function()
{var selection=document.createElement("div");selection.className="selection";this.listItemElement.insertBefore(selection,this.listItemElement.firstChild);},_update:function()
{var layer=(this.representedObject);var node=layer.nodeForSelfOrAncestor();var title=document.createDocumentFragment();title.createChild("div","selection");title.appendChild(document.createTextNode(node?WebInspector.DOMPresentationUtils.simpleSelector(node):"#"+layer.id()));var details=title.createChild("span","dimmed");details.textContent=WebInspector.UIString(" (%d × %d)",layer.width(),layer.height());this.title=title;},onselect:function()
{this._treeOutline._selectedNodeChanged(this);return false;},setHovered:function(hovered)
{this.listItemElement.classList.toggle("hovered",hovered);},__proto__:TreeElement.prototype};WebInspector.LayerDetailsView=function()
{WebInspector.VBox.call(this);this.element.classList.add("layer-details-view");this._emptyView=new WebInspector.EmptyView(WebInspector.UIString("Select a layer to see its details"));this._createTable();}
WebInspector.LayerDetailsView.Events={ObjectSelected:"ObjectSelected"}
WebInspector.LayerDetailsView.CompositingReasonDetail={"transform3D":WebInspector.UIString("Composition due to association with an element with a CSS 3D transform."),"video":WebInspector.UIString("Composition due to association with a <video> element."),"canvas":WebInspector.UIString("Composition due to the element being a <canvas> element."),"plugin":WebInspector.UIString("Composition due to association with a plugin."),"iFrame":WebInspector.UIString("Composition due to association with an <iframe> element."),"backfaceVisibilityHidden":WebInspector.UIString("Composition due to association with an element with a \"backface-visibility: hidden\" style."),"animation":WebInspector.UIString("Composition due to association with an animated element."),"filters":WebInspector.UIString("Composition due to association with an element with CSS filters applied."),"positionFixed":WebInspector.UIString("Composition due to association with an element with a \"position: fixed\" style."),"positionSticky":WebInspector.UIString("Composition due to association with an element with a \"position: sticky\" style."),"overflowScrollingTouch":WebInspector.UIString("Composition due to association with an element with a \"overflow-scrolling: touch\" style."),"blending":WebInspector.UIString("Composition due to association with an element that has blend mode other than \"normal\"."),"assumedOverlap":WebInspector.UIString("Composition due to association with an element that may overlap other composited elements."),"overlap":WebInspector.UIString("Composition due to association with an element overlapping other composited elements."),"negativeZIndexChildren":WebInspector.UIString("Composition due to association with an element with descendants that have a negative z-index."),"transformWithCompositedDescendants":WebInspector.UIString("Composition due to association with an element with composited descendants."),"opacityWithCompositedDescendants":WebInspector.UIString("Composition due to association with an element with opacity applied and composited descendants."),"maskWithCompositedDescendants":WebInspector.UIString("Composition due to association with a masked element and composited descendants."),"reflectionWithCompositedDescendants":WebInspector.UIString("Composition due to association with an element with a reflection and composited descendants."),"filterWithCompositedDescendants":WebInspector.UIString("Composition due to association with an element with CSS filters applied and composited descendants."),"blendingWithCompositedDescendants":WebInspector.UIString("Composition due to association with an element with CSS blending applied and composited descendants."),"clipsCompositingDescendants":WebInspector.UIString("Composition due to association with an element clipping compositing descendants."),"perspective":WebInspector.UIString("Composition due to association with an element with perspective applied."),"preserve3D":WebInspector.UIString("Composition due to association with an element with a \"transform-style: preserve-3d\" style."),"root":WebInspector.UIString("Root layer."),"layerForClip":WebInspector.UIString("Layer for clip."),"layerForScrollbar":WebInspector.UIString("Layer for scrollbar."),"layerForScrollingContainer":WebInspector.UIString("Layer for scrolling container."),"layerForForeground":WebInspector.UIString("Layer for foreground."),"layerForBackground":WebInspector.UIString("Layer for background."),"layerForMask":WebInspector.UIString("Layer for mask."),"layerForVideoOverlay":WebInspector.UIString("Layer for video overlay.")};WebInspector.LayerDetailsView.prototype={setObject:function(activeObject)
{this._layer=activeObject?activeObject.layer:null;this._scrollRectIndex=activeObject?activeObject.scrollRectIndex:null;if(this.isShowing())
this.update();},wasShown:function()
{WebInspector.View.prototype.wasShown.call(this);this.update();},_onScrollRectClicked:function(index,event)
{if(event.which!==1)
return;this.dispatchEventToListeners(WebInspector.LayerDetailsView.Events.ObjectSelected,{layer:this._layer,scrollRectIndex:index});},_createScrollRectElement:function(scrollRect,index)
{if(index)
this._scrollRectsCell.createTextChild(", ");var element=this._scrollRectsCell.createChild("span");element.className=index===this._scrollRectIndex?"scroll-rect active":"scroll-rect";element.textContent=WebInspector.LayerTreeModel.ScrollRectType[scrollRect.type].description+" ("+scrollRect.rect.x+", "+scrollRect.rect.y+", "+scrollRect.rect.width+", "+scrollRect.rect.height+")";element.addEventListener("click",this._onScrollRectClicked.bind(this,index),false);},update:function()
{if(!this._layer){this._tableElement.remove();this._emptyView.show(this.element);return;}
this._emptyView.detach();this.element.appendChild(this._tableElement);this._positionCell.textContent=WebInspector.UIString("%d,%d",this._layer.offsetX(),this._layer.offsetY());this._sizeCell.textContent=WebInspector.UIString("%d × %d",this._layer.width(),this._layer.height());this._paintCountCell.textContent=this._layer.paintCount();const bytesPerPixel=4;this._memoryEstimateCell.textContent=Number.bytesToString(this._layer.invisible()?0:this._layer.width()*this._layer.height()*bytesPerPixel);this._layer.requestCompositingReasons(this._updateCompositingReasons.bind(this));this._scrollRectsCell.removeChildren();this._layer.scrollRects().forEach(this._createScrollRectElement.bind(this));},_createTable:function()
{this._tableElement=this.element.createChild("table");this._tbodyElement=this._tableElement.createChild("tbody");this._positionCell=this._createRow(WebInspector.UIString("Position in parent:"));this._sizeCell=this._createRow(WebInspector.UIString("Size:"));this._compositingReasonsCell=this._createRow(WebInspector.UIString("Compositing Reasons:"));this._memoryEstimateCell=this._createRow(WebInspector.UIString("Memory estimate:"));this._paintCountCell=this._createRow(WebInspector.UIString("Paint count:"));this._scrollRectsCell=this._createRow(WebInspector.UIString("Slow scroll regions:"));},_createRow:function(title)
{var tr=this._tbodyElement.createChild("tr");var titleCell=tr.createChild("td");titleCell.textContent=title;return tr.createChild("td");},_updateCompositingReasons:function(compositingReasons)
{if(!compositingReasons||!compositingReasons.length){this._compositingReasonsCell.textContent="n/a";return;}
var fragment=document.createDocumentFragment();for(var i=0;i<compositingReasons.length;++i){if(i)
fragment.appendChild(document.createTextNode(","));var span=document.createElement("span");span.title=WebInspector.LayerDetailsView.CompositingReasonDetail[compositingReasons[i]]||"";span.textContent=compositingReasons[i];fragment.appendChild(span);}
this._compositingReasonsCell.removeChildren();this._compositingReasonsCell.appendChild(fragment);},__proto__:WebInspector.VBox.prototype};WebInspector.PaintProfilerView=function(showImageCallback)
{WebInspector.View.call(this);this.element.classList.add("paint-profiler-view");this._showImageCallback=showImageCallback;this._canvas=this.element.createChild("canvas","fill");this._context=this._canvas.getContext("2d");this._selectionWindow=new WebInspector.OverviewGrid.Window(this.element,this.element);this._selectionWindow.addEventListener(WebInspector.OverviewGrid.Events.WindowChanged,this._onWindowChanged,this);this._innerBarWidth=4*window.devicePixelRatio;this._minBarHeight=4*window.devicePixelRatio;this._barPaddingWidth=2*window.devicePixelRatio;this._outerBarWidth=this._innerBarWidth+this._barPaddingWidth;this._reset();}
WebInspector.PaintProfilerView.Events={WindowChanged:"WindowChanged"};WebInspector.PaintProfilerView.prototype={onResize:function()
{this._update();},setSnapshot:function(snapshot)
{this._reset();this._snapshot=snapshot;if(!this._snapshot){this._update();return;}
snapshot.requestImage(null,null,this._showImageCallback);snapshot.profile(onProfileDone.bind(this));function onProfileDone(profiles)
{this._profiles=profiles;this._update();}},_update:function()
{this._canvas.width=this.element.clientWidth*window.devicePixelRatio;this._canvas.height=this.element.clientHeight*window.devicePixelRatio;this._samplesPerBar=0;if(!this._profiles||!this._profiles.length)
return;var maxBars=Math.floor((this._canvas.width-2*this._barPaddingWidth)/this._outerBarWidth);var sampleCount=this._profiles[0].length;this._samplesPerBar=Math.ceil(sampleCount/maxBars);var barCount=Math.floor(sampleCount/this._samplesPerBar);var maxBarTime=0;var barTimes=[];for(var i=0,lastBarIndex=0,lastBarTime=0;i<sampleCount;){for(var row=0;row<this._profiles.length;row++)
lastBarTime+=this._profiles[row][i];++i;if(i-lastBarIndex==this._samplesPerBar||i==sampleCount){lastBarTime/=this._profiles.length*(i-lastBarIndex);barTimes.push(lastBarTime);if(lastBarTime>maxBarTime)
maxBarTime=lastBarTime;lastBarTime=0;lastBarIndex=i;}}
const paddingHeight=4*window.devicePixelRatio;var scale=(this._canvas.height-paddingHeight-this._minBarHeight)/maxBarTime;this._context.fillStyle="rgba(110, 180, 110, 0.7)";for(var i=0;i<barTimes.length;++i)
this._renderBar(i,barTimes[i]*scale+this._minBarHeight);},_renderBar:function(index,height)
{var x=this._barPaddingWidth+index*this._outerBarWidth;var y=this._canvas.height-height;this._context.fillRect(x,y,this._innerBarWidth,height);},_onWindowChanged:function()
{if(this._updateImageTimer)
return;this._updateImageTimer=setTimeout(this._updateImage.bind(this),100);this.dispatchEventToListeners(WebInspector.PaintProfilerView.Events.WindowChanged);},windowBoundaries:function()
{var screenLeft=this._selectionWindow.windowLeft*this._canvas.width;var screenRight=this._selectionWindow.windowRight*this._canvas.width;var barLeft=Math.floor((screenLeft-this._barPaddingWidth)/this._outerBarWidth);var barRight=Math.floor((screenRight-this._barPaddingWidth+this._innerBarWidth)/this._outerBarWidth);var stepLeft=Math.max(0,barLeft*this._samplesPerBar);var stepRight=Math.min(barRight*this._samplesPerBar,this._profiles[0].length);return{left:stepLeft,right:stepRight};},_updateImage:function()
{delete this._updateImageTimer;if(!this._profiles||!this._profiles.length)
return;var window=this.windowBoundaries();this._snapshot.requestImage(window.left,window.right,this._showImageCallback);},_reset:function()
{this._snapshot=null;this._profiles=null;this._selectionWindow.reset();},__proto__:WebInspector.HBox.prototype};WebInspector.PaintProfilerCommandLogView=function()
{WebInspector.VBox.call(this);this.setMinimumSize(100,25);this.element.classList.add("outline-disclosure");var sidebarTreeElement=this.element.createChild("ol","sidebar-tree");this.sidebarTree=new TreeOutline(sidebarTreeElement);this._popoverHelper=new WebInspector.ObjectPopoverHelper(this.element,this._getHoverAnchor.bind(this),this._resolveObjectForPopover.bind(this),undefined,true);this._reset();}
WebInspector.PaintProfilerCommandLogView.prototype={setSnapshot:function(snapshot)
{this._reset();if(!snapshot){this.updateWindow();return;}
snapshot.commandLog(onCommandLogDone.bind(this));function onCommandLogDone(log)
{this._log=log;this.updateWindow();}},updateWindow:function(stepLeft,stepRight)
{var log=this._log;stepLeft=stepLeft||0;stepRight=stepRight||log.length-1;this.sidebarTree.removeChildren();for(var i=stepLeft;i<=stepRight;++i){var node=new WebInspector.LogTreeElement(log[i]);this.sidebarTree.appendChild(node);}},_reset:function()
{this._log=[];},_getHoverAnchor:function(target)
{return(target.enclosingNodeOrSelfWithNodeName("span"));},_resolveObjectForPopover:function(element,showCallback)
{var liElement=element.enclosingNodeOrSelfWithNodeName("li");var logItem=liElement.treeElement.representedObject;var obj={"method":logItem.method};if(logItem.params)
obj.params=logItem.params;showCallback(WebInspector.RemoteObject.fromLocalObject(obj),false);},__proto__:WebInspector.VBox.prototype};WebInspector.LogTreeElement=function(logItem)
{TreeElement.call(this,"",logItem);this._update();}
WebInspector.LogTreeElement.prototype={_paramToString:function(param,name)
{if(typeof param!=="object")
return typeof param==="string"&&param.length>100?name:JSON.stringify(param);var str="";var keyCount=0;for(var key in param){if(++keyCount>4||typeof param[key]==="object"||(typeof param[key]==="string"&&param[key].length>100))
return name;if(str)
str+=", ";str+=param[key];}
return str;},_paramsToString:function(params)
{var str="";for(var key in params){if(str)
str+=", ";str+=this._paramToString(params[key],key);}
return str;},_update:function()
{var logItem=this.representedObject;var title=document.createDocumentFragment();title.createChild("div","selection");var span=title.createChild("span");var textContent=logItem.method;if(logItem.params)
textContent+="("+this._paramsToString(logItem.params)+")";span.textContent=textContent;this.title=title;},setHovered:function(hovered)
{this.listItemElement.classList.toggle("hovered",hovered);},__proto__:TreeElement.prototype};;WebInspector.LayerPaintProfilerView=function(showImageForLayerCallback)
{WebInspector.SplitView.call(this,true,false);this._showImageForLayerCallback=showImageForLayerCallback;this._logTreeView=new WebInspector.PaintProfilerCommandLogView();this._logTreeView.show(this.sidebarElement());this._paintProfilerView=new WebInspector.PaintProfilerView(this._showImage.bind(this));this._paintProfilerView.show(this.mainElement());this._paintProfilerView.addEventListener(WebInspector.PaintProfilerView.Events.WindowChanged,this._onWindowChanged,this);}
WebInspector.LayerPaintProfilerView.prototype={profileLayer:function(layer)
{layer.requestSnapshot(onSnapshotDone.bind(this));function onSnapshotDone(snapshot)
{this._layer=layer;this._paintProfilerView.setSnapshot(snapshot||null);this._logTreeView.setSnapshot(snapshot||null);}},_onWindowChanged:function()
{var window=this._paintProfilerView.windowBoundaries();this._logTreeView.updateWindow(window.left,window.right);},_showImage:function(imageURL)
{this._showImageForLayerCallback(this._layer,imageURL);},__proto__:WebInspector.SplitView.prototype};;WebInspector.LayersPanel=function()
{WebInspector.PanelWithSidebarTree.call(this,"layers",225);this.registerRequiredCSS("layersPanel.css");this.sidebarElement().classList.add("outline-disclosure");this.sidebarTree.element.classList.remove("sidebar-tree");this._target=(WebInspector.targetManager.activeTarget());this._model=new WebInspector.LayerTreeModel(this._target);this._model.addEventListener(WebInspector.LayerTreeModel.Events.LayerTreeChanged,this._onLayerTreeUpdated,this);this._model.addEventListener(WebInspector.LayerTreeModel.Events.LayerPainted,this._onLayerPainted,this);this._currentlySelectedLayer=null;this._currentlyHoveredLayer=null;this._layerTreeOutline=new WebInspector.LayerTreeOutline(this.sidebarTree);this._layerTreeOutline.addEventListener(WebInspector.LayerTreeOutline.Events.LayerSelected,this._onObjectSelected,this);this._layerTreeOutline.addEventListener(WebInspector.LayerTreeOutline.Events.LayerHovered,this._onObjectHovered,this);this._rightSplitView=new WebInspector.SplitView(false,true,"layerDetailsSplitViewState");this._rightSplitView.show(this.mainElement());this._layers3DView=new WebInspector.Layers3DView();this._layers3DView.show(this._rightSplitView.mainElement());this._layers3DView.addEventListener(WebInspector.Layers3DView.Events.ObjectSelected,this._onObjectSelected,this);this._layers3DView.addEventListener(WebInspector.Layers3DView.Events.ObjectHovered,this._onObjectHovered,this);this._layers3DView.addEventListener(WebInspector.Layers3DView.Events.LayerSnapshotRequested,this._onSnapshotRequested,this);this._layers3DView.registerShortcuts(this.registerShortcuts.bind(this));this._tabbedPane=new WebInspector.TabbedPane();this._tabbedPane.show(this._rightSplitView.sidebarElement());this._layerDetailsView=new WebInspector.LayerDetailsView();this._layerDetailsView.addEventListener(WebInspector.LayerDetailsView.Events.ObjectSelected,this._onObjectSelected,this);this._tabbedPane.appendTab(WebInspector.LayersPanel.DetailsViewTabs.Details,WebInspector.UIString("Details"),this._layerDetailsView);this._paintProfilerView=new WebInspector.LayerPaintProfilerView(this._layers3DView.showImageForLayer.bind(this._layers3DView));this._tabbedPane.appendTab(WebInspector.LayersPanel.DetailsViewTabs.Profiler,WebInspector.UIString("Profiler"),this._paintProfilerView);}
WebInspector.LayersPanel.DetailsViewTabs={Details:"details",Profiler:"profiler"};WebInspector.LayersPanel.prototype={wasShown:function()
{WebInspector.Panel.prototype.wasShown.call(this);this.sidebarTree.element.focus();this._model.enable();},willHide:function()
{this._model.disable();WebInspector.Panel.prototype.willHide.call(this);},_showLayerTree:function(deferredLayerTree)
{deferredLayerTree.resolve(onLayersReady.bind(this));function onLayersReady(layerTree)
{this._model.setLayerTree(layerTree);}},_onLayerTreeUpdated:function()
{var layerTree=this._model.layerTree();this._layers3DView.setLayerTree(layerTree);this._layerTreeOutline.update(layerTree);if(this._currentlySelectedLayer&&(!layerTree||!layerTree.layerById(this._currentlySelectedLayer.layer.id())))
this._selectObject(null);if(this._currentlyHoveredLayer&&(!layerTree||!layerTree.layerById(this._currentlyHoveredLayer.layer.id())))
this._hoverObject(null);this._layerDetailsView.update();},_onLayerPainted:function(event)
{this._layers3DView.setLayerTree(this._model.layerTree());if(this._currentlySelectedLayer&&this._currentlySelectedLayer.layer===event.data)
this._layerDetailsView.update();},_onObjectSelected:function(event)
{var activeObject=(event.data);this._selectObject(activeObject);},_onObjectHovered:function(event)
{var activeObject=(event.data);this._hoverObject(activeObject);},_onSnapshotRequested:function(event)
{var layer=(event.data);this._tabbedPane.selectTab(WebInspector.LayersPanel.DetailsViewTabs.Profiler);this._paintProfilerView.profileLayer(layer);},_selectObject:function(activeObject)
{var layer=activeObject&&activeObject.layer;if(this._currentlySelectedLayer===activeObject)
return;this._currentlySelectedLayer=activeObject;var node=layer?layer.nodeForSelfOrAncestor():null;if(node)
node.highlightForTwoSeconds();else
this._target.domModel.hideDOMNodeHighlight();this._layerTreeOutline.selectLayer(layer);this._layers3DView.selectObject(activeObject);this._layerDetailsView.setObject(activeObject);},_hoverObject:function(activeObject)
{var layer=activeObject&&activeObject.layer;if(this._currentlyHoveredLayer===activeObject)
return;this._currentlyHoveredLayer=activeObject;var node=layer?layer.nodeForSelfOrAncestor():null;if(node)
node.highlight();else
this._target.domModel.hideDOMNodeHighlight();this._layerTreeOutline.hoverLayer(layer);this._layers3DView.hoverObject(activeObject);},_showImageForLayer:function(layer,imageURL)
{this._layers3DView.showImageForLayer(layer,imageURL);},__proto__:WebInspector.PanelWithSidebarTree.prototype}
WebInspector.LayersPanel.LayerTreeRevealer=function()
{}
WebInspector.LayersPanel.LayerTreeRevealer.prototype={reveal:function(snapshotData)
{if(!(snapshotData instanceof WebInspector.DeferredLayerTree))
return;var panel=(WebInspector.inspectorView.showPanel("layers"));panel._showLayerTree((snapshotData));}}