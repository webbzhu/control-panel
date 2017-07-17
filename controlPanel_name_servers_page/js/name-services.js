$(function() {

   $("[data-toggle='tooltip']").tooltip();
  
    
  $(".dl-select-all").click(function() {
      $(".domain-list-area input:checkbox").prop("checked", true);
      $(".dl-select-all").parents("tr").css("display", "none");
      $(".dl-delete-all").parents("tr").css("display", "table-row");
      var count = $(".domain-list-area input[type=checkbox]:checked").length;
      $("#domain_select_count").html(count);
      $(".domain-list-area input:checkbox").parents("tr").css("background-color", "#fffbe8");
  });


  $(".dl-delete-all").click(function() {
      $(".domain-list-area input:checkbox").prop("checked", false);
      $(".dl-delete-all").parents("tr").css("display", "none");
      $(".dl-select-all").parents("tr").css("display", "table-row");
      var count = $(".domain-list-area input[type=checkbox]:checked").length;
      $("#domain_select_count").html(count);
      $(".domain-list-area input:checkbox").parents("tr").removeAttr("style");
  });



  $(".domain-list-area input[type=checkbox]").click(function(){
    if($(this).is(":checked")){
      $(this).parents("tr").css("background-color","#fffbe8");
    } else {
      $(this).parents("tr").removeAttr("style");
    }
    var count = $(".domain-list-area input[type=checkbox]:checked").length;
    if(count == 0){
      $(".dl-select-all").parents("tr").css("display", "table-row");
      $(".dl-delete-all").parents("tr").css("display", "none");
    } else if (count == 1){
      $("#domain_select_count").html(count);
      $(".dl-select-all").parents("tr").css("display", "none");
      $(".dl-delete-all").parents("tr").css("display", "table-row");
    } else {
      $("#domain_select_count").html(count);
      $(".dl-select-all").parents("tr").css("display", "none");
      $(".dl-delete-all").parents("tr").css("display", "table-row");
    }
  });


    $('#remove-all-selected').click(function () {

       $(".checkbox-line-column input:checkbox").prop("checked", false);
       $('.delete-function').hide();
       $('.name-service-title').show();
       $(".checkbox-line-column input:checkbox").parent().parent().parent().removeClass("name-servers-column");
       
    });


   // edit name server
 
   $('a[class ="checkbox_a" ],a[class="no_checkbox_a"]').click(function (){
    debugger;
      var text = $(this).attr('href');
      var str1 = text.split("?")[1] ;
      $('#overlay_edit_name_server').fadeIn();
      $('body').addClass('no-scroll');
      return false;

   });


$('.container').on('click','#cancel_edit_name_server_overlay', function(e){
    $('#overlay_edit_name_server').fadeOut();
    $('body').removeClass('no-scroll');

 });

   

//    $("a").on("click",".checkbox_a", function(e){ 

//     $('#overlay_edit_name_server').fadeIn();
//       $('body').addClass('no-scroll');
//       return false;

// });



   $("#form_host_name").bind('input porpertychange',function(){

   var hostvalue = $('#form_host_name').val();

   var address = $('#form_ip_address').val();

    if (hostvalue != null && hostvalue != undefined && hostvalue !='' && address != null && address != undefined && address !='') {
      $('#register_name_server_button').attr('disabled',false);
      $('#register_name_server_button').addClass('able_account_button');

    } else {
      $('#register_name_server_button').attr('disabled',true);
      $('#register_name_server_button').removeClass('able_account_button');
    }
});



$("#form_ip_address").bind('input porpertychange',function(){

   var hostvalue = $('#form_host_name').val();

   var address = $('#form_ip_address').val();

    if (hostvalue != null && hostvalue != undefined && hostvalue !='' && address != null && address != undefined && address !='') {
      
      $('#register_name_server_button').attr('disabled',false);

      $('#register_name_server_button').addClass('able_account_button');
    } else {
      
      $('#register_name_server_button').attr('disabled',true);
      $('#register_name_server_button').removeClass('able_account_button');
    }
});




// show more domains

  $('#show_more').click(function(){
    
    var displayvalue = $('#more_domains').css('display');
    if (displayvalue == 'none') {
      $('#more_domains').show();
      $('#show_more').html('Show Less');
    } else {
      $('#more_domains').hide();
      $('#show_more').html('Show More');
    }
  });




  $('#add_name_server').click(function(){
    $('#form_name_server').val('');
    // document.getElementById("add_name_server_button").disabled=true;
    $('#add_name_server_button').attr('disabled',true);
    $('#add_name_server_button').removeClass('able_account_button');
    $('#overlay_add_name_server').fadeIn();
    $('body').addClass('no-scroll');

  });

  $('#register_name_server').click(function(){
   $('#form_host_name').val('');

   $('#form_ip_address').val('');
      document.getElementById("register_name_server_button").disabled=true;
      $('#register_name_server_button').removeClass('able_account_button');
    $('#overlay_register_name_server').fadeIn();
    $('body').addClass('no-scroll');

  });

  $('#btn_x').click(function(){

    $('#overlay_add_name_server').fadeOut();
    $('body').removeClass('no-scroll');

 });

  $('#cancel_overlay').click(function(){

    $('#overlay_add_name_server').fadeOut();
    $('body').removeClass('no-scroll');

  });



$("#form_name_server").bind('input porpertychange',function(){

   var textvalue = $('#form_name_server').val();
    if (textvalue != null && textvalue != undefined && textvalue !='') {
      document.getElementById("add_name_server_button").disabled=false;
      $('#add_name_server_button').addClass('able_account_button');
    } else {
      document.getElementById("add_name_server_button").disabled=true;
      $('#add_name_server_button').removeClass('add_name_server_button');
    }
});


$('#btn_register_x').click(function(){

    $('#overlay_register_name_server').fadeOut();
    $('body').removeClass('no-scroll');

 });

$('#btn_name_x').click(function(){

    $('#overlay_edit_name_server').fadeOut();
    $('body').removeClass('no-scroll');

 });

// $('#cancel_edit_name_server_overlay').click(function(){

//     $('#overlay_edit_name_server').fadeOut();
//     $('body').removeClass('no-scroll');

//  });



  $('#cancel_register').click(function(){

    $('#overlay_register_name_server').fadeOut();
    $('body').removeClass('no-scroll');

  });


  $('.edit-name-server-settings').click(function(){
   
        $('#overlay_edit_name_server_setting').fadeIn();
         $('body').addClass('no-scroll');


  });

 $('#btn_edit_x').click(function(){
  $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

});


 $('#cancel_edit').click(function(){

    $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

  });

 $('#parking_cancel').click(function(){

    $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

  });

 $('#forwarding_cancel').click(function(){

    $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

  });

 $('#stealth_forwarding_cancel').click(function(){

    $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

  });

  $('#dynadot_hosting_cancel').click(function(){

    $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

  });

  $('#custom_dns_cancel').click(function(){

    $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

  });

  $('#free_hosting_cancel').click(function(){

    $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

  });

$('#site_builder_cancel').click(function(){

    $('#overlay_edit_name_server_setting').fadeOut();
    $('body').removeClass('no-scroll');

  });


// var test = $('#enternameserver').is(':checked');
// var test = $('#selectnameservervalue').is(':checked');


$('#selectdata').SumoSelect();
$('#select-name-servers-0').SumoSelect();
$('#selectnameservers1').SumoSelect();

$('#selectRecordType').SumoSelect();
$('#selectRecordType1').SumoSelect();
$('#selectSubdomainRecordType').SumoSelect();
$('#selectSubdomainRecordType1').SumoSelect();
$('#selectTime').SumoSelect();
$('#selectStyle').SumoSelect();




// for add edit name servers
var FieldCount=2;
var x = $('#edit_new').length;
// var enterNameValue = 2;
$('#add_edit_new').click(function(){
  debugger;
 
  
  if (x < 3) {
    // if (FieldCount.toString().length > 1) {
      
    //    $('#edit_new').append(
    //    '<div class="col-xs-12" style="margin-top: 12px;"><span class="edit_new_span" style="margin-right: 4px;">' + FieldCount +' </span> <input type="text" name="glue_user2_server_'+ enterNameValue +'" class="form-control form_display" id="form_ip_address'+ FieldCount +'" > <span class="fa fa-trash-o delete_edit_new"></span></div>');
    
    // } else {

    FieldCount++;  
    $('#edit_new').append(
       '<div class="col-xs-12" style="margin-top: 12px;"><span class="edit_new_span">' + FieldCount +' </span> <input type="text" name="glue_user2_server_'+ (FieldCount-1) +'" class="form-control form_display" id="form_ip_address'+ (FieldCount-1) +'" > <span class="fa fa-trash-o delete_edit_new"></span></div>');
    // }

   
    x++;
    // enterNameValue++;
  }

  });


$("body").on("click",".delete_edit_new", function(e){ 
  debugger;

  var t = $(this).parent('div').next().find('span').html();
  if (t == undefined) {
    $(this).parent('div').remove(); 
     FieldCount--;
     x--;
  }
  
      //   var test = $(this).parent('div').find('span').html();
      //   if (FieldCount == test) {
      //     FieldCount--;
      //   }
      // $(this).parent('div').remove();  
      // x--; 
      // enterNameValue--;
      
      // return false;    
})  


// for select name servers

var FieldSelectServersCount = 2;
var countselect = 1;
$('#add_select_servers').click(function(){
  debugger;
 
  if (countselect <12) {
    var contentOption = $('#select-name-servers-0').html();

    var texts = $("#select-name-servers-0").find("option:selected").text();
    // var contentd = contentOption.find(texts);
    $('#select-name-servers-0').find("option:selected").attr("selected",false);
      contentOption = $('#select-name-servers-0').html();


     

     FieldSelectServersCount++;
     if (FieldSelectServersCount.toString().length >1) {

    $('#select_servers').append('<div class="col-xs-12" style="margin-left: -7px;margin-top: 12px;"> <span class="select_servers_span" style="margin-right:1px;">' + FieldSelectServersCount +'</span><select class="SlectBox" style="width:99%;" name="glue_user_server_'+ (FieldSelectServersCount-1) +'" id="selectnameservers' + FieldSelectServersCount +'">' + contentOption + '</select><span class="fa fa-trash-o delete_select_servers"></span></div>');

    $('#selectnameservers' + FieldSelectServersCount +'').SumoSelect();
    } else {
      $('#select_servers').append('<div class="col-xs-12" style="margin-left: -7px;margin-top: 12px;"> <span class="select_servers_span">' + FieldSelectServersCount +'</span><select class="SlectBox" style="width:99%;" name="glue_user_server_'+ (FieldSelectServersCount-1) +'" id="selectnameservers' + FieldSelectServersCount +'"> ' + contentOption + '</select><span class="fa fa-trash-o delete_select_servers"></span></div>');
      $('#selectnameservers' + FieldSelectServersCount +'').SumoSelect();
    } 
    countselect ++;
  }
 });


$("body").on("click",".delete_select_servers", function(e){ 

  var nextValue = $(this).parent('div').next().find('span').html();
  if (nextValue == undefined) {
      $(this).parent('div').remove(); 
     countselect--;
     FieldSelectServersCount--;
  }
// var selectSpanValue = $(this).parent().find('span').html();
// if (selectSpanValue == FieldSelectServersCount) {
//    FieldSelectServersCount--;
// }

 
}) 



// for add domain record
var FieldSelectDomainRecord = 2;
var countDomainRecord = 1;
$('#add_select_domain_record').click(function(){
  if (countDomainRecord < 9) {
     FieldSelectDomainRecord++;
  $('#domain_record_content').append('<div class="col-xs-12 custom_dns_content" ><div class="col-xs-3"> <div style="margin-left: -9px;"> <select class="SlectBox" name="glue_dns_domain_type_'+ (FieldSelectDomainRecord-1) +'" id="selectRecordType' + FieldSelectDomainRecord +'" style="background: #fff;"><option value="1">Select Type</option> <option value="2">A</option><option value="3">CNAME</option><option value="4">Foward</option><option value="5">AAAA</option><option value="6">TXT</option></select></div> </div><div class="col-xs-9" style="padding-right: 0px;padding-left: 0px;"><input type="text" name="glue_dns_domain_val_'+ (FieldSelectDomainRecord-1) +'" class="form-control" id="stealth_forward_text" style="width: 95%;">    <span class="fa fa-trash-o delete_domain_record"></span></div></div>');
   $('#selectRecordType' + FieldSelectDomainRecord +'').SumoSelect();
   countDomainRecord ++;

  }
  
})

$("body").on("click",".delete_domain_record", function(e){ 
  var nextItems = $(this).parent().parent('div').next().hasClass('custom_dns_content');
  if (!nextItems){
     $(this).parent().parent('div').remove(); 
     countDomainRecord --;
     FieldSelectDomainRecord--;


  }



 
}) 


// for add subdomain record
var FieldSelectSubDomainRecord = 1;
$('#add_select_subdomain_record').click(function (){
  if (FieldSelectSubDomainRecord < 10) {
    FieldSelectSubDomainRecord ++;
   $('#subdomain_record_content').append('<div class="col-xs-12 custom_dns_content" ><div class="col-xs-3"><input type="text" name="glue_dns_sub_name_'+ (FieldSelectSubDomainRecord-1) +'"  class="form-control subdomain_form" id="subdomain_record_text"> </div><div class="col-xs-3" style="padding-left: 1px;"> <div style="margin-left: -9px;"><select class="SlectBox" name="glue_dns_sub_type_'+ (FieldSelectSubDomainRecord-1) +'" id="selectSubdomainRecordType' + FieldSelectSubDomainRecord +'" style="background: #fff;"><option value="1">Select Type</option><option value="2">A</option><option value="3">CNAME</option><option value="4">Foward</option><option value="5">AAAA</option><option value="6">TXT</option></select> </div></div><div class="col-xs-6" style="padding-right: 0px;padding-left: 0px;margin-left: -3px;"><input type="text" name="glue_dns_sub_val_'+ (FieldSelectSubDomainRecord-1) +'"  class="form-control" id="stealth_forward_text" style="width: 93%;">    <span class="fa fa-trash-o delete_subdomain_record"></span></div></div>');
   $('#selectSubdomainRecordType' + FieldSelectSubDomainRecord +'').SumoSelect();
  }
  
   
})


$("body").on("click",".delete_subdomain_record", function(e){ 
  var hasNext = $(this).parent().parent('div').next().hasClass('custom_dns_content');
  if (! hasNext) {
     $(this).parent().parent('div').remove(); 
     FieldSelectSubDomainRecord --;
  }
 
}) 

// for add mxRecord
var FieldMXRecord = 1;
$('#add_select_mx_record').click(function(){
  if (FieldMXRecord < 5) {
     FieldMXRecord ++;
  $('#mx_record_content').append('<div class="col-xs-12" style="padding-left:0px; margin-top: 8px;"><div class="col-xs-10"><input type="text" name="glue_dns_mx_host_'+ (FieldMXRecord-1) +'"  class="form-control" id="stealth_forward_text">    </div> <div class="col-xs-2" style="padding-left: 0px;"><input type="text" name="glue_dns_mx_dist_'+ (FieldMXRecord-1) +'"  class="form-control" id="stealth_forward_text" style="width: 88%;" >    <span class="fa fa-trash-o delete_mx_record"></span></div></div>');
  }
  
})

$("body").on("click",".delete_mx_record", function(e){ 
  var hasnextRecord = $(this).parent().parent('div').next().hasClass('col-xs-12');
  if (! hasnextRecord) {
     $(this).parent().parent('div').remove(); 
     FieldMXRecord --;
  }

 
}) 



$("#selectdata").change(function(){
     var selectvalue = $("#selectdata").val();
     var arrId = ['select_name_servers','select_name_parking','select_name_forwarding','select_stealth_forwarding','select_dynadot_hosting','select_custom_dns','select_free_hosting','select_site_builder'];
     for (var i = 0; i < arrId.length; i++) {
        if (selectvalue == i+1) {
          $('#' +arrId[i]).show();
        } else {
          $('#' +arrId[i]).hide();
        }
     }
     

 });



});







$(function() {

  $('.edit-name-server-content a').click(function(){

    var link = $(this).attr("href");
    alert(link);
  });



  $("#enter_new_name_servers_0").bind('input porpertychange',function(){
    debugger;
   var enterNameServerValue = $('#enter_new_name_servers_0').val();
   var radionValue = $("input[name='enternameserver']:checked").val();
   if (radionValue === '1') {

    if ((enterNameServerValue != null && enterNameServerValue != undefined && enterNameServerValue !='')) {
    if ($('#name-servres-dns-setting-save').is(":disabled")) {
      $('#name-servres-dns-setting-save').prop('disabled', false);
    }
   } else {
      $('#name-servres-dns-setting-save').prop('disabled', true);
   }

   }
   

});
// $("input[name='enternameserver']").click(function (){
//   debugger;
//  var val1 = $('this').is(":checked");
// });


 $("input:radio[name=enternameserver]").change(function () {
  debugger;
   // var radionValue = $("input[name='enternameserver']:checked").val();
   var radionValue = $(this).val();
   var selectnameserversValue = $('#select-name-servers-0').val();
   var enterNameServerValue = $('#enter_new_name_servers_0').val();
   if (radionValue === '1'){
     if ((enterNameServerValue != null && enterNameServerValue != undefined && enterNameServerValue !='')) {
    if ($('#name-servres-dns-setting-save').is(":disabled")) {
      $('#name-servres-dns-setting-save').prop('disabled', false);
    }
   } else {
      $('#name-servres-dns-setting-save').prop('disabled', true);
   }
   } else {
      if (selectnameserversValue != '-1' ) {
    if ($('#name-servres-dns-setting-save').is(":disabled")) {
      $('#name-servres-dns-setting-save').prop('disabled', false);
    }
   } else {
       $('#name-servres-dns-setting-save').prop('disabled', true);
   }
   }

 });


$('#select-name-servers-0').change(function(){
  debugger;

  var selectnameserversValue = $('#select-name-servers-0').val();
  var radionValue = $("input[name='enternameserver']:checked").val();

  if (radionValue === '2') {

    if (selectnameserversValue != '-1' ) {
    if ($('#name-servres-dns-setting-save').is(":disabled")) {
      $('#name-servres-dns-setting-save').prop('disabled', false);
    }
   } else {
       $('#name-servres-dns-setting-save').prop('disabled', true);
   }

  }
   

});



//   $("#enter_new_name_servers_0").bind('input porpertychange',function(){

//    var enterNameServerValue = $('#enter_new_name_servers_0').val();
//    var selectnameserversValue = $('#select-name-servers-0').val();
//    if ((enterNameServerValue != null && enterNameServerValue != undefined && enterNameServerValue !='') || selectnameserversValue != '-1' ) {
//     if ($('#name-servres-dns-setting-save').is(":disabled")) {
//       $('#name-servres-dns-setting-save').prop('disabled', false);
//     }
//    }

// });


// $('#select-name-servers-0').change(function(){

//   var selectnameserversValue = $('#select-name-servers-0').val();
//   var enterNameServerValue = $('#enter_new_name_servers_0').val();
//    if ((enterNameServerValue != null && enterNameServerValue != undefined && enterNameServerValue !='') || selectnameserversValue != '-1' ) {
//     if ($('#name-servres-dns-setting-save').is(":disabled")) {
//       $('#name-servres-dns-setting-save').prop('disabled', false);
//     }
//    }


// });





    // $('#register_name_server_button').click(function() {
    //   var hostname = $('#form_host_name').val();
    //   var address = $('#form_ip_address').val();
        
    //     $.ajax({
    //         type: "post",
    //         url: "/account/domain/server/overlayRegisterNameServers.html",
    //         data: { name: hostname,ip : address },
    //         dataType: "html",
    //         success: function(data) {
              
    //             $('#overlay_register_name_server_error').remove();

    //             if (data =='<ul id="overlay_register_name_server_error">success</ul>') {
    //                 $('#overlay_register_name_server').fadeOut();
    //                 $('body').removeClass('no-scroll');
    //                 window.location.href='/account/domain/server/list.html';
    //             } else { $('#ovelay_register_nameserver_error_content').append(data); 

    //           }
    //         }
    //     });
    // });
});




 





















