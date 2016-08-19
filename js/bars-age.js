(function() {

    var width = 600;
    var height = 250;
    var selected;



    //setup the svg

    var $bars_age = d3.select("#changing_bars").append("svg")
        .attr("width", width + 100)
        .attr("height", height + 100); // adding some random padding
    $bars_age.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "none");



    d3.csv("js/data/bars-age.csv", function(error, data) {

            var selected = "percentOpiodDeaths";
            //console.log(column);
            var dataset = drawGraph(data, selected); // you need to finish this function below.
            //
            // //console.log(column, dataset);
            //
            redraw(dataset, selected);

            d3.select("#POD").classed("selected", true);
            $("#POD").addClass("active");

            d3.select("#POD")
                .on("click", function(d, i) {
                    selected = "percentOpiodDeaths"
                    dataset = drawGraph(data, selected);
                    redraw(dataset, selected);
                    var thisButton = d3.select(this);
                    d3.selectAll("#buttons-bar button").classed("selected", false);
                    $("#buttons-bar button").removeClass("active");
                    thisButton.classed("selected", true);
                    $(this).addClass("active");
                });
            d3.select("#DR")
                .on("click", function(d, i) {
                    selected = "deathRate"
                    dataset = drawGraph(data, selected);
                    redraw(dataset, selected);
                    var thisButton = d3.select(this);
                    d3.selectAll("#buttons-bar button").classed("selected", false);
                    $("#buttons-bar button").removeClass("active");
                    thisButton.classed("selected", true);
                    $(this).addClass("active");
                });
            d3.select("#NOD")
                .on("click", function(d, i) {
                    selected = "numberOpioidDeaths"
                    dataset = drawGraph(data, selected);
                    redraw(dataset, selected);
                    var thisButton = d3.select(this);
                    d3.selectAll("#buttons-bar button").classed("selected", false);
                    $("#buttons-bar button").removeClass("active");
                    thisButton.classed("selected", true);
                    $(this).addClass("active");

                });


            //setup our ui -- requires access to data variable, so inside csv
            // d3.select("#menu select")
            //     .on("change", function() {
            //         column = d3.select("#menu select").property("value");
            //         dataset = drawGraph(data, column);
            //         //console.log(column, dataset);
            //         redraw(dataset, column);
            // });

        }) // end csv

    //make the bars for the first data set.  They will be red at first.

    function drawGraph(data, column) {

        return data.sort(function(a, b) {
            return b[column] - a[column]; // descending order, biggest at the top!
        }); // cut off the top 10!

    }

    // This function is used to draw and update the data. It takes different data each time.

    function redraw(data, column) {

        var max = d3.max(data, function(d) {
            return +d[column];
        });

        xScale = d3.scale.linear()
            .domain([0, max])
            .range([0, width]);

        yScale = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeBands([0, height], .2);

        // yScale = function calc(e){return i[((u.get(e)||("range"===t.t?u.set(e,n.push(e)):0/0))-1)%i.length]};


        var bars = $bars_age.selectAll("rect.bar")
            .data(data, function(d) {
                return d.gender_age;
            }); // key function!

        //update -- existing bars get blue when we "redraw". We don't change labels.
        // bars
        //   .attr("fill", "steelblue");

        //enter - new bars get set to darkorange when we "redraw."
        bars.enter()
            .append("rect")
            .attr("class", "bar");
        // .attr("fill", "steelblue");

        //exit -- remove ones that aren't in the index set
        bars.exit()
            .transition()
            .duration(200)
            .ease("exp")
            .attr("width", 0)
            .remove();

        //console.log(yScale);
        // transition -- move the bars to proper widths and location
        bars
            .transition()
            .duration(500)
            .ease("quad")
            .attr("width", function(d) {
                return xScale(+d[column]);
            })
            .attr("height", yScale.rangeBand())
            .attr("transform", function(d, i) {
                return "translate(" + [0, yScale(i)] + ")";
            })
            .attr("class", function(d, i) {
                if (d.gender === 'Male') {
                    return "bar malFocus";
                } else if (d.gender === 'Female') {
                    return "bar femFocus";
                }
            });


        //  We are attaching the labels separately, not in a group with the bars...

        var labels = $bars_age.selectAll("text.labels")
            .data(data, function(d) {
                return d.gender_age
            }); // key function!


        // everything gets a class and a text field.  But we assign attributes in the transition.
        labels.enter()
            .append("text")
            .attr("class", "labels");


        labels.exit()
            .remove();

        labels.transition()
            .duration(500)
            .attr("transform", function(d, i) {
                return "translate(" + xScale(+d[column]) + "," + yScale(i) + ")"
            })
            .text(function(d) {
               // console.log(column);
                if(column == "percentOpiodDeaths") {
                    return d.age + " (" + (d[column]) + "%)";
                }
                else {
                    return d.age + " (" + (d[column]) + ")";
                }
            })
            .attr("dy", "1.2em")
            .attr("dx", "5px")
            .attr("text-anchor", "start");


    } // end of draw function
})();
