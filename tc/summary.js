// (function($) {


//     // save the original plugin function object
//     var _super = $.fn.popover;

//     // create a new constructor
//     var Popover = function(element, options) {
//         _super.Constructor.apply(this, arguments);
//     };

//     // extend prototypes and create a super function
//     Popover.prototype = $.extend({}, _super.Constructor.prototype, {
//         constructor: Popover,
//         _super: function() {
//             var args = $.makeArray(arguments);
//             _super.Constructor.prototype[args.shift()].apply(this, args);
//         },
//         show: function() {
//             var $tip, inside, pos, actualWidth, actualHeight, placement, tp, e = $.Event('show');

//             if (this.hasContent && this.enabled) {
//                 this.$element.trigger(e);
//                 $tip = this.tip();
//                 this.setContent();

//                 if (this.options.animation) {
//                     $tip.addClass('fade');
//                 }

//                 placement = typeof this.options.placement == 'function' ?
//                     this.options.placement.call(this, $tip[0], this.$element[0]) :
//                     this.options.placement;

//                 inside = /in/.test(placement);

//                 $tip
//                     .remove()
//                     .css({ top: 0, left: 0, display: 'block' })
//                     .appendTo(inside ? this.$element : document.body);

//                 pos = this.getPosition(inside);

//                 actualWidth = $tip[0].offsetWidth;
//                 actualHeight = $tip[0].offsetHeight;

//                 switch (inside ? placement.split(' ')[1] : placement) {

//                     case 'bottomRight':
//                         tp = { top: pos.top + pos.height, left: pos.left + pos.width / 2 - (actualWidth * .99) };
//                         break;

//                 }

//                 $tip
//                     .css(tp)
//                     .addClass(placement)
//                     .addClass('in');

//                 this.$element.trigger('shown');
//             }
//         }
//     });

//     $.fn.popover = $.extend(function(option) {
//         return this.each(function() {
//             var $this = $(this),
//                 data = $this.data('bs.popover'),
//                 options = typeof option == 'object' && option;
//             if (!data) $this.data('bs.popover', (data = new Popover(this, options)));
//             if (typeof option == 'string') data[option]();
//         });
//     }, _super);


// })(jQuery);



// $(document).on('click', function(e) {
//     $('[data-toggle="popover"],[data-original-title]').each(function() {

//         if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
//             (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false
//         }

//     });
// });


$(function() {

    // $("[data-toggle='popover']").popover();
    // $('a[rel="popover"]').popover();
    // $('.popover-show').on('shown.bs.popover', function() {


    //     $(".popover-content").on("click", function() {

    //         if ($(".popover-content").html() == "list view") {
    //             $('.popover').remove();
    //             $('#domain-summary-column').hide();
    //             $('#listView').show();
    //         } else {
    //             $('.popover').remove();
    //             $('#suggestions').remove();
    //             $('#domain-summary-column').removeClass('col-sm-6')
    //             var chart = $('#container').highcharts();
    //             chart.reflow();
    //             $('#listView').removeClass('col-sm-6')

    //         }



    //     });

    // })


$('#swtich_chart').click(function() {

        $('#domain-summary-column').hide();
        $('#listView').show();

    })


$('#close_suggestion').click(function() {

        $('#suggestions').remove();
                $('#domain-summary-column').removeClass('col-sm-6')
                var chart = $('#container').highcharts();
                chart.reflow();
                $('#listView').removeClass('col-sm-6')

    })


    $('#ellipsis-v').click(function() {

        $('#listView').hide();
        $('#domain-summary-column').show();
        var chart = $('#container').highcharts();
        chart.reflow();

    })

   
   $('.close-alert-info').click(function() {

   	$('.alert-notification').remove();

    $('#summary-page-msg').removeClass('content-style-with-alert');
        
    $('#summary-page-msg').addClass('content-style')
    })




});




$(document).ready(function() {

    $('#day').SumoSelect('2');
    $('#month').SumoSelect('1');
     var day="";
      var month="";

    var loginInfo = document.getElementById("loginInfo");
    loginInfo.onclick = function() {
        $('#overlay_ip_region').fadeIn();
        $('body').addClass('no-scroll');
    }

    var btnx = document.getElementById("btn-x");
    btnx.onclick = function() {
        $('#overlay_ip_region').fadeOut();
        $('body').removeClass('no-scroll');


    }

    $('#btn_unlock_x').click(function(){
       $('#overlay_unlock_region').fadeOut();
        $('body').removeClass('no-scroll');
    });

    

    $('#close_overlay').click(function(){
       $('#overlay_ip_region').fadeOut();
       $('body').removeClass('no-scroll');
    });

    $('#unlock').click(function(){
        $('#overlay_unlock_region').fadeIn();
        $('body').addClass('no-scroll');
        $("#monthdata").html('Month');
        $("#daydata").html('Day');
        day  = $.trim($('#daydata').html());
        month = $.trim($('#monthdata').html()); 
        document.getElementById("unlock_account").disabled=true;
        $('#unlock_account').removeClass('unlock_account_button');


    });

    $('#cancel_overlay').click(function(){
       $('#overlay_unlock_region').fadeOut();
       $('body').removeClass('no-scroll');

    });


    day  = $.trim($('#daydata').html());
    month = $.trim($('#monthdata').html()); 
    if (day !='Day' && day !='' && day != undefined && month !='Month' && month !='' && month !=undefined) { 

      document.getElementById("unlock_account").disabled=false;
     $('#unlock_account').addClass('unlock_account_button');

    }
    


   
    $("#month").change(function(){
        
     month =  $.trim($('#monthdata').html());
     if (day !='Day' && day !='' && day != undefined && month !='Month' && month !='' && month !=undefined) {
     document.getElementById("unlock_account").disabled=false;
     $('#unlock_account').addClass('unlock_account_button');

  } else {
    document.getElementById("unlock_account").disabled=true;
    $('#unlock_account').removeClass('unlock_account_button');
  }
 });

    $("#day").change(function(){
        
     day = $.trim($('#daydata').html());
     if (day !='Day' && day !='' && day != undefined && month !='Month' && month !='' && month !=undefined) {
     document.getElementById("unlock_account").disabled=false;
     $('#unlock_account').addClass('unlock_account_button');
    
  }else {
    document.getElementById("unlock_account").disabled=true;
    $('#unlock_account').removeClass('unlock_account_button');
  }
 });

 
   

});

// $(window).resize(function() {


//     $(".popover").each(function() {
//         var popover = $(this);
//         if (popover.is(":visible")) {

//             if ($(".popover-content").html() == "Dismiss") {
                
//                 $('a[rel="popover"]').popover('show');

//             } else {

               
//                 $("[data-toggle='popover']").popover('show');
//             }


//         }
//     });

// });




