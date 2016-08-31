/* global d3 */
(function() {
    "use strict";

    var rootSelector = '#fentanyl-lines';

    var chartData = [{
	"date": new Date("01/01/2014"),
	"FentanylHeroin": "0.19",
	"Fentanyl": "0.22",
	"Heroin": "0.41",
	"Methadone": "0.10"
	}, {
	"date": new Date("04/01/2014"),
	"FentanylHeroin": "0.18",
	"Fentanyl": "0.19",
	"Heroin": "0.49",
	"Methadone": "0.07"
	}, {
	"date": new Date("07/01/2014"),
	"FentanylHeroin": "0.14",
	"Fentanyl": "0.14",
	"Heroin": "0.53",
	"Methadone": "0.10"
	}, {
	"date": new Date("10/01/2014"),
	"FentanylHeroin": "0.22",
	"Fentanyl": "0.27",
	"Heroin": "0.35",
	"Methadone": "0.06"
	}, {
	"date": new Date("01/01/2015"),
	"FentanylHeroin": "0.19",
	"Fentanyl": "0.40",
	"Heroin": "0.30",
	"Methadone": "0.04"
	}, {
	"date": new Date("04/01/2015"),
	"FentanylHeroin": "0.24",
	"Fentanyl": "0.38",
	"Heroin": "0.29",
	"Methadone": "0.05"
	}, {
	"date": new Date("07/01/2015"),
	"FentanylHeroin": "0.19",
	"Fentanyl": "0.40",
	"Heroin": "0.30",
	"Methadone": "0.06"
	}, {
	"date": new Date("10/01/2015"),
	"FentanylHeroin": "0.22",
	"Fentanyl": "0.43",
	"Heroin": "0.24",
	"Methadone": "0.05"
	}, {
	"date": new Date("01/01/2016"),
	"FentanylHeroin": "0.15",
	"Fentanyl": "0.50",
	"Heroin": "0.17",
	"Methadone": "0.04"
	}];




    var yearformat = d3.time.format("%Y");

    var quarter = function(date, i) {
	var i = 0;
	if (i >= 0) {
	    var date2 = new Date();
	    date2.setMonth(date.getMonth() - 10);
	    var q = Math.ceil((date2.getMonth()) / 3);
	    return "Q" + q;
        }
    }

    var seriesColors = ["#ffffff", "#b71c1c", "#0071bc", "#ffffff"];
    var seriesLineStrokes = ["1.5px", "3.5px", "3.5px", "1.5px"];
    var seriesLineDash = ["2,2,2,2", "0,0,0,0", "0,0,0,0", "1,1,1,1"];
    var seriesPointShapes = ["circle", "circle", "circle", "circle"];
    var seriesPointWidth = ["1px", "1.5px", "1.5px", "1px"];
    var seriesPointFill = ["#a50f15", "#08519c", "#636363", "#636363"];
    var xLabel = "date";

    var margin = {
	top: 30,
	right: 200,
	bottom: 50,
	left: 42
    };

    var width = 300;
    var height = 340;

    var yearformat = d3.time.format("%Y");

    var parseDate = d3.time.format("%Y%m%d").parse;

    var bisectDate = d3.bisector(function(d) {
	return d.date;
    }).left;

    var end = parseDate("20160101");

    var x = d3.scale.ordinal().rangePoints([0, width]);
    var x2 = d3.scale.ordinal().rangePoints([0, width]);

    //var x = d3.time.scale()
    //         .domain([chartData[0].date, chartData[chartDataCount].date])
    //    .range([0, 91]);

    //var x2 = d3.time.scale()
    //         .domain([chartData[0].date, chartData[chartDataCount].date])
    //    .range([0, 91]);

    var y = d3.scale.linear()
	.range([height, 0]);

    var color = d3.scale.ordinal()
	.range(seriesColors);

    var lineStroke = d3.scale.ordinal()
	.range(seriesLineStrokes);

    var lineDash = d3.scale.ordinal()
	.range(seriesLineDash);

    var pointShape = d3.scale.ordinal()
	.range(seriesPointShapes);

    var pointWidth = d3.scale.ordinal()
	.range(seriesPointWidth);

    var pointFill = d3.scale.ordinal()
	.range(seriesPointFill);

    var xAxis_fent = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(d3.time.months, 3)
	//.tickSize(5, 0)
	.tickFormat(quarter);


    var xAxis2_fent = d3.svg.axis()
	.scale(x)
	.ticks(d3.time.years, 1)
	.tickFormat(yearformat)
	.tickSize(3, 0)
	.tickPadding(1)
	.orient("bottom");

    //percentage formatiing
    var formatPercent = d3.format(".0%");

    var yAxis_fent = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickFormat(formatPercent)
	.ticks(5)
	.tickSize(3, 0)
	.tickPadding(1);

    //create tooltipFent

    // add a tooltipFent to the page - not to the svg itself!
    var tooltipFent = d3.select("body")
	.append("div")
	.attr("class", "tooltipFent");

    var line = d3.svg.line()
	//.interpolate("monotone")
	.x(function(d) {
	    return x(d.label);
	})
	.y(function(d) {
	    return y(d.value);
	});


    var $lines_fent = d3.select(document.querySelector(rootSelector)).append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /*  var benchMark = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("fill", "#C2EBC9")
    .attr("height", 120);

    var threshold = svg.append("rect")
    .attr("x", 0)
    .attr("y", 120)
    .attr("width", width)
    .attr("fill", "#FFE97F")
    .attr("height", 50);
     */
    var varSeries = d3.keys(chartData[0]).filter(function(key) {
	return key !== xLabel;
    });

    color.domain(varSeries);
    lineStroke.domain(varSeries);
    lineDash.domain(varSeries);
    pointShape.domain(varSeries);
    pointWidth.domain(varSeries);
    pointFill.domain(varSeries);

    var seriesData = varSeries.map(function(name) {
	return {
	    name: name,
	    values: chartData.map(function(d) {
		return {
		    name: name,
		    label: d[xLabel],
		    value: +d[name]
		};
	    })
	};
    });


    x.domain(chartData.map(function(d) {
	return d.date;
    }));

    x2.domain(chartData.map(function(d) {
	return d.date;
    }));

    y.domain([
	d3.min(seriesData, function(c) {
	    return d3.min(c.values, function(d) {
		//return d.value;
		return 0;
	    });
	}),
	d3.max(seriesData, function(c) {
	    return d3.max(c.values, function(d) {
		return d.value;
	    });
	})
    ]);

    $lines_fent.append("g")
	.attr("class", "x axis_fent")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis_fent)
	.append("path")
	.attr("class", "line")
	.style("stroke-width", "1.5px")
	.call(xAxis_fent);

    $lines_fent.append("g")
	.attr("class", "x axis2_fent")
	.attr("transform", "translate(0," + (height + 15) + ")")
	.call(xAxis2_fent)
	.append("text")
	.attr("x", width - margin.left)
	.attr("y", margin.bottom - 32)
	.attr("dy", "1em")
	.style("text-anchor", "end")
	.attr("class", "label")
	.text("Quarter");

    //         svg.append("g")
    // .attr("class", "x axis").append("path")
    //          .attr("class","line")

    $lines_fent.append("g")
	.attr("class", "y axis_fent")
	.call(yAxis_fent)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("x", 0)
	.attr("y", -44)
	.attr("dy", "1em")
	.style("text-anchor", "end")
	.style("font","10px sans-serif")
	.style("font-weight", "normal")
	//.attr("class", "label")
	.text("Percent Opioid Deaths");

    var series = $lines_fent.selectAll(".series")
	.data(seriesData)
	.enter().append("g")
	.attr("class", "seriesData");

    //console.log(series);

    series.append("path")
	.attr("class", "line")
	.attr("d", function(d) {
	    return line(d.values);
	})
	.style("stroke", function(d) {
	    return color(d.name);
	})
	.style("stroke-width", function(d) {
	    return lineStroke(d.name);
	})
	.style("stroke-dasharray", function(d) {
	    return lineDash(d.name);
	})
	.style("fill", "none");



    $lines_fent.append("text")
	.attr("class", "aside-note")
	.attr("x", width + 5)
	.attr("y", y(chartData[8].FentanylHeroin) - 5)
	.attr("dy", "1em")
	.style("text-anchor", "start")
	.text("Fentanyl & Heroin")
	.style("fill", "$color-white")
	.style("font-weight", "normal");

    $lines_fent.append("text")
	.attr("class", "aside-note")
	.attr("x", width + 5)
	.attr("y", y(chartData[8].Methadone) - 7)
	.attr("dy", "1em")
	.style("text-anchor", "start")
	.text("Methadone")
	.style("fill", "$color-white")
	.style("font-weight", "normal");

    $lines_fent.append("text")
	.attr("class", "aside-note")
	.attr("x", width + 5)
	.attr("y", y(chartData[8].Heroin) - 10)
	.attr("dy", "1em")
	.style("text-anchor", "start")
	.text("Heroin")
    //.style("fill", "#08519c")
    .style("fill", "#fff")
	.style("font-size", "13px")
    // .style("font-weight", "bold");

    $lines_fent.append("text")
	.attr("class", "aside-note")
	.attr("x", width + 5)
	.attr("y", y(chartData[8].Fentanyl) - 10)
	.attr("dy", "1em")
	.style("text-anchor", "start")
	.text("Fentanyl")
	.style("font-size", "13px")
    //.style("fill", "#f44336")
    .style("fill", "#fff")
    // .style("font-weight", "bold");



    //add point to line
    // series.selectAll(".point")
    //     .data(function(d) {
    //         return d.values;
    //         console.log(d.values);
    //     })
    //     .enter().append("path")
    //     .attr("transform", function(d) {
    //         return "translate(" + x(d.label) + "," + y(d.value) + ")";
    //     })
    //     .attr("d", d3.svg.symbol().type("circle").size(15))
    //  .attr("class", "point")
    //     .style("fill", function(d) {
    //         return pointFill(d.name);
    //     })
    //     .style("stroke", function(d) {
    //         return color(d.name);
    //     })
    //     .style("stroke-width", function(d) {
    //         return lineStroke(d.name);
    //     });

    /*======================================================================
     Mouse Functions
    ======================================================================*/
    var focus = $lines_fent.append("g")
	.attr("class", "focus")
	.style("display", "none");

    focus.append("circle")
	.attr("r", 6)
	.style("stroke-width", 1);
    //.transition()
    //.duration(500)
    //.attr("r", 50)
    //.transition(500)
    //.attr("r",500);

    d3.selectAll("g.seriesData")
	.on("mouseover", mouseoverFunc)
	.on("mouseout", mouseoutFunc)
	.on("mousemove", mousemoveFunc);

    function mouseoutFunc() {

	d3.selectAll("path.line").classed("unfocused", false).classed("focused", false);
	d3.selectAll("path.point").classed("unfocused", false).classed("focused", false).attr("d", d3.svg.symbol().type("circle").size(15)).style("fill-opacity", "1");
	tooltipFent.style("display", "none"); // this sets it to invisible!
	focus.style("display", "none");
    }

    function mouseoverFunc(d, i) {

	d3.selectAll("path.line").classed("unfocused", true);
	d3.selectAll("path.point").classed("unfocused", true).attr("d", d3.svg.symbol().type("circle").size(10)).style("fill-opacity", "0");
	// below code sets the sub set of data even more - they only go "unfocused" if a certain line is selected. Otherwise, they remain at the regular opacity. .
	//         if(!d3.select(this).select("path.line").classed("ssAfrica")) {
	//             d3.selectAll("path.ssAfrica").classed("unfocused", false);
	//         }

	d3.select(this).select("path.line").classed("unfocused", false).classed("focused", true);
	//d3.select(this).select("path.point").classed("unfocused", false).classed("focused", true).attr("d", d3.svg.symbol().type("circle").size(0));
	var x0 = d3.mouse(this)[0];
	var y0 = d3.mouse(this)[1]
	var y1 = y.invert(y0);
	var percentVal = d3.format(".0%")(y1)

	tooltipFent
	    .style("display", null) // this removes the display none setting from it
	.html(
	    "<p><span class='tooltipFentHeader sans'>" + percentVal + "</span></p>"
	);
	//console.log(d.rates[i]);
	//console.log(d3.select(this).select("path.point"));
	focus.style("display", null);
    }

    function mousemoveFunc(d) {



	//console.log("events", window.event, d3.event);
	var x0 = d3.mouse(this)[0];
	var y0 = d3.mouse(this)[1]
	var y1 = y.invert(y0);
	var percentVal = d3.format(".0%")(y1);

	focus.attr("transform", "translate(" + x0 + "," + y0 + ")");



	tooltipFent
	    .style("top", (d3.event.pageY - 45) + "px")
	    .style("left", (d3.event.pageX + 5) + "px")
	    .html(
		"<p><span class='tooltipFentHeader sans'>" + percentVal + "</span></p>"
	);
    }
})();
