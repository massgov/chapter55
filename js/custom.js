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
                $('#odInfographic_details').html('Only about '+ '<strong>1 in 12</strong>' +' people who died from opioids in 2013 and 2014 had an active opioid prescription in the month before they died')
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
$('p, .sources-section li, .tab-pane li').each(function() {
    var innerHTML = $(this).html();
    var words = innerHTML.trim().split(' ');
    if(words.length > 2) {
        var potentialWidow = words[words.length-1];
        var newWords = words.slice(0,-1).join(' ');
        $(this).html(newWords+'&nbsp;'+potentialWidow);
    }
})


//bold footnote on in text num click
//onclick="BoldText(document.getElementById(&quot;footnote-1&quot;));"

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
