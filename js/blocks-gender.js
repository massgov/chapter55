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
        '<table class="table" id="table_gender"><tr><th></th><th>Present</th><th>Not Present</th></tr><tr><th>Male</th><td class="type_gender2">' + prescription[2][1] + '%</td><td class="type_gender0">' + prescription[1][1] + '%</td></tr><tr><th>Female</th><td class="type_gender3">' + prescription[3][1] + '%</td><td class="type_gender5">' + prescription[4][1] + '%</td></tr></table>',
        '<table class="table" id="table_gender"><tr><th></th><th>Present</th><th>Not Present</th></tr><tr><th>Male</th><td class="type_gender2">' + heroin[2][1] + '%</td><td class="type_gender0">' + heroin[1][1] + '%</td></tr><tr><th>Female</th><td class="type_gender3">' + heroin[3][1] + '%</td><td class="type_gender5">' + heroin[4][1] + '%</td></tr></table>',
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
            // blockArray.push('<div class="block type' + i + '">' + '<p>' + data[i][0] + '</p></div>');
            blockArray.push('<div class="block type_gender' + index[i] + ' data-index=' + data_gender[i][0] + '">' + '</div>');
            // $(id).append('<div class="block type'+i+'"><p>'+ data[i][0] +'</p></div>');
        }
        return blockArray;
    }

});


// var $block = document.getElementByClassName('block');
// $(".block").hover(function() { console.log($(this).dataset.index); });
