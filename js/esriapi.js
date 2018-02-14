define([
	"esri/layers/ArcGISDynamicMapServiceLayer", "esri/geometry/Extent", "esri/SpatialReference", "esri/tasks/query" ,"esri/tasks/QueryTask", "dojo/_base/declare", "esri/layers/FeatureLayer", 
	"esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol","esri/symbols/SimpleMarkerSymbol", "esri/graphic", "dojo/_base/Color"
],
function ( 	ArcGISDynamicMapServiceLayer, Extent, SpatialReference, Query, QueryTask, declare, FeatureLayer, 
			SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, Graphic, Color) {
        "use strict";

        return declare(null, {
			esriApiFunctions: function(t){	
				// Add dynamic map service
				t.dynamicLayer = new ArcGISDynamicMapServiceLayer(t.url, {opacity:0.7});
				t.map.addLayer(t.dynamicLayer);
				if (t.obj.visibleLayers.length > 0){	
					t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
				}
				t.dynamicLayer.on("load", function () {
					console.log('dynamic layer load')
					// t.clicks.tableRowClose(t); 	
					// hide the framework toolbox	
					$('#map-utils-control').hide();	
					// create layers array
					t.layersArray = t.dynamicLayer.layerInfos;
					if (t.obj.stateSet == "no"){
						t.map.setExtent(t.dynamicLayer.fullExtent.expand(1), true)
					}
////////////////////////////// save and share code below ////////////////////////////////////////////////////////////
					if(t.obj.stateSet == 'yes'){
						// bring in layer defs var
						t.obj.layerDefinitions = [];
						// check the correct cb's
						$.each(t.obj.cbTracker, function(i,v){
							$('#' + v).prop('checked', true);
						})
						// put the radio button in the right place
						$('#' + t.obj.radButtonTracker).prop('checked', true);
						// if there is a selected layer set layer defs and add layer to map
						t.obj.layerDefinitions[t.obj.queryTracker] = t.obj.query;
						t.dynamicLayer.setLayerDefinitions(t.obj.layerDefinitions);
						// if something has been selected slide down the correct att box and populate
						console.log(t.obj.query);
						if(t.obj.query){
							console.log('something has been selected')
						}
						// 

						// display the correct layers on the map
						t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
						// check the correct checkboxes in the sup data section ////////////////////////
						$.each(t.obj.supCheckArray,function(i,y){
							$.each($('#' + t.id + 'supData input'),function(i,v){
								if(y == v.value){
									$(v).prop('checked', 'true');
								}
							})
						})
						// zoom to the correct area of the map
						t.map.setExtent(t.obj.extent, true);


						// update the layer deffs for viz layers using data object
						// t.dynamicLayer.setLayerDefinitions(t.obj.layerDefinitions);
						
						// check the correct checkboxes on the main section ////////////////////////
						// $.each(t.obj.mainCheckArray,function(i,y){
						// 	$.each($('#' + t.id + 'mainRadioBtns .aoc-mainCB input'),function(i,v){
						// 		if(y == v.value){
						// 			$(v).prop('checked', 'true');
						// 		}
						// 	})
						// })
						
						// // slide down the correct html elems /////////////////////////////////////
						// if($('#' + t.id + 'mainRadioBtns .aoc-mainCB input').is(":checked")){
						// 	$('#' + t.id + 'contentBelowHeader').slideDown();
						// }
						// build the table on the app pane /////////////////////////////////////////
						// 
						// loop through the object and append table rows
						// $.each(t.obj.wetlandTableObject,function(i,atts){
						// 	// slide down table
						// 	$('#' + t.id + 'wetlandTableWrapper').slideDown();
						// 	// slide toogle buttons down
						// 	$('#' + t.id + 'toggleButtons').slideDown();
						// 	// slide up click on map text
						// 	$('#' + t.id + 'clickOnMapText').slideUp();
						// 	// append rows to table
						// 	$('#' + t.id + 'wetlandTable').append('<tr><td>' + atts['WETLAND_ID'] + '</td><td>' + atts['WETLAND_TYPE'] 
						// 		+ '</td><td>' + atts['ALL_RANK'] + '</td><td>' + atts['SS_RANK'] + '</td><td>'
						// 		+ atts['PR_RANK'] +  '</td><td>' + atts['FLDP_RANK'] + '</td><td>' + atts['TILE_RANK'] + '</td>' 
						// 		+ '<td class="aoc-tableClose"' + '>' + '&#215;' + '</td></tr>');
						// 	// call the table close function
						// 	t.clicks.tableRowClose(t);
							
						// })
						// // calculate the number of selected items based on data array
						// $(".aoc-selCounter").first().html(t.obj.wetWhereArray.length);
						
					}
				});					
			}
		});
    }
);