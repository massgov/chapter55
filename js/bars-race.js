$(document).ready(function() {

    dataset = [{
        raceth: "All",
        "2014": 19.9,
        "2015": 23.3
    }, {
        raceth: "White non-Hispanic",
        "2014": 23.3,
        "2015": 27.5
    }, {
        raceth: "Black non-Hispanic",
        "2014": 11.1,
        "2015": 13.7
    }, {
        raceth: "Hispanic",
        "2014": 15.3,
        "2015": 18.8
    }];

    var color = d3.scale.ordinal()
        .range(["rgb(211, 211, 211)", "#78909C"]);

    var width, height, margin = {};

    updateWidth();

    var x0 = d3.scale.ordinal().rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal().rangeBands([0, width], 0);

    var y = d3.scale.linear()
        .range([height, 0]);

    var min2014 = [18.8, 22.0, 5.5, 12.4]
    var max2014 = [20.9, 24.7, 18.5, 18.3]
    var min2015 = [22.2, 26.0, 7.4, 15.7]
    var max2015 = [24.5, 29.0, 21.9, 21.9]

    var errorBarArea2014all = d3.svg.area()
    var errorBarArea2015all = d3.svg.area()
    var errorBarArea2014white = d3.svg.area()
    var errorBarArea2015white = d3.svg.area()
    var errorBarArea2014black = d3.svg.area()
    var errorBarArea2015black = d3.svg.area()
    var errorBarArea2014hisp = d3.svg.area()
    var errorBarArea2015hisp = d3.svg.area()

    var errorBars2014all;
    var errorBars2015all;
    var errorBars2014white;
    var errorBars2015white;
    var errorBars2014black;
    var errorBars2015black;
    var errorBars2014hisp;
    var errorBars2015hisp;

    var xAxis_bars = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis_bars = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".0f"));

    var divtooltip_raceeth = d3.select("#race_ethnicity_chart").append("div").classed("vis-tooltip hidden", true);


    var $svg = d3.select("#race_ethnicity_chart").append("svg")
    var $bars_race = $svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var options = d3.keys(dataset[0]).filter(function(key) {
        return key !== "raceth";
    });

    dataset.forEach(function(d) {
        d.values = options.map(function(name) {
            return {
                name: name,
                value: +d[name]
            };
        });
    });

    x0.domain(dataset.map(function(d) {
        return d.raceth;
    }));
    x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(dataset, function(d) {
        return d3.max(d.values, function(d) {
            return d.value;
        });
    })]);

    var xAxis = $bars_race.append("g")
        .attr("class", "vis-x-axis")
        .attr("transform", "translate(0," + height + ")");

    var yAxis = $bars_race.append("g")
        .attr("class", "vis-y-axis");

    var yAxisLabel = yAxis.append("text")
        .attr("y", -35)
        .attr("dy", ".71em")
        .attr("class", "vis-y-axis-label")
        .text("Age Adjusted Rates per 100,000");

    var bar = $bars_race.selectAll(".bar")
        .data(dataset)
        .enter().append("g")
        .attr("class", "rect")
        .attr("transform", function(d) {
            return "translate(" + (x0(d.raceth) - 10) + ",0)";
        });


    var bars = bar.selectAll("rect")
        .data(function(d) {
            return d.values;
        })
        .enter().append("rect");

    bars
        .attr("width", x1.rangeBand())
        .attr("x", function(d) {
            return x1(d.name) + 5;
        })
        .attr("y", function(d) {
            //console.log(d.value + ": " + y(d.value))
            return y(d.value);
        })
        .attr("value", function(d) {
            return d.name;
        })
        .attr("height", function(d) {
            //console.log(height - y(9.7));
            return height - y(d.value);
        })
        .style("fill", function(d) {

            return color(d.name);
        });

    //bar.on(
    //"mouseover", function(){
    //d3.select(this).attr("fill","red !important");
    //});

    bar
        .on("mousemove", function(d) {
            divtooltip_raceeth.style("left", d3.event.pageX - $("#race_ethnicity_chart").offset().left + "px");
            divtooltip_raceeth.style("top", d3.event.pageY - $("#race_ethnicity_chart").offset().top + "px");
            divtooltip_raceeth.classed("hidden", false);
            var x = d3.event.pageX,
                y = d3.event.pageY
            var elements = document.querySelectorAll(':hover');
            l = elements.length
            l = l - 1
            elementData = elements[l].__data__
                //divtooltip_raceeth.html("<rate>" + (elementData.value) + "</rate>"  +"<br>" + "<reth> - " + (d.raceth) + " - </reth>" + "<br>" + "<year>" + (elementData.name) + "</year>");
            divtooltip_raceeth.html("<rate>" + (elementData.value) + "</rate>");

        });

    bar
        .on("mouseout", function(d) {
            divtooltip_raceeth.classed("hidden", true);
        });



    var legend = $bars_race.selectAll(".vis-legend")
        .data(options.slice())
        .enter().append("g")
        .attr("class", "vis-legend")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        });

    var legendRect = legend.append("rect")
        .attr("x", width - 24)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);
    

    var legendText = legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {
            return d;
        });

    var $legend = $svg.append("g");
    var $item = $legend.append("g");
    var seriesColors = ["#0071bc"];
     var seriesLineStrokes = ["1.5px"];
     var seriesLineDash = ["0,0,0,0"];

    function renderLegend() {


      var legendItems = [
        "ConfInt"
      ];
      var legendItemsTranslate = [
        "Confidence Interval"
      ];
      $legend.attr("class", "vis-legend").attr("transform", "translate("+(width-(margin.right*10))+",0)");
      var lineHeight = 15;
      // var seriesColors = ["#ffffff", "#b71c1c", "#0071bc", "#ffffff"];
      // var seriesLineStrokes = ["1.5px", "3.5px", "3.5px", "2px"];
      // var seriesLineDash = ["10,10,10,10", "0,0,0,0", "0,0,0,0", "2,6,0,0"];

      legendItems.forEach(function(item, i) {
      $item = $legend.append("g")
          .attr("class", "legend-item-"+item)
          .attr("transform", "translate(0,"+(i*lineHeight)+")");

        $item.append("svg:line")
          .attr("class", "legend-item-"+item)
          .attr("x1", 133)
          .attr("y1", 37)
          .attr("x2", 150)
          .attr("y2", 37)
          .style("stroke", seriesColors[i])
          .style("stroke-dasharray", seriesLineDash[i])
          .style("stroke-width", seriesLineStrokes[i]);

        $item.append("text")
          .attr("class", "legend-item-"+item)
          .attr("x", 40)
          .attr("y", 40)
          .text(legendItemsTranslate[i]);
      });
    }

    

    errorBarArea2014all
        .x(function(d) {
            return x0('All') + x1.rangeBand() / 2;
        })
        .y0(function(d) {
            return y(min2014[0]);
        })
        .y1(function(d) {
            return y(max2014[0]);
        })
        .interpolate("linear");
    errorBarArea2015all
        .x(function(d) {
            return x0('All') + x1.rangeBand() / 2 + x1.rangeBand();
        })
        .y0(function(d) {
            return y(min2015[0]);
        })
        .y1(function(d) {
            return y(max2015[0]);
        })
        .interpolate("linear");
    errorBarArea2014white
        .x(function(d) {
            return x0('White non-Hispanic') + x1.rangeBand() / 2;
        })
        .y0(function(d) {
            return y(min2014[1]);
        })
        .y1(function(d) {
            return y(max2014[1]);
        })
        .interpolate("linear");
    errorBarArea2015white
        .x(function(d) {
            return x0('White non-Hispanic') + x1.rangeBand() / 2 + x1.rangeBand();
        })
        .y0(function(d) {
            return y(min2015[1]);
        })
        .y1(function(d) {
            return y(max2015[1]);
        })
        .interpolate("linear");
    errorBarArea2014black
        .x(function(d) {
            return x0('Black non-Hispanic') + x1.rangeBand() / 2;
        })
        .y0(function(d) {
            return y(min2014[2]);
        })
        .y1(function(d) {
            return y(max2014[2]);
        })
        .interpolate("linear");
    errorBarArea2015black
        .x(function(d) {
            return x0('Black non-Hispanic') + x1.rangeBand() / 2 + x1.rangeBand();
        })
        .y0(function(d) {
            return y(min2015[2]);
        })
        .y1(function(d) {
            return y(max2015[2]);
        })
        .interpolate("linear");
    errorBarArea2014hisp
        .x(function(d) {
            return x0('Hispanic') + x1.rangeBand() / 2;
        })
        .y0(function(d) {
            return y(min2014[3]);
        })
        .y1(function(d) {
            return y(max2014[3]);
        })
        .interpolate("linear");
    errorBarArea2015hisp
        .x(function(d) {
            return x0('Hispanic') + x1.rangeBand() / 2 + x1.rangeBand();
        })
        .y0(function(d) {
            return y(min2015[3]);
        })
        .y1(function(d) {
            return y(max2015[3]);
        })
        .interpolate("linear");


    //var errorBarSVG = d3.select("#race_ethnicity_chart").append("svg")
    errorBars2014all = $bars_race.append("g").selectAll("path").data(dataset);
    errorBars2015all = $bars_race.append("g").selectAll("path").data(dataset);
    errorBars2014white = $bars_race.append("g").selectAll("path").data(dataset);
    errorBars2015white = $bars_race.append("g").selectAll("path").data(dataset);
    errorBars2014black = $bars_race.append("g").selectAll("path").data(dataset);
    errorBars2015black = $bars_race.append("g").selectAll("path").data(dataset);
    errorBars2014hisp = $bars_race.append("g").selectAll("path").data(dataset);
    errorBars2015hisp = $bars_race.append("g").selectAll("path").data(dataset);

    //
    errorBars2014all.enter().append("path");
    errorBars2015all.enter().append("path");
    errorBars2014white.enter().append("path");
    errorBars2015white.enter().append("path");
    errorBars2014black.enter().append("path");
    errorBars2015black.enter().append("path");
    errorBars2014hisp.enter().append("path");
    errorBars2015hisp.enter().append("path");

    //
    errorBars2014all
        .attr("d", function(d) {
            return errorBarArea2014all([d]);
        })
        .attr("class", "bars_race_error");
    errorBars2015all
        .attr("d", function(d) {
            return errorBarArea2015all([d]);
        })
        .attr("class", "bars_race_error");
    errorBars2014white
        .attr("d", function(d) {
            return errorBarArea2014white([d]);
        })
        .attr("class", "bars_race_error");
    errorBars2015white
        .attr("d", function(d) {
            return errorBarArea2015white([d]);
        })
        .attr("class", "bars_race_error");
    errorBars2014black
        .attr("d", function(d) {
            return errorBarArea2014black([d]);
        })
        .attr("class", "bars_race_error");
    errorBars2015black
        .attr("d", function(d) {
            return errorBarArea2015black([d]);
        })
        .attr("class", "bars_race_error");
    errorBars2014hisp
        .attr("d", function(d) {
            return errorBarArea2014hisp([d]);
        })
        .attr("class", "bars_race_error");
    errorBars2015hisp
        .attr("d", function(d) {
            return errorBarArea2015hisp([d]);
        })
        .attr("class", "bars_race_error");



    function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }


    function render() {
        updateWidth();
        $legend.attr("class", "vis-legend").attr("transform", "translate("+(width-margin.right*10)+",0)");
        x1.rangeRoundBands([0, x0.rangeBand()]);

        x0.rangeRoundBands([0, width], .1);
        y.range([height, 0]);

        xAxis_bars.scale(x0);
        yAxis_bars.scale(y);

        $svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom)

        xAxis
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis_bars)
            .selectAll(".tick text")
            .call(wrap, x0.rangeBand());

        yAxis.call(yAxis_bars);
        yAxisLabel.attr("x", -height / 2);
        legendRect.attr("x", width - 18);
        legendText.attr("x", width - 24);

        bar.attr("transform", function(d) {
            return "translate(" + (x0(d.raceth) - 10) + ",0)";
        });

        bars.attr("width", x1.rangeBand())
            .attr("x", function(d) {

                return x1(d.name) + 10;
            })
            .attr("y", function(d) {

                return y(d.value);
            })
            .attr("value", function(d) {
                return d.name;
            })
            .attr("height", function(d) {
                return height - y(d.value);
            });


        errorBarArea2014all
            .x(function(d) {
                return x0('All') + x1.rangeBand() / 2;
            })
            .y0(function(d) {
                return y(min2014[0]);
            })
            .y1(function(d) {
                return y(max2014[0]);
            })
            .interpolate("linear");
        errorBarArea2015all
            .x(function(d) {
                return x0('All') + x1.rangeBand() / 2 + x1.rangeBand();
            })
            .y0(function(d) {
                return y(min2015[0]);
            })
            .y1(function(d) {
                return y(max2015[0]);
            })
            .interpolate("linear");
        errorBarArea2014white
            .x(function(d) {
                return x0('White non-Hispanic') + x1.rangeBand() / 2;
            })
            .y0(function(d) {
                return y(min2014[1]);
            })
            .y1(function(d) {
                return y(max2014[1]);
            })
            .interpolate("linear");
        errorBarArea2015white
            .x(function(d) {
                return x0('White non-Hispanic') + x1.rangeBand() / 2 + x1.rangeBand();
            })
            .y0(function(d) {
                return y(min2015[1]);
            })
            .y1(function(d) {
                return y(max2015[1]);
            })
            .interpolate("linear");
        errorBarArea2014black
            .x(function(d) {
                return x0('Black non-Hispanic') + x1.rangeBand() / 2;
            })
            .y0(function(d) {
                return y(min2014[2]);
            })
            .y1(function(d) {
                return y(max2014[2]);
            })
            .interpolate("linear");
        errorBarArea2015black
            .x(function(d) {
                return x0('Black non-Hispanic') + x1.rangeBand() / 2 + x1.rangeBand();
            })
            .y0(function(d) {
                return y(min2015[2]);
            })
            .y1(function(d) {
                return y(max2015[2]);
            })
            .interpolate("linear");
        errorBarArea2014hisp
            .x(function(d) {
                return x0('Hispanic') + x1.rangeBand() / 2;
            })
            .y0(function(d) {
                return y(min2014[3]);
            })
            .y1(function(d) {
                return y(max2014[3]);
            })
            .interpolate("linear");
        errorBarArea2015hisp
            .x(function(d) {
                return x0('Hispanic') + x1.rangeBand() / 2 + x1.rangeBand();
            })
            .y0(function(d) {
                return y(min2015[3]);
            })
            .y1(function(d) {
                return y(max2015[3]);
            })
            .interpolate("linear");

        errorBars2014all
            .attr("d", function(d) {
                return errorBarArea2014all([d]);
            });
        errorBars2015all
            .attr("d", function(d) {
                return errorBarArea2015all([d]);
            });
        errorBars2014white
            .attr("d", function(d) {
                return errorBarArea2014white([d]);
            });
        errorBars2015white
            .attr("d", function(d) {
                return errorBarArea2015white([d]);
            });
        errorBars2014black
            .attr("d", function(d) {
                return errorBarArea2014black([d]);
            });
        errorBars2015black
            .attr("d", function(d) {
                return errorBarArea2015black([d]);
            });
        errorBars2014hisp
            .attr("d", function(d) {
                return errorBarArea2014hisp([d]);
            });
        errorBars2015hisp
            .attr("d", function(d) {
                return errorBarArea2015hisp([d]);
            });

    }

    function updateWidth() {
        var w = document.querySelector('#race_ethnicity_chart').clientWidth;
        margin = {
                top: 50,
                right: 10,
                bottom: 60,
                left: 50
            },
            width = w - margin.left - margin.right;

        if (w < 500) {
            height = 350 - margin.top - margin.bottom;
            linemult = 1.4
            linepad = 40
        } else {
            height = 500 - margin.top - margin.bottom;
            linemult = 1.35
            linepad = 30
        }

    }
    render();
    renderLegend();
    window.addEventListener('resize', render);
});