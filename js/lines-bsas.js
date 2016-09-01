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
	 .attr("class", "vis-x-axis")
         .attr("transform", "translate(0," + height_bsas + ")")
         .call(xAxis_bsas)
         .append("text")
         .attr("x", 635)
         .attr("y", 15)
         .attr("text-anchor", "middle")
         .text("Year");

     $lines_bsas.append("g")
	 .attr("class", "vis-y-axis")
         .call(yAxis_bsas)
         .append("text")
         // .attr("y", -30)
         .style("text-anchor", "start")
         // .text("Substance Abuse");
     $lines_bsas.selectAll(".vis-y-axis text").attr("x", -43).attr("dy", 0);

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
