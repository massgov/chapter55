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
