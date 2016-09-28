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
