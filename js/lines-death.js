/*======================================================================
 MultiLines 
 ======================================================================*/
var margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
};

var width = 600;
var height = 400;

var MDG = 29;

var Massachusetts = ["MA"];
var UnitedStates = ["USA"];

//Set up date formatting and years
var dateFormat = d3.time.format("%Y");

//Set up scales
var xScale = d3.time.scale()
    .range([margin.left, width - margin.right - margin.left]);

var yScale = d3.scale.sqrt()
    .range([margin.top, height - margin.bottom]);

//Configure axis generators
var xAxis_death = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(15)
    .tickFormat(function(d) {
        return dateFormat(d);
    })
    .innerTickSize([8]);

var yAxis_death = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .innerTickSize([8]);

//defines a function to be used to append the title to the tooltip.  you can set how you want it to display here.
//var maketip = function(d) {
//    var tip = '<p class="tip3">' + d.name + '<p class="tip1">' + NumbType(d.value) + '</p> <p class="tip3">' + formatDate(d.date) + '</p>';
//    return tip;
//}

// add a tooltip to the page - not to the svg itself!
var tooltip_death = d3.select("#lines_death")
    .append("div")
    .attr("class", "lines-tooltip");

//Configure line 
// each line dataset must have a d.year and a d.rate for this to work.
var line_death = d3.svg.line()
    .x(function(d) {
        return xScale(dateFormat.parse(d.year));
    })
    .y(function(d) {
        return yScale(+d.rate)
    })
    .defined(function(d) {
        return yScale(+d.rate); });

//Create the empty SVG image
var $lines_death = d3.select("#lines_death")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

/*======================================================================
   Creating the Multiple Lines from the Data
 ======================================================================*/

//Load data - first is opioid mortality rates. 
d3.csv("js/data/death_states.csv", function(data) {
    var years = d3.keys(data[0]).slice(1, 65); //
    //console.log(years);

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


    //Make a group for each Geography
    var groups = $lines_death.selectAll("g.lines-death")
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "lines-death");

    //Within each group, create a new line/path,
    //binding just the rates data to each one
    groups.selectAll("path")
        .data(function(d) { // because there's a group with data already...
            return [d.rates]; // it has to be an array for the line function
        })
        .enter()
        .append("path")
        .attr("class", "line-death")
        .classed("massachusetts", function(d, i) {
            //console.log(d[i].Geography);
            if ($.inArray(d[i].Geography, Massachusetts) != -1) {
                //console.log("true");
                return true;
            } else {
                //console.log("false");
                return false;
            }
        })
        .classed("usa", function(d, i) {
            //console.log(d[i].Geography);
            if ($.inArray(d[i].Geography, UnitedStates) != -1) {
                //console.log("true");
                return true;
            } else {
                //console.log("false");
                return false;
            }
        })
        .attr("d", line_death);


    /*======================================================================
      Adding the Axes
    ======================================================================*/


    var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 50,
    };

    var width = 600;
    var height = 400;



    $lines_death.append("g")
        .attr("class", "x axis-death")
        // .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .attr("transform", "translate(0," + (height - margin.bottom - margin.top / 2) + ")")
        .call(xAxis_death)
        .append("text")
        .attr("x", width - margin.left)
        .attr("y", margin.bottom / 2)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .attr("class", "label")
        .text("Year");

    $lines_death.append("g")
        .attr("class", "y axis-death")
        // .attr("transform", "translate(" + margin.left + ",0)")
        .attr("transform", "translate(" + margin.left + "," + (-margin.top / 2) + ')')
        .call(yAxis_death)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -margin.top)
        .attr("y", -margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .attr("class", "label")
        .text("Opioid Related Death Rate per 100,000 People");

    /*======================================================================
      MDG line
    ======================================================================*/

    /*svg.append("line")
        .attr("class", "MDG")
        .attr("x1", margin.left)
        .attr("y1", yScale(MDG))
        .attr("x2", width - margin.left - margin.right + 15)
        .attr("y2", yScale(MDG));*/
    $lines_death.append("text")
        .attr("class", "aside-ma")
        .attr("x", width - margin.left - 15)
        .attr("y", yScale(23.8) - 6)
        .attr("dy", "1em")
        .style("text-anchor", "start")
        .text("MA");

    $lines_death.append("text")
        .attr("class", "aside-usa")
        .attr("x", width - margin.left - 45)
        .attr("y", yScale(10.0) - 6)
        .attr("dy", "1em")
        .style("text-anchor", "start")
        .text("USA");

    /*======================================================================
      Mouse Functions
    ======================================================================*/
    d3.selectAll("g.lines-death")
        .on("mouseover", mouseoverFunc)
        .on("mouseout", mouseoutFunc)
        .on("mousemove", mousemoveFunc);

    function mouseoutFunc() {

        d3.selectAll("path.line-death").classed("unfocused", false).classed("focused", false);
        tooltip_death.style("display", "none"); // this sets it to invisible!
    }

    function mouseoverFunc(d, i) {

        d3.selectAll("path.line").classed("unfocused", true);
        d3.select(this).select("path.line-death").classed("unfocused", false).classed("focused", true);
        tooltip_death
            .style("display", "block") // this removes the display none setting from it
            .html("<p><span class='lines-tooltipHeader sans'>" + d.FullName + "</span></p>");
        //console.log(d.FullName);
        // console.log(d.rates[i]);

    }

     var coordinates = [0, 0];

    function mousemoveFunc(d) {

        coordinates = d3.mouse(this);
        var x = coordinates[0];
        var y = coordinates[1];
        

        tooltip_death
            .style("top", y + "px")
            .style("left", x + "px")
            .style('position', 'absolute')
            .style('z-index', 1001);
    }



}); // end of data csv
