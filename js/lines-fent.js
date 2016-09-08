/* global d3 */
(function() {
    "use strict";

    var rootSelector = '#fentanyl-lines';
    var rootNode = document.querySelector("#fentanyl-lines");

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

    function quarter (date) {
    	var date2 = new Date();
    	date2.setMonth(date.getMonth() - 10);
    	var q = Math.ceil((date2.getMonth()) / 3);
    	return "Q" + q;
    }

    var seriesColors = ["#333333", "#b71c1c", "#0071bc", "#333333"];
    var seriesLineStrokes = ["1.5px", "3.5px", "3.5px", "2px"];
    var seriesLineDash = ["10,10,10,10", "0,0,0,0", "0,0,0,0", "2,6,0,0"];
    var seriesPointShapes = ["circle", "circle", "circle", "circle"];
    var seriesPointWidth = ["1px", "1.5px", "1.5px", "1px"];
    var seriesPointFill = ["#a50f15", "#08519c", "#636363", "#636363"];
    var xLabel = "date";




    // Dimensions

    var margin = {
      top: 60, // space for the legend
      right: 15,
      bottom: 50,
      left: 42
    };

    var wrapper_width = 540;
    var wrapper_height = 400;
    var width = wrapper_width - margin.left - margin.right;
    var height = wrapper_height - margin.top - margin.bottom;


    var x = d3.scale.ordinal().rangePoints([0, width]);
    var x2 = d3.scale.ordinal().rangePoints([0, width]);

    var y = d3.scale.linear().range([height, 0]);

    var color = d3.scale.ordinal().range(seriesColors);

    var lineStroke = d3.scale.ordinal().range(seriesLineStrokes);

    var lineDash = d3.scale.ordinal().range(seriesLineDash);

    var pointShape = d3.scale.ordinal().range(seriesPointShapes);

    var pointWidth = d3.scale.ordinal().range(seriesPointWidth);

    var pointFill = d3.scale.ordinal().range(seriesPointFill);

    var xAxis_fent = d3.svg.axis()
                    	.scale(x)
                    	.orient("bottom")
                    	.ticks(d3.time.months, 3)
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
    var tooltipFent = d3.select("body").append("div").attr("class", "vis-tooltip");

    var line = d3.svg.line()
              	.x(function(d) {
              	    return x(d.label);
              	})
              	.y(function(d) {
              	    return y(d.value);
              	});

    var $svg = d3.select(document.querySelector(rootSelector))
      .append("svg");
    var $lines_fent = $svg.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

    var x_axis = $lines_fent.append("g")
    	.attr("class", "vis-x-axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis_fent);

    var x_axis_lines = x_axis.append("path")
    	.attr("class", "line")
    	.style("stroke-width", "1.5px")
    	.call(xAxis_fent);

    var x_axis2 = $lines_fent.append("g")
    	.attr("class", "vis-axis")
    	.attr("transform", "translate(0," + (height + 15) + ")")
    	.call(xAxis2_fent)
    var x_axis2_text = x_axis2
    	.append("text")
    	.attr("x", width - margin.left)
    	.attr("y", margin.bottom - 32)
    	.attr("dy", "1em")
    	.attr("class", "vis-x-axis-label")
    	.text("Quarter");


    var y_axis = $lines_fent.append("g")
    	.attr("class", "vis-y-axis")
    	.call(yAxis_fent)
    	.append("text")
    	.attr("x", 0)
    	.attr("y", -44)
    	.attr("dy", "1em")
    	.attr("class", "vis-y-axis-label")
    	.text("Percent Opioid Deaths");

    var series = $lines_fent.selectAll(".series")
    	.data(seriesData)
    	.enter().append("g")
    	.attr("class", "seriesData");


    var $lines = series.append("path")
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


    var $lines_hit_area = series.append("path")
    	.attr("class", "hit-area-ext")
    	.attr("d", function(d) {
    	    return line(d.values);
    	})
    	.attr("style", "stroke:transparent;stroke-width:10px")
    	.style("fill", "none");


    // var x_axis_label_fh = $lines_fent.append("text")
    // 	.attr("class", "vis-data-label")
    // 	.attr("x", width + 5)
    // 	.attr("y", y(chartData[8].FentanylHeroin) - 5)
    // 	.attr("dy", "1em")
    // 	.text("Fentanyl & Heroin");

    // var x_axis_label_m = $lines_fent.append("text")
    // 	.attr("class", "vis-data-label")
    // 	.attr("x", width + 5)
    // 	.attr("y", y(chartData[8].Methadone) - 7)
    // 	.attr("dy", "1em")
    // 	.text("Methadone");

    // var x_axis_label_h = $lines_fent.append("text")
    // 	.attr("class", "vis-data-label")
    //   .attr("x", width + 5)
    //   .attr("y", y(chartData[8].Heroin) - 10)
    //   .attr("dy", "1em")
    //   .text("Heroin");

    // var x_axis_label_f = $lines_fent.append("text")
    // 	.attr("class", "vis-data-label")
    //   .attr("x", width + 5)
    //   .attr("y", y(chartData[8].Fentanyl) - 10)
    //   .attr("dy", "1em")
    //   .text("Fentanyl");



    /*======================================================================
     Mouse Functions
    ======================================================================*/
    var focus = $lines_fent.append("g")
    	.attr("class", "focus")
    	.classed("hidden", true);

    focus.append("circle")
    	.style("stroke-width", 1)
    	.attr("r", 6)
    	.attr('pointer-events', 'none');

    d3.selectAll("g.seriesData")
    	.on("mouseover", mouseoverFunc)
    	.on("mouseout", mouseoutFunc)
    	.on("mousemove", mousemoveFunc);

    function mouseoutFunc() {

    	d3.selectAll("path.line").classed("unfocused", false).classed("focused", false);
    	d3.selectAll("path.point").classed("unfocused", false).classed("focused", false).attr("d", d3.svg.symbol().type("circle").size(15)).style("fill-opacity", "1");
      	tooltipFent.classed("hidden", true); // this sets it to invisible!
      	focus.classed("hidden", true);
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

    	tooltipFent.classed("hidden", false)
    	.html(percentVal);
    	//console.log(d.rates[i]);
    	//console.log(d3.select(this).select("path.point"));
    	focus.classed("hidden", false);
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
    	    .html(percentVal);
    }



    function render () {
      updateWidth(rootNode.clientWidth);

      x.rangePoints([0, width]);
      x2.rangePoints([0, width]);
      y.range([height, 0]);
      xAxis_fent.scale(x);
      xAxis2_fent.scale(x);
      yAxis_fent.scale(y);
      // update lines
      line.x(function(d) {
          return x(d.label);
        })
        .y(function(d) {
            return y(d.value);
        });

      x_axis
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis_fent);

      x_axis2
        .attr("transform", "translate(0," + (height + 15) + ")")
        .call(xAxis2_fent);

      x_axis2_text
      .attr("x", width - margin.left)
      .attr("y", margin.bottom - 32);


      y_axis.call(yAxis_fent);

      $svg.attr("width", wrapper_width).attr("height", wrapper_height);

      // x_axis_label_fh.attr("x", width + 5).attr("y", y(chartData[8].FentanylHeroin) - 5);

      // x_axis_label_m.attr("x", width + 5).attr("y", y(chartData[8].Methadone) - 7);

      // x_axis_label_h.attr("x", width + 5).attr("y", y(chartData[8].Heroin) - 10);

      // x_axis_label_f.attr("x", width + 5).attr("y", y(chartData[8].Fentanyl) - 10);

      $lines.attr("d", function(d) {
          return line(d.values);
      });

      $lines_hit_area.attr("d", function(d) {
        return line(d.values);
      });

    }

    function updateWidth(componentWidth) {
      wrapper_width = componentWidth;
      width = wrapper_width - margin.left - margin.right;
      height = wrapper_height - margin.top - margin.bottom;
    }

    function renderLegend() {
      var legendItems = [
        "FentanylHeroin",
        "Fentanyl",
        "Heroin",
        "Methadone"
      ];
      var legendItemsTranslate = [
        "Fentanyl & Heroin",
        "Fentanyl",
        "Heroin",
        "Methadone"
      ];
      var $legend = $svg.append("g")
        .attr("class", "vis-legend")
        .attr("transform", "translate("+margin.left+",0)");
      var lineHeight = 15;
      // var seriesColors = ["#ffffff", "#b71c1c", "#0071bc", "#ffffff"];
      // var seriesLineStrokes = ["1.5px", "3.5px", "3.5px", "2px"];
      // var seriesLineDash = ["10,10,10,10", "0,0,0,0", "0,0,0,0", "2,6,0,0"];

      legendItems.forEach(function(item, i) {
        var $item = $legend.append("g")
          .attr("class", "legend-item-"+item)
          .attr("transform", "translate(0,"+(i*lineHeight)+")");

        $item.append("svg:line")
          .attr("class", "legend-item-"+item)
          .attr("x1", 0)
          .attr("y1", 5)
          .attr("x2", 30)
          .attr("y2", 5)
          .style("stroke", seriesColors[i])
          .style("stroke-dasharray", seriesLineDash[i])
          .style("stroke-width", seriesLineStrokes[i]);

        $item.append("text")
          .attr("class", "legend-item-"+item)
          .attr("x", 40)
          .attr("y", 10)
          .text(legendItemsTranslate[i]);
      });
    }


    render();
    renderLegend();

    window.addEventListener('resize', render);



})();
