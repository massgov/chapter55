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
