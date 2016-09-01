/* global d3, $, queue */
// Dependency on queue.js

(function() {
    "use strict";

    // Heights & Widths
    var legendHeight = 60,
	legendWidth = '100%',
	mapWidth = 600,
	mapHeight = 400;

    var currentyear;
    var svgContainer;
    var opChgScale;

    // Helper functions

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }



    function initialize() {
	queue()
	//should be town polym data
	.defer(d3.json, "js/data/opioid_count_by_town.geo.json")
	//.defer(d3.json, "us_states_5m.geo.json")
	//should be opioid death data
	.defer(d3.json, "js/data/opioid_count_by_town.geo.json")
	//.defer(d3.csv, "us_pop.csv")
	.awaitAll(generateMap);
    }

    function generateMap(error, results) {

	var maTowns = results[0];
	var maOpioid = results[1];


	$('.controls-map').click(function() {
	    $("#odMap_timeline").val($(this).data('select'));
	    setSymbology($(this).data('select'));
	});

	for (var i = 0; i < maTowns.features.length; i++) {
	    if (maTowns.features[i].properties.town !== maOpioid.features[i].TOWN) {
		console.log('ASSERT failure for index: ' + i);
		console.log(maTowns.features[i].properties.town + ' mismatch with ' + maOpioid.features[i].TOWN);
		// alert('Input data corrupted: generation of map terminated.');
		return;
            }
	    maTowns.features[i].properties.OPIOIDSTATS = maOpioid.features[i].properties;
	}

	svgContainer = d3.select("#odMap_map")
	    .classed("svg-container", true) //container class to make it responsive
	    .append("svg")
	    .attr("preserveAspectRatio", "xMinYMin meet")
	    .attr("viewBox", "0 0 "+mapWidth+" "+mapHeight)
	    //class to make it responsive
	    .classed("svg-content-responsive", true)
	    .style("border", "0px solid steelblue");

	var tooltip = d3.select('#odMap_map').append('div')
	    .attr('class', 'hidden vis-tooltip');

	//#eff3ff

	opChgScale = d3.scale.threshold()
	    .domain([0.01, 1.01, 5.01, 15.01, 33.01, 64.01, Infinity])
	    .range(["#f1f1f1","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5", "#084594"]);
	opChgScale.domainStrings = function() {
	    return (['0', '1', '2-5', '6-15', '16-33', '34-64', '>64'
	    ]);
	};


	var projection = d3.geo.conicConformal()
	    .parallels([41 + 43 / 60, 42 + 41 / 60])
	    .rotate([71 + 30 / 60, -41])
	    .scale([10000])
	    .translate([mapWidth/1.8, mapHeight*1.1]);

	var geoPath = d3.geo.path()
	    .projection(projection);

	svgContainer.selectAll("path")
	    .data(maTowns.features)
	    .enter()
	    .append("path")
	    .classed("deathmap", true)
	    .attr("d", function(d, i) {
		return geoPath(d);
	    })
	    .style("stroke", "#2f363d")
	    .style("stroke-width", "0.1px")
	    .style("fill", "white")
	    .on('mousemove', function(d) {
		var mouse = d3.mouse(svgContainer.node()).map(function(d) {
		    return parseInt(d);
		});

		var style = 'left:'+((100*mouse[0]/mapWidth)+3)+'% !important;top:'+(100*mouse[1]/mapHeight)+'% !important;';
		// Add transformation based on where the mouse is (top, bottom, left, right) to keep it in view
		var transformX= mouse[0] > mapWidth/2 ? '-160%' : 0,
		    transformY= mouse[1] > mapHeight/2 ? '-100%' : 0;
		style += 'transform: translate('+transformX+','+transformY+');';

		var string_base = "yr";
		var currentvalue = string_base.concat(currentyear);
		var currentrate;

		if (d.properties[currentvalue] > 0) {
		    currentrate = d3.format(".0f")(d.properties[currentvalue]);
		} else if (d.properties[currentvalue] === 0) {
		    currentrate = d3.format(".0f")(d.properties[currentvalue]);
		} else {
		    currentrate = "N/A*";
		}

		tooltip.classed('hidden', false)
		    .attr('style', style)
		    .html("<strong>" + toTitleCase(d.properties.TOWN) + "</strong> | " + currentrate);
	    })

	    .on('mouseover', function(d, i) {
		d3.select(this).style('fill-opacity', 0.25)
		    .style("stroke", "white")
		    .style("stroke-width", "2px");
	    })
	    .on('mouseout', function(d, i) {
		tooltip.classed('hidden', true);
		d3.selectAll('path.deathmap')
		    .style("fill-opacity", 1)
		    .style("stroke", "#2f363d")
			.style("stroke-width", "0.1px");
	    });


	getYear();
	generateLegend(opChgScale, 'odMap_legend', 'Count of Opioid Related Deaths by Municipality');


    } // generateMap

    function getYear() {
        setSymbology(2000);
        $("#odMap_timeline").on('input change', function() {
            setSymbology($(this).val());
        });
    }

    function setSymbology(year) {

        var szAttr = 'yr' + year;
        currentyear = year;
        $('#odMap_titlePrefix').html('Count of Opiod Related Deaths in Massachusetts in');
        $('#odMap_fromYear').html(year);

        $('#odMap_source').html('Sources: Massachusetts Department of Public Health,' +
                             '<br>Massachusetts Registry of Vital Records and Statistics</>');

        svgContainer.selectAll("path.deathmap")
            .transition()
            .duration(500)
            .style("fill", function(d, i) {
                var delta = +d.properties.OPIOIDSTATS[szAttr];
                return (delta === -9999) ? '#f1f1f1' : opChgScale(delta);
            });
    }

    function generateLegend(scale, szDivId, szCaption) {

        var svg = d3.select('#' + szDivId).append("svg")
	    .attr("width", legendWidth)
	    .attr("height", legendHeight);

        var g = svg.append("g");

        // Create data array.
        var legendData = [];
        //legendData.push({
            //d: -9999,
            //r: '#f1f1f1',
            //s: 'N/A'
        //});
	for (var i = 0; i < scale.domain().length; i++) {
            legendData.push({
                d: scale.domain()[i],
                r: scale.range()[i],
                s: scale.domainStrings()[i]
            });
        }

	var unitWidth = 100/legendData.length;

        g.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
	    .attr("height", legendHeight/3)
	    .attr("width", function(d, i) {
		return unitWidth+'%';
	    })
            .attr("x", function(d, i) {
		return (i * unitWidth) + '%';
            })
            .attr("y", 20)
            .style("stroke", "black")
            .style("stroke-width", "0.25px")
            .style("fill", function(d, i) {
                return d.r;
            });

        g.selectAll("text")
            .data(legendData)
            .enter().append("text")
	    .attr('text-anchor', 'middle')
            .attr("x", function(d, i) {
		return (i * unitWidth) + (unitWidth/2) + '%';
            })
	    .attr("y", 55)
            .text(function(d, i) {
                return d.s;
            })
            .style("font-size", "12px");

        g.append("text")
            .attr("class", "caption")
            .attr("y", 12)
            .text(szCaption);
    } // generateLegend()


    $(document).ready(initialize);
})();







// ///////////////////Map Composite










// function app2() {
//     queue()
//     //should be town polym data
//     .defer(d3.json, "js/data/TOWN.geo.json")
//     //.defer(d3.json, "us_states_5m.geo.json")
//     //should be opioid death data
//     .defer(d3.json, "js/data/TOWN.geo.json")
//     //.defer(d3.csv, "us_pop.csv")
//     .awaitAll(generateMap2);
// }

// function generateMap2(error, results) {
//     $('.controls-map').click(function() {
//         $("#timeline").val($(this).data('select'));
//         setSymbology2($(this).data('select'));
//     });

//     var maTowns = results[0];
//     var maOpioid = results[1];

//     var currentyear

//     var i;
//     for (i = 0; i < maTowns.features.length; i++) {
//         if (maTowns.features[i].properties.town != maOpioid.features[i].TOWN) {
//             // console.log('ASSERT failure for index: ' + i);
//             // console.log(maTowns.features[i].properties.town + ' mismatch with ' + maOpioid.features[i].TOWN);
//             alert('Input data corrupted: generation of map terminated.');
//             return;
//         }
//         maTowns.features[i].properties.OPIOIDSTATS = maOpioid.features[i].properties;
//     }

//     var width = 960,
//         height = 450;

//     var svgContainer = d3.select("#map2").append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .style("border", "0px solid steelblue");

//     var tooltip2 = d3.select('#map2').append('div')
//         .attr('class', 'hidden tooltip2');

//     var opChgScale = d3.scale.threshold()
//         .domain([0.01, 6.9, 15.9, 31.5, Infinity])
//         .range(colorbrewer.RdPu[5]);
//     opChgScale.domainStrings = function() {
//         return (['< 0.01', '0.01-6.9', '6.9-15.9',
//             '15.9-31.5', '>31.5'
//         ]);
//     };

//     function toTitleCase(str) {
//         return str.replace(/\w\S*/g, function(txt) {
//             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//         });
//     }

//     var projection = d3.geo.conicConformal()
//         .parallels([41 + 43 / 60, 42 + 41 / 60])
//         .rotate([71 + 30 / 60, -41])
//         .scale([10000])
//         .translate([330, 480]);

//     var geoPath = d3.geo.path()
//         .projection(projection);

//     var map = svgContainer.selectAll("path")
//         .data(maTowns.features)
//         .enter()
//         .append("path")
//         .attr("d", function(d, i) {
//             return geoPath(d);
//         })
//         .on('mousemove', function(d) {
//             var mouse = d3.mouse(svgContainer.node()).map(function(d) {
//                 return parseInt(d);
//             });
//             var string_base = "yr"
//             currentvalue = string_base.concat(currentyear);
//             var currentrate

//             if (d.properties[currentvalue] > 0) {
//                 currentrate = d3.format(".1f")(d.properties[currentvalue]);
//             } else if (d.properties[currentvalue] == 0) {
//                 currentrate = d3.format(".0f")(d.properties[currentvalue]);
//             } else {
//                 currentrate = "N/A*";
//             }


//             tooltip2.classed('hidden', false)
//                 .attr('style', 'left:' + (mouse[0] + 15) +
//                     'px !important; top:' + (mouse[1] + 625) + 'px !important')
//                 .html("<b>" + toTitleCase(d.properties.TOWN) + "</b> | " + currentrate);
//         })
//         .on('mouseover', function(d, i) {

//             var currentState = this;
//             d3.select(this).style('fill-opacity', 0.25)
//                 .style("stroke", "white")
//                 .style("stroke-width", "2px");
//         })
//         .on('mouseout', function(d, i) {
//             tooltip2.classed('hidden', true);
//             d3.selectAll('path')
//                 .style("fill-opacity", 1)
//                 .style("stroke", "#2f363d")
//                 .style("stroke-width", "0.1px");
//         })
//         .style("stroke", "#2f363d")
//         .style("stroke-width", "0.1px")
//         .style("fill", "white")
//         .on('mouseenter', function(d, i) {

//             //var string_base = "yr"
//             //currentvalue = string_base.concat(currentyear);
//             //console.log(d.properties[currentvalue]);
//         })
//         .on('mouseleave', function(d) {

//         });

//     var aYears = [
//         [2000, 2001],
//         [2001, 2002],
//         [2002, 2003],
//         [2003, 2004],
//         [2004, 2005],
//         [2005, 2006],
//         [2006, 2007],
//         [2007, 2008],
//         [2008, 2009],
//         [2010, 2011],
//         [2011, 2012],
//         [2012, 2013],
//         [2013, 2014],
//         [2014, 2014.5]
//     ];

//     var index = 0;
//     getYear();

//     generateLegend2(opChgScale, 'legend2', 'Composite Index Values');

//     function getYear() {
//         setSymbology2(2000);
//         $("#timeline").on('input change', function() {
//             var year = $(this).val()
//             setSymbology2($(this).val());
//         });
//     };


//     function setSymbology2(year) {

//         var szAttr = 'yr' + year;
//         currentyear = year
//         var toyear = eval(year) + 1

//         $('#titlePrefix2').html('Opioid Overdose Events in Massachusetts from');
//         $('#fromYear2').html(year);
//         $('#titleMidfix2').html('to');
//         $('#toYear2').html(toyear).append('<span>*</span>');
//         $('#map2-note').html('*Fatal and nonfatal overdoses, ambulance trips, emergency room admissions, narcan use, etc.');
//         $('#map2-source').html('Data Sources: U.S. Census Bureau;' +
//                             '<br />Executive Office of Health and Human Services'+
//                             '<br />(Registry of Vital Records and Statistics,' +
//                             '<br />Massachusetts Department of Public Health)');



//         svgContainer.selectAll("path")
//             .transition()
//             .duration(500)
//             .style("fill", function(d, i) {

//                 var delta = +d.properties.OPIOIDSTATS[szAttr];
//                 return (delta === -9999) ? '#f1f1f1' : opChgScale(delta);
//             });
//     }

//     function generateLegend2(scale, szDivId, szCaption) {
//         var width2 = 550,
//             height2 = 80;

//         var svg = d3.select('#' + szDivId).append("svg")
//             .attr("width", width2)
//             .attr("height", height2);

//         var g = svg.append("g");

//         // Create data array.
//         var legendData = [];
//         legendData.push({
//             d: -9999,
//             r: '#f1f1f1',
//             s: 'N/A'
//         });
//         var i;
//         for (i = 0; i < scale.domain().length; i++) {
//             legendData.push({
//                 d: scale.domain()[i],
//                 r: scale.range()[i],
//                 s: scale.domainStrings()[i]
//             });
//         }

//         g.selectAll("rect")
//             .data(legendData)
//             .enter().append("rect")
//             .attr("height", 20)
//             .attr("width", 50)
//             .attr("x", function(d, i) {
//                 return i * 55;
//             })
//             .attr("y", 20)
//             .style("stroke", "black")
//             .style("stroke-width", "0.25px")
//             .style("fill", function(d, i) {
//                 return d.r;
//             });

//         g.selectAll("text")
//             .data(legendData)
//             .enter().append("text")
//             .attr("x", function(d, i) {
//                 return i * 55;
//             })
//             .attr("y", 60)
//             .text(function(d, i) {
//                 return d.s;
//             })
//             .style("font-size", "12px");

//         g.append("text")
//             .attr("class", "caption")
//             .attr("y", 12)
//             .text(szCaption);
//     } // generateLegend2()
// } // generateMap2
