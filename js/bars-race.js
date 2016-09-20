$(document).ready(function(){

    dataset = [
        { raceth: "All", "2014": 19.8, "2015": 23.2 },
        { raceth: "White non-Hispanic", "2014": 23.3, "2015": 27.1 },
        { raceth: "Black non-Hispanic", "2014": 11.1, "2015": 13.6 },
        { raceth: "Hispanic", "2014": 15.3, "2015": 19.5 }
    ];

    var color = d3.scale.ordinal()
        .range(["#bdbdbd", "#78909C"]);

    var width, height, margin = {};

    updateWidth();

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    //var colorRange = d3.scale.category20();
    //var color = d3.scale.ordinal()
    //.range(colorRange.range());



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
            return { name: name, value: +d[name] };
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
        .attr("transform", "translate(10," + height + ")");

    var yAxis = $bars_race.append("g")
        .attr("class", "vis-y-axis");

    yAxis.append("text")
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
            return y(d.value);
        })
        .attr("value", function(d) {
            return d.name;
        })
        .attr("height", function(d) {
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
        .attr("x", width - 18)
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


    function render () {
        updateWidth();

        x1.rangeRoundBands([0, x0.rangeBand()]);

        x0.rangeRoundBands([0, width], .1);
        y.range([height, 0]);

        xAxis_bars.scale(x0);
        yAxis_bars.scale(y);

        $svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom)

        xAxis
            .attr("transform", "translate(10," + height + ")")
            .call(xAxis_bars)
            .selectAll(".tick text")
            .call(wrap, x0.rangeBand());

        yAxis.call(yAxis_bars);
        legendRect.attr("x", width - 18);
        legendText.attr("x", width - 24);

        bar.attr("transform", function(d) {
            return "translate(" + (x0(d.raceth) - 10) + ",0)";
        });

        bars.attr("width", x1.rangeBand())
            .attr("x", function(d) {
                return x1(d.name) + 20;
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

    }

    function updateWidth () {
        var w = document.querySelector('#race_ethnicity_chart').clientWidth;
        margin = {
            top: 50,
            right: 10,
            bottom: 60,
            left: 50
        },
        width = w - margin.left - margin.right;

        if(w < 500) {
            height = 350 - margin.top - margin.bottom;
        } else {
            height = 500 - margin.top - margin.bottom;
        }

    }

    render();
    window.addEventListener('resize', render);
});