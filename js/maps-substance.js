var Vis = (function(d3) {
    "use strict";

    var visualizationWrapper = d3.select('#treatmentMaps_maps');

    var geojson;
    queue()
        .defer(d3.json, 'js/data/TOWN.geo.json')
        .defer(d3.json, 'js/data/data.json')
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

    var path = d3.geo.path().projection(projection),
        palette = d3.scale.threshold().domain([0, 0.1, 0.15, 0.35, 0.6, 1.00]).range(colorbrewer.RdPu[6]);



    function visualize(error, states, data) {



        data.data.forEach(function(data, i) {
            var wrapper = visualizationWrapper.append('div').attr('class', 'map-wrapper').append('div');

            createMap(wrapper, states, data);
        });
    }



    function createMap(wrapper, geo, data) {

        wrapper.append('span')
            .text(data.key)
            .attr('class', 'vis-title');
	    wrapper.append('span')
            .text("")
	    .attr('class', 'selection-label');

        var $maps_sub = wrapper
            .classed("svg-container", true) //container class to make it responsive
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 "+width+" "+height)
            //class to make it responsive
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
                return d.properties.TOWN.toLowerCase()
            })
            .attr('id', 'bsasmap')
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

                if (data.values[geoData[0].properties.TOWN] !== 'Null') {
                    //console.log(data.values[geoData[0].properties.TOWN] == 'Null');
                    town_value = d3.format("%,.2f")(data.values[geoData[0].properties.TOWN]);
                } else {
                    town_value = "N/A";
                };

                //console.log(town_value);

		self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = (geoData[0].properties.TOWN + ":  " + town_value);
                d3.select((self.node())).style('fill-opacity', 0.4).style("stroke", "white").style("stroke-width", "1.5px");
            })
            .on('unselect', function(self) {
            //     self.node().parentNode.parentNode.getElementsByTagName('p2')[0].innerHTML = "";
            //     d3.selectAll('#treatmentMaps_maps path').style({ 'fill-opacity': 1 }).style("stroke", "white").style("stroke-width", "0.0px");
		self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = "";
                d3.selectAll('path#bsasmap').style({ 'fill-opacity': 1 }).style("stroke", "white").style("stroke-width", "0.0px");
            })

        function notify(selector, eventName) {
            d3.selectAll(selector)[0].forEach(function(el, i) {
                var shape = d3.select(el);
                shape.on(eventName)(shape);
            });
        }

    }

    var opChgScale = d3.scale.threshold().domain([0, 0.1, 0.15, 0.35, 0.6, 1.00]).range(colorbrewer.RdPu[6])
    opChgScale.domainStrings = function() {
        return (['0%', '>0-10%', '>10-15%', '>15-35%',
            '>35-60%', '>60-100%'
        ]);
    };
    //popChgScale.domainStrings = function() { return (['< 0.1', '0.25-0.50', '0.50-0.75', '0.75-1.0', '1.0-1.25',
    //'1.25-1.50', '1.50-1.75', '1.75-2.0', '> 2.0']); };
    generateLegend_map_sub(opChgScale, 'treatmentMaps_legend', 'Heroin Primary Substance of Abuse upon Seeking Treatment (%)');

    function generateLegend_map_sub(scale, szDivId, szCaption) {
        var width = 550,
            height = 70;

        var $maps_sub_svg = d3.select('#' + szDivId).append("svg")
            .attr("width", "100%")
            .attr("height", height);

        var $maps_sub_legends = $maps_sub_svg.append("g");

        // Create data array.
        var legendData = [];
        legendData.push({ d: -9999, r: '#f1f1f1', s: 'N/A*' });
        var i;
        for (i = 0; i < scale.domain().length; i++) {
            legendData.push({ d: scale.domain()[i], r: scale.range()[i], s: scale.domainStrings()[i] });
        }

        $maps_sub_legends.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", 20)
	    .attr("width", 60)
            .attr("x", function(d, i) {
                return (i * (100/legendData.length)) + "%";
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
		      return ((i * (100/legendData.length))+7) + "%";
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



    $('.js-toggle-treatment-map').click(function() {
        var date = $(this).data('date');
        $('#treatmentMaps').attr('data-active-date', date);
        $('.js-toggle-treatment-map').removeClass('active');
        $(this).addClass('active');
    });

})(d3);
