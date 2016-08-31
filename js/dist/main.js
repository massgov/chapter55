(function() {
  var slice = [].slice;

  function queue(parallelism) {
    var q,
        tasks = [],
        started = 0, // number of tasks that have been started (and perhaps finished)
        active = 0, // number of tasks currently being executed (started but not finished)
        remaining = 0, // number of tasks not yet finished
        popping, // inside a synchronous task callback?
        error = null,
        await = noop,
        all;

    if (!parallelism) parallelism = Infinity;

    function pop() {
      while (popping = started < tasks.length && active < parallelism) {
        var i = started++,
            t = tasks[i],
            a = slice.call(t, 1);
        a.push(callback(i));
        ++active;
        t[0].apply(null, a);
      }
    }

    function callback(i) {
      return function(e, r) {
        --active;
        if (error != null) return;
        if (e != null) {
          error = e; // ignore new tasks and squelch active callbacks
          started = remaining = NaN; // stop queued tasks from starting
          notify();
        } else {
          tasks[i] = r;
          if (--remaining) popping || pop();
          else notify();
        }
      };
    }

    function notify() {
      if (error != null) await(error);
      else if (all) await(error, tasks);
      else await.apply(null, [error].concat(tasks));
    }

    return q = {
      defer: function() {
        if (!error) {
          tasks.push(arguments);
          ++remaining;
          pop();
        }
        return q;
      },
      await: function(f) {
        await = f;
        all = false;
        if (!remaining) notify();
        return q;
      },
      awaitAll: function(f) {
        await = f;
        all = true;
        if (!remaining) notify();
        return q;
      }
    };
  }

  function noop() {}

  queue.version = "1.0.7";
  if (typeof define === "function" && define.amd) define(function() { return queue; });
  else if (typeof module === "object" && module.exports) module.exports = queue;
  else this.queue = queue;
})();

// Create HTML5 elements for IE

document.createElement("article");
document.createElement("section");

var speed = -80;
parallax(speed);

function parallax(speed) {

    var parallax = document.querySelectorAll(".parallax");
    // console.log(parallax[0]);

    window.onscroll = function() {
        for (var i = 0; i < parallax.length; i++) {

            //var position = $(el).position();
            // var offset = [];
            var $offset = $(parallax[i]).offset();
            //console.log(offset);
            var $windowHeight = window.height;
            var $windowYOffset = window.pageYOffset / $offset.top;
            // $windowYOffset[0] = 0;
            //       console.log($windowYOffset);
            //console.log('windowYOffset: pageYOffset (' + window.pageYOffset + ') / ( window.height (' + window.height + ') - offset.top ( ' + offset.top + ' ) = ' + windowYOffset);
            // console.log(el+","+i);

            var extraY = [0, -10, -60, -40, 0, -20];

            var elBackgrounPos = [];

            elBackgrounPos[i] = "50% " + (extraY[i] + $windowYOffset * speed) + "%";

            //console.log(elBackgrounPos);

            parallax[i].style.backgroundPosition = elBackgrounPos[i];
        };
    };

};





/////////////////////////////NAV
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
        $('.navbar-toggle:visible').click();
    }
});


//when scrolling...
$(window).scroll(function() {
    if ($(window).scrollTop() >= 400) {
        $("#navigation").addClass("navbar-fixed-top");
    } else {
        $("#navigation").removeClass("navbar-fixed-top");
    };


    $('.target').each(function() {
        if ($(window).scrollTop() >= ($(this).offset().top) - 10) {
            var $id = $(this).attr('id');
            $('#navigation li').removeClass('active');
            $('#navigation li[id=' + $id + '1]').addClass('active');

            var $current = $(this).attr('data-index');
            // var $current = $(this).find('.section-title').text();
            $('#current-section').html($current);
        }
    });

});

$("#navigation li").on('click', function() {
    $(this).parent().find("li").removeClass("active");
    $(this).addClass("active");
});



$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 500);
            return false;
        }
    }
    // });


});


/////////////////////////////Accordion
// $(function() {
//     var icons = {
//         header: "iconClosed",
//         activeHeader: "iconOpen",
//         hoverHeader: 'iconHover'

//     };
//     $("#accordion").accordion({
//         icons: icons,
//         heightStyle: "content"
//     });
// });

/////////////////////////////Pills

$('#pills-first a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
});


/////////////////////////////Video Links
$('#play1').click(function() {
    $("#video1").get(0).play();
});
$('#play2').click(function() {
    $("#video2").get(0).play();
});

/////////////////////////////SVG Infographic
$(function() {
    $("#svg-infographic").load('img/human1.svg', function(response) {
        var val_svg = '2/3';
        asignVal_svg(val_svg);

        function asignVal_svg(val) {
            $('.btn-svg').removeClass('active');
            $('.btn-svg[value="' + val + '"]').addClass('active');
            if (val == '1/12') {
                $('.svg-studyperiod').attr("opacity", 0);
                $('.svg-onemonth').attr("opacity", 1);
                $('#svg-info').html('Only about '+ '<strong>1 in 12</strong>' +' people who died from opioids had an active opioid prescription a month before they died')
            } else {
                $('.svg-studyperiod').attr("opacity", 1);
                $('#svg-info').html('About '+ '<strong>8 in 12</strong>' +' people who died from opioids had an opioid prescription at some point during the study period')
            }
        }

        $('.btn-svg').on('click', function() {
            asignVal_svg($(this).val());
        });

        $('.controls-svg').on('click', function() {
            asignVal_svg($(this).data('select'));
        });
    });
});

$(document).ready(function() {
    app();
    app2();
});

function app() {
    queue()
        //should be town polym data
        .defer(d3.json, "js/data/TOWN.geo.json")
        //.defer(d3.json, "us_states_5m.geo.json")
        //should be opioid death data
        .defer(d3.json, "js/data/TOWN.geo.json")
        //.defer(d3.csv, "us_pop.csv")
        .awaitAll(generateMap);
}

function generateMap(error, results) {

    //should be town polym data
    var maTowns = results[0];
    //var usStates = results[0];
    //should be opioid death data
    var maOpioid = results[1];
    //var usPop = results[1];
    // The data in usStates is in alpha-order by state, as is the data in usPop.
    // The ASSERT test below is just a sanity-check for possible corruption.

    var i;
    for (i = 0; i < maTowns.features.length; i++) {
        //for (i = 0; i < usStates.features.length; i++) {  
        // Assert test.
        if (maTowns.features[i].properties.town != maOpioid.features[i].TOWN) {
            //if (usStates.features[i].properties.NAME !== usPop[i].State) {
            console.log('ASSERT failure for index: ' + i);
            console.log(maTowns.features[i].properties.town + ' mismatch with ' + maOpioid.features[i].TOWN);
            //console.log(usStates.features[i].properties.NAME + ' mismatch with ' + usPop[i].State);
            alert('Input data corrupted: generation of map terminated.');
            return;
        }
        maTowns.features[i].properties.OPIOIDSTATS = maOpioid.features[i].properties;
        //usStates.features[i].properties.POPSTATS = usPop[i];
    }

    var width = 960,
        height = 500;

    var svgContainer = d3.select("#map_death").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "0px solid steelblue");

    var opChgScale = d3.scale.threshold()
        //popChgScale = d3.scale.threshold()
        .domain([0.01, 6.9, 15.9, 31.5, Infinity])
        .range(colorbrewer.Blues[5]);
    //.range(colorbrewer.Greens[10]);
    opChgScale.domainStrings = function() {
        return (['< 0.01', '0.01-6.9', '6.9-15.9',
            '15.9-31.5', '>31.5'
        ]);
    };

    var projection = d3.geo.conicConformal()
        .parallels([41 + 43 / 60, 42 + 41 / 60])
        .rotate([71 + 30 / 60, -41])
        .scale([11000])
        .translate([480, 500]);
    //var projection = d3.geo.albersUsa()
    //.scale(1280)
    //.translate([width / 2, height / 2]);

    var geoPath = d3.geo.path()
        .projection(projection);



    var map = svgContainer.selectAll("path")
        .data(maTowns.features)
        .enter()
        .append("path")
        .attr("d", function(d, i) {
            return geoPath(d);
        })
        .on('mousemove', function(d) {
            var mouse = d3.mouse(svgContainer.node()).map(function(d) {
                return parseInt(d);
            });

            var string_base = "yr"
            currentvalue = string_base.concat(currentyear);

            var currentrate

            if (d.properties[currentvalue] > 0) {
                currentrate = d3.format(".1f")(d.properties[currentvalue]);
            } else if (d.properties[currentvalue] == 0) {
                currentrate = d3.format(".0f")(d.properties[currentvalue]);
            } else {
                currentrate = "N/A*";
            }

            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                    'px !important; top:' + (mouse[1] + 75) + 'px !important')
                .html("<b>" + toTitleCase(d.properties.TOWN) + "</b> | " + currentrate);
        })

    .on('mouseover', function(d, i) {

            var currentState = this;
            d3.select(this).style('fill-opacity', 0.25)
                .style("stroke", "white")
                .style("stroke-width", "2px");
        })
        .on('mouseout', function(d, i) {
            tooltip.classed('hidden', true);
            d3.selectAll('path')
                .style("fill-opacity", 1)
                .style("stroke", "#2f363d")
                .style("stroke-width", "0.1px");
        })
        .style("stroke", "#2f363d")
        .style("stroke-width", "0.1px")
        .style("fill", "white");

    var aYears = [
        [2000, 2001],
        [2001, 2002],
        [2002, 2003],
        [2003, 2004],
        [2004, 2005],
        [2005, 2006],
        [2006, 2007],
        [2007, 2008],
        [2008, 2009],
        [2010, 2011],
        [2011, 2012],
        [2012, 2013],
        [2013, 2014],
        [2014, 2014.5]
    ];

    var index = 0;


    getYear();
    generateLegend(opChgScale, 'legend_death', 'Unintentional Opioid Deaths per 100,000 people');
    //generateLegend(popChgScale, 'legend', 'Population Change (percent)');

    // Bind timer event handler.
    // var timerInterval = 1000;
    // // var id = setInterval(setSymbology, timerInterval);




    //queryVariable

    // function getQueryVariable(variable)
    // {
    //        var query = window.location.search.substring(1);
    //        var vars = query.split("&");
    //        for (var i=0;i<vars.length;i++) {
    //                var pair = vars[i].split("=");
    //                if(pair[0] == variable){return pair[1];}
    //        }
    //        return(false);
    // }
    $('.controls-map').click(function() {
        $("#timeline").val($(this).data('select'));
        setSymbology($(this).data('select'));
    });

    function getYear() {
        setSymbology(2000);
        $("#timeline").on('input change', function() {
            setSymbology($(this).val());
        });
    };

    function setSymbology(year) {

        var szAttr = 'yr' + year;
        $('#titlePrefix').html('Unintentional Opiod Overdose Deaths in Massachusetts from');
        $('#fromYear1').html(year);
        $('#titleMidfix1').html(' to ');
        $('#toYear').html(parseInt(year) + 1);

        svgContainer.selectAll("path")
            .transition()
            .duration(500)
            .style("fill", function(d, i) {

                var delta = +d.properties.OPIOIDSTATS[szAttr];
                //var delta = +d.properties.POPSTATS[szAttr];
                return (delta === -9999) ? '#f1f1f1' : opChgScale(delta);
                //return (delta === -9999) ? '#e8e8e8' : popChgScale(delta);    
            });
    } // setSymbology()

    function generateLegend(scale, szDivId, szCaption) {
        var width = 550,
            height = 80;

        var svg = d3.select('#' + szDivId).append("svg")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g");

        // Create data array.
        var legendData = [];
        legendData.push({ d: -9999, r: '#f1f1f1', s: 'N/A' });
        var i;
        for (i = 0; i < scale.domain().length; i++) {
            legendData.push({ d: scale.domain()[i], r: scale.range()[i], s: scale.domainStrings()[i] });
        }

        g.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", 20)
            .attr("width", 50)
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 20)
            .style("stroke", "black")
            .style("stroke-width", "0.25px")
            .style("fill", function(d, i) {
                return d.r;
            });

        g.selectAll("text")
            .data(legendData)
            .enter().append("text")
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 60)
            .text(function(d, i) {
                return d.s;
            })
            .style("font-size", "12px");

        g.append("text")
            .attr("class", "caption")
            .attr("y", 12)
            .text(szCaption);
    } // generateLegend()
} // generateMap


function app2() {
    queue()
        //should be town polym data
        .defer(d3.json, "js/data/TOWN.geo.json")
        //.defer(d3.json, "us_states_5m.geo.json")
        //should be opioid death data
        .defer(d3.json, "js/data/TOWN.geo.json")
        //.defer(d3.csv, "us_pop.csv")
        .awaitAll(generateMap2);
}

function generateMap2(error, results) {


    var maTowns = results[0];
    var maOpioid = results[1];

    var currentyear

    var i;
    for (i = 0; i < maTowns.features.length; i++) {
        if (maTowns.features[i].properties.town != maOpioid.features[i].TOWN) {
            console.log('ASSERT failure for index: ' + i);
            console.log(maTowns.features[i].properties.town + ' mismatch with ' + maOpioid.features[i].TOWN);
            alert('Input data corrupted: generation of map terminated.');
            return;
        }
        maTowns.features[i].properties.OPIOIDSTATS = maOpioid.features[i].properties;
    }

    var width = 960,
        height = 450;

    console.log(height);

    var svgContainer = d3.select("#map_comp").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "0px solid steelblue");

    var tooltip2 = d3.select('#map_comp').append('div')
        .attr('class', 'hidden tooltip2');

    var opChgScale = d3.scale.threshold()
        .domain([0.01, 6.9, 15.9, 31.5, Infinity])
        .range(colorbrewer.RdPu[5]);
    opChgScale.domainStrings = function() {
        return (['< 0.01', '0.01-6.9', '6.9-15.9',
            '15.9-31.5', '>31.5'
        ]);
    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    var projection = d3.geo.conicConformal()
        .parallels([41 + 43 / 60, 42 + 41 / 60])
        .rotate([71 + 30 / 60, -41])
        .scale([11000])
        .translate([400, 480]);

    var geoPath = d3.geo.path()
        .projection(projection);

    var map = svgContainer.selectAll("path")
        .data(maTowns.features)
        .enter()
        .append("path")
        .attr("d", function(d, i) {
            return geoPath(d);
        })
        .on('mousemove', function(d) {
            var mouse = d3.mouse(svgContainer.node()).map(function(d) {
                return parseInt(d);
            });
            var string_base = "yr"
            currentvalue = string_base.concat(currentyear);
            var currentrate
            console.log(height);

            if (d.properties[currentvalue] > 0) {
                currentrate = d3.format(".1f")(d.properties[currentvalue]);
            } else if (d.properties[currentvalue] == 0) {
                currentrate = d3.format(".0f")(d.properties[currentvalue]);
            } else {
                currentrate = "N/A*";
            }

            console.log(currentrate);

            tooltip2.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                    'px !important; top:' + (mouse[1] + 725) + 'px !important')
                .html("<b>" + toTitleCase(d.properties.TOWN) + "</b> | " + currentrate);
        })
        .on('mouseover', function(d, i) {

            var currentState = this;
            d3.select(this).style('fill-opacity', 0.25)
                .style("stroke", "white")
                .style("stroke-width", "2px");
        })
        .on('mouseout', function(d, i) {
            tooltip2.classed('hidden', true);
            d3.selectAll('path')
                .style("fill-opacity", 1)
                .style("stroke", "#2f363d")
                .style("stroke-width", "0.1px");
        })
        .style("stroke", "#2f363d")
        .style("stroke-width", "0.1px")
        .style("fill", "white")
        .on('mouseenter', function(d, i) {

            //var string_base = "yr"
            //currentvalue = string_base.concat(currentyear);
            //console.log(d.properties[currentvalue]);
        })
        .on('mouseleave', function(d) {

        });

    var aYears = [
        [2000, 2001],
        [2001, 2002],
        [2002, 2003],
        [2003, 2004],
        [2004, 2005],
        [2005, 2006],
        [2006, 2007],
        [2007, 2008],
        [2008, 2009],
        [2010, 2011],
        [2011, 2012],
        [2012, 2013],
        [2013, 2014],
        [2014, 2014.5]
    ];

    var index = 0;
    getYear();

    generateLegend2(opChgScale, 'legend2', 'Composite Index Values');

    function getYear() {
        setSymbology2(2000);
        $("#timeline").on('input change', function() {
            var year = $(this).val()
                // $("#to").html(parseInt(year) + 1);
                // $("#from").html(year);
            setSymbology2($(this).val());
        });
    };


    function setSymbology2(year) {

        var szAttr = 'yr' + year;
        currentyear = year
        console.log(currentyear)
        $('#titlePrefix2').html('A Composite Indicator of the Impact of the Opioid Epidemic on Massachusetts in ');
        $('#fromYear2').html(year);

        svgContainer.selectAll("path")
            .transition()
            .duration(500)
            .style("fill", function(d, i) {

                var delta = +d.properties.OPIOIDSTATS[szAttr];
                return (delta === -9999) ? '#f1f1f1' : opChgScale(delta);
            });
    }

    function generateLegend2(scale, szDivId, szCaption) {
        var width2 = 550,
            height2 = 80;

        var svg = d3.select('#' + szDivId).append("svg")
            .attr("width", width2)
            .attr("height", height2);

        var g = svg.append("g");

        // Create data array.
        var legendData = [];
        legendData.push({
            d: -9999,
            r: '#f1f1f1',
            s: 'N/A'
        });
        var i;
        for (i = 0; i < scale.domain().length; i++) {
            legendData.push({
                d: scale.domain()[i],
                r: scale.range()[i],
                s: scale.domainStrings()[i]
            });
        }

        g.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", 20)
            .attr("width", 50)
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 20)
            .style("stroke", "black")
            .style("stroke-width", "0.25px")
            .style("fill", function(d, i) {
                return d.r;
            });

        g.selectAll("text")
            .data(legendData)
            .enter().append("text")
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 60)
            .text(function(d, i) {
                return d.s;
            })
            .style("font-size", "12px");

        g.append("text")
            .attr("class", "caption")
            .attr("y", 12)
            .text(szCaption);
    } // generateLegend2()
} // generateMap2

// $(document).ready(function() {
//     app();
//     app2();
// });


function app() {
    queue()
    //should be town polym data
    .defer(d3.json, "js/data/opioid_count_by_town.geo.json")
    //.defer(d3.json, "us_states_5m.geo.json")
    //should be opioid death data
    .defer(d3.json, "js/data/opioid_count_by_town.geo.json")
    //.defer(d3.csv, "us_pop.csv")
    .awaitAll(generateMap)
}

function generateMap(error, results) {
    $('.controls-map').click(function() {
        $("#timeline").val($(this).data('select'));
        setSymbology($(this).data('select'));
    });

    var maTowns = results[0];
    var maOpioid = results[1];

    var currentyear

    var i;
    for (i = 0; i < maTowns.features.length; i++) {
        if (maTowns.features[i].properties.town != maOpioid.features[i].TOWN) {
            // console.log('ASSERT failure for index: ' + i);
            // console.log(maTowns.features[i].properties.town + ' mismatch with ' + maOpioid.features[i].TOWN);
            alert('Input data corrupted: generation of map terminated.');
            return;
        }
        maTowns.features[i].properties.OPIOIDSTATS = maOpioid.features[i].properties;
    }

    var width = 960,
        height = 450;

    var svgContainer = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "0px solid steelblue");

    var tooltip = d3.select('#map').append('div')
        .attr('class', 'hidden tooltip');

    //#eff3ff    

    var opChgScale = d3.scale.threshold()
        .domain([0.01, 1.01, 5.01, 15.01, 33.01, 64.01, Infinity])
        .range(["#f1f1f1","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5", "#084594"]);
    opChgScale.domainStrings = function() {
        return (['0', '1', '2-5', '6-15', '16-33', '34-64', '>64' 
        ]);
    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    var projection = d3.geo.conicConformal()
        .parallels([41 + 43 / 60, 42 + 41 / 60])
        .rotate([71 + 30 / 60, -41])
        .scale([10000])
        .translate([330, 480]);

    var geoPath = d3.geo.path()
        .projection(projection);

    function notify(selector, eventName) {
        d3.selectAll(selector)[0].forEach(function(el, i) {
            var shape = d3.select(el);
            shape.on(eventName)(shape);
        });
    }

    var map = svgContainer.selectAll("path")
        .data(maTowns.features)
        .enter()
        .append("path")
        .classed("deathmap", true)
        .attr("d", function(d, i) {
            return geoPath(d);
        })
        .on('mousemove', function(d) {
            var mouse = d3.mouse(svgContainer.node()).map(function(d) {
                return parseInt(d);
            });

            var string_base = "yr"
            currentvalue = string_base.concat(currentyear);

            var currentrate

            if (d.properties[currentvalue] > 0) {
                currentrate = d3.format(".0f")(d.properties[currentvalue]);
            } else if (d.properties[currentvalue] == 0) {
                currentrate = d3.format(".0f")(d.properties[currentvalue]);
            } else {
                currentrate = "N/A*";
            }

            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                    'px !important; top:' + (mouse[1] + 100) + 'px !important')
                .html("<b>" + toTitleCase(d.properties.TOWN) + "</b> | " + currentrate);
        })

    .on('mouseover', function(d, i) {

        var currentState = this;
        d3.select(this).style('fill-opacity', 0.25)
            .style("stroke", "white")
            .style("stroke-width", "2px");
    })
        .on('mouseout', function(d, i) {
            tooltip.classed('hidden', true);
            d3.selectAll('path.deathmap')
                .style("fill-opacity", 1)
                .style("stroke", "#2f363d")
        		.style("stroke-width", "0.1px");
        })
        .style("stroke", "#2f363d")
        .style("stroke-width", "0.1px")
        .style("fill", "white");

   

    var aYears = [
        [2000, 2001],
        [2001, 2002],
        [2002, 2003],
        [2003, 2004],
        [2004, 2005],
        [2005, 2006],
        [2006, 2007],
        [2007, 2008],
        [2008, 2009],
        [2010, 2011],
        [2011, 2012],
        [2012, 2013],
        [2013, 2014],
        [2014, 2015.5]
    ];
    var index = 0;
    getYear();
    generateLegend(opChgScale, 'legend', 'Count of Opioid Related Deaths by Municipality');

    function getYear() {
        setSymbology(2000);
        $("#timeline").on('input change', function() {
            var year = $(this).val()
            setSymbology($(this).val());
        });
    };


    function setSymbology(year) {

        var szAttr = 'yr' + year;
        currentyear = year;
        var toyear = eval(year) + 1;
        $('#titlePrefix').html('Count of Opiod Related Deaths in Massachusetts in');
        $('#fromYear').html(year);
        //$('#titleMidfix').html('to');
        //$('#toYear').html(toyear);

        $('#map1-source').html('Sources: Massachusetts Department of Public Health,' +
                             '<br>Massachusetts Registry of Vital Records and Statistics</>');

        svgContainer.selectAll("path.deathmap")
            .transition()
            .duration(500)
            .style("fill", function(d, i) {

                var delta = +d.properties.OPIOIDSTATS[szAttr];
                return (delta === -9999) ? '#f1f1f1' : opChgScale(delta);
            });
    }

    function generateLegend(scale, szDivId, szCaption) {
        var width = 550,
            height = 80;

        var svg = d3.select('#' + szDivId).append("svg")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g");

        // Create data array.
        var legendData = [];
        //legendData.push({
            //d: -9999,
            //r: '#f1f1f1',
            //s: 'N/A'
        //});
        var i;
        for (i = 0; i < scale.domain().length; i++) {
            legendData.push({
                d: scale.domain()[i],
                r: scale.range()[i],
                s: scale.domainStrings()[i]
            });
        }

        g.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", 20)
            .attr("width", 50)
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 20)
            .style("stroke", "black")
            .style("stroke-width", "0.25px")
            .style("fill", function(d, i) {
                return d.r;
            });

        g.selectAll("text")
            .data(legendData)
            .enter().append("text")
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 60)
            .text(function(d, i) {
                return d.s;
            })
            .style("font-size", "12px");

        g.append("text")
            .attr("class", "caption")
            .attr("y", 12)
            .text(szCaption);
    } // generateLegend()
} // generateMap









// ///////////////////Map Composite










// function app2() {
//     queue()
//     //should be town polym data
//     .defer(d3.json, "js/data/TOWN.geo.json")
//     //.defer(d3.json, "us_states_5m.geo.json")
//     //should be opioid death data
//     .defer(d3.json, "js/data/TOWN.geo.json")
//     //.defer(d3.csv, "us_pop.csv")
//     .awaitAll(generateMap2);
// }

// function generateMap2(error, results) {
//     $('.controls-map').click(function() {
//         $("#timeline").val($(this).data('select'));
//         setSymbology2($(this).data('select'));
//     });

//     var maTowns = results[0];
//     var maOpioid = results[1];

//     var currentyear

//     var i;
//     for (i = 0; i < maTowns.features.length; i++) {
//         if (maTowns.features[i].properties.town != maOpioid.features[i].TOWN) {
//             // console.log('ASSERT failure for index: ' + i);
//             // console.log(maTowns.features[i].properties.town + ' mismatch with ' + maOpioid.features[i].TOWN);
//             alert('Input data corrupted: generation of map terminated.');
//             return;
//         }
//         maTowns.features[i].properties.OPIOIDSTATS = maOpioid.features[i].properties;
//     }

//     var width = 960,
//         height = 450;

//     var svgContainer = d3.select("#map2").append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .style("border", "0px solid steelblue");

//     var tooltip2 = d3.select('#map2').append('div')
//         .attr('class', 'hidden tooltip2');

//     var opChgScale = d3.scale.threshold()
//         .domain([0.01, 6.9, 15.9, 31.5, Infinity])
//         .range(colorbrewer.RdPu[5]);
//     opChgScale.domainStrings = function() {
//         return (['< 0.01', '0.01-6.9', '6.9-15.9',
//             '15.9-31.5', '>31.5'
//         ]);
//     };

//     function toTitleCase(str) {
//         return str.replace(/\w\S*/g, function(txt) {
//             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//         });
//     }

//     var projection = d3.geo.conicConformal()
//         .parallels([41 + 43 / 60, 42 + 41 / 60])
//         .rotate([71 + 30 / 60, -41])
//         .scale([10000])
//         .translate([330, 480]);

//     var geoPath = d3.geo.path()
//         .projection(projection);

//     var map = svgContainer.selectAll("path")
//         .data(maTowns.features)
//         .enter()
//         .append("path")
//         .attr("d", function(d, i) {
//             return geoPath(d);
//         })
//         .on('mousemove', function(d) {
//             var mouse = d3.mouse(svgContainer.node()).map(function(d) {
//                 return parseInt(d);
//             });
//             var string_base = "yr"
//             currentvalue = string_base.concat(currentyear);
//             var currentrate

//             if (d.properties[currentvalue] > 0) {
//                 currentrate = d3.format(".1f")(d.properties[currentvalue]);
//             } else if (d.properties[currentvalue] == 0) {
//                 currentrate = d3.format(".0f")(d.properties[currentvalue]);
//             } else {
//                 currentrate = "N/A*";
//             }


//             tooltip2.classed('hidden', false)
//                 .attr('style', 'left:' + (mouse[0] + 15) +
//                     'px !important; top:' + (mouse[1] + 625) + 'px !important')
//                 .html("<b>" + toTitleCase(d.properties.TOWN) + "</b> | " + currentrate);
//         })
//         .on('mouseover', function(d, i) {

//             var currentState = this;
//             d3.select(this).style('fill-opacity', 0.25)
//                 .style("stroke", "white")
//                 .style("stroke-width", "2px");
//         })
//         .on('mouseout', function(d, i) {
//             tooltip2.classed('hidden', true);
//             d3.selectAll('path')
//                 .style("fill-opacity", 1)
//                 .style("stroke", "#2f363d")
//                 .style("stroke-width", "0.1px");
//         })
//         .style("stroke", "#2f363d")
//         .style("stroke-width", "0.1px")
//         .style("fill", "white")
//         .on('mouseenter', function(d, i) {

//             //var string_base = "yr"
//             //currentvalue = string_base.concat(currentyear);
//             //console.log(d.properties[currentvalue]);
//         })
//         .on('mouseleave', function(d) {

//         });

//     var aYears = [
//         [2000, 2001],
//         [2001, 2002],
//         [2002, 2003],
//         [2003, 2004],
//         [2004, 2005],
//         [2005, 2006],
//         [2006, 2007],
//         [2007, 2008],
//         [2008, 2009],
//         [2010, 2011],
//         [2011, 2012],
//         [2012, 2013],
//         [2013, 2014],
//         [2014, 2014.5]
//     ];

//     var index = 0;
//     getYear();

//     generateLegend2(opChgScale, 'legend2', 'Composite Index Values');

//     function getYear() {
//         setSymbology2(2000);
//         $("#timeline").on('input change', function() {
//             var year = $(this).val()
//             setSymbology2($(this).val());
//         });
//     };


//     function setSymbology2(year) {

//         var szAttr = 'yr' + year;
//         currentyear = year
//         var toyear = eval(year) + 1

//         $('#titlePrefix2').html('Opioid Overdose Events in Massachusetts from');
//         $('#fromYear2').html(year);
//         $('#titleMidfix2').html('to');
//         $('#toYear2').html(toyear).append('<span>*</span>');
//         $('#map2-note').html('*Fatal and nonfatal overdoses, ambulance trips, emergency room admissions, narcan use, etc.');
//         $('#map2-source').html('Data Sources: U.S. Census Bureau;' +
//                             '<br />Executive Office of Health and Human Services'+
//                             '<br />(Registry of Vital Records and Statistics,' +
//                             '<br />Massachusetts Department of Public Health)');



//         svgContainer.selectAll("path")
//             .transition()
//             .duration(500)
//             .style("fill", function(d, i) {

//                 var delta = +d.properties.OPIOIDSTATS[szAttr];
//                 return (delta === -9999) ? '#f1f1f1' : opChgScale(delta);
//             });
//     }

//     function generateLegend2(scale, szDivId, szCaption) {
//         var width2 = 550,
//             height2 = 80;

//         var svg = d3.select('#' + szDivId).append("svg")
//             .attr("width", width2)
//             .attr("height", height2);

//         var g = svg.append("g");

//         // Create data array.
//         var legendData = [];
//         legendData.push({
//             d: -9999,
//             r: '#f1f1f1',
//             s: 'N/A'
//         });
//         var i;
//         for (i = 0; i < scale.domain().length; i++) {
//             legendData.push({
//                 d: scale.domain()[i],
//                 r: scale.range()[i],
//                 s: scale.domainStrings()[i]
//             });
//         }

//         g.selectAll("rect")
//             .data(legendData)
//             .enter().append("rect")
//             .attr("height", 20)
//             .attr("width", 50)
//             .attr("x", function(d, i) {
//                 return i * 55;
//             })
//             .attr("y", 20)
//             .style("stroke", "black")
//             .style("stroke-width", "0.25px")
//             .style("fill", function(d, i) {
//                 return d.r;
//             });

//         g.selectAll("text")
//             .data(legendData)
//             .enter().append("text")
//             .attr("x", function(d, i) {
//                 return i * 55;
//             })
//             .attr("y", 60)
//             .text(function(d, i) {
//                 return d.s;
//             })
//             .style("font-size", "12px");

//         g.append("text")
//             .attr("class", "caption")
//             .attr("y", 12)
//             .text(szCaption);
//     } // generateLegend2()
// } // generateMap2
var Vis = (function(d3) {
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
        .scale([7500])
        .translate([250, 350]);

    var $maps_sub = d3.select("#carte").append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path().projection(projection),
        palette = d3.scale.threshold().domain([0, 0.1, 0.15, 0.35, 0.6, 1.00]).range(colorbrewer.YlOrBr[6]);



    function visualize(error, states, data) {

        var visualizationWrapper = d3.select('#multi-maps');

        data.data.forEach(function(data, i) {
            var wrapper = visualizationWrapper
                .append('div')
                .style({
                    width: width + 'px',
                    height: height + 'px'
                });

            createMap(wrapper, states, data)
        });
    }



    function createMap(wrapper, geo, data) {

        wrapper.append('p')
            .text(data.key)
            .attr('class', 'legend');
        wrapper.append('p2')
            .text("")
            .attr('class', 'legend');

        wrapper.append('y');

        var $maps_sub = wrapper.append('svg')
            .attr({
                width: width,
                height: height
            });

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

                self.node().parentNode.parentNode.getElementsByTagName('p2')[0].innerHTML = (geoData[0].properties.TOWN + ":  " + town_value);
                d3.select((self.node())).style('fill-opacity', 0.4).style("stroke", "white").style("stroke-width", "1.5px");
            })
            .on('unselect', function(self) {
                self.node().parentNode.parentNode.getElementsByTagName('p2')[0].innerHTML = "";
                d3.selectAll('path#bsasmap').style({ 'fill-opacity': 1 }).style("stroke", "white").style("stroke-width", "0.0px");
            })

        function notify(selector, eventName) {
            d3.selectAll(selector)[0].forEach(function(el, i) {
                var shape = d3.select(el);
                shape.on(eventName)(shape);
            });
        }

    }

    var opChgScale = d3.scale.threshold().domain([0, 0.1, 0.15, 0.35, 0.6, 1.00]).range(colorbrewer.YlOrBr[6])
    opChgScale.domainStrings = function() {
        return (['0%', '>0-10%', '>10-15%', '>15-35%',
            '>35-60%', '>60-100%'
        ]);
    };
    //popChgScale.domainStrings = function() { return (['< 0.1', '0.25-0.50', '0.50-0.75', '0.75-1.0', '1.0-1.25', 
    //'1.25-1.50', '1.50-1.75', '1.75-2.0', '> 2.0']); }; 
    generateLegend_map_sub(opChgScale, 'legend_sub', 'Heroin Primary Substance of Abuse upon Seeking Treatment (%)');

    function generateLegend_map_sub(scale, szDivId, szCaption) {
        var width = 550,
            height = 70;

        var $maps_sub_svg = d3.select('#' + szDivId).append("svg")
            .attr("width", width)
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
            .attr("width", 50)
            .attr("x", function(d, i) {
                return i * 55;
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
            .attr("x", function(d, i) {
                return i * 55;
            })
            .attr("y", 55)
            .text(function(d, i) {
                return d.s;
            })
            .style("font-size", "12px");

        $maps_sub_legends.append("text")
            .attr("class", "caption")
            .attr("y", 12)
            .text(szCaption);
    }

})(d3);

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
        bottom: 20,
        left: 50,
    };

    var width = 600;
    var height = 400;



    $lines_death.append("g")
        .attr("class", "x axis-death")
        // .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .attr("transform", "translate(0," + (height - margin.bottom - margin.top - margin.top) + ")")
        .call(xAxis_death)
        .append("text")
        .attr("x", width - margin.left)
        .attr("y", margin.bottom+10)
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
        .text("Age-Adjusted Opioid Death Rate per 100,000 People");

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

angular.module('fentViz', []).
directive('d3LocationTrendChart', ['$parse',
    function($parse) {
        return {
            restrict: 'AE',
            scope: {
                groupChartData: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('groupChartData', function(newVal, oldVal) {
                    var canvasId = scope.canvasId;
                    var chartTitle = scope.chartTitle;
                    var chartData = scope.groupChartData;
                    var chartDataCount = chartData.length - 1;

                    var monthformat = d3.time.format("%B");
                    var yearformat = d3.time.format("%Y");

                    var quarter = function(date, i) {
                        var i = 0
                        if (i >= 0) {
                            var date2 = new Date();
                            date2.setMonth(date.getMonth() - 10);
                            q = Math.ceil((date2.getMonth()) / 3);
                            return "Q" + q;
                        }
                    }

                    var seriesColors = ["#ffffff", "#b71c1c", "#0071bc", "#ffffff"];
                    var seriesLineStrokes = ["1.5px", "3.5px", "3.5px", "1.5px"];
                    var seriesLineDash = ["2,2,2,2", "0,0,0,0", "0,0,0,0", "1,1,1,1"]
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
                    var height = 550;

                    var canvasWidth = d3.select(element[0]).attr("width");
                    var canvasHeight = d3.select(element[0]).attr("height");
                    var width = canvasWidth - margin.left - margin.right;
                    var height = canvasHeight - margin.top - margin.bottom;
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


                    var $lines_fent = d3.select(element[0]).append("svg")
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
                });
            }
        }
    }
])
    .controller('Ctrl', ['$scope',
        function($scope) {
            //var date = new Date(2014, 7, 1);
            var date = new Date("01/01/2014");
            //var date2 = new Date(2014, 10, 1);
            var date2 = new Date("04/01/2014");
            //var date3 = new Date(2015, 1, 1);
            var date3 = new Date("07/01/2014");
            //var date4 = new Date(2015, 4, 1);
            var date4 = new Date("10/01/2014");
            //var date5 = new Date
            var date5 = new Date("01/01/2015");
            //var date6 = new Date(2014, 10, 1);
            var date6 = new Date("04/01/2015");
            //var date7 = new Date(2015, 1, 1);
            var date7 = new Date("07/01/2015");
            //var date8 = new Date(2015, 4, 1);
            var date8 = new Date("10/01/2015");
            //var date = new Date(2014, 7, 1);
            var date9 = new Date("01/01/2016");

            //alert(date);
            var chartData = [{
                "date": date,
                "FentanylHeroin": "0.19",
                "Fentanyl": "0.22",
                "Heroin": "0.41",
                "Methadone": "0.10"
            }, {
                "date": date2,
                "FentanylHeroin": "0.18",
                "Fentanyl": "0.19",
                "Heroin": "0.49",
                "Methadone": "0.07"
            }, {
                "date": date3,
                "FentanylHeroin": "0.14",
                "Fentanyl": "0.14",
                "Heroin": "0.53",
                "Methadone": "0.10"
            }, {
                "date": date4,
                "FentanylHeroin": "0.22",
                "Fentanyl": "0.27",
                "Heroin": "0.35",
                "Methadone": "0.06"
            }, {
                "date": date5,
                "FentanylHeroin": "0.19",
                "Fentanyl": "0.40",
                "Heroin": "0.30",
                "Methadone": "0.04"
            }, {
                "date": date6,
                "FentanylHeroin": "0.24",
                "Fentanyl": "0.38",
                "Heroin": "0.29",
                "Methadone": "0.05"
            }, {
                "date": date7,
                "FentanylHeroin": "0.19",
                "Fentanyl": "0.40",
                "Heroin": "0.30",
                "Methadone": "0.06"
            }, {
                "date": date8,
                "FentanylHeroin": "0.22",
                "Fentanyl": "0.43",
                "Heroin": "0.24",
                "Methadone": "0.05"
            }, {
                "date": date9,
                "FentanylHeroin": "0.15",
                "Fentanyl": "0.50",
                "Heroin": "0.17",
                "Methadone": "0.04"
            }];

            $scope.myData = chartData;
        }
    ]);
 var town_names = [
     //"massachusetts",
     "abington",
     "acton",
     "acushnet",
     "adams",
     "agawam",
     "alford",
     "amesbury",
     "amherst",
     "andover",
     "aquinnah",
     "arlington",
     "ashburnham",
     "ashby",
     "ashfield",
     "ashland",
     "athol",
     "attleboro",
     "auburn",
     "avon",
     "ayer",
     "barnstable",
     "barre",
     "becket",
     "bedford",
     "belchertown",
     "bellingham",
     "belmont",
     "berkley",
     "berlin",
     "bernardston",
     "beverly",
     "billerica",
     "blackstone",
     "blandford",
     "bolton",
     "boston",
     "bourne",
     "boxborough",
     "boxford",
     "boylston",
     "braintree",
     "brewster",
     "bridgewater",
     "brimfield",
     "brockton",
     "brookfield",
     "brewster",
     "bridgewater",
     "brimfield",
     "brockton",
     "brookfield",
     "brookline",
     "buckland",
     "burlington",
     "cambridge",
     "canton",
     "carlisle",
     "carver",
     "charlemont",
     "charlton",
     "chatham",
     "chelmsford",
     "chelsea",
     "cheshire",
     "chester",
     "chesterfield",
     "chicopee",
     "chilmark",
     "clarksburg",
     "clinton",
     "cohasset",
     "colrain",
     "concord",
     "conway",
     "cummington",
     "dalton",
     "danvers",
     "dartmouth",
     "dedham",
     "deerfield",
     "dennis",
     "dighton",
     "douglas",
     "dover",
     "dracut",
     "dudley",
     "dunstable",
     "duxbury",
     "eastbridgewater",
     "eastbrookfield",
     "eastlongmeadow",
     "eastham",
     "easthampton",
     "easton",
     "edgartown",
     "egremont",
     "erving",
     "essex",
     "everett",
     "fairhaven",
     "fallriver",
     "falmouth",
     "fitchburg",
     "florida",
     "foxborough",
     "framingham",
     "franklin",
     "freetown",
     "gardner",
     "gay head",
     "georgetown",
     "gill",
     "gloucester",
     "goshen",
     "gosnold",
     "grafton",
     "granby",
     "granville",
     "greatbarrington",
     "greenfield",
     "groton",
     "groveland",
     "hadley",
     "halifax",
     "hamilton",
     "hampden",
     "hancock",
     "hanover",
     "hanson",
     "hardwick",
     "harvard",
     "harwich",
     "hatfield",
     "haverhill",
     "hawley",
     "heath",
     "hingham",
     "hinsdale",
     "holbrook",
     "holden",
     "holland",
     "holliston",
     "holyoke",
     "hopedale",
     "hopkinton",
     "hubbardston",
     "hudson",
     "hull",
     "huntington",
     "ipswich",
     "kingston",
     "lakeville",
     "lancaster",
     "lanesborough",
     "lawrence",
     "lee",
     "leicester",
     "lenox",
     "leominster",
     "leverett",
     "lexington",
     "leyden",
     "lincoln",
     "littleton",
     "longmeadow",
     "lowell",
     "ludlow",
     "lunenburg",
     "lynn",
     "lynnfield",
     "malden",
     "manchester",
     "mansfield",
     "marblehead",
     "marion",
     "marlborough",
     "marshfield",
     "mashpee",
     "mattapoisett",
     "maynard",
     "medfield",
     "medford",
     "medway",
     "melrose",
     "mendon",
     "merrimac",
     "methuen",
     "middleborough",
     "middlefield",
     "middleton",
     "milford",
     "millbury",
     "millis",
     "millville",
     "milton",
     "monroe",
     "monson",
     "montague",
     "monterey",
     "montgomery",
     "mountwashington",
     "nahant",
     "nantucket",
     "natick",
     "needham",
     "newashford",
     "newbedford",
     "newbraintree",
     "newmarlborough",
     "newsalem",
     "newbury",
     "newburyport",
     "newton",
     "norfolk",
     "westadams",
     "westandover",
     "westattleborough",
     "westbrookfield",
     "westreading",
     "northampton",
     "northborough",
     "northbridge",
     "northfield",
     "norton",
     "norwell",
     "norwood",
     "oak bluffs",
     "oakham",
     "orange",
     "orleans",
     "otis",
     "oxford",
     "palmer",
     "paxton",
     "peabody",
     "pelham",
     "pembroke",
     "pepperell",
     "peru",
     "petersham",
     "phillipston",
     "pittsfield",
     "plainfield",
     "plainville",
     "plymouth",
     "plympton",
     "princeton",
     "provincetown",
     "quincy",
     "randolph",
     "raynham",
     "reading",
     "rehoboth",
     "revere",
     "richmond",
     "rochester",
     "rockland",
     "rockport",
     "rowe",
     "rowley",
     "royalston",
     "russell",
     "rutland",
     "salem",
     "salisbury",
     "sandisfield",
     "sandwich",
     "saugus",
     "savoy",
     "scituate",
     "seekonk",
     "sharon",
     "sheffield",
     "shelburne",
     "sherborn",
     "shirley",
     "shrewsbury",
     "shutesbury",
     "somerset",
     "somerville",
     "southhadley",
     "southampton",
     "southborough",
     "southbridge",
     "southwick",
     "spencer",
     "springfield",
     "sterling",
     "stockbridge",
     "stoneham",
     "stoughton",
     "stow",
     "sturbridge",
     "sudbury",
     "sunderland",
     "sutton",
     "swampscott",
     "swansea",
     "taunton",
     "templeton",
     "tewksbury",
     "tisbury",
     "tolland",
     "topsfield",
     "townsend",
     "truro",
     "tyngsborough",
     "tyringham",
     "upton",
     "uxbridge",
     "wakefield",
     "wales",
     "walpole",
     "waltham",
     "ware",
     "wareham",
     "warren",
     "warwick",
     "washington",
     "watertown",
     "wayland",
     "webster",
     "wellesley",
     "wellfleet",
     "wendell",
     "wenham",
     "westboylston",
     "westbridgewater",
     "westbrookfield",
     "westnewbury",
     "westspringfield",
     "weststockbridge",
     "westtisbury",
     "westborough",
     "westfield",
     "westford",
     "westhampton",
     "westminster",
     "weston",
     "westport",
     "westwood",
     "weymouth",
     "whately",
     "whitman",
     "wilbraham",
     "williamsburg",
     "williamstown",
     "wilmington",
     "winchendon",
     "winchester",
     "windsor",
     "winthrop",
     "woburn",
     "worcester",
     "worthington",
     "wrentham",
     "yarmouth"
 ];
 var current_town = "massachusetts";

 var margin_bsas = {
         top: 0,
         right: 50,
         bottom: 30,
         left: 50
     },
     width_bsas = 650 - margin_bsas.left - margin_bsas.right,
     height_bsas = 400 - margin_bsas.top - margin_bsas.bottom;

 var bisectAge = d3.bisector(function(d) {
     return d.age;
 }).left;
 var percent = d3.format(',.1%');
 var yearformat = d3.format("d");
 // var min_age = 2005;
 // var fields = ['emp', 'edu', 'race', 'orig'];
 var groups = {};

 var x = d3.scale.linear()
     .range([0, width_bsas]);

 var y = d3.scale.linear()
     .range([height_bsas, 0]);
 // .domain([0, 6]);

 var color = d3.scale.category10();

 var xAxis_bsas = d3.svg.axis()
     .scale(x)
     .tickFormat(yearformat)
     .orient("bottom")
     .outerTickSize(0);

 var yAxis_bsas = d3.svg.axis()
     .scale(y)
     .tickSize(width_bsas)
     .orient("right")
     .tickFormat(percent);

 var line = d3.svg.line()
     .x(function(d) {
         return x(d.age);
     })
     .y(function(d) {
         return y(d.value);
     })
     .defined(function(d) {
         return y(d.value);
     }) // Omit empty values.;



 var $lines_bsas = d3.select("#lines-bsas").append("svg")
     .attr("width", width_bsas + margin_bsas.left + margin_bsas.right)
     .attr("height", height_bsas + margin_bsas.top + margin_bsas.bottom)
     .append("g")
     .attr("transform", "translate(" + margin_bsas.left + "," + margin_bsas.top + ")");

 d3.csv("js/data/bsas-data.csv", type, function(error, data) {
     if (error) throw error;
     //console.log(groups);
     // var marriages = groups[current_town];

     x.domain([2005, d3.max(data, function(d) {
         return d.age;
     })]);
     y.domain([0, .99]);

     $lines_bsas.append("g")
         .attr("class", "x axis_bsas")
         .attr("transform", "translate(0," + height_bsas + ")")
         .call(xAxis_bsas)
         .append("text")
         .attr("x", 635)
         .attr("y", 15)
         .attr("text-anchor", "middle")
         .text("Year");

     $lines_bsas.append("g")
         .attr("class", "y axis_bsas")
         .call(yAxis_bsas)
         .append("text")
         // .attr("y", -30)
         .style("text-anchor", "start")
         // .text("Substance Abuse");
     $lines_bsas.selectAll(".y.axis_bsas text").attr("x", -43).attr("dy", 0);

     var legend_pos_text = -40,
         legend_pos_dot = -50;


     $lines_bsas.append("circle")
         .attr("class", "circle opioids")
         .attr("cx", width_bsas + legend_pos_dot)
         .attr("cy", 25)
         .attr("r", 3);
     $lines_bsas.append("g")
         .append("text")
         .attr("class", "focus opioids")
         .attr("x", width_bsas + legend_pos_text)
         .attr("y", 28)
         .text("opioids");

     $lines_bsas.append("circle")
         .attr("class", "circle alcohol")
         .attr("cx", width_bsas + legend_pos_dot)
         .attr("cy", 40)
         .attr("r", 3);
     $lines_bsas.append("g")
         .append("text")
         .attr("class", "focus alcohol")
         .attr("x", width_bsas + legend_pos_text)
         .attr("y", 43)
         .text("alcohol");


     $lines_bsas.append("circle")
         .attr("class", "circle marijuana")
         .attr("cx", width_bsas + legend_pos_dot)
         .attr("cy", 55)
         .attr("r", 3);
     $lines_bsas.append("g")
         .append("text")
         .attr("class", "focus marijuana")
         .attr("x", width_bsas + legend_pos_text)
         .attr("y", 58)
         .text("marijuana");


     $lines_bsas.append("circle")
         .attr("class", "circle other")
         .attr("cx", width_bsas + legend_pos_dot)
         .attr("cy", 70)
         .attr("r", 3);
     $lines_bsas.append("g")
         .append("text")
         .attr("class", "focus other")
         .attr("x", width_bsas + legend_pos_text)
         .attr("y", 73)
         .text("other");


     $lines_bsas.append("circle")
         .attr("class", "circle none")
         .attr("cx", width_bsas + legend_pos_dot)
         .attr("cy", 82)
         .attr("r", 3);
     $lines_bsas.append("g")
         .append("text")
         .attr("class", "focus none")
         .attr("x", width_bsas + legend_pos_text)
         .attr("y", 88)
         .text("none");

     // Alcohol line
     $lines_bsas.append("path")
         .attr("class", "line alcohol")
         .attr("d", function(d) {
             return line(groups[current_town + "alcohol"].values);
         });

     //alcohol circle
     for (i = 0; i < groups[current_town + "alcohol"].values.length; i++) {

         var x_circle_alcohol = groups[current_town + "alcohol"].values[i].age;
         var y_circle_alcohol = groups[current_town + "alcohol"].values[i].value;

         if (y_circle_alcohol >= 0) {

             //console.log(groups[current_town+"alcohol"].values[i].age); 
             //console.log("circle alcohol y" + groups[current_town + "alcohol"].values[i].age)

             $lines_bsas.append("circle")
                 .attr("class", function(d) {
                     return "circle alcohol y" + groups[current_town + "alcohol"].values[i].age
                 })
                 .attr("cx", x(groups[current_town + "alcohol"].values[i].age))
                 .attr("cy", y(groups[current_town + "alcohol"].values[i].value))
                 .attr("r", 3)
         }
     }

     // Marijuana line
     $lines_bsas.append("path")
         .attr("class", "line marijuana")
         .attr("d", function(d) {
             return line(groups[current_town + "marijuana"].values);
         });
     // Marijuana circle
     for (i = 0; i < groups[current_town + "marijuana"].values.length; i++) {

         var x_circle_alcohol = groups[current_town + "marijuana"].values[i].age;
         var y_circle_alcohol = groups[current_town + "marijuana"].values[i].value;

         if (y_circle_alcohol >= 0) {

             //console.log(groups[current_town+"alcohol"].values[i].age); 
             //console.log("circle marijuana y" + groups[current_town + "marijuana"].values[i].age)

             $lines_bsas.append("circle")
                 .attr("class", function(d) {
                     return "circle marijuana y" + groups[current_town + "marijuana"].values[i].age
                 })
                 .attr("cx", x(groups[current_town + "marijuana"].values[i].age))
                 .attr("cy", y(groups[current_town + "marijuana"].values[i].value))
                 .attr("r", 3)
         }
     }

     // None line
     $lines_bsas.append("path")
         .attr("class", "line none")
         .attr("d", function(d) {
             return line(groups[current_town + "none"].values);
         });
     // None circle
     for (i = 0; i < groups[current_town + "none"].values.length; i++) {

         var x_circle_alcohol = groups[current_town + "none"].values[i].age;
         var y_circle_alcohol = groups[current_town + "none"].values[i].value;

         if (y_circle_alcohol >= 0) {

             //console.log(groups[current_town+"alcohol"].values[i].age); 
             //console.log("circle none y" + groups[current_town + "none"].values[i].age)

             $lines_bsas.append("circle")
                 .attr("class", function(d) {
                     return "circle none y" + groups[current_town + "none"].values[i].age
                 })
                 .attr("cx", x(groups[current_town + "none"].values[i].age))
                 .attr("cy", y(groups[current_town + "none"].values[i].value))
                 .attr("r", 3)
         }
     }

     // Opioids line
     $lines_bsas.append("path")
         .attr("class", "line opioids")
         .attr("d", function(d) {
             return line(groups[current_town + "opioids"].values);
         });
     // Opioids circle
     for (i = 0; i < groups[current_town + "opioids"].values.length; i++) {

         var x_circle_alcohol = groups[current_town + "opioids"].values[i].age;
         var y_circle_alcohol = groups[current_town + "opioids"].values[i].value;

         if (y_circle_alcohol >= 0) {

             //console.log(groups[current_town+"alcohol"].values[i].age); 
             //console.log("circle opioids y" + groups[current_town + "opioids"].values[i].age)

             $lines_bsas.append("circle")
                 .attr("class", function(d) {
                     return "circle opioids y" + groups[current_town + "opioids"].values[i].age
                 })
                 .attr("cx", x(groups[current_town + "opioids"].values[i].age))
                 .attr("cy", y(groups[current_town + "opioids"].values[i].value))
                 .attr("r", 3)
         }
     }

     // Other line
     $lines_bsas.append("path")
         .attr("class", "line other")
         .attr("d", function(d) {
             return line(groups[current_town + "other"].values);
         });
     // Other circle
     for (i = 0; i < groups[current_town + "other"].values.length; i++) {

         var x_circle_alcohol = groups[current_town + "other"].values[i].age;
         var y_circle_alcohol = groups[current_town + "other"].values[i].value;

         if (y_circle_alcohol >= 0) {

             //console.log(groups[current_town+"alcohol"].values[i].age); 
             // console.log("circle other y" + groups[current_town + "other"].values[i].age)

             $lines_bsas.append("circle")
                 .attr("class", function(d) {
                     return "circle other y" + groups[current_town + "other"].values[i].age
                 })
                 .attr("cx", x(groups[current_town + "other"].values[i].age))
                 .attr("cy", y(groups[current_town + "other"].values[i].value))
                 .attr("r", 3)
         }
     }

     // Autocomplete

     $(".btn-bsas").addClass('active');
     d3.selectAll(".btn-bsas").on("click", function() {
         current_town = d3.select(this).attr("data-val");
         update();
         $("#tags").val('');
     });


     $("#tags").autocomplete({
         source: function(request, response) {
             var matches = $.map(town_names, function(acItem) {
                 if (acItem.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
                     return acItem;
                 }
             });
             response(matches);
             //$("#tags").focus(function() {
                 // if (matches.length == 1) {
                 //     current_town = matches[0];
                 //     $(".btn-bsas").removeClass('active');
                 //     update();
                 // }
             //});
             //console.log(matches);
         },
         select: function(event, ui) {
             current_town = ui.item.value;
             $(".btn-bsas").removeClass('active');
             update();
         }
     });

     function update() {

         // marriages = groups[current_town];
         //update alcohol line
         $lines_bsas.select(".line.alcohol")
             .transition()
             .duration(600)
             .delay(180)
             .attr("d", function(d) {
                 return line(groups[current_town + "alcohol"].values);
             });

         //console.log(groups[current_town + "alcohol"].values[5].value >= 0);

         //update alcohol circles
         for (i = 0; i < groups[current_town + "alcohol"].values.length; i++) {
             var string_select = ".circle.alcohol.y" + groups[current_town + "alcohol"].values[i].age
                 // console.log(string_select);

             if (groups[current_town + "alcohol"].values[i].value >= 0) {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("cx", function(d) {
                         return x(groups[current_town + "alcohol"].values[i].age)
                     })
                     .attr("cy", function(d) {
                         return y(groups[current_town + "alcohol"].values[i].value)
                     })
                     .attr("r", 3)
             } else {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("r", 0)
             }

         }



         //marijuana
         $lines_bsas.select(".line.marijuana")
             .transition()
             .duration(600)
             .attr("d", function(d) {
                 return line(groups[current_town + "marijuana"].values);
             });
         //update marijuana circles
         for (i = 0; i < groups[current_town + "marijuana"].values.length; i++) {
             var string_select = ".circle.marijuana.y" + groups[current_town + "marijuana"].values[i].age
                 //console.log(string_select);

             if (groups[current_town + "marijuana"].values[i].value >= 0) {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("cx", function(d) {
                         return x(groups[current_town + "marijuana"].values[i].age)
                     })
                     .attr("cy", function(d) {
                         return y(groups[current_town + "marijuana"].values[i].value)
                     })
                     .attr("r", 3)
             } else {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("r", 0)
             }

         }

         //none
         $lines_bsas.select(".line.none")
             .transition()
             .duration(600)
             .attr("d", function(d) {
                 return line(groups[current_town + "none"].values);
             });
         //update none circles
         for (i = 0; i < groups[current_town + "none"].values.length; i++) {


             var string_select = ".circle.none.y" + groups[current_town + "none"].values[i].age
             var value_select = groups[current_town + "none"].values[i].value
                 // console.log(string_select);
                 // console.log(value_select);
                 // console.log(value_select >= 0);

             if (groups[current_town + "none"].values[i].value >= 0) {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("cx", function(d) {
                         return x(groups[current_town + "none"].values[i].age)
                     })
                     .attr("cy", function(d) {
                         return y(groups[current_town + "none"].values[i].value)
                     })
                     .attr("r", 3);
             } else {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("r", 0);
             }

         }

         //opioids
         $lines_bsas.select(".line.opioids")
             .transition()
             .duration(600)
             .attr("d", function(d) {
                 return line(groups[current_town + "opioids"].values);
             });
         //update opioids circles
         for (i = 0; i < groups[current_town + "opioids"].values.length; i++) {


             var string_select = ".circle.opioids.y" + groups[current_town + "opioids"].values[i].age
             var value_select = groups[current_town + "opioids"].values[i].value
                 //console.log(string_select);
                 //console.log(value_select);
                 //console.log(value_select >= 0);

             if (value_select >= 0) {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("cx", function(d) {
                         return x(groups[current_town + "opioids"].values[i].age)
                     })
                     .attr("cy", function(d) {
                         return y(groups[current_town + "opioids"].values[i].value)
                     })
                     .attr("r", 3);
             } else {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("r", 0);
             }

         }

         //other
         $lines_bsas.select(".line.other")
             .transition()
             .duration(600)
             .attr("d", function(d) {
                 return line(groups[current_town + "other"].values);
             });
         //update other circles
         for (i = 0; i < groups[current_town + "other"].values.length; i++) {

             var string_select = ".circle.other.y" + groups[current_town + "other"].values[i].age
             var value_select = groups[current_town + "other"].values[i].value
                 // console.log(string_select);
                 // console.log(value_select);
                 // console.log(value_select >= 0);

             if (value_select >= 0) {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("cx", function(d) {
                         return x(groups[current_town + "other"].values[i].age)
                     })
                     .attr("cy", function(d) {
                         return y(groups[current_town + "other"].values[i].value)
                     })
                     .attr("r", 3);
             } else {
                 $lines_bsas.selectAll(string_select)
                     .transition()
                     .duration(600)
                     .attr("r", 0);
             }

         }

     }




     // alcohol
     var focusalcohol = $lines_bsas.append("g")
         .attr("class", "focus alcohol")
         .style("display", "none");
     focusalcohol.append("circle")
         .attr("r", 3);
     focusalcohol.append("text")
         .attr("x", 9)
         .attr("dy", ".35em");

     // marijuana
     var focusmarijuana = $lines_bsas.append("g")
         .attr("class", "focus marijuana")
         .style("display", "none");
     focusmarijuana.append("circle")
         .attr("r", 3);
     focusmarijuana.append("text")
         .attr("x", 9)
         .attr("dy", ".35em");

     // none
     var focusnone = $lines_bsas.append("g")
         .attr("class", "focus none")
         .style("display", "none");
     focusnone.append("circle")
         .attr("r", 3);
     focusnone.append("text")
         .attr("x", 9)
         .attr("dy", ".35em");

     // opioids
     var focusopioids = $lines_bsas.append("g")
         .attr("class", "focus opioids")
         .style("display", "none");
     focusopioids.append("circle")
         .attr("r", 3);
     focusopioids.append("text")
         .attr("x", 9)
         .attr("dy", ".35em");

     // none
     var focusother = $lines_bsas.append("g")
         .attr("class", "focus other")
         .style("display", "none");
     focusother.append("circle")
         .attr("r", 3);
     focusother.append("text")
         .attr("x", 9)
         .attr("dy", ".35em");

     // Events
     $lines_bsas.append("rect")
         .attr("class", "overlay")
         .attr("width", width_bsas)
         .attr("height", height_bsas)
         .on("mouseover", function() {
             focusmarijuana.style("display", null);
             focusalcohol.style("display", null);
             focusnone.style("display", null);
             focusopioids.style("display", null);
             focusother.style("display", null);
             //focusage.style("display", null);
         })
         .on("mouseout", function() {
             focusmarijuana.style("display", "none");
             focusalcohol.style("display", "none");
             focusnone.style("display", "none");
             focusopioids.style("display", "none");
             focusother.style("display", "none");
             //focusage.style("display", "none");
         })
         .on("mousemove", mousemove);

     function mousemove() {



         var x0 = x.invert(d3.mouse(this)[0])

         // Alcohol
         var i_alcohol = bisectAge(groups[current_town + "alcohol"].values, x0, 1),
             d0_alcohol = groups[current_town + "alcohol"].values[i_alcohol - 1],
             d1_alcohol = groups[current_town + "alcohol"].values[i_alcohol],
             d_alcohol = x0 - d0_alcohol.age > d1_alcohol.age - x0 ? d1_alcohol : d0_alcohol;

         if (d_alcohol.value >= 0) {
             focusalcohol.attr("transform", "translate(" + x(d_alcohol.age) + "," + y(d_alcohol.value) + ")");
             focusalcohol.select("text").text(percent(d_alcohol.value));
             focusalcohol.select("circle").attr("r", 4);
         } else {
             focusalcohol.select("circle").attr("r", 0);
             focusalcohol.select("text").text("");
         }

         // Marijuana

         var i_marijuana = bisectAge(groups[current_town + "marijuana"].values, x0, 1),
             d0_marijuana = groups[current_town + "marijuana"].values[i_marijuana - 1],
             d1_marijuana = groups[current_town + "marijuana"].values[i_marijuana],
             d_marijuana = x0 - d0_marijuana.age > d1_marijuana.age - x0 ? d1_marijuana : d0_marijuana;


         // console.log(d_marijuana.value + " " + d_marijuana.age);
         // console.log(d_marijuana.value >= 0);

         if (d_marijuana.value >= 0) {
             focusmarijuana.attr("transform", "translate(" + x(d_marijuana.age) + "," + y(d_marijuana.value) + ")");
             focusmarijuana.select("text").text(percent(d_marijuana.value));
             focusmarijuana.select("circle").attr("r", 4);
         } else {
             focusmarijuana.select("circle").attr("r", 0);
             focusmarijuana.select("text").text("");
         }

         // None

         var i_none = bisectAge(groups[current_town + "none"].values, x0, 1),
             d0_none = groups[current_town + "none"].values[i_none - 1],
             d1_none = groups[current_town + "none"].values[i_none],
             d_none = x0 - d0_none.age > d1_none.age - x0 ? d1_none : d0_none;

         if (d_none.value >= 0) {
             focusnone.attr("transform", "translate(" + x(d_none.age) + "," + y(d_none.value) + ")");
             focusnone.select("text").text(percent(d_none.value));
             focusnone.select("circle").attr("r", 4);
         } else {
             focusnone.select("circle").attr("r", 0);
             focusnone.select("text").text("");
         }


         // Opioids
         var i_opioids = bisectAge(groups[current_town + "opioids"].values, x0, 1),
             d0_opioids = groups[current_town + "opioids"].values[i_opioids - 1],
             d1_opioids = groups[current_town + "opioids"].values[i_opioids],
             d_opioids = x0 - d0_opioids.age > d1_opioids.age - x0 ? d1_opioids : d0_opioids;

         if (d_opioids.value >= 0) {
             focusopioids.attr("transform", "translate(" + x(d_opioids.age) + "," + y(d_opioids.value) + ")");
             focusopioids.select("text").text(percent(d_opioids.value));
             focusopioids.select("circle").attr("r", 4);
         } else {
             focusopioids.select("circle").attr("r", 0);
             focusopioids.select("text").text("");
         }


         // other
         var i_other = bisectAge(groups[current_town + "other"].values, x0, 1),
             d0_other = groups[current_town + "other"].values[i_other - 1],
             d1_other = groups[current_town + "other"].values[i_other],
             d_other = x0 - d0_other.age > d1_other.age - x0 ? d1_other : d0_other;

         //console.log(d_other.value);

         if (d_other.value >= 0) {
             focusother.attr("transform", "translate(" + x(d_other.age) + "," + y(d_other.value) + ")");
             focusother.select("text").text(percent(d_other.value));
             focusother.select("circle").attr("r", 4);
         } else {
             focusother.select("circle").attr("r", 0);
             focusother.select("text").text("");
         }


         // Adjust label horizontal positions.
         if (x0 > 80) {
             focusalcohol.select("text").attr("x", 3).attr("y", -7).attr("text-anchor", "beginning");
             focusmarijuana.select("text").attr("x", 3).attr("y", -7).attr("text-anchor", "beginning");
             focusnone.select("text").attr("x", 3).attr("y", -7).attr("text-anchor", "beginning");
             focusopioids.select("text").attr("x", 3).attr("y", -7).attr("text-anchor", "beginning");
             focusother.select("text").attr("x", 3).attr("y", -7).attr("text-anchor", "beginning");
         } else {
             focusalcohol.select("text").attr("x", 10).attr("text-anchor", "beginning");
             focusmarijuana.select("text").attr("x", 10).attr("text-anchor", "beginning");
             focusnone.select("text").attr("x", 10).attr("text-anchor", "beginning");
             focusopioids.select("text").attr("x", 10).attr("text-anchor", "beginning");
             focusother.select("text").attr("x", 10).attr("text-anchor", "beginning");
         }



     }

 }); // @end d3.tsv()


 function type(d, i) {

     d3.keys(d).forEach(function(key) {
         d[key] = +d[key];
         if (key != 'age') {
             if (!(key in groups)) {
                 groups[key] = {
                     'values': [{
                         age: d.age,
                         value: d[key]
                     }]
                 };
             } else {
                 groups[key]['values'].push({
                     age: d.age,
                     value: d[key]
                 });
             }
         }
     });

     return d;

 }

$(document).ready(function() {

    var prescription = [{
        "Yes": 83,
        "No": 17
    }, {
        "Yes": 57,
        "No": 43
    }, {
        "Yes": 50,
        "No": 50
    }, {
        "Yes": 37,
        "No": 63
    }];

    var heroin = [{
        "Yes": 65,
        "No": 35
    }, {
        "Yes": 28,
        "No": 72
    }, {
        "Yes": 20,
        "No": 80
    }, {
        "Yes": 13,
        "No": 87
    }];

    var fentanyl = [{
        "Yes": 68,
        "No": 32
    }, {
        "Yes": 30,
        "No": 70
    }, {
        "Yes": 22,
        "No": 78
    }, {
        "Yes": 17,
        "No": 83
    }];

    var both = [{
        "Yes": 64,
        "No": 36
    }, {
        "Yes": 24,
        "No": 76
    }, {
        "Yes": 15,
        "No": 85
    }, {
        "Yes": 9,
        "No": 91
    }];

    var methadone = [{
        "Yes": 76,
        "No": 24
    }, {
        "Yes": 46,
        "No": 54
    }, {
        "Yes": 41,
        "No": 59
    }, {
        "Yes": 27,
        "No": 73
    }];

    var buprenorphine = [{
        "Yes": 60,
        "No": 40
    }, {
        "Yes": 60,
        "No": 40
    }, {
        "Yes": 60,
        "No": 40
    }, {
        "Yes": 60,
        "No": 40
    }];




    var data_substance = prescription;
    var time = 0;
    asignVal_substance(data_substance, time);
    $("#studyperiod").addClass("active");

    // $("#options_substance").on('input change', function() {
    //     data_substance = eval(($("#options_substance option:selected").val()));
    //     asignVal_substance(data_substance, time);
    // });


    $(".btn-time").on('click', function() {
        $('.btn-time').removeClass("active");
        $(this).addClass("active");
        time = parseInt($(this).val());
        asignVal_substance(data_substance, time);
        var time_period;
        switch (time) {
            case 0:
                time_period = "During the Study Period";
                break;
            case 1:
                time_period = "6 Months Before Death";
                break;
            case 2:
                time_period = "3 Months Before Death";
                break;
            case 3:
                time_period = "1 Month Before Death";
                break;
        }
        $("#time-perioid").html(time_period.toLowerCase());
        $("#label_blocks").html(time_period);
    });


    function asignVal_substance(type, time) {
        $("#people").empty();
        $('#people').each(function() {
            makeChart_substance(type, time);
            $('#table_substance').html('<table class="table" id="table_substance"><tr><th>Present</th><th>Not Present</th></tr><tr><td class="type_substance0">' + type[time].Yes + '%</td><td class="type_substance1">' + type[time].No + '%</td></tr></table>');
        })

    };



    function makeChart_substance(data_substance, i) {
        var blockArray_substance = [];
        var noOfBlocks_No = Math.round(data_substance[i].No);
        var noOfBlocks_Yes = Math.round(data_substance[i].Yes);
        var blocksAdded = 0;
        blockArray = addBlocks_substance("#people", noOfBlocks_Yes, noOfBlocks_No, data_substance, blockArray_substance, i);
        addBlock_substance("#people", blockArray_substance, 0);
    }

    function addBlocks_substance(id, noOfBlocks_Yes, noOfBlocks_No, data_substance, blockArray_substance, i) {
        for (b = 0; b < noOfBlocks_No; b++) {
            blockArray_substance.push('<div class="block type_substance' + 1 + ' data-index=' + data_substance[i].No + '">' + '</div>');
        };
        for (b = 0; b < noOfBlocks_Yes; b++) {
            $(id).append('<div class="block type_substance' + 0 + ' data-index=' + data_substance[i].Yes + '">' + '</div>');
        };
        return blockArray_substance;

    }

    function addBlock_substance(id, blockArray_substance, i) {
        if (i < blockArray.length) {
            $(id).append(blockArray_substance[i]);
            i++;
            addBlock_substance(id, blockArray_substance, i);
        }
    }


    ////////////////////////
    //PIE CHART
    ///////////////////////

    var margin = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 0
    };
    var width = 550 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var labelsWidth = width * 0.4;
    var labelWidth = labelsWidth * 0.1;
    var labelHeight = labelWidth * 0.6;

    var animateDuration = 300;
    var outerRadius = width - labelsWidth < height ? (width - labelsWidth) / 2 : height / 2;
    var innerRadius = outerRadius * 0.5; // 40%

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var pie = d3.layout
        .pie()
        .sort(null)
        .value(getValue)
        .startAngle(1.1 * Math.PI)
        .endAngle(3.1 * Math.PI);

    var explodedIndex;
    var color = d3.scale.ordinal()
        .range(["#b71c1c", "#d32f2f", "#f44336", "#ef5350", "#e57373", "#ef9a9a"]);

    var $pie_substance = d3.select('#piechart')
        .attr({
            width: width + margin.left + margin.right,
            height: height + margin.top + margin.bottom
        })
        .append('g')
        .attr({
            class: 'labels',
            transform: 'translate(' + (width - (labelsWidth + margin.right)) + ', ' + margin.top + ')'
        })
        .select(getParent)
        .append('g')
        .attr({
            class: 'pie',
            transform: 'translate(' + (outerRadius + margin.left) + ', ' + (height / 2 + margin.top) + ')'
        })
        .select(getParent)
        .append('g')
        .attr({
            class: 'main-legend',
            transform: 'translate(' + (outerRadius + margin.left) + ', ' + (outerRadius + margin.top) + ')'
        })
        .select(getParent);

    $pie_substance.select('.main-legend')
        .append('circle')
        .attr({
            class: 'border',
            opacity: 0,
            stroke: 'rgba(255,255,255,1)',
            fill: 'rgba(0,0,0,0)',
            r: innerRadius * 0.9
        })
        .select(getParent)
        .append('circle')
        .attr({
            class: 'circle',
            opacity: 0,
            fill: 'rgba(255,255,255,1)',
            r: innerRadius * 0.9
        })
        .select(getParent)
        .append('line')
        .attr({
            opacity: 0,
            stroke: 'rgba(255,255,255,1)',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
        })
        .select(getParent)
        .append('text')
        .attr({
            class: 'legend-title',
            'font-size': '18px',
            y: -1 * innerRadius * 0.13,
            'font-family': 'Arial',
            'text-anchor': 'middle',
            'alignment-baseline': 'middle',
            fill: '#fff'
        })

    .select(getParent)
        .append('text')
        .attr({
            class: 'description',
            'font-size': '14px',
            y: innerRadius * 0.13,
            'font-family': 'Arial',
            'text-anchor': 'middle',
            'alignment-baseline': 'middle',
            fill: '#fff'
        });

    function getParent() {
        return this.parentNode;
    }

    function getValue(d) {
        return d.value;
    }


    function getSum(data) {
        var _sum = 0;
        data.forEach(function addValue(item) {
            _sum += item.value;
        });
        return _sum;
    }

    function arcTween(d) {
        var i;

        function toArc(t) {
            return arc(i(t));
        }

        function toEndAngle(t) {
            d.endAngle = i(t);
            return arc(d);
        }

        if ('undefined' === typeof this._current) {
            i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            this._current = d;
            return toEndAngle;
        }
        i = d3.interpolate(this._current, d);
        this._current = i(0);
        return toArc;
    }

    function labelAnimation(d) {
        return 'translate (' + arc.centroid(d) + ')';
    }

    function fill(d, i) {
        return color(i);
    }

    function selectArcAnimation(_d) {
        var dist = outerRadius * 0.05;
        _d.midAngle = ((_d.endAngle - _d.startAngle) / 2) + _d.startAngle;
        var x = Math.sin(_d.midAngle) * dist;
        var y = -Math.cos(_d.midAngle) * dist;
        return 'translate(' + x + ',' + y + ')';
    }

    function updatePie(data) {
        var sum = getSum(data);
        data = pie(data);
        var arcs = $pie_substance.select('.pie')
            .selectAll('.arc')
            .data(data);

        var isDelay = arcs.selectAll('path').length;
        var _duration = isDelay ? animateDuration : animateDuration / 2;

        function getPercent(d) {
            return ((d.value / sum) * 100).toFixed(1) + '%';
        }

        function getLegend(d) {
            return d.data.name + ' Present | ' + d.data.value;
        }

        function liveLarge(d) {
            var angle = 360 * (d.value / sum);
            var arcLength = (Math.PI * (outerRadius / 2) * angle) / 180;
            return arcLength > Math.PI * outerRadius * 0.01;
        }

        function onMouseIn(d, i) {
            explodedIndex = i;
            onClick(d, i);

            function onClick(d, i) {

                console.log(d.data.option);
                $('.substance-type').html(d.data.description);
                $('#total').html(d.data.value);
                if (d.data.option == "buprenorphine") {
                    $('#timeline_blocks').attr('max', 0);
                } else {
                    $('#timeline_blocks').attr('max', 3);
                };
                data_substance = eval(d.data.option);
                asignVal_substance(data_substance, time);
            };


            var label = $pie_substance.selectAll('.legend')
                .filter(function(_d, _i) {
                    return i === _i;
                });
            if (!label.attr('data-exit')) {
                label.transition()
                    .duration(animateDuration / 2)
                    .attr({
                        opacity: 1,
                        transform: 'translate(10, ' + ((labelHeight + 5) * i) + ')'
                    });
            }


            $pie_substance.selectAll('.arc')
                .filter(function(_d, _i) {
                    return i === _i;
                })
                .transition()
                .duration(animateDuration / 2)
                .attr('transform', selectArcAnimation);

            $pie_substance.select('.main-legend')
                .select('.border')
                .transition()
                .duration(animateDuration / 2)
                .attr({
                    opacity: 1,
                    stroke: fill(null, i)
                });

            $pie_substance.select('.main-legend')
                .select('.circle')
                .transition()
                .duration(animateDuration / 2)
                .attr({
                    opacity: 1,
                    fill: fill(null, i)
                });

            $pie_substance.select('.main-legend')
                .select('line')
                .transition()
                .duration(animateDuration / 2)
                .attr({
                    opacity: 1,
                    stroke: fill(null, i),
                    x1: Math.sin(d.midAngle) * (innerRadius * 0.7),
                    y1: -Math.cos(d.midAngle) * (innerRadius * 0.7),
                    x2: Math.sin(d.midAngle) * innerRadius,
                    y2: -Math.cos(d.midAngle) * innerRadius
                });

            $pie_substance.select('.main-legend')
                .select('.legend-title')
                .text(d.data.name)
                // .append(d.data.name[1])
                .select(getParent)
                .select('.description')
                .text(d.data.value)
        }

        function onMouseOut(d, i) {
            $pie_substance.select('.main-legend')
                .selectAll(['.circle', '.border'])
                .transition()
                .duration(animateDuration / 2)
                .attr({
                    opacity: 0
                });

            $pie_substance.select('.main-legend')
                .select('line')
                .transition()
                .duration(animateDuration / 2)
                .attr({
                    opacity: 0
                });

            $pie_substance.select('.main-legend')
                .select('.legend-title')
                .text('')
                .select(getParent)
                .select('.description')
                .text('');

            if ('undefined' === typeof i) {
                return;
            }
            var label = $pie_substance.selectAll('.legend')
                .filter(function(_d, _i) {
                    return i === _i;
                });

            if (!label.attr('data-exit')) {
                label.transition()
                    .duration(animateDuration / 2)
                    .attr({
                        opacity: 1,
                        transform: 'translate(0, ' + ((labelHeight + 5) * i) + ')'
                    });
            }

            $pie_substance.selectAll('.arc')
                .filter(function(_d, _i) {
                    return i === _i;
                })
                .transition()
                .duration(animateDuration / 2)
                .attr({
                    transform: 'translate(0,0)'
                });
        }

        onMouseOut();
        // update Pie

        arcs.enter()
            .append('g')
            .attr('class', 'arc')

        .on('click', function(d, i) {
                // onMouseOut.call($(this).parent(), d, i);
                // console.log($(this));
                if (explodedIndex >= 0) {
                    onMouseOut(null, explodedIndex);
                }
                onMouseIn(d, i);
            })
            //.on('mouseout', onMouseOut)
            // .on('mouseout', onMouseOut)
            .append('path')
            .attr({
                fill: fill
            })
            .attr("d", arc).style('stroke', 'white')
            .style('stroke-width', 2)
            .select(getParent)
            .filter(liveLarge)
            .append('text')
            .attr({
                'font-family': 'Arial',
                'font-size': '14px',
                fill: '#fff',
                'text-anchor': 'middle'
            });


        arcs.select('path')
            .transition()
            .delay(function delayFn(d, i) {
                return isDelay ? 0 : _duration * i;
            })
            .duration(_duration)
            .attrTween('d', arcTween);

        arcs.select('text')
            .text(getPercent)
            .transition()
            .duration(animateDuration)
            .attr({
                class: 'label-content',
                transform: labelAnimation
            });

        arcs.exit()
            .on('mouseenter', null)
            .on('mouseout', null)
            .remove();

        // Update Legends

        var legends = $pie_substance
            .select('.labels')
            .selectAll('.legend')
            .data(data);

        legends.enter()
            .append('g')
            .on('click', function(d, i) {
                // onMouseOut.call($(this).parent(), d, i);
                // console.log($(this));
                if (explodedIndex >= 0) {
                    onMouseOut(null, explodedIndex);
                }
                onMouseIn(d, i);
            })
            .attr('class', 'legend')
            .append('rect')
            .attr({
                width: labelWidth,
                height: labelHeight,
                fill: fill
            })
            .select(getParent)
            .append('text')
            .attr({
                'font-size': '14px',
                'font-family': 'Arial',
                fill: '#666',
                x: labelWidth + 5,
                y: labelHeight / 2 + 5
            })
            .select(getParent)
            .attr({
                opacity: 0,
                transform: function(d, i) {
                    return 'translate(15, ' + ((labelHeight + 5) * i) + ')';
                }
            })
            .transition()
            .duration(animateDuration)
            .attr({
                opacity: 1,
                transform: function(d, i) {
                    return 'translate(0, ' + ((labelHeight + 5) * i) + ')';
                }
            });

        legends.exit()
            .on('mouseenter', null)
            .on('mouseout', null)
            .attr('data-exit', true)
            .transition()
            .duration(animateDuration / 2)
            .attr({
                opacity: 0,
                transform: function(d, i) {
                    return 'translate(-15, ' + ((labelHeight + 5) * i) + ')';
                }
            })
            .remove();



        legends.select('text').html(getLegend);

    }

    var data_pie = [
        { name: 'Heroin', value: 867, option: 'heroin', description: 'heroin' },
        { name: 'Fentanyl', value: 288, option: 'fentanyl', description: 'fentanyl' },
        { name: 'Fentanyl & Heroin', value: 249, option: 'both', description: 'both fentanyl and heroin' },
        { name: 'Prescription Opioid', value: 154, option: 'prescription', description: 'prescription opioid' },
        { name: 'Methadone', value: 84, option: 'methadone', description: 'methadone' },
        { name: 'Buprenorphine', value: 15, option: 'buprenorphine', description: 'buprenorphine' },
    ];

    generatePie(data_pie);


    function generatePie(data) {
        updatePie(data);
    }



})

$(document).ready(function() {

    var prescription = [
        [0, 0],
        ["No", 58],
        ["Yes", 13],
        ["Yes", 8],
        ["No", 21],
        [0, 0]
    ];
    var heroin = [
        [0, 0],
        ["No", 22],
        ["Yes", 49],
        ["Yes", 17],
        ["No", 12],
        [0, 0]
    ];

    var multi = [
        ["1", 15],
        ["2", 31],
        ["3", 25],
        ["3", 18],
        ["2", 9],
        ["1", 2]
    ];


    // var person = '<svg width="10" height="10"><path d="M12.6,18.4c0-1,0-2,0-3c0-1.4,0.7-2.5,2-3.1c0.8-0.4,1.6-0.6,2.5-0.6c1,0,1.9,0,2.9,0c1,0,1.9,0.3,2.8,0.8c1,0.6,1.6,1.6,1.6,2.7c0,2.1,0,4.1,0,6.2c0,1.3-0.3,2.5-1.1,3.6c-0.2,0.2-0.4,0.4-0.6,0.6c-0.1,0.1-0.2,0.2-0.2,0.4c-0.2,0.8-0.4,1.6-0.5,2.5c-0.3,1.8-0.6,3.5-0.9,5.3c-0.2,1-0.8,1.5-1.8,1.5c-0.5,0-1.1,0-1.6,0c-0.2,0-0.3,0-0.5,0c-0.6-0.1-1.2-0.7-1.3-1.4c-0.3-1.6-0.5-3.2-0.8-4.9c-0.1-0.8-0.3-1.6-0.5-2.5c-0.1-0.4-0.2-0.7-0.5-1c-0.5-0.5-0.8-1.1-1-1.8c-0.3-0.8-0.4-1.6-0.4-2.5C12.6,20.3,12.6,19.3,12.6,18.4z"/><path d="M13.6,6c0-2.4,1.9-4.7,4.7-4.7c2.7,0,4.8,2.1,4.8,4.8c0,2.7-2.1,4.7-4.7,4.7C15.7,10.7,13.6,8.6,13.6,6z"/></svg>'
    // console.log(person);
    var table_html = [
        '<table class="table" id="table_gender"><tr><th></th><th>Present</th><th>Not Present</th></tr><tr><th>Male</th><td class="type_gender2">' + prescription[2][1] + '%</td><td class="type_gender1">' + prescription[1][1] + '%</td></tr><tr><th>Female</th><td class="type_gender3">' + prescription[3][1] + '%</td><td class="type_gender4">' + prescription[4][1] + '%</td></tr></table>',
        '<table class="table" id="table_gender"><tr><th></th><th>Present</th><th>Not Present</th></tr><tr><th>Male</th><td class="type_gender2">' + heroin[2][1] + '%</td><td class="type_gender1">' + heroin[1][1] + '%</td></tr><tr><th>Female</th><td class="type_gender3">' + heroin[3][1] + '%</td><td class="type_gender4">' + heroin[4][1] + '%</td></tr></table>',
        '<table class="table" id="table_gender"><tr><th></th><th>0 Prescribers</th><th>1–2 Prescribers</th><th>3+ Prescribers</th></tr><tr><th>Male</th><td td class="type_gender0">' + multi[0][1] + '%</td><td td class="type_gender1">' + multi[1][1] + '%</td><td td class="type_gender2">' + multi[2][1] + '%</td></tr><tr><th>Female</th><td td class="type_gender5">' + multi[5][1] + '%</td><td td class="type_gender4">' + multi[4][1] + '%</td><td td class="type_gender3">' + multi[3][1] + '%</td></tr></table>'
    ];


    var data_gender = prescription;


    //Set initial values
    makeChart_gender(prescription);
    $('#table_gender').html(table_html[0]);
    $("#prescription").addClass("active");

    //Link text controls
    $('.controls-block').click(function() {
        var $option = $(this).data('select');
        var $value = eval($(this).val());
        asignVal_gender($option, $value);
    });

    //Link button controls
    $('.btn-blocks').click(function() {
        var $option = $(this).attr('id');
        var $value = eval($(this).val());
        asignVal_gender($option, $value);
    });


    function asignVal_gender(option, value) {
        $("#buttons-blocks button").removeClass("active");
        $('#' + option).addClass('active');
        $("#gender").empty();
        makeChart_gender(eval(option));
        $('#table_gender').html(table_html[value]);
    };


    function makeChart_gender(data_gender) {

        var blockArray = [];
        for (i = 0; i < 6; i++) {
            var noOfBlocks_gender = Math.round(data_gender[i][1]);
            var blocksAdded = 0;
            blockArray_gender = addBlocks_gender("#gender", noOfBlocks_gender, data_gender, blockArray);
        }
        addBlock_gender("#gender", blockArray_gender, 0);
    }

    function addBlock_gender(id, blockArray, i) {
        if (i < blockArray.length) {
            $(id).append(blockArray[i]);
            i++;
            //timeout += 1;
            // setTimeout(function() {
            addBlock_gender(id, blockArray, i);
            //})
        }
    }


    function addBlocks_gender(id, noOfBlocks, data_gender, blockArray) {
        for (b = 0; b < noOfBlocks; b++) {
            // blockArray.push('<div class="block type' + i + '">' + '<p>' + data[i][0] + '</p></div>');
            blockArray.push('<div class="block type_gender' + i + ' data-index=' + data_gender[i][0] + '">' + '</div>');
            // $(id).append('<div class="block type'+i+'"><p>'+ data[i][0] +'</p></div>');
        }
        return blockArray;
    }

});


// var $block = document.getElementByClassName('block');
// $(".block").hover(function() { console.log($(this).dataset.index); });

(function() {

    var width = 600;
    var height = 350;
    var margin = 50;
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
                return "translate(" + [(0 + margin), yScale(i)] + ")";
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

        var labels2 = $bars_age.selectAll("text.labels2")
            .data(data, function(d) {
                return d.gender_age
            });


        // everything gets a class and a text field.  But we assign attributes in the transition.
        labels.enter()
            .append("text")
            .attr("class", "labels");
        labels.exit()
            .remove();

        labels2.enter()
            .append("text")
            .attr("class", "labels2");
        labels2.exit()
            .remove();


        labels.transition()
            .duration(500)
            .attr("transform", function(d, i) {
                console.log(xScale(+d[column]) + 50);
                console.log(d[column]);
                return "translate(" + (xScale(+d[column]) + margin + 35) + "," + (yScale(i) + 4) + ")"
            })
            .text(function(d) {
                // console.log(column);
                if (column == "percentOpiodDeaths") {
                    return "(" + (d[column]) + "%)";
                } else {
                    return "(" + (d[column]) + ")";
                }
            })
            .attr("dy", "1.2em")
            .attr("dx", "5px")
            .attr("text-anchor", "end");

        labels2.transition()
            .duration(500)
            .attr("transform", function(d, i) {
                //return "translate(" + xScale(+d[column]) + "," + yScale(i) + ")"
                return "translate(" + 0 + "," + (yScale(i) + 5) + ")"
            })
            .text(function(d) { return d.age;}
            .attr("dy", "1.2em")
            .attr("dx", "5px")
            .attr("text-anchor", "start");


    } // end of draw function
})();
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
    height = parseInt(d3.select('#race_ethnicity_chart').style('height'), 10) - margin.top - margin.bottom;

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

var divtooltip_raceeth = d3.select("#race_ethnicity_chart").append("div").attr("class", "tooltip_raceeth");


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
    .attr("class", "x axis-race")
    .attr("transform", "translate(10," + height + ")")
    .call(xAxis_bars)
    .selectAll(".tick text")
    .call(wrap, x0.rangeBand());

$bars_race.append("g")
    .attr("class", "y axis-race")
    .call(yAxis_bars)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -35)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
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
        divtooltip_raceeth.style("display", "inline-block");
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
        divtooltip_raceeth.style("display", "none");
    });



var legend = $bars_race.selectAll(".legend")
    .data(options.slice())
    .enter().append("g")
    .attr("class", "legend")
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
