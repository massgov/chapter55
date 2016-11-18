(function() {

    var width = 600;
    var height = 300;
    var margin = 50;
    var selected;



    //setup the svg

    var $bars_age = d3.select("#changing_bars").append("svg")
        .attr("width", width + 100)
        .attr("height", height + 10); // adding some random padding
    $bars_age.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "none");

    var age_bar_color = d3.scale.ordinal()
        .range(["malFocus", "femFocus"]);
    var age_bar_label = d3.scale.ordinal()
        .range(["Male", "Female"]);

    var ages_label = $bars_age.append('text')
        .text("Age")
        .attr("class", "vis-x-axis-label")
        .style("text-anchor", "start")
        .attr("y", 25)
        .attr("x", 10);

    var chart_title = $bars_age.append('text');

    var age_bars_legend = $bars_age.selectAll(".vis-legend")
        .data(['male', 'female'])
        .enter().append("g");

    age_bars_legend.append("rect")
        .attr("x", 0)
        .attr("width", 20)
        .attr("height", 20)
        .attr("class", age_bar_color);
    // .style("fill", age_bar_color);



    age_bars_legend.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("dy", ".5em")
        .style("text-anchor", "start")
        .text(age_bar_label);

    d3.csv("js/data/bars-age.csv", function(error, data) {

            var selected = "percentOpiodDeaths";
            //console.log(column);
            var dataset = drawGraph(data, selected); // you need to finish this function below.
            //
            // //console.log(column, dataset);
            //


            updateWidth();
            redraw(dataset, selected);

            window.addEventListener('resize', function() {
                updateWidth();
                redraw(dataset, selected);
            });

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

                    d3.selectAll("#age18to24").classed("selected", false);
                    $("#age18to24").removeClass("active");

                    thisButton.classed("selected", true);
                    $(this).addClass("active");

                    d3.selectAll(".lab18to24")
                        .classed("ageSelector", false);
                    d3.selectAll(".lab25to34")
                        .classed("ageSelector", false);
                });
            d3.select("#DR")
                .on("click", function(d, i) {
                    selected = "deathRate"
                    dataset = drawGraph(data, selected);
                    redraw(dataset, selected);
                    var thisButton = d3.select(this);
                    d3.selectAll("#buttons-bar button").classed("selected", false);
                    $("#buttons-bar button").removeClass("active");

                    d3.selectAll("#age18to24").classed("selected", false);
                    $("#age18to24").removeClass("active");

                    thisButton.classed("selected", true);
                    $(this).addClass("active");

                    d3.selectAll(".lab18to24")
                        .classed("ageSelector", false);
                    d3.selectAll(".lab25to34")
                        .classed("ageSelector", false);
                });
            d3.select("#NOD")
                .on("click", function(d, i) {
                    selected = "numberOpioidDeaths"
                    dataset = drawGraph(data, selected);
                    redraw(dataset, selected);
                    var thisButton = d3.select(this);
                    d3.selectAll("#buttons-bar button").classed("selected", false);
                    $("#buttons-bar button").removeClass("active");

                    d3.selectAll("#age18to24").classed("selected", false);
                    $("#age18to24").removeClass("active");

                    thisButton.classed("selected", true);
                    $(this).addClass("active");

                    d3.selectAll(".lab18to24")
                        .classed("ageSelector", false);
                    d3.selectAll(".lab25to34")
                        .classed("ageSelector", false);
                });

            d3.select("#age18to24")
                .on("click", function(d, i) {
                    //selected = "18to24"
                    // dataset = drawGraph(data, selected);
                    // redraw(dataset, selected);
                    var thisButton = d3.select(this);

                    //d3.selectAll("#buttons-bar button").classed("selected", false);
                    //$("#buttons-bar button").removeClass("active");
                    thisButton.classed("selected", true);
                    $(this).addClass("active");

                    d3.selectAll(".bar.malFocus")
                        .classed("malSelector", true);
                    d3.selectAll(".bar.femFocus")
                        .classed("femSelector", true);
                    d3.selectAll(".lab18to24")
                        .classed("ageSelector", true);    

                    d3.selectAll(".bar.malFocus.age18to24")
                        .classed("malSelector", false);
                    d3.selectAll(".bar.femFocus.age18to24")
                        .classed("femSelector", false);
                    
                     d3.selectAll(".vis-axis")
                        .classed("noageSelector", true);
                    d3.selectAll(".vis-data-label")
                        .classed("noageSelector", true);
                    d3.selectAll(".lab18to24")
                        .classed("noageSelector", false)
                        .classed("ageSelector", true);  
                    d3.selectAll(".lab25to34")
                        .classed("ageSelector", false);
                });

            d3.select("#age25to34")
                .on("click", function(d, i) {
                    //lected = "18to24"
                    // dataset = drawGraph(data, selected);
                    // redraw(dataset, selected);
                    var thisButton = d3.select(this);

                    //d3.selectAll("#buttons-bar button").classed("selected", false);
                    //$("#buttons-bar button").removeClass("active");
                    thisButton.classed("selected", true);
                    $(this).addClass("active");

                    d3.selectAll(".bar.malFocus")
                        .classed("malSelector", true);
                    d3.selectAll(".bar.femFocus")
                        .classed("femSelector", true);
                     

                    d3.selectAll(".bar.malFocus.age25to34")
                        .classed("malSelector", false);
                    d3.selectAll(".bar.femFocus.age25to34")
                        .classed("femSelector", false);

                    d3.selectAll(".vis-axis")
                        .classed("noageSelector", true);
                    d3.selectAll(".vis-data-label")
                        .classed("noageSelector", true);
                    d3.selectAll(".lab25to34")
                        .classed("noageSelector", false)
                        .classed("ageSelector", true);                    
                    d3.selectAll(".lab18to24")
                        .classed("ageSelector", false);


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


    function updateWidth() {
        width = document.querySelector("#changing_bars").clientWidth - 100;
        height = 300;
        margin = 50;

        $bars_age
            .attr("width", width + 100)
            .attr("height", height + 10); // adding some random padding
    }

    //make the bars for the first data set.  They will be red at first.

    function drawGraph(data, column) {

        return data.sort(function(a, b) {
            return b[column] - a[column]; // descending order, biggest at the top!
        }); // cut off the top 10!

    }

    // This function is used to draw and update the data. It takes different data each time.

    function redraw(data, column) {

        chart_title.text(toTitle(column))
            .attr("class", "vis-label")
            .style("text-anchor", "end")
            .attr("y", 12)
            .attr("x", width + margin + margin);

        var max = d3.max(data, function(d) {
            return +d[column];
        });

        xScale = d3.scale.linear()
            .domain([0, max])
            .range([0, width]);

        yScale = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeBands([20, height], .2);

        // yScale = function calc(e){return i[((u.get(e)||("range"===t.t?u.set(e,n.push(e)):0/0))-1)%i.length]};


        var bars = $bars_age.selectAll("rect.bar")
            .data(data, function(d) {
                return d.gender_age;
            }); // key function!



        age_bars_legend
            .attr("class", "vis-legend")
            .attr("transform", function(d, i) {
                return "translate(" + (width - 10) + "," + (height - (margin * 2) + (i * 24)) + ")";
            });


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
                return "translate(" + [(0 + margin), yScale(i)] + ")";
            })
            .attr("class", function(d, i) {
                if (d.gender === 'Male' && d.age === '18 to 24') {
                    return "bar malFocus age18to24";
                } else if (d.gender === 'Female' && d.age === '18 to 24') {
                    return "bar femFocus age18to24";
                } else if (d.gender === 'Female' && d.age === '25 to 34') {
                    return "bar femFocus age25to34";
                } else if (d.gender === 'Male' && d.age === '25 to 34') {
                    return "bar malFocus age25to34";
                } else if (d.gender === 'Female' && d.age === '35 to 49') {
                    return "bar femFocus age35to49";
                } else if (d.gender === 'Male' && d.age === '35 to 49') {
                    return "bar malFocus age35to49";
                } else if (d.gender === 'Female' && d.age === '50 to 64') {
                    return "bar femFocus age50to64";
                } else if (d.gender === 'Male' && d.age === '50 to 64') {
                    return "bar malFocus age50to64";
                } else if (d.gender === 'Female') {
                    return "bar femFocus age65plus";
                } else if (d.gender === 'Male') {
                    return "bar malFocus age65plus";
                }
            });
        //.classed("18to24", (d.age === '18 to 24'))

        //   .attr("class", function (d, i) {
        //       if (d.age === '18 to 24') {
        //           return "18to24";
        //      } else if (d.age === '25 to 34') {
        //           return "25to34";
        //       }
        //   });

        //add legend


        //  We are attaching the labels separately, not in a group with the bars...

        var dataLabels = $bars_age.selectAll("text.vis-data-label")
            .data(data, function(d) {
                //console.log(d.age)
                return d.gender_age
            });
             // key function!

        var axisLabels = $bars_age
            .selectAll("text.vis-axis")

            .data(data, function(d) {
                return d.gender_age
            })
            ;


        // everything gets a class and a text field.  But we assign attributes in the transition.
        axisLabels.enter()
            .append("text")
            .attr("class", function(d, i) {
                if(d.age == '25 to 34'){
                    return "vis-axis lab25to34"
                }
                else if(d.age == '18 to 24'){
                    return "vis-axis lab18to24"
                }
                else{
                    return "vis-axis"
                }
            });
        axisLabels.exit()
            .remove();

        dataLabels.enter()
            .append("text")
            .attr("class", function(d, i) {
                if(d.age == '25 to 34'){
                    return "vis-data-label lab25to34"
                }
                else if(d.age == '18 to 24'){
                    return "vis-data-label lab18to24"
                }
                else{
                    return "vis-data-label"
                }
            });
        dataLabels.exit()
            .remove();

        numberFormat = d3.format(".0f");
        percentageFormat = d3.format(".1f");
        rateFormat = d3.format(".1f");

        dataLabels.transition()
            .duration(500)
            .attr("transform", function(d, i) {
                //console.log(xScale(+d[column]) + 50);
                //console.log(d[column]);
                return "translate(" + (xScale(+d[column]) + margin) + "," + (yScale(i) + 4) + ")"
            })
            .text(function(d) {
                // console.log(column);
                if (column == "percentOpiodDeaths" && d.age == '65+') {
                    return "<1%";
                }
                if (column == "percentOpiodDeaths" && d.age != '65+') {
                    return percentageFormat(d[column]) + "%";
                }
                if (column == "numberOpioidDeaths") {
                    return numberFormat(d[column]);
                } else {
                    return rateFormat(d[column]);
                }
            })
            .attr("dy", "1em")
            .attr("dx", "5px");

        axisLabels.transition()
            .duration(500)
            .attr("transform", function(d, i) {
                //return "translate(" + xScale(+d[column]) + "," + yScale(i) + ")"
                return "translate(" + 0 + "," + (yScale(i) + 5) + ")"
            })
            .text(function(d) {
                return d.age;
            })
            .attr("dy", "1em")
            .attr("dx", "40px");


    } // end of draw function


    function toTitle(key) {
        var titleLookup = {
            percentOpiodDeaths: 'Percent of Opioid-related Deaths Among All Deaths',
            deathRate: 'Opioid-related Death Rate per 100,000 People per Year',
            numberOpioidDeaths: 'Number of Opioid-related Deaths from 2013 to 2014'
        };
        return titleLookup[key];
    }
})();