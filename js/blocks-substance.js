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

    $("#options_substance").on('input change', function() {
        //change from string to variable
        data_substance = eval(($("#options_substance option:selected").val()));
        asignVal_substance(data_substance, time);
    });


    $("#timeline_blocks").on('input change', function() {
        time = parseInt($(this).val());
        asignVal_substance(data_substance, time);
        var time_period;
        switch (time) {
            case 0:
                time_period = "Study Period";
                break;
            case 1:
                time_period = "6 months before death";
                break;
            case 2:
                time_period = "3 months before death";
                break;
            case 3:
                time_period = "1 month before death";
                break;
        }
        $("#label_blocks").html(time_period);
    });

    function asignVal_substance(type, time) {
        $("#people").empty();
        $('#people').each(function() {
            makeChart_substance(type, time);
            $('#table_substance').html('<table class="table" id="table_substance"><tr><th>Yes</th><th>No</th></tr><tr><td class="type_substance0">' + type[time].Yes + '%</td><td class="type_substance1">' + type[time].No + '%</td></tr></table>');
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

})
