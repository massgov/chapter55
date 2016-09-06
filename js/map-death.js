$(document).ready(function() {
    app();
    app2();
});

function app() {
    queue()
        //should be town polym data
        .defer(d3.json, "js/data/TOWN.geo.json")
        //.defer(d3.json, "us_states_5m.geo.json")
        //should be opioid death data
        .defer(d3.json, "js/data/TOWN.geo.json")
        //.defer(d3.csv, "us_pop.csv")
        .awaitAll(generateMap);
}

function generateMap(error, results) {

    //should be town polym data
    var maTowns = results[0];
    //var usStates = results[0];
    //should be opioid death data
    var maOpioid = results[1];
    //var usPop = results[1];
    // The data in usStates is in alpha-order by state, as is the data in usPop.
    // The ASSERT test below is just a sanity-check for possible corruption.

    var i;
    for (i = 0; i < maTowns.features.length; i++) {
	//for (i = 0; i < usStates.features.length; i++) {
        // Assert test.
        if (maTowns.features[i].properties.town != maOpioid.features[i].TOWN) {
            //if (usStates.features[i].properties.NAME !== usPop[i].State) {
            //console.log('ASSERT failure for index: ' + i);
            //console.log(maTowns.features[i].properties.town + ' mismatch with ' + maOpioid.features[i].TOWN);
            //console.log(usStates.features[i].properties.NAME + ' mismatch with ' + usPop[i].State);
            alert('Input data corrupted: generation of map terminated.');
            return;
        }
        maTowns.features[i].properties.OPIOIDSTATS = maOpioid.features[i].properties;
        //usStates.features[i].properties.POPSTATS = usPop[i];
    }

    var width = 960,
        height = 500;

    var svgContainer = d3.select("#map_death").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "0px solid steelblue");

    var opChgScale = d3.scale.threshold()
        //popChgScale = d3.scale.threshold()
        .domain([0.01, 6.9, 15.9, 31.5, Infinity])
        .range(colorbrewer.Blues[5]);
    //.range(colorbrewer.Greens[10]);
    opChgScale.domainStrings = function() {
        return (['< 0.01', '0.01-6.9', '6.9-15.9',
            '15.9-31.5', '>31.5'
        ]);
    };

    var projection = d3.geo.conicConformal()
        .parallels([41 + 43 / 60, 42 + 41 / 60])
        .rotate([71 + 30 / 60, -41])
        .scale([11000])
        .translate([480, 500]);
    //var projection = d3.geo.albersUsa()
    //.scale(1280)
    //.translate([width / 2, height / 2]);

    var geoPath = d3.geo.path()
        .projection(projection);



    var map = svgContainer.selectAll("path")
        .data(maTowns.features)
        .enter()
        .append("path")
        .attr("d", function(d, i) {
            return geoPath(d);
        })
        .on('mousemove', function(d) {
            var mouse = d3.mouse(svgContainer.node()).map(function(d) {
                return parseInt(d);
            });

            var string_base = "yr"
            currentvalue = string_base.concat(currentyear);

            var currentrate

            if (d.properties[currentvalue] > 0) {
                currentrate = d3.format(".1f")(d.properties[currentvalue]);
            } else if (d.properties[currentvalue] == 0) {
                currentrate = d3.format(".0f")(d.properties[currentvalue]);
            } else {
                currentrate = "N/A*";
            }

            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                    'px !important; top:' + (mouse[1] + 75) + 'px !important')
                .html("<b>" + toTitleCase(d.properties.TOWN) + "</b> | " + currentrate);
        })

    .on('mouseover', function(d, i) {

            var currentState = this;
            d3.select(this).style('fill-opacity', 0.25)
                .style("stroke", "white")
                .style("stroke-width", "2px");
        })
        .on('mouseout', function(d, i) {
            tooltip.classed('hidden', true);
            d3.selectAll('path')
                .style("fill-opacity", 1)
                .style("stroke", "#2f363d")
                .style("stroke-width", "0.1px");
        })
        .style("stroke", "#2f363d")
        .style("stroke-width", "0.1px")
        .style("fill", "white");

    var aYears = [
        [2000, 2001],
        [2001, 2002],
        [2002, 2003],
        [2003, 2004],
        [2004, 2005],
        [2005, 2006],
        [2006, 2007],
        [2007, 2008],
        [2008, 2009],
        [2010, 2011],
        [2011, 2012],
        [2012, 2013],
        [2013, 2014],
        [2014, 2014.5]
    ];

    var index = 0;


    getYear();
    generateLegend(opChgScale, 'legend_death', 'Unintentional Opioid Deaths per 100,000 people');
    //generateLegend(popChgScale, 'legend', 'Population Change (percent)');

    // Bind timer event handler.
    // var timerInterval = 1000;
    // // var id = setInterval(setSymbology, timerInterval);




    //queryVariable

    // function getQueryVariable(variable)
    // {
    //        var query = window.location.search.substring(1);
    //        var vars = query.split("&");
    //        for (var i=0;i<vars.length;i++) {
    //                var pair = vars[i].split("=");
    //                if(pair[0] == variable){return pair[1];}
    //        }
    //        return(false);
    // }
    $('.controls-map').click(function() {
        $("#timeline").val($(this).data('select'));
        setSymbology($(this).data('select'));
    });

    function getYear() {
        setSymbology(2000);
        $("#timeline").on('input change', function() {
            setSymbology($(this).val());
        });
    };

    function setSymbology(year) {

        var szAttr = 'yr' + year;
        $('#titlePrefix').html('Unintentional Opiod Overdose Deaths in Massachusetts from');
        $('#fromYear1').html(year);
        $('#titleMidfix1').html(' to ');
        $('#toYear').html(parseInt(year) + 1);

        svgContainer.selectAll("path")
            .transition()
            .duration(500)
            .style("fill", function(d, i) {

                var delta = +d.properties.OPIOIDSTATS[szAttr];
                //var delta = +d.properties.POPSTATS[szAttr];
                return (delta === -9999) ? '#f1f1f1' : opChgScale(delta);
		//return (delta === -9999) ? '#e8e8e8' : popChgScale(delta);
            });
    } // setSymbology()

    function generateLegend(scale, szDivId, szCaption) {
        var width = 550,
            height = 80;

        var svg = d3.select('#' + szDivId).append("svg")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g");

        // Create data array.
        var legendData = [];
        legendData.push({ d: -9999, r: '#f1f1f1', s: 'N/A' });
        var i;
        for (i = 0; i < scale.domain().length; i++) {
            legendData.push({ d: scale.domain()[i], r: scale.range()[i], s: scale.domainStrings()[i] });
        }

        g.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", 20)
            .attr("width", 50)
            .attr("x", function(d, i) {
                return i * 55;
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
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 60)
            .text(function(d, i) {
                return d.s;
            })
            .style("font-size", "12px");

        g.append("text")
	    .attr("class", "vis-caption")
            .attr("y", 12)
            .text(szCaption);
    } // generateLegend()
} // generateMap


function app2() {
    queue()
        //should be town polym data
        .defer(d3.json, "js/data/TOWN.geo.json")
        //.defer(d3.json, "us_states_5m.geo.json")
        //should be opioid death data
        .defer(d3.json, "js/data/TOWN.geo.json")
        //.defer(d3.csv, "us_pop.csv")
        .awaitAll(generateMap2);
}

function generateMap2(error, results) {


    var maTowns = results[0];
    var maOpioid = results[1];

    var currentyear

    var i;
    for (i = 0; i < maTowns.features.length; i++) {
        if (maTowns.features[i].properties.town != maOpioid.features[i].TOWN) {
            //console.log('ASSERT failure for index: ' + i);
            //console.log(maTowns.features[i].properties.town + ' mismatch with ' + maOpioid.features[i].TOWN);
            alert('Input data corrupted: generation of map terminated.');
            return;
        }
        maTowns.features[i].properties.OPIOIDSTATS = maOpioid.features[i].properties;
    }

    var width = 960,
        height = 450;

    //console.log(height);

    var svgContainer = d3.select("#map_comp").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "0px solid steelblue");

    var tooltip2 = d3.select('#map_comp').append('div')
        .attr('class', 'hidden tooltip2');

    var opChgScale = d3.scale.threshold()
        .domain([0.01, 6.9, 15.9, 31.5, Infinity])
        .range(colorbrewer.RdPu[5]);
    opChgScale.domainStrings = function() {
        return (['< 0.01', '0.01-6.9', '6.9-15.9',
            '15.9-31.5', '>31.5'
        ]);
    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    var projection = d3.geo.conicConformal()
        .parallels([41 + 43 / 60, 42 + 41 / 60])
        .rotate([71 + 30 / 60, -41])
        .scale([11000])
        .translate([400, 480]);

    var geoPath = d3.geo.path()
        .projection(projection);

    var map = svgContainer.selectAll("path")
        .data(maTowns.features)
        .enter()
        .append("path")
        .attr("d", function(d, i) {
            return geoPath(d);
        })
        .on('mousemove', function(d) {
            var mouse = d3.mouse(svgContainer.node()).map(function(d) {
                return parseInt(d);
            });
            var string_base = "yr"
            currentvalue = string_base.concat(currentyear);
            var currentrate
           // console.log(height);

            if (d.properties[currentvalue] > 0) {
                currentrate = d3.format(".1f")(d.properties[currentvalue]);
            } else if (d.properties[currentvalue] == 0) {
                currentrate = d3.format(".0f")(d.properties[currentvalue]);
            } else {
                currentrate = "N/A*";
            }

            //console.log(currentrate);

            tooltip2.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                    'px !important; top:' + (mouse[1] + 725) + 'px !important')
                .html("<b>" + toTitleCase(d.properties.TOWN) + "</b> | " + currentrate);
        })
        .on('mouseover', function(d, i) {

            var currentState = this;
            d3.select(this).style('fill-opacity', 0.25)
                .style("stroke", "white")
                .style("stroke-width", "2px");
        })
        .on('mouseout', function(d, i) {
            tooltip2.classed('hidden', true);
            d3.selectAll('path')
                .style("fill-opacity", 1)
                .style("stroke", "#2f363d")
                .style("stroke-width", "0.1px");
        })
        .style("stroke", "#2f363d")
        .style("stroke-width", "0.1px")
        .style("fill", "white")
        .on('mouseenter', function(d, i) {

            //var string_base = "yr"
            //currentvalue = string_base.concat(currentyear);
            //console.log(d.properties[currentvalue]);
        })
        .on('mouseleave', function(d) {

        });

    var aYears = [
        [2000, 2001],
        [2001, 2002],
        [2002, 2003],
        [2003, 2004],
        [2004, 2005],
        [2005, 2006],
        [2006, 2007],
        [2007, 2008],
        [2008, 2009],
        [2010, 2011],
        [2011, 2012],
        [2012, 2013],
        [2013, 2014],
        [2014, 2014.5]
    ];

    var index = 0;
    getYear();

    generateLegend2(opChgScale, 'legend2', 'Composite Index Values');

    function getYear() {
        setSymbology2(2000);
        $("#timeline").on('input change', function() {
            var year = $(this).val()
                // $("#to").html(parseInt(year) + 1);
                // $("#from").html(year);
            setSymbology2($(this).val());
        });
    };


    function setSymbology2(year) {

        var szAttr = 'yr' + year;
        currentyear = year
       // console.log(currentyear)
        $('#titlePrefix2').html('A Composite Indicator of the Impact of the Opioid Epidemic on Massachusetts in ');
        $('#fromYear2').html(year);

        svgContainer.selectAll("path")
            .transition()
            .duration(500)
            .style("fill", function(d, i) {

                var delta = +d.properties.OPIOIDSTATS[szAttr];
                return (delta === -9999) ? '#f1f1f1' : opChgScale(delta);
            });
    }

    function generateLegend2(scale, szDivId, szCaption) {
        var width2 = 550,
            height2 = 80;

        var svg = d3.select('#' + szDivId).append("svg")
            .attr("width", width2)
            .attr("height", height2);

        var g = svg.append("g");

        // Create data array.
        var legendData = [];
        legendData.push({
            d: -9999,
            r: '#f1f1f1',
            s: 'N/A'
        });
        var i;
        for (i = 0; i < scale.domain().length; i++) {
            legendData.push({
                d: scale.domain()[i],
                r: scale.range()[i],
                s: scale.domainStrings()[i]
            });
        }

        g.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", 20)
            .attr("width", 50)
            .attr("x", function(d, i) {
                return i * 55;
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
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 60)
            .text(function(d, i) {
                return d.s;
            })
            .style("font-size", "12px");

        g.append("text")
	    .attr("class", "vis-caption")
            .attr("y", 12)
            .text(szCaption);
    } // generateLegend2()
} // generateMap2
