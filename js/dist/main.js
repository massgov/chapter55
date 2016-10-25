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
        event.preventDefault();
	var href = $(this).attr('href');
        $('html, body').stop().animate({
	    scrollTop: $(href).offset().top
	}, 750, function() {
	    window.location.hash = href;
	});
        event.preventDefault();
    });
});


$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var tab = $(e.target).attr('href');
  var newTabHeight = document.querySelector(tab).clientHeight;
  $(tab).parent().animate({ height: newTabHeight });
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



/////////////////////////////Pills

$('.pills-first a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
});


/////////////////////////////SVG Infographic
$(function() {
    $("#odInfographic").load('img/human1.svg', function(response) {
        var $svg = $(this).find('svg');
        // $svg.attr("preserveAspectRatio", "xMinYMin meet");
        var val_svg = '2/3';
        asignVal_svg(val_svg);

        function asignVal_svg(val) {
            $('.btn-svg').removeClass('active');
            $('.btn-svg[value="' + val + '"]').addClass('active');
            if (val == '1/12') {
                $('.svg-studyperiod').attr("opacity", 0);
                $('.svg-onemonth').attr("opacity", 1);
                $('#odInfographic_details').html('Only about '+ '<strong>1 in 12</strong>' +' people who died from opioids in 2013 and 2014 had an active opioid prescription a month before they died')
            } else {
                $('.svg-studyperiod').attr("opacity", 1);
                $('#odInfographic_details').html('About '+ '<strong>8 in 12</strong>' +' people who died from opioids in 2013 and 2014 had an opioid prescription at some point from 2011–2014')
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


// Fix widows (no words on own line at the end of a <p>)
$('p').each(function() {
    var innerHTML = $(this).html();
    var words = innerHTML.trim().split(' ');
    if(words.length > 2) {
        var potentialWidow = words[words.length-1];
        var newWords = words.slice(0,-1).join(' ');
        $(this).html(newWords+'&nbsp;'+potentialWidow);
    }
})

$('p' 'li').each(function() {
    var innerHTML = $(this).html();
    var words = innerHTML.trim().split(' ');
    if(words.length > 2) {
        var potentialWidow = words[words.length-1];
        var newWords = words.slice(0,-1).join(' ');
        $(this).html(newWords+'&nbsp;'+potentialWidow);
    }
})

//bold footnote on in text num click

var currElem = null; //will hold the element that is bold now

 function BoldText(elem) {
    //console.log(elem)
    //document.getElementById("footnote-4")
 
  if (elem != currElem) { //do thing if you're clicking on a bold link

   if (currElem) //if a link bold right now unbold it

    currElem.style.fontWeight='lighter';

   currElem = elem; //assign this element as the current one

   elem.style.fontWeight='bolder';  //make the element clicked bold
 
  }

 }
var Vis = (function(d3) {
    "use strict";

    var visualizationWrapper = d3.select('#binaryMaps_maps');

    var geojson;
    queue()
        .defer(d3.json, 'js/data/TOWN.geo.json')
        .defer(d3.json, 'js/data/rate_5yr_odc.json')
        .await(visualize);

    var width = 525,
        height = 325;

    var projection = d3.geo.conicConformal()
        .parallels([41 + 43 / 60, 42 + 41 / 60])
        .rotate([71 + 30 / 60, -41])
        .scale([8600])
        .translate([280, 360]);

    var $maps_sub = d3.select("#carte").append("svg")
        .attr("width", width)
        .attr("height", height);

    var colors_5yr = ["#d3d3d3", "#9ecae1", "#6baed6", "#2171b5", "#084594"];

    var path = d3.geo.path().projection(projection),
        palette = d3.scale.threshold().domain([0.1, 2.1, 6.1, 17.1, Infinity])
        //.range(["#d3d3d3", '#db8d8d', '#c54949', "#b71c1c", '#801313']);
        .range(colors_5yr);



    function visualize(error, states, data) {



        data.data.forEach(function(data, i) {
            var wrapper = visualizationWrapper.append('div').attr('class', 'map-wrapper').append('div');

            createMap(wrapper, states, data);
        });
    }



    function createMap(wrapper, geo, data) {

        wrapper.append('span')
            .text(function(d) {
                if (data.key == 2005) {
                    return '2001 to 2005';
                } else if (data.key == 2010) {
                    return '2006 to 2010';
                } else if (data.key == 2015) {
                    return '2011 to 2015';
                }
            })
            .attr('class', 'vis-title')
            .style('padding-bottom', "3%");




        wrapper.append('span')
            .text("")
            .attr('class', 'selection-label');

        var $maps_sub = wrapper
            .classed("svg-container", true) //container class to make it responsive
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + width + " " + height)
            //class to make it responsive
            .classed("svg-content-responsive", true);

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
		return d.properties.TOWN.toLowerCase()+' bsasmap';
            })
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

                if (data.values[geoData[0].properties.TOWN] > 0) {
                    town_value = d3.format(".1f")(data.values[geoData[0].properties.TOWN]);
                } else { town_value = "0"; }

                //console.log(town_value);

                self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = (geoData[0].properties.TOWN_1 + "<br>" + town_value) + " per 100,000";
                d3.select((self.node())).style('fill-opacity', 0.4).style("stroke", "white").style("stroke-width", "1.5px");
            })
            .on('unselect', function(self) {
                //     self.node().parentNode.parentNode.getElementsByTagName('p2')[0].innerHTML = "";
                //     d3.selectAll('#treatmentMaps_maps path').style({ 'fill-opacity': 1 }).style("stroke", "white").style("stroke-width", "0.0px");
                self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = "";
		d3.selectAll('path.bsasmap').style({
                    'fill-opacity': 1
                }).style("stroke", "white").style("stroke-width", "0.0px");
            })

        function notify(selector, eventName) {
            d3.selectAll(selector)[0].forEach(function(el, i) {
                var shape = d3.select(el);
                shape.on(eventName)(shape);
            });
        }

    }

    var opChgScale = d3.scale.threshold().domain([0.1, 2.1, 6.1, 17.1, Infinity])
        //.range(["#d3d3d3", '#db8d8d', '#c54949', "#b71c1c", '#801313'])
        .range(colors_5yr);
    opChgScale.domainStrings = function() {
        return (['0', '>0-2.1', '>2.1-6.1', '>6.1-17.1', '>17.1']);
    };
    //popChgScale.domainStrings = function() { return (['< 0.1', '0.25-0.50', '0.50-0.75', '0.75-1.0', '1.0-1.25',
    //'1.25-1.50', '1.50-1.75', '1.75-2.0', '> 2.0']); };
    generateLegend_map_sub(opChgScale, 'binaryMaps_legend', 'Rate per 100,000 People');

    function generateLegend_map_sub(scale, szDivId, szCaption) {

        var legendHeight = 60,
            legendWidth = '90%';



        var $maps_sub_svg = d3.select('#' + szDivId).append("svg")
            .attr("width", legendWidth)
            .attr("height", legendHeight);

        var $maps_sub_legends = $maps_sub_svg.append("g");

        // Create data array.
        var legendData = [];
        // legendData.push({
        //     d: -9999,
        //     r: '#f1f1f1',
        //     s: 'N/A*'
        // });
        for (var i = 0; i < scale.domain().length; i++) {
            legendData.push({
                d: scale.domain()[i],
                r: scale.range()[i],
                s: scale.domainStrings()[i]
            });
        }
        var unitWidth = 100 / legendData.length;

        $maps_sub_legends.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", legendHeight / 3)
            .attr("width", function(d, i) {
                return unitWidth + '%';
            })
            .attr("x", function(d, i) {
                return (i * unitWidth) + '%';
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
            .attr('text-anchor', 'middle')
            .attr("x", function(d, i) {
                return (i * unitWidth) + (unitWidth / 2) + '%';
            })
            .attr("y", 55)
            .text(function(d, i) {
                return d.s;
            });

        $maps_sub_legends.append("text")
            .attr("class", "vis-caption")
            .attr("y", 12)
            .text(szCaption);
    }



    $('.js-toggle-binary-map').click(function() {
        var date = $(this).data('date');
        $('#binaryMaps').attr('data-active-date', date);
        $('.js-toggle-binary-map').removeClass('active');
        $(this).addClass('active');
    });

})(d3);
console.log("file loaded - binary")

var Vis = (function(d3) {
    "use strict";

    var visualizationWrapper = d3.select('#treatmentMaps_maps');

    var geojson;
    queue()
        .defer(d3.json, 'js/data/TOWN.geo.json')
        .defer(d3.json, 'js/data/maps_susbtance_data.json')
        .await(visualize);

    var width = 525,
        height = 325;

    var projection = d3.geo.conicConformal()
        .parallels([41 + 43 / 60, 42 + 41 / 60])
        .rotate([71 + 30 / 60, -41])
        .scale([7500])
        .translate([280, 330]);

    var $maps_sub = d3.select("#carte").append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path().projection(projection),
        palette = d3.scale.threshold().domain([-0.1, 0.01, 0.14, 0.24, 0.33, 0.46, 1.1])
        .range(['#d1d1d1','#d0d1e6','#a6bddb','#67a9cf','#3690c0','#02818a','#016450']);



    function visualize(error, states, data) {



        data.data.forEach(function(data, i) {
            var wrapper = visualizationWrapper.append('div').attr('class', 'map-wrapper').append('div');

            createMap(wrapper, states, data);
        });
    }

    //console.log(geo.features)


    function createMap(wrapper, geo, data) {

        wrapper.append('span')
            .text(data.key)
            .attr('class', 'vis-title');
        wrapper.append('span')
            .text("")
            .attr('class', 'selection-label');

        var $maps_sub = wrapper
            .classed("svg-container", true) //container class to make it responsive
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + width + " " + height)
            //class to make it responsive
            .classed("svg-content-responsive", true);

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
        return d.properties.TOWN.toLowerCase() + ' bsasmap';
            })
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

                if (data.values[geoData[0].properties.TOWN] >= 0) {
                    //console.log(data.values[geoData[0].properties.TOWN] == 'Null');
                    town_value = d3.format("%,.2f")(data.values[geoData[0].properties.TOWN]);
                } else {
                    //console.log(data.values[geoData[0].properties.TOWN])
            town_value = "N/A";
                };

                //console.log(town_value);

                self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = (geoData[0].properties.TOWN_1 + ":  " + town_value);
                d3.select((self.node())).style('fill-opacity', 0.4).style("stroke", "white").style("stroke-width", "1.5px");
                //console.log(geoData[0].properties);
            })
            .on('unselect', function(self) {
                //     self.node().parentNode.parentNode.getElementsByTagName('p2')[0].innerHTML = "";
                //     d3.selectAll('#treatmentMaps_maps path').style({ 'fill-opacity': 1 }).style("stroke", "white").style("stroke-width", "0.0px");
                self.node().parentNode.parentNode.getElementsByClassName('selection-label')[0].innerHTML = "";
        d3.selectAll('path.bsasmap').style({
                    'fill-opacity': 1
                }).style("stroke", "white").style("stroke-width", "0.0px");
            })

        function notify(selector, eventName) {
            d3.selectAll(selector)[0].forEach(function(el, i) {
                var shape = d3.select(el);
                shape.on(eventName)(shape);
            });
        }

    }

    var opChgScale = d3.scale.threshold().domain([0, 0.1, 0.15, 0.35, 0.6, 1.00]).range(['#d0d1e6','#a6bddb','#67a9cf','#3690c0','#02818a','#016450'])
    opChgScale.domainStrings = function() {
        return (['0%', '>0-14%', '>14-24%', '>24-33%', '>33-46%', '>46-100%'
        ]);
    };
    //popChgScale.domainStrings = function() { return (['< 0.1', '0.25-0.50', '0.50-0.75', '0.75-1.0', '1.0-1.25',
    //'1.25-1.50', '1.50-1.75', '1.75-2.0', '> 2.0']); };
    generateLegend_map_sub(opChgScale, 'treatmentMaps_legend', 'Heroin Primary Substance of Abuse upon Seeking Treatment (%)');

    function generateLegend_map_sub(scale, szDivId, szCaption) {
        var width = 550,
            height = 70;

        var $maps_sub_svg = d3.select('#' + szDivId).append("svg")
            .attr("width", "100%")
            .attr("height", height);

        var $maps_sub_legends = $maps_sub_svg.append("g");

        // Create data array.
        var legendData = [];
        legendData.push({
            d: -9999,
            r: '#d1d1d1',
        s: 'N/A*'
        });
        var i;
        for (i = 0; i < scale.domain().length; i++) {
            legendData.push({
                d: scale.domain()[i],
                r: scale.range()[i],
                s: scale.domainStrings()[i]
            });
        }

        $maps_sub_legends.selectAll("rect")
            .data(legendData)
            .enter().append("rect")
            .attr("height", 20)
            .attr("width", 60)
            .attr("x", function(d, i) {
                return (i * (100 / legendData.length)) + "%";
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
            .attr('text-anchor', 'middle')
            .attr("x", function(d, i) {
                return ((i * (100 / legendData.length)) + 7) + "%";
            })
            .attr("y", 55)
            .text(function(d, i) {
                return d.s;
            });

        $maps_sub_legends.append("text")
            .attr("class", "vis-caption")
            .attr("y", 12)
            .text(szCaption);
    }



    $('.js-toggle-treatment-map').click(function() {
        var date = $(this).data('date');
        $('#treatmentMaps').attr('data-active-date', date);
        $('.js-toggle-treatment-map').removeClass('active');
        $(this).addClass('active');
    });

})(d3);

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

        //console.log("events", d3.event.offsetX, d3.event.layerY/2);
        //console.log("d3.events", d3.event);
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
      top: 10, // space for the legend
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
        //return 0.6
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
    	.call(xAxis2_fent);

    var x_axis2_text = x_axis2
    	.append("text")
    	.attr("x", (width - margin.left)/2)
    	.attr("y", margin.bottom - 32)
    	.attr("dy", "1em")
    	.attr("class", "vis-x-axis-label")
    	.text("Quarter");


    var y_axis = $lines_fent.append("g")
    	.attr("class", "vis-y-axis")
    	.call(yAxis_fent)
      //.append("tspan")
      .append("text")
    	.attr("x", -(height/2))
    	.attr("y", -44)
    	.attr("dy", "1em")
    	.attr("class", "vis-y-axis-label")
    	.text("Percent of Opioid Deaths");
      //.html("<sup>1</sup>");

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
      .attr("x", (width - margin.left)/2)
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

      $legend.attr("class", "vis-legend").attr("transform", "translate("+(width-margin.right*10)+",0)");
    }

    function updateWidth(componentWidth) {
      wrapper_width = componentWidth;
      width = wrapper_width - margin.left - margin.right;
      height = wrapper_height - margin.top - margin.bottom;
    }

    var $legend = $svg.append("g");
    var $item = $legend.append("g");

    function renderLegend() {


      var legendItems = [
        "FentanylHeroin",
        "Fentanyl",
        "Heroin",
        "Methadone"
      ];
      var legendItemsTranslate = [
        "Both Fentanyl & Heroin",
        "Only Fentanyl",
        "Only Heroin",
        "Only Methadone"
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
    //window.addEventListener('resize', renderLegend);



})();

/* global d3*/
(function() {
    var rootNode = document.querySelector('#lines-bsas');
    var town_names = {
        //"massachusetts" : "Massachusetts",
        "abington": "Abington",
        "acton": "Acton",
        "acushnet": "Acushnet",
        "adams": "Adams",
        "agawam": "Agawam",
        "alford": "Alford",
        "amesbury": "Amesbury",
        "amherst": "Amherst",
        "andover": "Andover",
        "aquinnah": "Aquinnah",
        "arlington": "Arlington",
        "ashburnham": "Ashburnham",
        "ashby": "Ashby",
        "ashfield": "Ashfield",
        "ashland": "Ashland",
        "athol": "Athol",
        "attleboro": "Attleboro",
        "auburn": "Auburn",
        "avon": "Avon",
        "ayer": "Ayer",
        "barnstable": "Barnstable",
        "barre": "Barre",
        "becket": "Becket",
        "bedford": "Bedford",
        "belchertown": "Belchertown",
        "bellingham": "Bellingham",
        "belmont": "Belmont",
        "berkley": "Berkley",
        "berlin": "Berlin",
        "bernardston": "Bernardston",
        "beverly": "Beverly",
        "billerica": "Billerica",
        "blackstone": "Blackstone",
        "blandford": "Blandford",
        "bolton": "Bolton",
        "boston": "Boston",
        "bourne": "Bourne",
        "boxborough": "Boxborough",
        "boxford": "Boxford",
        "boylston": "Boylston",
        "braintree": "Braintree",
        "brewster": "Brewster",
        "bridgewater": "Bridgewater",
        "brimfield": "Brimfield",
        "brockton": "Brockton",
        "brookfield": "Brookfield",
        "brookline": "Brookline",
        "buckland": "Buckland",
        "burlington": "Burlington",
        "cambridge": "Cambridge",
        "canton": "Canton",
        "carlisle": "Carlisle",
        "carver": "Carver",
        "charlemont": "Charlemont",
        "charlton": "Charlton",
        "chatham": "Chatham",
        "chelmsford": "Chelmsford",
        "chelsea": "Chelsea",
        "cheshire": "Cheshire",
        "chester": "Chester",
        "chesterfield": "Chesterfield",
        "chicopee": "Chicopee",
        "chilmark": "Chilmark",
        "clarksburg": "Clarksburg",
        "clinton": "Clinton",
        "cohasset": "Cohasset",
        "colrain": "Colrain",
        "concord": "Concord",
        "conway": "Conway",
        "cummington": "Cummington",
        "dalton": "Dalton",
        "danvers": "Danvers",
        "dartmouth": "Dartmouth",
        "dedham": "Dedham",
        "deerfield": "Deerfield",
        "dennis": "Dennis",
        "dighton": "Dighton",
        "douglas": "Douglas",
        "dover": "Dover",
        "dracut": "Dracut",
        "dudley": "Dudley",
        "dunstable": "Dunstable",
        "duxbury": "Duxbury",
        "eastbridgewater": "East Bridgewater",
        "eastbrookfield": "East Brookfield",
        "eastham": "Eastham",
        "easthampton": "Easthampton",
        "eastlongmeadow": "East Longmeadow",
        "easton": "Easton",
        "edgartown": "Edgartown",
        "egremont": "Egremont",
        "erving": "Erving",
        "essex": "Essex",
        "everett": "Everett",
        "fairhaven": "Fairhaven",
        "fallriver": "Fall River",
        "falmouth": "Falmouth",
        "fitchburg": "Fitchburg",
        "florida": "Florida",
        "foxborough": "Foxborough",
        "framingham": "Framingham",
        "franklin": "Franklin",
        "freetown": "Freetown",
        "gardner": "Gardner",
        "georgetown": "Georgetown",
        "gill": "Gill",
        "gloucester": "Gloucester",
        "goshen": "Goshen",
        "gosnold": "Gosnold",
        "grafton": "Grafton",
        "granby": "Granby",
        "granville": "Granville",
        "greatbarrington": "Great Barrington",
        "greenfield": "Greenfield",
        "groton": "Groton",
        "groveland": "Groveland",
        "hadley": "Hadley",
        "halifax": "Halifax",
        "hamilton": "Hamilton",
        "hampden": "Hampden",
        "hancock": "Hancock",
        "hanover": "Hanover",
        "hanson": "Hanson",
        "hardwick": "Hardwick",
        "harvard": "Harvard",
        "harwich": "Harwich",
        "hatfield": "Hatfield",
        "haverhill": "Haverhill",
        "hawley": "Hawley",
        "heath": "Heath",
        "hingham": "Hingham",
        "hinsdale": "Hinsdale",
        "holbrook": "Holbrook",
        "holden": "Holden",
        "holland": "Holland",
        "holliston": "Holliston",
        "holyoke": "Holyoke",
        "hopedale": "Hopedale",
        "hopkinton": "Hopkinton",
        "hubbardston": "Hubbardston",
        "hudson": "Hudson",
        "hull": "Hull",
        "huntington": "Huntington",
        "ipswich": "Ipswich",
        "kingston": "Kingston",
        "lakeville": "Lakeville",
        "lancaster": "Lancaster",
        "lanesborough": "Lanesborough",
        "lawrence": "Lawrence",
        "lee": "Lee",
        "leicester": "Leicester",
        "lenox": "Lenox",
        "leominster": "Leominster",
        "leverett": "Leverett",
        "lexington": "Lexington",
        "leyden": "Leyden",
        "lincoln": "Lincoln",
        "littleton": "Littleton",
        "longmeadow": "Longmeadow",
        "lowell": "Lowell",
        "ludlow": "Ludlow",
        "lunenburg": "Lunenburg",
        "lynn": "Lynn",
        "lynnfield": "Lynnfield",
        "malden": "Malden",
        "manchester": "Manchester",
        "mansfield": "Mansfield",
        "marblehead": "Marblehead",
        "marion": "Marion",
        "marlborough": "Marlborough",
        "marshfield": "Marshfield",
        "mashpee": "Mashpee",
        "mattapoisett": "Mattapoisett",
        "maynard": "Maynard",
        "medfield": "Medfield",
        "medford": "Medford",
        "medway": "Medway",
        "melrose": "Melrose",
        "mendon": "Mendon",
        "merrimac": "Merrimac",
        "methuen": "Methuen",
        "middleborough": "Middleborough",
        "middlefield": "Middlefield",
        "middleton": "Middleton",
        "milford": "Milford",
        "millbury": "Millbury",
        "millis": "Millis",
        "millville": "Millville",
        "milton": "Milton",
        "monroe": "Monroe",
        "monson": "Monson",
        "montague": "Montague",
        "monterey": "Monterey",
        "montgomery": "Montgomery",
        "mountwashington": "Mount Washington",
        "nahant": "Nahant",
        "nantucket": "Nantucket",
        "natick": "Natick",
        "needham": "Needham",
        "newashford": "New Ashford",
        "newbedford": "New Bedford",
        "newbraintree": "New Braintree",
        "newbury": "Newbury",
        "newburyport": "Newburyport",
        "newmarlborough": "New Marlborough",
        "newsalem": "New Salem",
        "newton": "Newton",
        "norfolk": "Norfolk",
        "northadams": "North Adams",
        "northampton": "Northampton",
        "northandover": "North Andover",
        "northattleborough": "North Attleborough",
        "northborough": "Northborough",
        "northbridge": "Northbridge",
        "northbrookfield": "North Brookfield",
        "northfield": "Northfield",
        "northreading": "North Reading",
        "norton": "Norton",
        "norwell": "Norwell",
        "norwood": "Norwood",
        "oakbluffs": "Oak Bluffs",
        "oakham": "Oakham",
        "orange": "Orange",
        "orleans": "Orleans",
        "otis": "Otis",
        "oxford": "Oxford",
        "palmer": "Palmer",
        "paxton": "Paxton",
        "peabody": "Peabody",
        "pelham": "Pelham",
        "pembroke": "Pembroke",
        "pepperell": "Pepperell",
        "peru": "Peru",
        "petersham": "Petersham",
        "phillipston": "Phillipston",
        "pittsfield": "Pittsfield",
        "plainfield": "Plainfield",
        "plainville": "Plainville",
        "plymouth": "Plymouth",
        "plympton": "Plympton",
        "princeton": "Princeton",
        "provincetown": "Provincetown",
        "quincy": "Quincy",
        "randolph": "Randolph",
        "raynham": "Raynham",
        "reading": "Reading",
        "rehoboth": "Rehoboth",
        "revere": "Revere",
        "richmond": "Richmond",
        "rochester": "Rochester",
        "rockland": "Rockland",
        "rockport": "Rockport",
        "rowe": "Rowe",
        "rowley": "Rowley",
        "royalston": "Royalston",
        "russell": "Russell",
        "rutland": "Rutland",
        "salem": "Salem",
        "salisbury": "Salisbury",
        "sandisfield": "Sandisfield",
        "sandwich": "Sandwich",
        "saugus": "Saugus",
        "savoy": "Savoy",
        "scituate": "Scituate",
        "seekonk": "Seekonk",
        "sharon": "Sharon",
        "sheffield": "Sheffield",
        "shelburne": "Shelburne",
        "sherborn": "Sherborn",
        "shirley": "Shirley",
        "shrewsbury": "Shrewsbury",
        "shutesbury": "Shutesbury",
        "somerset": "Somerset",
        "somerville": "Somerville",
        "southampton": "Southampton",
        "southborough": "Southborough",
        "southbridge": "Southbridge",
        "southhadley": "South Hadley",
        "southwick": "Southwick",
        "spencer": "Spencer",
        "springfield": "Springfield",
        "sterling": "Sterling",
        "stockbridge": "Stockbridge",
        "stoneham": "Stoneham",
        "stoughton": "Stoughton",
        "stow": "Stow",
        "sturbridge": "Sturbridge",
        "sudbury": "Sudbury",
        "sunderland": "Sunderland",
        "sutton": "Sutton",
        "swampscott": "Swampscott",
        "swansea": "Swansea",
        "taunton": "Taunton",
        "templeton": "Templeton",
        "tewksbury": "Tewksbury",
        "tisbury": "Tisbury",
        "tolland": "Tolland",
        "topsfield": "Topsfield",
        "townsend": "Townsend",
        "truro": "Truro",
        "tyngsborough": "Tyngsborough",
        "tyringham": "Tyringham",
        "upton": "Upton",
        "uxbridge": "Uxbridge",
        "wakefield": "Wakefield",
        "wales": "Wales",
        "walpole": "Walpole",
        "waltham": "Waltham",
        "ware": "Ware",
        "wareham": "Wareham",
        "warren": "Warren",
        "warwick": "Warwick",
        "washington": "Washington",
        "watertown": "Watertown",
        "wayland": "Wayland",
        "webster": "Webster",
        "wellesley": "Wellesley",
        "wellfleet": "Wellfleet",
        "wendell": "Wendell",
        "wenham": "Wenham",
        "westborough": "Westborough",
        "westboylston": "West Boylston",
        "westbridgewater": "West Bridgewater",
        "westbrookfield": "West Brookfield",
        "westfield": "Westfield",
        "westford": "Westford",
        "westhampton": "Westhampton",
        "westminster": "Westminster",
        "westnewbury": "West Newbury",
        "weston": "Weston",
        "westport": "Westport",
        "westspringfield": "West Springfield",
        "weststockbridge": "West Stockbridge",
        "westtisbury": "West Tisbury",
        "westwood": "Westwood",
        "weymouth": "Weymouth",
        "whately": "Whately",
        "whitman": "Whitman",
        "wilbraham": "Wilbraham",
        "williamsburg": "Williamsburg",
        "williamstown": "Williamstown",
        "wilmington": "Wilmington",
        "winchendon": "Winchendon",
        "winchester": "Winchester",
        "windsor": "Windsor",
        "winthrop": "Winthrop",
        "woburn": "Woburn",
        "worcester": "Worcester",
        "worthington": "Worthington",
        "wrentham": "Wrentham",
        "yarmouth": "Yarmouth"
    };
    var current_town = "massachusetts";

    var margin = {
            top: 0,
            right: 25,
            bottom: 35,
            left: 45
        },
        wrapper_width = rootNode.clientWidth,
        wrapper_height = 400,
        width = wrapper_width - margin.left - margin.right,
        height = wrapper_height - margin.top - margin.bottom;

    var bisectAge = d3.bisector(function(d) {
        return d.age;
    }).left;
    var percent = d3.format(',.0%');
    var yearformat = d3.format("d");
    // var min_age = 2005;
    // var fields = ['emp', 'edu', 'race', 'orig'];
    var groups = {};

    var x = d3.scale.linear();

    var y = d3.scale.linear();

    var color = d3.scale.category10();

    var xAxis_bsas = d3.svg.axis();

    var yAxis_bsas = d3.svg.axis();

    var line = d3.svg.line();


    var $svg = d3.select("#lines-bsas").append("svg");

    var $lines_bsas = $svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var $x_axis = $lines_bsas.append("g").attr("class", "vis-x-axis");
    $x_axis
        .append("text")
        .attr("x", 635)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("Year");

    var $y_axis = $lines_bsas.append("g").attr("class", "vis-y-axis");
    $y_axis.append("text");

    var $lines_bsas_x_axis_label = $x_axis.append("text");
    var $lines_bsas_y_axis_label = $y_axis.append("text");

    var legend_pos_text = -60,
        legend_pos_dot = -70;
    var $legend = {
        opioids: {},
        alcohol: {},
        marijuana: {},
        other: {},
        none: {}
    };

    setupLegend();

    var $lines = {};

    var $eventOverlay = $lines_bsas.append("rect").attr("class", "overlay");






    function render() {
        updateWidth(rootNode.clientWidth);

        $svg.attr("width", wrapper_width).attr("height", wrapper_height);
        x.range([0, width]);
        y.range([height, 0]);

        xAxis_bsas
            .scale(x)
            .tickFormat(yearformat)
            .ticks((width < 500 ? 4 : 10))
            .orient("bottom")
            .outerTickSize(0);

        yAxis_bsas
            .scale(y)
            .tickSize(width)
            .orient("right")
            .tickFormat(percent);



        line.x(function(d) {
                return x(d.age);
            })
            .y(function(d) {
                return y(d.value);
            })
            .defined(function(d) {
                return y(d.value);
            }); // Omit empty values.

        $x_axis.attr("transform", "translate(0," + height + ")").call(xAxis_bsas);
        $y_axis.call(yAxis_bsas);
        $lines_bsas.selectAll(".vis-y-axis .tick text").attr("x", -5).attr("dy", 0).style("text-anchor", "end");
        $eventOverlay.attr("width", width).attr("height", height);


        $lines_bsas_x_axis_label
            .attr("x", (width - margin.left)/2)
            .attr("y", (margin.bottom) / 2)
            .attr("dy", "1em")
            .attr("class", "vis-x-axis-label")
            .text("Fiscal Year");


        $lines_bsas_y_axis_label
            .attr("x", -(height - margin.top)/2)
            .attr("y", -margin.left)
            .attr("dy", "1em")
            .attr("class", "vis-y-axis-label")
            .text("Percent Primary Substance of Use");



        renderLegend();
        renderLines();
        updateDots();
    }


    function updateWidth(w) {
        wrapper_width = w;
        width = wrapper_width - margin.left - margin.right;
    }

    function setupLegend() {
        $legend.opioids.circle = $lines_bsas.append("circle").attr("class", "circle opioids").attr("r", 3);
        $legend.opioids.text = $lines_bsas.append("g").append("text").attr("class", "focus opioids").text("opioids");
        $legend.alcohol.circle = $lines_bsas.append("circle").attr("class", "circle alcohol").attr("r", 3);
        $legend.alcohol.text = $lines_bsas.append("g").append("text").attr("class", "focus alcohol").text("alcohol");
        $legend.marijuana.circle = $lines_bsas.append("circle").attr("class", "circle marijuana").attr("r", 3);
        $legend.marijuana.text = $lines_bsas.append("g").append("text").attr("class", "focus marijuana").text("marijuana");
        $legend.other.circle = $lines_bsas.append("circle").attr("class", "circle other").attr("r", 3);
        $legend.other.text = $lines_bsas.append("g").append("text").attr("class", "focus other").text("other");
        //$legend.none.circle = $lines_bsas.append("circle").attr("class", "circle none").attr("r", 3);
        //$legend.none.text = $lines_bsas.append("g").append("text").attr("class", "focus none").text("none");
    }

    function renderLegend() {
        var top_offset = 0;
        var line_height = 15;
        $legend.opioids.circle.attr("cx", width + legend_pos_dot).attr("cy", top_offset + (1 * line_height));
        $legend.opioids.text.attr("x", width + legend_pos_text).attr("y", top_offset + (1 * line_height) + 3);
        $legend.alcohol.circle.attr("cx", width + legend_pos_dot).attr("cy", top_offset + (2 * line_height));
        $legend.alcohol.text.attr("x", width + legend_pos_text).attr("y", top_offset + (2 * line_height) + 3);
        $legend.marijuana.circle.attr("cx", width + legend_pos_dot).attr("cy", top_offset + (3 * line_height));
        $legend.marijuana.text.attr("x", width + legend_pos_text).attr("y", top_offset + (3 * line_height) + 3);
        $legend.other.circle.attr("cx", width + legend_pos_dot).attr("cy", top_offset + (4 * line_height));
        $legend.other.text.attr("x", width + legend_pos_text).attr("y", top_offset + (4 * line_height) + 3);
        //$legend.none.circle.attr("cx", width + legend_pos_dot).attr("cy", top_offset + (5 * line_height));
        //$legend.none.text.attr("x", width + legend_pos_text).attr("y", top_offset + (5 * line_height) + 3);
    }

    function setupLines() {
        $lines.alcohol = $lines_bsas.append("path").attr("class", "line alcohol").attr("pointer-events", "none");
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
                    .attr("pointer-events", "none");
            }
        }

        $lines.marijuana = $lines_bsas.append("path").attr("class", "line marijuana").attr("pointer-events", "none");
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
                    .attr("pointer-events", "none");
            }
        }

        // $lines.none = $lines_bsas.append("path").attr("class", "line none").attr("pointer-events", "none");
        // for (i = 0; i < groups[current_town + "none"].values.length; i++) {

        //     var x_circle_alcohol = groups[current_town + "none"].values[i].age;
        //     var y_circle_alcohol = groups[current_town + "none"].values[i].value;

        //     if (y_circle_alcohol >= 0) {

        //         //console.log(groups[current_town+"alcohol"].values[i].age);
        //         //console.log("circle none y" + groups[current_town + "none"].values[i].age)

        //         $lines_bsas.append("circle")
        //             .attr("class", function(d) {
        //                 return "circle none y" + groups[current_town + "none"].values[i].age
        //             })
        //             .attr("cx", x(groups[current_town + "none"].values[i].age))
        //             .attr("cy", y(groups[current_town + "none"].values[i].value))
        //             .attr("r", 3)
        //             .attr("pointer-events", "none");
        //     }
        // }

        $lines.opioids = $lines_bsas.append("path").attr("class", "line opioids").attr("pointer-events", "none");
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
                    .attr("pointer-events", "none");
            }
        }

        $lines.other = $lines_bsas.append("path").attr("class", "line other").attr("pointer-events", "none");
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
                    .attr("pointer-events", "none");
            }
        }
    }


    function renderLines() {
        $lines.alcohol.attr("d", function(d) {
            return line(groups[current_town + "alcohol"].values);
        });
        $lines.opioids.attr("d", function(d) {
            return line(groups[current_town + "opioids"].values);
        });
        $lines.marijuana.attr("d", function(d) {
            return line(groups[current_town + "marijuana"].values);
        });
        $lines.other.attr("d", function(d) {
            return line(groups[current_town + "other"].values);
        });
        // $lines.none.attr("d", function(d) {
        //     return line(groups[current_town + "none"].values);
        // });
    }



    function updateDots() {

        // marriages = groups[current_town];
        //update alcohol line
        $lines_bsas.select(".line.alcohol")
            .transition()
            .duration(1000)
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
                    .duration(1000)
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
                    .duration(1000)
                    .attr("r", 0)
            }

        }



        //marijuana
        $lines_bsas.select(".line.marijuana")
            .transition()
            .duration(1000)
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
                    .duration(1000)
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
                    .duration(1000)
                    .attr("r", 0)
            }

        }

        //none
        // $lines_bsas.select(".line.none")
        //     .transition()
        //     .duration(1000)
        //     .attr("d", function(d) {
        //         return line(groups[current_town + "none"].values);
        //     });
        // //update none circles
        // for (i = 0; i < groups[current_town + "none"].values.length; i++) {


        //     var string_select = ".circle.none.y" + groups[current_town + "none"].values[i].age
        //     var value_select = groups[current_town + "none"].values[i].value
        //         // console.log(string_select);
        //         // console.log(value_select);
        //         // console.log(value_select >= 0);

        //     if (groups[current_town + "none"].values[i].value >= 0) {
        //         $lines_bsas.selectAll(string_select)
        //             .transition()
        //             .duration(1000)
        //             .attr("cx", function(d) {
        //                 return x(groups[current_town + "none"].values[i].age)
        //             })
        //             .attr("cy", function(d) {
        //                 return y(groups[current_town + "none"].values[i].value)
        //             })
        //             .attr("r", 3);
        //     } else {
        //         $lines_bsas.selectAll(string_select)
        //             .transition()
        //             .duration(1000)
        //             .attr("r", 0);
        //     }

        // }

        //opioids
        $lines_bsas.select(".line.opioids")
            .transition()
            .duration(1000)
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
                    .duration(1000)
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
                    .duration(1000)
                    .attr("r", 0);
            }

        }

        //other
        $lines_bsas.select(".line.other")
            .transition()
            .duration(1000)
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
                    .duration(1000)
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
                    .duration(1000)
                    .attr("r", 0);
            }

        }

    }





    d3.csv("js/data/bsas-data-2000to2015.csv", type, function(error, data) {
        if (error) throw error;
        //console.log(groups);
        // var marriages = groups[current_town];

        x.domain([2000, d3.max(data, function(d) {
            return d.age;
        })]);
        y.domain([0, 1.00]);

        setupLines();
        render();
        window.addEventListener('resize', render);



        // Autocomplete

        $(".btn-bsas").addClass('active');
        d3.selectAll(".btn-bsas").on("click", function() {
            current_town = d3.select(this).attr("data-val");
            updateDots();
            d3.select(this).classed('active', true);
            $("#tags").val('');
        });



        $("#tags").autocomplete({
            source: function(request, response) {
                //console.log(town_names);
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
                //     updateDots();
                // }
                //});
                //console.log(matches);
            },
            select: function(event, ui) {
                $.each(town_names, function(key, value) {
                    if (value === ui.item.value) {
                        current_town = key;
                        console.log(value)
                    }
                });


                $(".btn-bsas").removeClass('active');
                updateDots();
            }
        });




        // alcohol
        var focusalcohol = $lines_bsas.append("g")
            .attr("class", "focus alcohol")
            .style("display", "none");
        focusalcohol.append("circle")
            .attr("pointer-events", "none")
            .attr("r", 3);
        focusalcohol.append("text")
            .attr("pointer-events", "none")
            .attr("x", 9)
            .attr("dy", ".35em");

        // marijuana
        var focusmarijuana = $lines_bsas.append("g")
            .attr("class", "focus marijuana")
            .style("display", "none");
        focusmarijuana.append("circle")
            .attr("pointer-events", "none")
            .attr("r", 3);
        focusmarijuana.append("text")
            .attr("pointer-events", "none")
            .attr("x", 9)
            .attr("dy", ".35em");

        // none
        // var focusnone = $lines_bsas.append("g")
        //     .attr("class", "focus none")
        //     .style("display", "none");
        // focusnone.append("circle")
        //     .attr("pointer-events", "none")
        //     .attr("r", 3);
        // focusnone.append("text")
        //     .attr("pointer-events", "none")
        //     .attr("x", 9)
        //     .attr("dy", ".35em");

        // opioids
        var focusopioids = $lines_bsas.append("g")
            .attr("class", "focus opioids")
            .style("display", "none");
        focusopioids.append("circle")
            .attr("pointer-events", "none")
            .attr("r", 3);
        focusopioids.append("text")
            .attr("pointer-events", "none")
            .attr("x", 9)
            .attr("dy", ".35em");

        // none
        var focusother = $lines_bsas.append("g")
            .attr("class", "focus other")
            .style("display", "none");
        focusother.append("circle")
            .attr("pointer-events", "none")
            .attr("r", 3);
        focusother.append("text")
            .attr("pointer-events", "none")
            .attr("x", 9)
            .attr("dy", ".35em");

        // Events
        $eventOverlay
            .on("mouseover", function() {
                focusmarijuana.style("display", null);
                focusalcohol.style("display", null);
                //focusnone.style("display", null);
                focusopioids.style("display", null);
                focusother.style("display", null);
                //focusage.style("display", null);
            })
            .on("mouseout", function() {
                focusmarijuana.style("display", "none");
                focusalcohol.style("display", "none");
                //focusnone.style("display", "none");
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
                focusalcohol.select("text").text(percent(d_alcohol.value)).attr('transform', "translate(-28,0)");
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
                focusmarijuana.select("text").text(percent(d_marijuana.value)).attr('transform', "translate(-28,0)");
                focusmarijuana.select("circle").attr("r", 4);
            } else {
                focusmarijuana.select("circle").attr("r", 0);
                focusmarijuana.select("text").text("");
            }

            // None

            // var i_none = bisectAge(groups[current_town + "none"].values, x0, 1),
            //     d0_none = groups[current_town + "none"].values[i_none - 1],
            //     d1_none = groups[current_town + "none"].values[i_none],
            //     d_none = x0 - d0_none.age > d1_none.age - x0 ? d1_none : d0_none;

            // if (d_none.value >= 0) {
            //     focusnone.attr("transform", "translate(" + x(d_none.age) + "," + y(d_none.value) + ")");
            //     focusnone.select("text").text(percent(d_none.value));
            //     focusnone.select("circle").attr("r", 4);
            // } else {
            //     focusnone.select("circle").attr("r", 0);
            //     focusnone.select("text").text("");
            // }


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
                //focusnone.select("text").attr("x", 3).attr("y", -7).attr("text-anchor", "beginning");
                focusopioids.select("text").attr("x", 3).attr("y", -7).attr("text-anchor", "beginning");
                focusother.select("text").attr("x", 3).attr("y", -7).attr("text-anchor", "beginning");
            } else {
                focusalcohol.select("text").attr("x", 10).attr("text-anchor", "beginning");
                focusmarijuana.select("text").attr("x", 10).attr("text-anchor", "beginning");
                //focusnone.select("text").attr("x", 10).attr("text-anchor", "beginning");
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




})();

function opioidsY2000(d, i) {
            d3.select(".circle.opioids.y2015").attr("r", 3).style("fill-opacity", 0.75).style("stroke-width", "0");
            d3.select(".circle.opioids.y2000").attr("r", 15).style("fill-opacity", 0.9).style("stroke-width", "0").style("stroke", "#8e1014");
            d3.select(".btn-bsas").classed('active', true);
        };

        function opioidsY2015(d, i) {
            d3.select(".circle.opioids.y2000").attr("r", 3).style("fill-opacity", 0.75).style("stroke-width", "0");
            d3.select(".circle.opioids.y2015").attr("r", 15).style("fill-opacity", 0.9).style("stroke-width", "0").style("stroke", "#8e1014");
            d3.select(".btn-bsas").classed('active', true);
        };

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
        }],

        heroin = [{
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
        }],

        fentanyl = [{
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
        }],

        both = [{
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
        }],

        methadone = [{
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
        }],

        buprenorphine = [{
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
        }],

        dataset = [{
                data: [{
                    count: 867,
                    name: 'Heroin',
                    alias: heroin
                }],
                name: 'Heroin'
            }, {
                data: [{
                    count: 288,
                    name: 'Fentanyl',
                    alias: fentanyl
                }],
                name: 'Fentanyl'
            }, {
                data: [{
                    count: 249,
                    name: 'Fentanyl & Heroin',
                    alias: both
                }],
                name: 'Fentanyl & Heroin'
            }, {
                data: [{
                    count: 154,
                    name: 'Prescription Opioids',
                    alias: prescription
                }],
                name: 'Prescription Opioids'
            }, {
                data: [{
                    count: 84,
                    name: 'Methadone',
                    alias: methadone
                }],
                name: 'Methadone'
            },
            //  {
            //     data: [{
            //         count: 15,
            //         name: 'Buprenorphine'
            //     }],
            //     name: 'Buprenorphine'
            // }

        ];


    //add screen reader text
    for (var i = 0; i < 5; i++) {
        var dl_blocks_bar = $("<dl>");
        dl_blocks_bar.append("<dt>" + dataset[i].data[0].count + " people had a positive " + dataset[i].data[0].name.toLowerCase() + " toxicology screen from 2013-2014.</dt>");
        dl_blocks_bar.append("<dd>Of those with a positive " + dataset[i].data[0].name.toLowerCase() + " toxicology screen, " +
            dataset[i].data[0].alias[0].Yes + "% had a legal opioid prescription at some point from 2011 - 2014, " + 
            dataset[i].data[0].alias[1].Yes +"% had a legal opioid prescription 6 month before death, " + 
            dataset[i].data[0].alias[2].Yes + "% had a legal opioid prescription 3 month before death, and " + 
            dataset[i].data[0].alias[3].Yes + "% had a legal opioid prescription 1 month before death.</dd>");
        $("#sr-blocks-bar").append(dl_blocks_bar);
    };



    var data_substance = prescription;
    var time = 0;
    asignVal_substance(data_substance, time);

    $(".btn-substance").on('click', function() {
        var sub = parseInt($(this).val());
        var substance;
        $(".btn-time").removeClass('disableClick disabled');
        switch (sub) {
            case 0:
                substance = prescription;
                break;
            case 1:
                substance = heroin;
                break;
            case 2:
                substance = fentanyl;
                break;
            case 3:
                substance = both;
                break;
            case 4:
                substance = methadone;
                break;
            case 5:
                substance = buprenorphine;
                $(".btn-time").removeClass('active').addClass('disableClick disabled');
                $("#studyperiod").addClass('active');
                break;
        }
        data_substance = substance;
        asignVal_substance(data_substance, time);
    });


    $(".btn-time").on('click', function() {
        $('.btn-time').removeClass("active");
        $(this).addClass("active");
        time = parseInt($(this).val());
        asignVal_substance(data_substance, time);
        var time_period;
        switch (time) {
            case 0:
                time_period = "during 2011–2014";
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
        $("#time-period").html(time_period.toLowerCase());
        $("#label_blocks").html(time_period);
    });

    function asignVal_substance(type, time) {
        $('#percentage').html(type[time].Yes + '%');
        $("#people").empty();
        $('#people').each(function() {
            makeChart_substance(type, time);
            $('#table_substance').html('<table class="table table_substance"><tr><th>Had legal prescription</th><th>Did not have legal prescription</th></tr><tr><td class="type_substance0">' + type[time].Yes + '%</td><td class="type_substance1">' + type[time].No + '%</td></tr></table>');

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
        var person_path = '<path d="M4,12.6c0-0.7,0-1.5,0-2.2c0-1,0.5-1.8,1.4-2.2C6,7.9,6.6,7.8,7.3,7.8c0.7,0,1.4,0,2.1,0c0.7,0,1.4,0.2,2,0.6c0.7,0.4,1.1,1.1,1.1,2c0,1.5,0,3,0,4.5c0,0.9-0.2,1.8-0.8,2.6c-0.1,0.2-0.3,0.3-0.4,0.5c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.6-0.3,1.2-0.4,1.8c-0.2,1.3-0.4,2.6-0.6,3.8c-0.1,0.7-0.6,1.1-1.3,1.1c-0.4,0-0.8,0-1.2,0c-0.1,0-0.2,0-0.3,0c-0.5-0.1-0.9-0.5-1-1c-0.2-1.2-0.4-2.4-0.6-3.5c-0.1-0.6-0.2-1.2-0.3-1.8c-0.1-0.3-0.2-0.5-0.4-0.7c-0.4-0.3-0.6-0.8-0.7-1.3C4.1,15.9,4,15.3,4,14.7C4,14,4,13.3,4,12.6z"/>' + '<path d="M4.8,3.6c0-1.8,1.4-3.4,3.4-3.5c1.9,0,3.5,1.5,3.5,3.5c0,2-1.5,3.4-3.5,3.4C6.3,7,4.8,5.5,4.8,3.6z"/>';
        var person_svg_No = '<svg class="block type_substance1" width="25px" height="25px">' + person_path + '</svg>';

        for (b = 0; b < noOfBlocks_No; b++) {
            blockArray_substance.push(person_svg_No);

            //blockArray_substance.push('<div class="block type_substance' + 1 + ' data-index=' + data_substance[i].No + '">' + '</div>');
        };
        for (b = 0; b < noOfBlocks_Yes; b++) {
            //$(id).append('<div class="block type_substance' + 0 + ' data-index=' + data_substance[i].Yes + '">' + '</div>');
            var person_svg_Yes = '<svg class="block type_substance0" width="25px" height="25px">' + person_path + '</svg>';
            $(id).append(person_svg_Yes);
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
    //BAR CHART
    ///////////////////////

    var width = '100%',
        height = 30;
    // series = dataset.map(function(d) {
    //     return d.name;
    // }),
    dataset = dataset.map(function(d) {
            return d.data.map(function(o, i) {
                // Structure it so that your numeric
                // axis (the stacked amount) is y
                return {
                    y: o.count,
                    s: o.name,
                };
            });
        }),
        stack = d3.layout.stack();

    stack(dataset);


    var dataset = dataset.map(function(group) {
            return group.map(function(d) {
                // Invert the x and y values, and y0 becomes x0
                return {
                    x: d.y,
                    n: d.s,
                    y: d.x,
                    x0: d.y0
                };
            });
        }),
        $bar = d3.select('#bar')
        .append('svg')
        .attr('id', 'bar_svg')
        .attr('width', width)
        .attr('height', height)
    var color = ["#b71c1c", '#CFD8DC']
    var colors;
    colors = [color[1], color[1], color[1], color[0], color[1], color[1]];
    draw(colors);
    $(".btn-substance").on('click', function() {
        $('#bar_svg').empty();
        colors = [color[1], color[1], color[1], color[1], color[1], color[1]];
        $('.btn-substance').removeClass("active");
        $(this).addClass("active");
        colors[$(this).val()] = color[0];
        draw(colors);
        var i = $(this).val(),
            d = dataset[$(this).val()][0];
        var xPos = parseFloat(xScale(d.x0) + 100 / (i + 1));
        var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand();
        console.log(d);
        console.log(d.n == 'Fentanyl & Heroin')

        if (d.n == 'Fentanyl & Heroin') {
            substance_html = d.n.toLowerCase() + "<a href=\"#footnote-7\" class=\"page-scroll\"><sup>7</sup></a>";
        } else if (d.n == 'Prescription Opioids') {
	    substance_html = d.n.toLowerCase() + "<a href=\"#footnote-15\" class=\"page-scroll\"><sup>15</sup></a>";
        } else {
            substance_html = d.n.toLowerCase();
        }

        console.log(substance_html)
        $('.substance-type').html(substance_html);
        $('#total').html(d.x);

    });

    function draw(colors) {
        $('#bar_svg')
            .append('g')
            .attr('class', 'bar_g')
            //  .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
        xMax = d3.max(dataset, function(group) {
                return d3.max(group, function(d) {
                    return d.x + d.x0;
                });
            }),
            xScale = d3.scale.linear()
            .domain([0, xMax])
            .range([0, width]),
            // months = dataset[0].map(function(d) {
            //     return d.y;
            // }),
            yScale = d3.scale.ordinal()
            //.domain(months)
            .rangeRoundBands([0, height], .1),

            colours = d3.scale.ordinal()
            .range(colors),

            bar_groups = $bar.selectAll('.bar_g')
            .data(dataset)
            .enter()
            .append('g')
            .style('fill', function(d, i) {
                return colours(i);
            }),

            rects = bar_groups.selectAll('rect')
            .data(function(d) {
                return d;
            })
            .enter()
            .append('rect')
            .style({ 'stroke': '#b71c1c', 'stroke-width': '1px' })
            .attr('x', function(d) {
                return xScale(d.x0);
            })
            .attr('y', function(d, i) {
                return yScale(d.y);
            })
            .attr('height', function(d) {
                return yScale.rangeBand();
            })
            .attr('width', function(d) {
                return xScale(d.x);
            })
    };

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
	'<div class="people-blocks">Prescription Opioids in Toxicology Screen</div><table class="table table_gender"><tr><th></th><th>Present</th><th>Not Present</th></tr><tr><th>Male</th><td class="type_gender2">' + prescription[2][1] + '%</td><td class="type_gender0">' + prescription[1][1] + '%</td></tr><tr><th>Female</th><td class="type_gender3">' + prescription[3][1] + '%</td><td class="type_gender5">' + prescription[4][1] + '%</td></tr></table>',
	'<div class="people-blocks">Heroin in Toxicology Screen</div><table class="table table_gender"><tr><th></th><th>Present</th><th>Not Present</th></tr><tr><th>Male</th><td class="type_gender2">' + heroin[2][1] + '%</td><td class="type_gender0">' + heroin[1][1] + '%</td></tr><tr><th>Female</th><td class="type_gender3">' + heroin[3][1] + '%</td><td class="type_gender5">' + heroin[4][1] + '%</td></tr></table>',
	'<div class="people-blocks">Number of Different Prescribers</div><table class="table table_gender"><tr><th></th><th>0 Prescribers</th><th>1–2 Prescribers</th><th>3+ Prescribers</th></tr><tr><th>Male</th><td td class="type_gender0">' + multi[0][1] + '%</td><td td class="type_gender1">' + multi[1][1] + '%</td><td td class="type_gender2">' + multi[2][1] + '%</td></tr><tr><th>Female</th><td td class="type_gender5">' + multi[5][1] + '%</td><td td class="type_gender4">' + multi[4][1] + '%</td><td td class="type_gender3">' + multi[3][1] + '%</td></tr></table>'
    ];


    var data_gender = prescription;
    var value;
    var option;

    //Set initial values
    makeChart_gender(prescription);
    $('#table_gender').html(table_html[0]);
    $("#prescription").addClass("active");

    //Link text controls
    $('.controls-block').click(function() {
        $option = $(this).data('select');
        //$value = eval($(this).val());
        if ($option == 'multi') { $value = 2; } else if ($option == 'heroin') { $value = 1; } else if ($option = 'prescription') { $value = 0; }
        console.log($value);
        asignVal_gender($option, $value);
    });


    //Link button controls
    $('.btn-blocks').click(function() {
        $option = $(this).attr('id');
        $value = eval($(this).val());
        //console.log($value);
        asignVal_gender($option, $value);
    });


    function asignVal_gender(option, value) {
        $("#buttons-blocks button").removeClass("active");
        $('#' + option).addClass('active');
        $("#gender").empty();
        makeChart_gender(eval(option));
        $('#table_gender').html(table_html[value]);
        //console.log(value);
    };


    function makeChart_gender(data_gender) {

        var blockArray = [];
        if (data_gender == multi) {
            var index = [0, 1, 2, 3, 4, 5];
        } else {
            var index = [0, 0, 2, 3, 5, 5];
        };
        for (i = 0; i < 6; i++) {
            var noOfBlocks_gender = Math.round(data_gender[i][1]);
            var blocksAdded = 0;
            blockArray_gender = addBlocks_gender("#gender", noOfBlocks_gender, data_gender, blockArray, index);
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


    function addBlocks_gender(id, noOfBlocks, data_gender, blockArray, index) {
        for (b = 0; b < noOfBlocks; b++) {
            var person_svg = '<svg class="block type_gender' + index[i] + ' data-index=' + data_gender[i][0] + ' width="25px" height="25px">'+'<path d="M4,12.6c0-0.7,0-1.5,0-2.2c0-1,0.5-1.8,1.4-2.2C6,7.9,6.6,7.8,7.3,7.8c0.7,0,1.4,0,2.1,0c0.7,0,1.4,0.2,2,0.6c0.7,0.4,1.1,1.1,1.1,2c0,1.5,0,3,0,4.5c0,0.9-0.2,1.8-0.8,2.6c-0.1,0.2-0.3,0.3-0.4,0.5c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.6-0.3,1.2-0.4,1.8c-0.2,1.3-0.4,2.6-0.6,3.8c-0.1,0.7-0.6,1.1-1.3,1.1c-0.4,0-0.8,0-1.2,0c-0.1,0-0.2,0-0.3,0c-0.5-0.1-0.9-0.5-1-1c-0.2-1.2-0.4-2.4-0.6-3.5c-0.1-0.6-0.2-1.2-0.3-1.8c-0.1-0.3-0.2-0.5-0.4-0.7c-0.4-0.3-0.6-0.8-0.7-1.3C4.1,15.9,4,15.3,4,14.7C4,14,4,13.3,4,12.6z"/>'
        + '<path d="M4.8,3.6c0-1.8,1.4-3.4,3.4-3.5c1.9,0,3.5,1.5,3.5,3.5c0,2-1.5,3.4-3.5,3.4C6.3,7,4.8,5.5,4.8,3.6z"/></svg>';

            // blockArray.push('<div class="block type' + i + '">' + '<p>' + data[i][0] + '</p></div>');
            //blockArray.push('<div class="block type_gender' + index[i] + ' data-index=' + data_gender[i][0] + '">' + '</div>');
            blockArray.push(person_svg);
            // $(id).append('<div class="block type'+i+'"><p>'+ data[i][0] +'</p></div>');
        }
        return blockArray;
    }

});


// var $block = document.getElementByClassName('block');
// $(".block").hover(function() { console.log($(this).dataset.index); });

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
        .attr("y", 10)
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
            percentOpiodDeaths: 'Percent of Opioid Deaths among All Deaths',
            deathRate: 'Opioid Death Rate per 100,000 People per Year',
            numberOpioidDeaths: 'Number of Opioid Deaths from 2013 to 2014'
        };
        return titleLookup[key];
    }
})();
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
   

    errorBarArea2014all 
        .x(function(d) {return x0('All')+x1.rangeBand()/2; }) 
        .y0(function(d) {return y(min2014[0]); }) 
        .y1(function(d) {return y(max2014[0]); }) 
        .interpolate("linear");
    errorBarArea2015all 
        .x(function(d) {return x0('All')+x1.rangeBand()/2+x1.rangeBand(); }) 
        .y0(function(d) {return y(min2015[0]); }) 
        .y1(function(d) {return y(max2015[0]); }) 
        .interpolate("linear");
    errorBarArea2014white 
        .x(function(d) {return x0('White non-Hispanic')+x1.rangeBand()/2; }) 
        .y0(function(d) {return y(min2014[1]); }) 
        .y1(function(d) {return y(max2014[1]); }) 
        .interpolate("linear");
    errorBarArea2015white 
        .x(function(d) {return x0('White non-Hispanic')+x1.rangeBand()/2+x1.rangeBand(); }) 
        .y0(function(d) {return y(min2015[1]); }) 
        .y1(function(d) {return y(max2015[1]); }) 
        .interpolate("linear");
    errorBarArea2014black 
        .x(function(d) {return x0('Black non-Hispanic')+x1.rangeBand()/2; }) 
        .y0(function(d) {return y(min2014[2]); }) 
        .y1(function(d) {return y(max2014[2]); }) 
        .interpolate("linear");
    errorBarArea2015black 
        .x(function(d) {return x0('Black non-Hispanic')+x1.rangeBand()/2+x1.rangeBand(); }) 
        .y0(function(d) {return y(min2015[2]); }) 
        .y1(function(d) {return y(max2015[2]); }) 
        .interpolate("linear");
    errorBarArea2014hisp 
        .x(function(d) {return x0('Hispanic')+x1.rangeBand()/2; }) 
        .y0(function(d) {return y(min2014[3]); }) 
        .y1(function(d) {return y(max2014[3]); }) 
        .interpolate("linear");
    errorBarArea2015hisp 
        .x(function(d) {return x0('Hispanic')+x1.rangeBand()/2+x1.rangeBand(); }) 
        .y0(function(d) {return y(min2015[3]); }) 
        .y1(function(d) {return y(max2015[3]); }) 
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
        .attr("d", function(d){return errorBarArea2014all([d]);}) 
        .attr("class", "bars_race_error");
    errorBars2015all
        .attr("d", function(d){return errorBarArea2015all([d]);})
        .attr("class", "bars_race_error"); 
    errorBars2014white
        .attr("d", function(d){return errorBarArea2014white([d]);}) 
        .attr("class", "bars_race_error");    
    errorBars2015white
        .attr("d", function(d){return errorBarArea2015white([d]);})
        .attr("class", "bars_race_error"); 
    errorBars2014black
        .attr("d", function(d){return errorBarArea2014black([d]);}) 
        .attr("class", "bars_race_error");    
    errorBars2015black
        .attr("d", function(d){return errorBarArea2015black([d]);})
        .attr("class", "bars_race_error"); 
    errorBars2014hisp
        .attr("d", function(d){return errorBarArea2014hisp([d]);}) 
        .attr("class", "bars_race_error");    
    errorBars2015hisp
        .attr("d", function(d){return errorBarArea2015hisp([d]);})
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
        yAxisLabel.attr("x", -height/2);
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
        .x(function(d) {return x0('All')+x1.rangeBand()/2; }) 
        .y0(function(d) {return y(min2014[0]); }) 
        .y1(function(d) {return y(max2014[0]); }) 
        .interpolate("linear");
    errorBarArea2015all 
        .x(function(d) {return x0('All')+x1.rangeBand()/2+x1.rangeBand(); }) 
        .y0(function(d) {return y(min2015[0]); }) 
        .y1(function(d) {return y(max2015[0]); }) 
        .interpolate("linear");
    errorBarArea2014white 
        .x(function(d) {return x0('White non-Hispanic')+x1.rangeBand()/2; }) 
        .y0(function(d) {return y(min2014[1]); }) 
        .y1(function(d) {return y(max2014[1]); }) 
        .interpolate("linear");
    errorBarArea2015white 
        .x(function(d) {return x0('White non-Hispanic')+x1.rangeBand()/2+x1.rangeBand(); }) 
        .y0(function(d) {return y(min2015[1]); }) 
        .y1(function(d) {return y(max2015[1]); }) 
        .interpolate("linear");
    errorBarArea2014black 
        .x(function(d) {return x0('Black non-Hispanic')+x1.rangeBand()/2; }) 
        .y0(function(d) {return y(min2014[2]); }) 
        .y1(function(d) {return y(max2014[2]); }) 
        .interpolate("linear");
    errorBarArea2015black 
        .x(function(d) {return x0('Black non-Hispanic')+x1.rangeBand()/2+x1.rangeBand(); }) 
        .y0(function(d) {return y(min2015[2]); }) 
        .y1(function(d) {return y(max2015[2]); }) 
        .interpolate("linear");
    errorBarArea2014hisp 
        .x(function(d) {return x0('Hispanic')+x1.rangeBand()/2; }) 
        .y0(function(d) {return y(min2014[3]); }) 
        .y1(function(d) {return y(max2014[3]); }) 
        .interpolate("linear");
    errorBarArea2015hisp 
        .x(function(d) {return x0('Hispanic')+x1.rangeBand()/2+x1.rangeBand(); }) 
        .y0(function(d) {return y(min2015[3]); }) 
        .y1(function(d) {return y(max2015[3]); }) 
        .interpolate("linear");

    errorBars2014all
        .attr("d", function(d){return errorBarArea2014all([d]); });
    errorBars2015all
        .attr("d", function(d){return errorBarArea2015all([d]); }); 
    errorBars2014white
        .attr("d", function(d){return errorBarArea2014white([d]); });    
    errorBars2015white
        .attr("d", function(d){return errorBarArea2015white([d]); }); 
    errorBars2014black
        .attr("d", function(d){return errorBarArea2014black([d]); });    
    errorBars2015black
        .attr("d", function(d){return errorBarArea2015black([d]); }); 
    errorBars2014hisp
        .attr("d", function(d){return errorBarArea2014hisp([d]); });    
    errorBars2015hisp
        .attr("d", function(d){return errorBarArea2015hisp([d]); }); 

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
    window.addEventListener('resize', render);
});

var GLOBAL_STRINGS = {
    "PLAY": "Play",
    "PAUSE": "Pause",
    "TOGGLE_FULL_SCREEN": "Toggle full screen",
    "MUTE": "Mute",
    "RESTART": "Restart",
    "CAPTIONS": "Closed captions",
    "REWIND": "Rewind",
    "FORWARD": "Forward"
}

function InitPxVideo(options) {

    "use strict";

    // Utilities for caption time codes
    function video_timecode_min(tc) {
        var tcpair = [];
        tcpair = tc.split(' --> ');
        return videosub_tcsecs(tcpair[0]);
    }

    function video_timecode_max(tc) {
        var tcpair = [];
        tcpair = tc.split(' --> ');
        return videosub_tcsecs(tcpair[1]);
    }

    function videosub_tcsecs(tc) {
        if (tc === null || tc === undefined) {
            return 0;
        } else {
            var tc1 = [],
                tc2 = [],
                seconds;
            tc1 = tc.split(',');
            tc2 = tc1[0].split(':');
            seconds = Math.floor(tc2[0] * 60 * 60) + Math.floor(tc2[1] * 60) + Math.floor(tc2[2]);
            return seconds;
        }
    }

    // For "manual" captions, adjust caption position when play time changed (via rewind, clicking progress bar, etc.)
    function adjustManualCaptions(obj) {
        obj.subcount = 0;
        while (video_timecode_max(obj.captions[obj.subcount][0]) < obj.movie.currentTime.toFixed(1)) {
            obj.subcount++;
            if (obj.subcount > obj.captions.length - 1) {
                obj.subcount = obj.captions.length - 1;
                break;
            }
        }
    }

    // Display captions container and button (for initialization)
    function showCaptionContainerAndButton(obj) {
        obj.captionsBtnContainer.className = "px-video-captions-btn-container show-inline";
        if (obj.isCaptionDefault) {
            obj.captionsContainer.className = "px-video-captions show";
            obj.captionsBtn.setAttribute("checked", "checked");
        }
    }

    // Unfortunately, due to scattered support, browser sniffing is required
    function browserSniff() {
        var nVer = navigator.appVersion,
            nAgt = navigator.userAgent,
            browserName = navigator.appName,
            fullVersion = '' + parseFloat(navigator.appVersion),
            majorVersion = parseInt(navigator.appVersion, 10),
            nameOffset,
            verOffset,
            ix;

        // MSIE 11
        if ((navigator.appVersion.indexOf("Windows NT") !== -1) && (navigator.appVersion.indexOf("rv:11") !== -1)) {
            browserName = "IE";
            fullVersion = "11;";
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
            browserName = "IE";
            fullVersion = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) !== -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset + 8);
        }
        // In most other browsers, "name/version" is at the end of userAgent
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // Trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(" ")) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        // Get major version
        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }
        // Return data
        return [browserName, majorVersion];
    }

    //https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
    // launch fullscreen
    function launchFullScreen(elem) {
        if (!elem.fullscreenElement && // alternative standard method
            !elem.mozFullScreenElement && !elem.webkitFullscreenElement && !elem.msFullscreenElement) { // current working methods
            var requestFullScreen = elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
            requestFullScreen.call(elem);
        }
    }

    // change styles of fullscreen accordingly
    function fullScreenStyles() {
        if (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement) {
            obj.fullScreenBtn.checked = true;
            //must apply other styles in container
            // obj.container.setAttribute("style", "width: 100%; height: 100%;");
            obj.container.className = obj.container.className = 'px-video-container fullscreen';
            obj.controls.className = "px-video-controls js-fullscreen-controls";
            obj.captionsContainer.className = "px-video-captions js-fullscreen-captions";
            obj.movie.setAttribute('width', '100%');
            obj.movie.setAttribute('height', '100%');
        } else {
            obj.fullScreenBtn.checked = false;
            // revert back to default styles
            // obj.container.setAttribute("style", "width:" + obj.movieWidth + "px");
            obj.container.className = obj.container.className = 'px-video-container';
            obj.controls.className = "px-video-controls";
            obj.captionsContainer.className = "px-video-captions";
            obj.movie.setAttribute('width', obj.movieWidth);
            obj.movie.setAttribute('height', obj.movieHeight);
        }
    }

    // exit fullscreen
    function exitFullScreen() {
        // get appropriate vendor prefix and then call it with respect to the document
        var exitFullScreen = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
        exitFullScreen.call(document);
    }

    // insert aria announce div
    (function() {
        var div = document.createElement('div');
        div.id = 'px-video-aria-announce';
        div.setAttribute('role', 'alert');
        div.setAttribute('aria-atomic', 'true');
        div.style.overflow = "hidden";
        div.style.textIndent = '-999999px';
        document.body.appendChild(div);
    }());

    // announce things to aria
    function ariaAnnounce(msg) {
        var announce = document.getElementById('px-video-aria-announce');
        if (announce) {
            announce.innerHTML = '<p>' + msg + '</p>';
        }
    }

    // Global variable
    var obj = {};

    obj.arBrowserInfo = browserSniff();
    obj.browserName = obj.arBrowserInfo[0];
    obj.browserMajorVersion = obj.arBrowserInfo[1];

    // If IE8, stop customization (use fallback)
    // If IE9, stop customization (use native controls)
    if (obj.browserName === "IE" && (obj.browserMajorVersion === 8 || obj.browserMajorVersion === 9)) {
        return false;
    }

    // If smartphone or tablet, stop customization as video (and captions in latest devices) are handled natively
    obj.isSmartphoneOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    if (obj.isSmartphoneOrTablet) {
        return false;
    }

    // Set debug mode
    if (typeof(options.debug) === 'undefined') {
        options.debug = false;
    }
    obj.debug = options.debug;

    // Output browser info to log if debug on
    if (options.debug) {
        console.log(obj.browserName + " " + obj.browserMajorVersion);
    }

    // Set up aria-label for Play button with the videoTitle option
    if ((typeof(options.videoTitle) === 'undefined') || (options.videoTitle === "")) {
        obj.playAriaLabel = "Play";
    } else {
        obj.playAriaLabel = "Play video, " + options.videoTitle;
    }

    // Get the container, video element, and controls container
    obj.container = document.getElementById(options.videoId);
    obj.movie = obj.container.getElementsByTagName('video')[0];
    obj.controls = obj.container.getElementsByClassName('px-video-controls')[0];

    // Remove native video controls
    obj.movie.removeAttribute("controls");

    // Generate random number for ID/FOR attribute values for controls
    obj.randomNum = Math.floor(Math.random() * (10000));

    // Insert custom video controls
    if (options.debug) {
        console.log("Inserting custom video controls");
    }
    obj.controls.innerHTML =
        '<progress class="px-video-progress" max="100" value="0"><span>0</span>% played</progress>' +
        '<div class="controls-left">' +
        '<button class="px-video-restart" title="' + GLOBAL_STRINGS['RESTART'] + '"><span class="sr-only">' + GLOBAL_STRINGS['RESTART'] + '</span></button>' +
        '<button class="px-video-rewind" title="' + GLOBAL_STRINGS['REWIND'] + '"><span class="sr-only">rewind <span class="px-seconds">10</span> seconds</span></button>' +
        '<button class="px-video-play" aria-label="' + obj.playAriaLabel + '" title="' + GLOBAL_STRINGS['PLAY'] + '"><span class="sr-only">' + GLOBAL_STRINGS['PLAY'] + '</span></button>' +
        '<button class="px-video-pause hide" title="' + GLOBAL_STRINGS['PAUSE'] + '"><span class="sr-only">' + GLOBAL_STRINGS['PAUSE'] + '</span></button>' +
        '<button class="px-video-forward" title="' + GLOBAL_STRINGS['FORWARD'] + '""><span class="sr-only">forward <span class="px-seconds">10</span> seconds</span></button>' +
        '</div>' +
        '<div class="controls-right">' +
        '<div class="px-video-mute-btn-container" title="' + GLOBAL_STRINGS['MUTE'] + '">' +
        '<input class="px-video-mute sr-only" id="btnMute' + obj.randomNum + '" type="checkbox" />' +
        '<label id="labelMute' + obj.randomNum + '" for="btnMute' + obj.randomNum + '"><span class="sr-only">' + GLOBAL_STRINGS['MUTE'] + '</span></label>' +
        '</div>' +
        '<label for="volume' + obj.randomNum + '" class="sr-only">Volume:</label><input id="volume' + obj.randomNum + '" class="px-video-volume" type="range" min="0" max="10" value="5" />' +
        '<div class="px-video-captions-btn-container hide" title="' + GLOBAL_STRINGS['CAPTIONS'] + '">' +
        '<input class="px-video-btnCaptions sr-only" id="btnCaptions' + obj.randomNum + '" type="checkbox" />' +
        '<label for="btnCaptions' + obj.randomNum + '"><span class="sr-only">' + GLOBAL_STRINGS['CAPTIONS'] + '</span></label>' +
        '</div>' +
        '<div class="px-video-fullscreen-btn-container show-inline" title="' + GLOBAL_STRINGS['TOGGLE_FULL_SCREEN'] + '">' +
        '<input class="px-video-btnFullScreen sr-only" id="btnFullscreen' + obj.randomNum + '" type="checkbox" />' +
        '<label for="btnFullscreen' + obj.randomNum + '"><span class="sr-only">' + GLOBAL_STRINGS['TOGGLE_FULL_SCREEN'] + '</span></label>' +
        '</div>' +
        '<div class="px-video-time">' +
        '<span class="sr-only">time</span> <span class="px-video-duration">00:00</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    // // Adjust layout per width of video - container
    // obj.movieWidth = obj.movie.width;
    // if (obj.movieWidth < 360) {
    //     obj.movieWidth = 360;
    // }
    // // obj.container.setAttribute("style", "width:" + obj.movieWidth + "px");

    // // Added for fullscreen reference
    // obj.movieHeight = obj.movie.height;

    // // Adjust layout per width of video - controls/mute offset
    // obj.labelMute = document.getElementById("labelMute" + obj.randomNum);
    // obj.labelMuteOffset = obj.movieWidth - 390;
    // if (obj.browserName === "Firefox") { // adjust for Firefox rendering
    //     obj.labelMuteOffset = obj.labelMuteOffset - 10;
    // }
    // if (obj.labelMuteOffset < 0) {
    //     obj.labelMuteOffset = 0;
    // }
    // obj.labelMute.setAttribute("style", "margin-left:" + obj.labelMuteOffset + "px");

    // Get URL of caption file if exists
    var captionSrc = "",
        kind,
        children = obj.movie.childNodes;

    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeName.toLowerCase() === 'track') {
            kind = children[i].getAttribute('kind');
            if (kind === 'captions') {
                captionSrc = children[i].getAttribute('src');
            }
        }
    }

    // Record if caption file exists or not
    obj.captionExists = true;
    if (captionSrc === "") {
        obj.captionExists = false;
        if (options.debug) {
            console.log("No caption track found.");
        }
    } else {
        if (options.debug) {
            console.log("Caption track found; URI: " + captionSrc);
        }
    }

    // Set captions on/off - on by default
    if (typeof(options.captionsOnDefault) === 'undefined') {
        options.captionsOnDefault = true;
    }
    obj.isCaptionDefault = options.captionsOnDefault;

    // Number of seconds for rewind and forward buttons
    if (typeof(options.seekInterval) === 'undefined') {
        options.seekInterval = 10;
    }
    obj.seekInterval = options.seekInterval;

    // Get the elements for the controls
    obj.btnPlay = obj.container.getElementsByClassName('px-video-play')[0];
    obj.btnPause = obj.container.getElementsByClassName('px-video-pause')[0];
    obj.btnRestart = obj.container.getElementsByClassName('px-video-restart')[0];
    obj.btnRewind = obj.container.getElementsByClassName('px-video-rewind')[0];
    obj.btnForward = obj.container.getElementsByClassName('px-video-forward')[0];
    obj.btnVolume = obj.container.getElementsByClassName('px-video-volume')[0];
    obj.btnMute = obj.container.getElementsByClassName('px-video-mute')[0];
    obj.progressBar = obj.container.getElementsByClassName('px-video-progress')[0];
    obj.progressBarSpan = obj.progressBar.getElementsByTagName('span')[0];
    obj.captionsContainer = obj.container.getElementsByClassName('px-video-captions')[0];
    obj.captionsBtn = obj.container.getElementsByClassName('px-video-btnCaptions')[0];
    obj.captionsBtnContainer = obj.container.getElementsByClassName('px-video-captions-btn-container')[0];
    obj.duration = obj.container.getElementsByClassName('px-video-duration')[0];
    obj.txtSeconds = obj.container.getElementsByClassName('px-seconds');
    obj.fullScreenBtn = obj.container.getElementsByClassName('px-video-btnFullScreen')[0];
    obj.fullScreenBtnContainer = obj.container.getElementsByClassName('px-video-fullscreen-btn-container')[0];

    // Update number of seconds in rewind and fast forward buttons
    obj.txtSeconds[0].innerHTML = obj.seekInterval;
    obj.txtSeconds[1].innerHTML = obj.seekInterval;

    // Determine if HTML5 textTracks is supported (for captions)
    obj.isTextTracks = false;
    if (obj.movie.textTracks) {
        obj.isTextTracks = true;
    }

    // Play
    obj.btnPlay.addEventListener('click', function() {
        obj.movie.play();
        obj.btnPlay.className = "px-video-play hide";
        obj.btnPause.className = "px-video-pause px-video-show-inline";
        obj.btnPause.focus();
    }, false);

    // Play by in-text controlls
    $('.js-play-video').click(function(e) {
        var $target = $(e.target).data('target');
        console.log($target);
        var which_container = document.getElementById($target);
        var which_video = which_container.getElementsByTagName('video')[0];
        var which_btnPlay = which_container.getElementsByClassName('px-video-play')[0];
        var which_btnPause = which_container.getElementsByClassName('px-video-pause')[0];
        which_video.play();
        which_btnPlay.className = "px-video-play hide";
        which_btnPause.className = "px-video-pause px-video-show-inline";

    });


    // Pause
    obj.btnPause.addEventListener('click', function() {
        obj.movie.pause();
        obj.btnPlay.className = "px-video-play px-video-show-inline";
        obj.btnPause.className = "px-video-pause hide";
        obj.btnPlay.focus();
    }, false);

    // Restart
    obj.btnRestart.addEventListener('click', function() {
        // Move to beginning
        obj.movie.currentTime = 0;

        // Special handling for "manual" captions
        if (!obj.isTextTracks) {
            obj.subcount = 0;
        }

        // Play and ensure the play button is in correct state
        obj.movie.play();
        obj.btnPlay.className = "px-video-play hide";
        obj.btnPause.className = "px-video-pause px-video-show-inline";


    }, false);

    // Rewind
    obj.btnRewind.addEventListener('click', function() {
        var targetTime = obj.movie.currentTime - obj.seekInterval;
        if (targetTime < 0) {
            obj.movie.currentTime = 0;
        } else {
            obj.movie.currentTime = targetTime;
        }
        // Special handling for "manual" captions
        if (!obj.isTextTracks) {
            adjustManualCaptions(obj);
        }

        // we do not need to announce negative times
        var announcePos = Math.round(targetTime) > 0 ? Math.round(targetTime) : 0;
        var announceMsg = 'rewind to ' + announcePos + ' seconds';
        ariaAnnounce(announceMsg);
    }, false);

    // Fast forward
    obj.btnForward.addEventListener('click', function() {
        var targetTime = obj.movie.currentTime + obj.seekInterval;
        if (targetTime > obj.movie.duration) {
            obj.movie.currentTime = obj.movie.duration;
        } else {
            obj.movie.currentTime = targetTime;
        }
        // Special handling for "manual" captions
        if (!obj.isTextTracks) {
            adjustManualCaptions(obj);
        }

        var announceMsg = 'forward to ' + Math.round(targetTime) + ' seconds';
        ariaAnnounce(announceMsg);
    }, false);

    // Get the HTML5 range input element and append audio volume adjustment on change
    obj.btnVolume.addEventListener('change', function() {
        obj.movie.volume = parseFloat(this.value / 10);
    }, false);

    // Mute
    obj.btnMute.addEventListener('click', function() {
        if (obj.movie.muted === true) {
            obj.movie.muted = false;
        } else {
            obj.movie.muted = true;
        }
    }, false);

    obj.btnMute.onkeypress = function(e) {
        if (e.keyCode == 13) { // enter key
            e.preventDefault();
            if (this.checked == true) {
                this.checked = false;
            } else {
                this.checked = true;
            }
            if (obj.movie.muted === true) {
                obj.movie.muted = false;
            } else {
                obj.movie.muted = true;
            }
        }
    }

    // Duration
    obj.movie.addEventListener("timeupdate", function() {
        obj.secs = parseInt(obj.movie.currentTime % 60);
        obj.mins = parseInt((obj.movie.currentTime / 60) % 60);

        // Ensure it's two digits. For example, 03 rather than 3.
        obj.secs = ("0" + obj.secs).slice(-2);
        obj.mins = ("0" + obj.mins).slice(-2);

        // Render
        obj.duration.innerHTML = obj.mins + ':' + obj.secs;
    }, false);

    // Progress bar
    obj.movie.addEventListener('timeupdate', function() {
        obj.percent = (100 / obj.movie.duration) * obj.movie.currentTime;
        if (obj.percent > 0) {
            obj.progressBar.value = obj.percent;
            obj.progressBarSpan.innerHTML = obj.percent;
        }
    }, false);

    // Skip when clicking progress bar
    obj.progressBar.addEventListener('click', function(e) {
        // obj.pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
        obj.pos = (e.offsetX) / this.offsetWidth;
        obj.movie.currentTime = obj.pos * obj.movie.duration;

        // Special handling for "manual" captions
        if (!obj.isTextTracks) {
            adjustManualCaptions(obj);
        }
    });

    // Toggle display of fullscreen button
    obj.fullScreenBtn.addEventListener('click', function() {
        if (this.checked) {
            launchFullScreen(obj.container);
        } else {
            exitFullScreen();
        }
    }, false);
    obj.fullScreenBtn.onkeypress = function(e) {
        if (e.keyCode == 13) { // enter key
            e.preventDefault();
            if (this.checked == true) {
                this.checked = false;
                exitFullScreen();
            } else {
                this.checked = true;
                launchFullScreen(obj.container);
            }
        }
    }

    // Clear captions at end of video
    obj.movie.addEventListener('ended', function() {
        obj.captionsContainer.innerHTML = "";
    });

    // ***
    // Captions
    // ***

    // Toggle display of captions via captions button
    obj.captionsBtn.addEventListener('click', function() {
        if (this.checked) {
            obj.captionsContainer.className = "px-video-captions show-inline";
        } else {
            obj.captionsContainer.className = "px-video-captions hide";
        }
        // if fullscreen add fullscreen class
        if (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement) {
            var currClass = obj.captionsContainer.className;
            obj.captionsContainer.className = currClass + ' js-fullscreen-captions';
        }
    }, false);
    obj.captionsBtn.onkeypress = function(e) {
        if (e.keyCode == 13) { // enter key
            e.preventDefault();
            if (this.checked == true) {
                this.checked = false;
            } else {
                this.checked = true;
            }
            if (this.checked) {
                obj.captionsContainer.className = "px-video-captions show-inline";
            } else {
                obj.captionsContainer.className = "px-video-captions hide";
            }
        }
    }

    // If no caption file exists, hide container for caption text
    if (!obj.captionExists) {
        obj.captionsContainer.className = "px-video-captions hide";
    }

    // If caption file exists, process captions
    else {

        // Can't use native captioning in the follow browsers:
        if ((obj.browserName === "IE" && obj.browserMajorVersion === 10) ||
            (obj.browserName === "IE" && obj.browserMajorVersion === 11) ||
            (obj.browserName === "Firefox" && obj.browserMajorVersion >= 31) ||
            (obj.browserName === "Chrome" && obj.browserMajorVersion === 43) ||
            (obj.browserName === "Safari" && obj.browserMajorVersion >= 7)) {
            if (options.debug) {
                console.log("Detected browser unable to play HTML5 captions; using custom captions");
            }
            // set to false so skips to 'manual' captioning
            obj.isTextTracks = false;

            // turn off native caption rendering to avoid double captions [doesn't work in Safari 7; see patch below]
            var track = {};
            var tracks = obj.movie.textTracks;
            for (var j = 0; j < tracks.length; j++) {
                track = obj.movie.textTracks[j];
                track.mode = "hidden";
            }
        }

        // Rendering caption tracks - native support required - http://caniuse.com/webvtt
        if (obj.isTextTracks) {
            if (options.debug) {
                console.log("textTracks supported");
            }
            showCaptionContainerAndButton(obj);

            var track = {};
            var tracks = obj.movie.textTracks;
            for (var j = 0; j < tracks.length; j++) {
                track = obj.movie.textTracks[j];
                track.mode = "hidden";
                if (track.kind === "captions") {
                    track.addEventListener("cuechange", function() {
                        if (this.activeCues[0]) {
                            if (this.activeCues[0].hasOwnProperty("text") || this.activeCues[0].text !== "") {
                                obj.captionsContainer.innerHTML = this.activeCues[0].text;
                            }
                        }
                    }, false);
                }
            }
        }
        // Caption tracks not natively supported
        else {
            if (options.debug) {
                console.log("textTracks not supported so rendering captions 'manually'");
            }
            showCaptionContainerAndButton(obj);

            // Render captions from array at appropriate time
            obj.currentCaption = '';
            obj.subcount = 0;
            obj.captions = [];

            obj.movie.addEventListener('timeupdate', function() {
                // Check if the next caption is in the current time range
                if (obj.movie.currentTime.toFixed(1) > video_timecode_min(obj.captions[obj.subcount][0]) &&
                    obj.movie.currentTime.toFixed(1) < video_timecode_max(obj.captions[obj.subcount][0])) {
                    obj.currentCaption = obj.captions[obj.subcount][1];
                }
                // Is there a next timecode?
                if (obj.movie.currentTime.toFixed(1) > video_timecode_max(obj.captions[obj.subcount][0]) &&
                    obj.subcount < (obj.captions.length - 1)) {
                    obj.subcount++;
                }
                // Render the caption
                obj.captionsContainer.innerHTML = obj.currentCaption;
            }, false);

            if (captionSrc != "") {
                // Create XMLHttpRequest object
                var xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) { // IE8
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            if (options.debug) {
                                console.log("xhr = 200");
                            }

                            obj.captions = [];
                            var records = [],
                                record,
                                req = xhr.responseText;
                            records = req.split('\n\n');
                            for (var r = 0; r < records.length; r++) {
                                record = records[r];
                                obj.captions[r] = [];
                                obj.captions[r] = record.split('\n');
                            }
                            // Remove first element ("VTT")
                            obj.captions.shift();

                            if (options.debug) {
                                console.log('Successfully loaded the caption file via ajax.');
                            }
                        } else {
                            if (options.debug) {
                                console.log('There was a problem loading the caption file via ajax.');
                            }
                        }
                    }
                }
                xhr.open("get", captionSrc, true);
                xhr.send();
            }
        }

        // If Safari 7, removing track from DOM [see 'turn off native caption rendering' above]
        if (obj.browserName === "Safari" && obj.browserMajorVersion === 7) {
            console.log("Safari 7 detected; removing track from DOM");
            var tracks = obj.movie.getElementsByTagName("track");
            obj.movie.removeChild(tracks[0]);
        }
    }

    document.addEventListener("fullscreenchange", function() {
        fullScreenStyles();
    }, false);

    document.addEventListener("mozfullscreenchange", function() {
        fullScreenStyles();
    }, false);

    document.addEventListener("webkitfullscreenchange", function() {
        fullScreenStyles();
    }, false);

    document.addEventListener("MSFullscreenChange", function() {
        fullScreenStyles();
    }, false);
};

new InitPxVideo({
    "videoId": "drLukas",
    "captionsOnDefault": false,
    "seekInterval": 10,
    "videoTitle": "Dr Lukas",
    "debug": true
});

new InitPxVideo({
    "videoId": "governor",
    "captionsOnDefault": false,
    "seekInterval": 20,
    "videoTitle": "Governor Baker",
    "debug": true
});


new InitPxVideo({
    "videoId": "sarahWakeman",
    "captionsOnDefault": false,
    "seekInterval": 10,
    "videoTitle": "Sarah Wakeman",
    "debug": true
});

new InitPxVideo({
    "videoId": "cotto",
    "captionsOnDefault": false,
    "seekInterval": 10,
    "videoTitle": "Cotto",
    "debug": true
});

new InitPxVideo({
    "videoId": "sue",
    "captionsOnDefault": false,
    "seekInterval": 10,
    "videoTitle": "Sue",
    "debug": true
});
