$(document).ready(function(){

    dataset = [
        { raceth: "All", "2014": 19.8, "2015": 23.2 },
        { raceth: "White non-Hispanic", "2014": 23.3, "2015": 27.1 },
        { raceth: "Black non-Hispanic", "2014": 11.1, "2015": 13.6 },
        { raceth: "Hispanic", "2014": 15.3, "2015": 19.5 }
    ];

    var color = d3.scale.ordinal()
        .range(["#2166ac", "#92c5de"]);
    var margin = { top: (parseInt(d3.select('#race_ethnicity_chart').style('width'), 10) / 10), right: (parseInt(d3.select('#race_ethnicity_chart').style('width'), 10) / 20), bottom: (parseInt(d3.select('#race_ethnicity_chart').style('width'), 10) / 5), left: (parseInt(d3.select('#race_ethnicity_chart').style('width'), 10) / 10) },
        width = parseInt(d3.select('#race_ethnicity_chart').style('width'), 10) - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

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


    var $bars_race = d3.select("#race_ethnicity_chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
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

    $bars_race.append("g")
        .attr("class", "vis-x-axis")
        .attr("transform", "translate(10," + height + ")")
        .call(xAxis_bars)
        .selectAll(".tick text")
        .call(wrap, x0.rangeBand());

    $bars_race.append("g")
        .attr("class", "vis-y-axis")
        .call(yAxis_bars)
        .append("text")
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


    bar.selectAll("rect")
        .data(function(d) {
            return d.values;
        })
        .enter().append("rect")
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

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
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
});
