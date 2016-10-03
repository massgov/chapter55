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
                    name: 'Heroin'
                }],
                name: 'Heroin'
            }, {
                data: [{
                    count: 288,
                    name: 'Fentanyl'
                }],
                name: 'Fentanyl'
            }, {
                data: [{
                    count: 249,
                    name: 'Fentanyl & Heroin'
                }],
                name: 'Fentanyl & Heroin'
            }, {
                data: [{
                    count: 154,
                    name: 'Prescription Opioids'
                }],
                name: 'Prescription Opioids'
            }, {
                data: [{
                    count: 84,
                    name: 'Methadone'
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
        var person_path = '<path d="M4,12.6c0-0.7,0-1.5,0-2.2c0-1,0.5-1.8,1.4-2.2C6,7.9,6.6,7.8,7.3,7.8c0.7,0,1.4,0,2.1,0c0.7,0,1.4,0.2,2,0.6c0.7,0.4,1.1,1.1,1.1,2c0,1.5,0,3,0,4.5c0,0.9-0.2,1.8-0.8,2.6c-0.1,0.2-0.3,0.3-0.4,0.5c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.6-0.3,1.2-0.4,1.8c-0.2,1.3-0.4,2.6-0.6,3.8c-0.1,0.7-0.6,1.1-1.3,1.1c-0.4,0-0.8,0-1.2,0c-0.1,0-0.2,0-0.3,0c-0.5-0.1-0.9-0.5-1-1c-0.2-1.2-0.4-2.4-0.6-3.5c-0.1-0.6-0.2-1.2-0.3-1.8c-0.1-0.3-0.2-0.5-0.4-0.7c-0.4-0.3-0.6-0.8-0.7-1.3C4.1,15.9,4,15.3,4,14.7C4,14,4,13.3,4,12.6z"/>'
        + '<path d="M4.8,3.6c0-1.8,1.4-3.4,3.4-3.5c1.9,0,3.5,1.5,3.5,3.5c0,2-1.5,3.4-3.5,3.4C6.3,7,4.8,5.5,4.8,3.6z"/>';
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
            substance_html = d.n.toLowerCase() + "<a href=\"#footnote-16\" class=\"page-scroll\"><sup>16</sup></a>";
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
