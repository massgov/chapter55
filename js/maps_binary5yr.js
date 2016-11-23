var Vis = (function(d3) {
    "use strict";

    var visualizationWrapper = d3.select('#binaryMaps_maps');

    var geojson;
    queue()
        .defer(d3.json, 'js/data/TOWN.geo.json')
        .defer(d3.json, 'js/data/rate_5yr_odc.json')
        .await(visualize);

    var width = 525,
        height = 325;

    var projection = d3.geo.conicConformal()
        .parallels([41 + 43 / 60, 42 + 41 / 60])
        .rotate([71 + 30 / 60, -41])
        .scale([8600])
        .translate([280, 360]);

    var $maps_sub = d3.select("#carte").append("svg")
        .attr("width", width)
        .attr("height", height);

    //var colors_5yr = ["#f1f1f1", "#d3d3d3", "#9ecae1", "#6baed6", "#2171b5", "#084594"];

    var path = d3.geo.path().projection(projection),
        palette = d3.scale.threshold().domain([-0.1, 0.1, 2.1, 6.1, 17.1, Infinity])
        .range(["#f1f1f1", "#d3d3d3", "#9ecae1", "#6baed6", "#2171b5", "#084594"]);
        //.range(colors_5yr);



    function visualize(error, states, data) {



        data.data.forEach(function(data, i) {
            var wrapper = visualizationWrapper.append('div').attr('class', 'map-wrapper').append('div');

            createMap(wrapper, states, data);
        });
    }



    function createMap(wrapper, geo, data) {

        wrapper.append('span')
            .text(function(d) {
                if (data.key == 2005) {
                    return '2001 to 2005';
                } else if (data.key == 2010) {
                    return '2006 to 2010';
                } else if (data.key == 2015) {
                    return '2011 to 2015';
                }
            })
            .attr('class', 'vis-title')
            .style('padding-bottom', "44%")
            .style('padding-left', "14%");




        wrapper.append('span')
            .text("")
            .attr('class', 'selection-label');

        var $maps_sub = wrapper
            .classed("svg-container", true) //container class to make it responsive
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + width + " " + height)
            //class to make it responsive
            .style('padding-top', "2%")
            .classed("svg-content-responsive", true);

        $maps_sub.selectAll('path')
            .data(geo.features)
            .enter()
            .append('path')
            .attr('d', path)
            .style("stroke", "white")
            .style("stroke-width", "0.0px")
            .style('fill', function(d, i) {
                var value = data.values[d.properties.TOWN];
                return palette(value);
            })
            .on('mouseover', function(d, i) {

            })
            .on('mouseout', function(d, i) {

            })
            .attr('class', function(d) {
		return d.properties.TOWN.toLowerCase()+' bsasmap';
            })
            .on('mouseenter', function(d, i) {
                notify('.' + d.properties.TOWN.toLowerCase(), 'select');
                // var currentState = this;
                // console.log(this);
                // d3.select(this).style('fill-opacity', 0.4).style("stroke", "white").style("stroke-width", "1.5px");
            })
            .on('mouseleave', function(d) {
                notify('.' + d.properties.TOWN.toLowerCase(), 'unselect');

            })
            .on('select', function(self) {
                var geoData = self.data();
                var town_value
                var count_value

                if (data.values[geoData[0].properties.TOWN] > 0 && data.population[geoData[0].properties.TOWN] == 1) {
                    count_value = data.population[geoData[0].properties.TOWN];
                    town_value = d3.format(".1f")(data.values[geoData[0].properties.TOWN]);
                    self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = (geoData[0].properties.TOWN_1  + "<br> Five-year death count: " + count_value + "<br> Death rate per 100,000 people: " + town_value);
                } 
                else if (data.values[geoData[0].properties.TOWN] > 0 && data.population[geoData[0].properties.TOWN] > 1) {
                    count_value = data.population[geoData[0].properties.TOWN];
                    town_value = d3.format(".1f")(data.values[geoData[0].properties.TOWN]);
                    self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = (geoData[0].properties.TOWN_1  + "<br> Five-year death count: " + count_value + "<br> Death rate per 100,000 people: " + town_value);
                } 
                else if (data.values[geoData[0].properties.TOWN] == 0 && data.population[geoData[0].properties.TOWN] == 0) { 
                    town_value = "0";
                    count_value = "0";
                    self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = (geoData[0].properties.TOWN_1  + "<br> Five-year death count: " + count_value + "<br> Death rate per 100,000 people: " + town_value);
                     }
                else if (data.values[geoData[0].properties.TOWN] < 0 && data.population[geoData[0].properties.TOWN] > 0) { 
                    town_value = "N/A";
                    count_value = data.population[geoData[0].properties.TOWN];
                    self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = (geoData[0].properties.TOWN_1  + "<br> Five-year death count: " + count_value + "<br> Death rate per 100,000 people: " + town_value);
                     }

                //console.log(town_value);

                
                d3.select((self.node())).style('fill-opacity', 0.4).style("stroke", "white").style("stroke-width", "1.5px");
            })
            .on('unselect', function(self) {
                //     self.node().parentNode.parentNode.getElementsByTagName('p2')[0].innerHTML = "";
                //     d3.selectAll('#treatmentMaps_maps path').style({ 'fill-opacity': 1 }).style("stroke", "white").style("stroke-width", "0.0px");
                self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = "";
		d3.selectAll('path.bsasmap').style({
                    'fill-opacity': 1
                }).style("stroke", "white").style("stroke-width", "0.0px");
            })

        function notify(selector, eventName) {
            d3.selectAll(selector)[0].forEach(function(el, i) {
                var shape = d3.select(el);
                shape.on(eventName)(shape);
            });
        }

    }

    //var opChgScale = d3.scale.threshold().domain([0, 0.1, 0.15, 0.35, 0.6, 1.00]).range(['#d0d1e6','#a6bddb','#67a9cf','#3690c0','#02818a','#016450'])
    //opChgScale.domainStrings = function() {
    //    return (['0%', '>0-14%', '>14-24%', '>24-33%', '>33-46%', '>46-100%'
    //    ]);
    //};
    var opChgScale = d3.scale.threshold().domain([0.1, 2.1, 6.1, 17.1, Infinity])
        .range(["#d3d3d3", "#9ecae1", "#6baed6", "#2171b5", "#084594"]);
        //.range(colors_5yr);
    opChgScale.domainStrings = function() {
        return (['0', '>0-2.1', '>2.1-6.1', '>6.1-17.1', '>17.1']);
    };
    //popChgScale.domainStrings = function() { return (['< 0.1', '0.25-0.50', '0.50-0.75', '0.75-1.0', '1.0-1.25',
    //'1.25-1.50', '1.50-1.75', '1.75-2.0', '> 2.0']); };
    generateLegend_map_sub(opChgScale, 'binaryMaps_legend', 'Rate per 100,000 People');

    function generateLegend_map_sub(scale, szDivId, szCaption) {

        var legendHeight = 60,
            legendWidth = '90%';



        var $maps_sub_svg = d3.select('#' + szDivId).append("svg")
            .attr("width", legendWidth)
            .attr("height", legendHeight);

        var $maps_sub_legends = $maps_sub_svg.append("g");

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


        var unitWidth = 100 / legendData.length;

        $maps_sub_legends.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", legendHeight / 3)
            .attr("width", function(d, i) {
                return unitWidth + '%';
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

        $maps_sub_legends.selectAll("text")
            .data(legendData)
            .enter().append("text")
            .attr('text-anchor', 'middle')
            .attr("x", function(d, i) {
                return (i * unitWidth) + (unitWidth / 2) + '%';
            })
            .attr("y", 55)
            .text(function(d, i) {
                return d.s;
            });

        $maps_sub_legends.append("text")
            .attr("class", "vis-caption")
            .attr("y", 12)
            .text(szCaption);
    }



    $('.js-toggle-binary-map').click(function() {
        var date = $(this).data('date');
        $('#binaryMaps').attr('data-active-date', date);
        $('.js-toggle-binary-map').removeClass('active');
        $(this).addClass('active');
    });

})(d3);
console.log("file loaded - binary")
