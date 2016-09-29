/* global d3 */

(function() {
    "use strict";

    var selector = '#deathLines';
    var rootNode = document.querySelector(selector);

    // Initial dimensions
    var dimensions = {
        margin: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        width: rootNode.clientWidth,
        height: 350
    };

    var MDG = 29;


    var Massachusetts = ["MA"];
    var UnitedStates = ["USA"];

    var lines;


    // Setup

    //Set up date formatting and years
    var dateFormat = d3.time.format("%Y");
    //Set up scales
    var xScale = d3.time.scale();
    //var yScale = d3.scale.sqrt();
    var yScale = d3.scale.linear();
    var xAxis_death = d3.svg.axis();
    var yAxis_death = d3.svg.axis();
    var line_death = d3.svg.line();

    //Create the empty SVG image
    var $lines_death = d3.select(selector)
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);


    var $lines_death_x_axis = $lines_death.append("g")
        .attr("class", "vis-x-axis")
        .attr("transform", "translate(0," + (dimensions.height - dimensions.margin.bottom - dimensions.margin.top) + ")")
        .call(xAxis_death);

    var $lines_death_x_axis_label = $lines_death_x_axis
        .append("text")
        .attr("x", (dimensions.width - dimensions.margin.left)/2)
        .attr("y", dimensions.margin.bottom)
        .attr("dy", "1em")
        .attr("class", "vis-x-axis-label")
        .text("Year");

    var $lines_death_y_axis = $lines_death.append("g")
        .attr("class", "vis-y-axis")
        .attr("transform", "translate(" + dimensions.margin.left + "," + (0) + ')')
        .call(yAxis_death);

    var $lines_death_y_axis_label = $lines_death_y_axis
        .append("text")
        .attr("x", -(dimensions.height/2))
        .attr("y", -dimensions.margin.left)
        .attr("dy", "1em")
        .attr("class", "vis-y-axis-label")
        .text("Age-Adjusted Opioid Death Rate per 100,000 People");


    var $lines_death_ma_label = $lines_death.append("text")
        .attr("class", "aside-ma")
        .attr("x", dimensions.width - dimensions.margin.left - 15)
        .attr("y", yScale(23.8) - 6)
        .attr("dy", "1em")
        .style("text-anchor", "start")
        .text("MA");

    var $lines_death_usa_label = $lines_death.append("text")
        .attr("class", "aside-usa")
        .attr("x", dimensions.width - dimensions.margin.left - 45)
        .attr("y", yScale(10.0) - 6)
        .attr("dy", "1em")
        .style("text-anchor", "start")
        .text("USA");

    // add a tooltip to the page - not to the svg itself!
    var tooltip_death = d3.select("#deathLines")
        .append("div")
        .attr("class", "vis-tooltip hidden");





    // Actually do stuff.
    d3.csv("js/data/death_states.csv", function(data) {
        setupData(data);
        render();
        // bindEvents();
        window.addEventListener('resize', render);
    });


    function setupData(data) {
        var years = d3.keys(data[0]).slice(0, 65);
         //Create a new, empty array to hold our restructured dataset
        var dataset = [];

        //Loop once for each row in data
        data.forEach(function(d, i) {
            var OMRs = [];
            years.forEach(function(y) { //Loop through all the years - and get the rates for this data element
                if (d[y]) { /// What we are checking is if the "y" value - the year string from our array, which would translate to a column in our csv file - is empty or not.
                    OMRs.push({ //Add a new object to the new rates data array - for year, rate. These are OBJECTS that we are pushing onto the array
                        year: y,
                        rate: d[y], // this is the value for, for example, d["2004"]
                        Geography: d.Geography,
                        FullName: d.FullName
                    });
                }
            });
            dataset.push({ // At this point we are accessing one index of data from our original csv "data", above and we have created an array of year and rate data from this index. We then create a new object with the Geography value from this index and the array that we have made from this index.
                Geography: d.Geography,
                FullName: d.FullName,
                rates: OMRs // we just built this from the current index.
            });
        });

        data.dataset = dataset;

        //Set scale domains - max and min of the years
        xScale.domain(
            d3.extent(years, function(d) {
                return dateFormat.parse(d);
            }));

        // max of rates to 0 (reversed, remember)
        yScale.domain([
            d3.max(dataset, function(d) {
                return d3.max(d.rates, function(d) {
                    return +d.rate;
                });
            }),
            0
        ]);

        var groups = $lines_death.selectAll("g.lines-death")
            .data(dataset)
            .enter()
            .append("g")
            .attr("class", "lines-death");

        lines = groups.selectAll("path")
            .data(function(d) { // because there's a group with data already...
                return [d.rates]; // it has to be an array for the line function
            })
            .enter()
            .append("path")
            .attr("class", "line-death")
            .classed("massachusetts", function(d, i) {
                //console.log(d[i].Geography);
                if ($.inArray(d[i].Geography, Massachusetts) !== -1) {
                    //console.log("true");
                    return true;
                } else {
                    //console.log("false");
                    return false;
                }
            })
            .classed("usa", function(d, i) {
                //console.log(d[i].Geography);
                if ($.inArray(d[i].Geography, UnitedStates) !== -1) {
                    //console.log("true");
                    return true;
                } else {
                    //console.log("false");
                    return false;
                }
            });
    }



    function updateDimensions() {
        dimensions.width = rootNode.clientWidth;
        if(dimensions.width < 500) {
            dimensions.margin.left = 30;
        } else {
            dimensions.margin.left = 50;
        }
    }






    function render() {
        updateDimensions();

        $lines_death.attr('width', dimensions.width);

        xScale.range([dimensions.margin.left, dimensions.width - dimensions.margin.right - dimensions.margin.left]);
        yScale.range([dimensions.margin.top, dimensions.height - dimensions.margin.bottom -dimensions.margin.top]);

        //Configure axis generators
        xAxis_death.scale(xScale)
            .orient("bottom")
            .ticks((dimensions.width < 700 ? 8 : 15))
            .tickFormat(function(d) {
                return dateFormat(d);
            })
            .innerTickSize([8]);

        yAxis_death.scale(yScale)
            .orient(dimensions.width < 500 ? 'right' : 'left')
            .innerTickSize([8]);

        $lines_death_x_axis_label
            .attr("x", (dimensions.width - dimensions.margin.left)/2);

        $lines_death_y_axis_label
            .attr("y", -dimensions.margin.left);

        if(dimensions.width < 500) {
            $lines_death_y_axis
                .attr("transform", "translate(" + dimensions.margin.left + "," + (0) + ')');
        } else {
            $lines_death_y_axis
                .attr("transform", "translate(" + dimensions.margin.left + "," + (0) + ')');
        }

        //Configure line
        // each line dataset must have a d.year and a d.rate for this to work.
        line_death.x(function(d) {
                return xScale(dateFormat.parse(d.year));
            })
            .y(function(d) {
                return yScale(+d.rate);
            })
            .defined(function(d) {
                return yScale(+d.rate);
            });


        $lines_death_x_axis
            .call(xAxis_death);

        $lines_death_y_axis
            .call(yAxis_death);


        $lines_death_ma_label
            .attr("x", dimensions.width - dimensions.margin.left - 15)
            .attr("y", yScale(23.8) - 6);

        $lines_death_usa_label
            .attr("x", dimensions.width - dimensions.margin.left - 45)
            .attr("y", yScale(10.0) - 6);

        lines.attr("d", line_death);
    }

    var focus = $lines_death.append("g")
        .attr("class", "focus")
        .classed("hidden", true);

    $lines_death
        .on("mouseover", mouseoverFunc)
        .on("mouseout", mouseoutFunc)
        .on("mousemove", mousemoveFunc);

    function mouseoutFunc() {

        //d3.selectAll("path.line-death").classed("unfocused", false).classed("focused", false);
        tooltip_death.classed("hidden", true);
    }
    function mouseoverFunc(d, i) {

        //d3.selectAll("path.line-death").classed("unfocused", true);

        //d3.select(this).select("path.line-death").classed("unfocused", false).classed("focused", true);
        //d3.select(this).select("path.point").classed("unfocused", false).classed("focused", true).attr("d", d3.svg.symbol().type("circle").size(0));
        var x0 = d3.mouse(this)[0];
        var y0 = d3.mouse(this)[1];
        //console.log(y0);
        var y1 = yScale.invert(y0);
        var percentVal = d3.format(".1f")(y1)

        tooltip_death.classed("hidden", false)
        .html(percentVal);
        //console.log(d.rates[i]);
        //console.log(d3.select(this).select("path.point"));
        //focus.classed("hidden", false);
    }

    function mousemoveFunc(d) {

        console.log("events", d3.event.offsetX, d3.event.layerY/2);
        console.log("d3.events", d3.event);
        var x0 = d3.mouse(this)[0];
        var y0 = d3.mouse(this)[1]
        var y1 = yScale.invert(y0);
        var percentVal = d3.format(".1f")(y1);

       //focus.attr("transform", "translate(" + x0 + "," + y0 + ")");



        tooltip_death
            .style("top", (d3.event.offsetY+20) + "px")
            .style("left", (d3.event.offsetX) + "px")
            .html(percentVal);
    }

    // function bindEvents() {
    //     d3.selectAll("g.lines-death")
    //         .on("mouseover", mouseoverFunc)
    //         .on("mouseout", mouseoutFunc)
    //         .on("mousemove", mousemoveFunc);

    //     function mouseoutFunc() {
    //         d3.selectAll("path.line-death").classed("unfocused", false).classed("focused", false);
    //         tooltip_death.classed("hidden", true);
    //     }

    //     function mouseoverFunc(d, i) {
    //         d3.selectAll("path.line-death").classed("unfocused", true);
    //         d3.select(this).select("path.line-death").classed("unfocused", false).classed("focused", true);
    //         tooltip_death.classed("hidden", false).html(d.FullName);
    //     }

    //     var coordinates = [0, 0];

    //     function mousemoveFunc(d) {
    //         coordinates = d3.mouse(this);

    //         var x = coordinates[0];
    //         var y = coordinates[1];
    //         tooltip_death
    //             .style("top", y + "px")
    //             .style("left", x + "px")
    //             .style('position', 'absolute')
    //             .style('z-index', 1001);
    //     }
    // }

})();


