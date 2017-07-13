(function() {
    if ($.DynaCp == undefined) {
        $.DynaCp = {};
    }
    $.DynaCp.DomainNameList = {};

    var initFunctions = {};
    initFunctions.initDnsSettingOverlay = initDnsSettingOverlay;


    function initTitleEvenAction() {
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



        $(".domain-list-area input[type=checkbox]").click(function() {
            if ($(this).is(":checked")) {
                $(this).parents("tr").css("background-color", "#fffbe8");
            } else {
                $(this).parents("tr").removeAttr("style");
            }
            var count = $(".domain-list-area input[type=checkbox]:checked").length;
            if (count == 0) {
                $(".dl-select-all").parents("tr").css("display", "table-row");
                $(".dl-delete-all").parents("tr").css("display", "none");
            } else if (count == 1) {
                $("#domain_select_count").html(count);
                $(".dl-select-all").parents("tr").css("display", "none");
                $(".dl-delete-all").parents("tr").css("display", "table-row");
            } else {
                $("#domain_select_count").html(count);
                $(".dl-select-all").parents("tr").css("display", "none");
                $(".dl-delete-all").parents("tr").css("display", "table-row");
            }
        });


        $('#remove-all-selected').click(function() {

            $(".checkbox-line-column input:checkbox").prop("checked", false);
            $('.delete-function').hide();
            $('.name-service-title').show();
            $(".checkbox-line-column input:checkbox").parent().parent().parent().removeClass("name-servers-column");

        });
    }

    // add name server
    function initAddNameServer() {
        $('#add_name_server').click(function() {
            $('#form_name_server').val('');
            $('#overlay_add_name_server_error').remove();
            $('#add_name_server_button').attr('disabled', true);
            $('#add_name_server_button').removeClass('able_account_button');
            $('#overlay_add_name_server').fadeIn();
            $('body').addClass('no-scroll');
            return false;
        });

        // check add name servers input value
        $("#form_name_server").bind('input porpertychange', function() {
            $('#overlay_add_name_server_error').remove();
            var textvalue = $('#form_name_server').val();
            if (textvalue != null && textvalue != undefined && textvalue != '') {
                $('#add_name_server_button').attr('disabled', false);
                $('#add_name_server_button').addClass('able_account_button');
            } else {
                $('#add_name_server_button').attr('disabled', true);
                $('#add_name_server_button').removeClass('able_account_button');
            }
        });

    }



    // register name server
    function initRegisterNamerServer() {
        $('#register_name_server').click(function() {
            $('#form_host_name').val('');

            $('#form_ip_address').val('');
            $('#overlay_register_name_server_error').remove();
            $('#register_name_server_button').attr('disabled', true);
            $('#register_name_server_button').removeClass('able_account_button');
            $('#overlay_register_name_server').fadeIn();
            $('body').addClass('no-scroll');
            return false;

        });



        // check register name servers name input value
        $("#form_host_name").bind('input porpertychange', function() {

            var hostvalue = $('#form_host_name').val();

            var address = $('#form_ip_address').val();
            $('#overlay_register_name_server_error').remove();

            if (hostvalue != null && hostvalue != undefined && hostvalue != '' && address != null && address != undefined && address != '') {
                $('#register_name_server_button').attr('disabled', false);
                $('#register_name_server_button').addClass('able_account_button');

            } else {
                $('#register_name_server_button').attr('disabled', true);
                $('#register_name_server_button').removeClass('able_account_button');
            }
        });


        // check register name servers name ip value
        $("#form_ip_address").bind('input porpertychange', function() {

            var hostvalue = $('#form_host_name').val();

            var address = $('#form_ip_address').val();
            $('#overlay_register_name_server_error').remove();

            if (hostvalue != null && hostvalue != undefined && hostvalue != '' && address != null && address != undefined && address != '') {

                $('#register_name_server_button').attr('disabled', false);

                $('#register_name_server_button').addClass('able_account_button');
            } else {

                $('#register_name_server_button').attr('disabled', true);
                $('#register_name_server_button').removeClass('able_account_button');
            }
        });

    }


    // edit name server setting
    function initEditNameServerSetting() {

        $('#edit_name_servers_setting_button').click(function() {

            var setting_url = $("#edit_name_servers_setting_form").attr("action");
            var nameValue = $('#edit_name_servers_setting_button').val();
            var data = {};
            data['ns_change'] = nameValue;

            $.ajax({
                type: "post",
                url: setting_url,
                data: data
            }).done(function(responseData) {
                $.DynaCP.parseJson(responseData).then(function(json) {
                    if (json.code === '0') {
                        removeError();
                        if (json.hasOwnProperty('errorcontent')) {
                            $('#edit_name_servre_setting_error_content').remove();
                            $('#name_servers_top_content').after(json.errorcontent);

                        } else if (json.hasOwnProperty('content') && json.hasOwnProperty('init')) {

                            $.DynaCP.Overlay.createOverlay(json.content, initFunctions[json.init]);

                        } else {
                            $.DynaCP.Notice.createNotice('Unknown Error');
                        }

                    } else {
                        if (json.hasOwnProperty('error_message')) {
                            createError(json.error_message);
                        }

                    }
                }).catch(function(e) {});

            })


        });

    }

    // for forward domain check 
    function checkForwardDomain() {

        $("#forwarding_form_text").bind('input porpertychange', function() {
            var forward_domain_value = $('#forwarding_form_text').val();

            if ((forward_domain_value != null && forward_domain_value != undefined && forward_domain_value != '')) {
                if ($('#forward-domain-dns-setting-save').is(":disabled")) {
                    $('#forward-domain-dns-setting-save').prop('disabled', false);
                }
            } else {
                $('#forward-domain-dns-setting-save').prop('disabled', true);
            }
        });

    }

    function checkStealthForward() {
        $('#stealth_forward_form_text').bind('input porpertychange', function() {
            var webpage = $('#stealth_forward_form_text').val();
            var webTitle = $('#stealth_website_title_form_text').val();
            if ((webpage != null && webpage != undefined && webpage != '' && webTitle != null && webTitle != undefined && webTitle != '')) {
                if ($('#stealth-forward-dns-setting-save').is(":disabled")) {
                    $('#stealth-forward-dns-setting-save').prop('disabled', false);
                }

            } else {
                $('#stealth-forward-dns-setting-save').prop('disabled', true);
            }

        });



        $('#stealth_website_title_form_text').bind('input porpertychange', function() {
            var webpage = $('#stealth_forward_form_text').val();
            var webTitle = $('#stealth_website_title_form_text').val();
            if ((webpage != null && webpage != undefined && webpage != '' && webTitle != null && webTitle != undefined && webTitle != '')) {
                if ($('#stealth-forward-dns-setting-save').is(":disabled")) {
                    $('#stealth-forward-dns-setting-save').prop('disabled', false);
                }

            } else {
                $('#stealth-forward-dns-setting-save').prop('disabled', true);
            }

        });



    }


    // for check custom dns
    function checkCustomDNS() {

        var recordTypeValue = $('#selectRecordType0').val();
        var ipArTargetHost = $('#glue_dns_domain_id_0').val();
        if (recordTypeValue != '0' && ipArTargetHost != null && ipArTargetHost != undefined && ipArTargetHost != '') {
            if ($('#custom-dns-setting-save').is(":disabled")) {
                $('#custom-dns-setting-save').prop('disabled', false);
            }
        } else {
            $('#custom-dns-setting-save').prop('disabled', true);
        }



        $('#selectRecordType0').change(function() {

            var recordTypeValue = $('#selectRecordType0').val();
            var ipArTargetHost = $('#glue_dns_domain_id_0').val();



            if (recordTypeValue != '0' && ipArTargetHost != null && ipArTargetHost != undefined && ipArTargetHost != '') {
                if ($('#custom-dns-setting-save').is(":disabled")) {
                    $('#custom-dns-setting-save').prop('disabled', false);
                }
            } else {
                $('#custom-dns-setting-save').prop('disabled', true);
            }




        });


        $("#glue_dns_domain_id_0").bind('input porpertychange', function() {
            var recordTypeValue = $('#selectRecordType0').val();
            var ipArTargetHost = $('#glue_dns_domain_id_0').val();
            if (recordTypeValue != '0' && ipArTargetHost != null && ipArTargetHost != undefined && ipArTargetHost != '') {
                if ($('#custom-dns-setting-save').is(":disabled")) {
                    $('#custom-dns-setting-save').prop('disabled', false);
                }
            } else {
                $('#custom-dns-setting-save').prop('disabled', true);
            }


        });

    }



    // for check name servers
    function checkNameservers() {

        $("input:radio[name=enternameserver]").change(function() {
            var radionValue = $(this).val();
            var selectnameserversValue = $('#select-name-servers-0').val();
            var enterNameServerValue = $('#enter_new_name_servers_0').val();
            if (radionValue === '1') {
                if ((enterNameServerValue != null && enterNameServerValue != undefined && enterNameServerValue != '')) {
                    if ($('#name-servres-dns-setting-save').is(":disabled")) {
                        $('#name-servres-dns-setting-save').prop('disabled', false);
                    }
                } else {
                    $('#name-servres-dns-setting-save').prop('disabled', true);
                }
            } else {
                if (selectnameserversValue != '-1') {
                    if ($('#name-servres-dns-setting-save').is(":disabled")) {
                        $('#name-servres-dns-setting-save').prop('disabled', false);
                    }
                } else {
                    $('#name-servres-dns-setting-save').prop('disabled', true);
                }
            }

        });

        $("#enter_new_name_servers_0").bind('input porpertychange', function() {
            var enterNameServerValue = $('#enter_new_name_servers_0').val();
            var radionValue = $("input[name='enternameserver']:checked").val();
            if (radionValue === '1') {

                if ((enterNameServerValue != null && enterNameServerValue != undefined && enterNameServerValue != '')) {
                    if ($('#name-servres-dns-setting-save').is(":disabled")) {
                        $('#name-servres-dns-setting-save').prop('disabled', false);
                    }
                } else {
                    $('#name-servres-dns-setting-save').prop('disabled', true);
                }

            }


        });


        $('#select-name-servers-0').change(function() {

            var selectnameserversValue = $('#select-name-servers-0').val();
            var radionValue = $("input[name='enternameserver']:checked").val();

            if (radionValue === '2') {

                if (selectnameserversValue != '-1') {
                    if ($('#name-servres-dns-setting-save').is(":disabled")) {
                        $('#name-servres-dns-setting-save').prop('disabled', false);
                    }
                } else {
                    $('#name-servres-dns-setting-save').prop('disabled', true);
                }

            }


        });

    }

    function checkFreeHosting() {

        $('#selectStyle').change(function() {
            var style = $('#selectStyle').val();
            var title = $('#glue_free_host_title_id').val();
            var body = $('#glue_free_host_body_id').val();
            if (style != '0' && title != null && title != undefined && title != '' && body != null && body != undefined && body != '') {
                if ($('#free-hosting-dns-setting-save').is(":disabled")) {
                    $('#free-hosting-dns-setting-save').prop('disabled', false);
                }
            } else {
                $('#free-hosting-dns-setting-save').prop('disabled', true);
            }

        });


        $('#glue_free_host_title_id').bind('input porpertychange', function() {
            var style = $('#selectStyle').val();
            var title = $('#glue_free_host_title_id').val();
            var body = $('#glue_free_host_body_id').val();
            if (style != '0' && title != null && title != undefined && title != '' && body != null && body != undefined && body != '') {
                if ($('#free-hosting-dns-setting-save').is(":disabled")) {
                    $('#free-hosting-dns-setting-save').prop('disabled', false);
                }
            } else {
                $('#free-hosting-dns-setting-save').prop('disabled', true);
            }


        });


        $('#glue_free_host_body_id').bind('input porpertychange', function() {
            var style = $('#selectStyle').val();
            var title = $('#glue_free_host_title_id').val();
            var body = $('#glue_free_host_body_id').val();
            if (style != '0' && title != null && title != undefined && title != '' && body != null && body != undefined && body != '') {
                if ($('#free-hosting-dns-setting-save').is(":disabled")) {
                    $('#free-hosting-dns-setting-save').prop('disabled', false);
                }
            } else {
                $('#free-hosting-dns-setting-save').prop('disabled', true);
            }


        });



    }


    function initDnsSettingOverlay() {
        // init the function
        $("[data-toggle='tooltip']").tooltip();
        initSelectDataForDomainsEvent();
        $('#selectdata').SumoSelect();
        $('#select-name-servers-0').SumoSelect();
        initEditNameServer();
        initAddSelectNameServer();
        initAddDomainRecord();
        initAddSubdomainRecord();
        initAddRecorEvernt();
        initShowMore();
        checkNameservers();
        checkForwardDomain();
        checkStealthForward();
        checkCustomDNS();
        checkFreeHosting();

        $('#cp-overlay input[type="button"]').click(function() {
            if ($(this).hasClass('cp-overlay-cancel')) {
                $.DynaCP.Overlay.closeOverlay();
            } else {
                var id = $(this).attr('id');
                var data = {};
                var form = '';
                var url = '';
                if (id === 'name-servres-dns-setting-save') {

                    form = $('#name-servers-dns-setting-form');
                    if (form.length > 0) {
                        url = form.attr("action");
                    }
                } else if (id === 'parking-domain-dns-setting-save') {
                    form = $('#parking-domain-dns-setting-form');
                    if (form.length > 0) {
                        url = form.attr("action");
                    }
                } else if (id === 'forward-domain-dns-setting-save') {
                    form = $('#forwarding-domain-dns-setting-form');
                    if (form.length > 0) {
                        url = form.attr("action");
                    }
                } else if (id === 'stealth-forward-dns-setting-save') {
                    form = $('#stealth-forwarding-domain-dns-setting-form');
                    if (form.length > 0) {
                        url = form.attr("action");
                    }
                } else if (id === 'dynadot-hosting-dns-setting-save') {
                    form = $('#dynadot-hosting-domain-dns-setting-form');
                    if (form.length > 0) {
                        url = form.attr("action");
                    }

                } else if (id === 'custom-dns-setting-save') {
                    form = $('#custom-domain-dns-setting-form');
                    if (form.length > 0) {
                        url = form.attr("action");
                    }

                } else if (id === 'free-hosting-dns-setting-save') {

                    form = $('#free-hosting-dns-setting-form');
                    if (form.length > 0) {
                        url = form.attr("action");
                    }

                }

                $.each(form.serializeArray(), function() {
                    data[this.name] = this.value
                });
                data.form_name = form.attr('data-name');
                $.ajax({
                    url: url,
                    type: "POST",
                    data: data
                }).done(function(responseData) {
                    $.DynaCP.parseJson(responseData).then(function(json) {
                        if (json.hasOwnProperty('code')) {
                            if (json.code === '0') {
                                console.log(json.message);
                                $.DynaCP.Notice.createNotice(json.message);
                                $.DynaCP.Overlay.closeOverlay();
                                var nameserverlist = window.location.pathname;
                                window.location.href = nameserverlist;
                            } else {
                                if (json.hasOwnProperty('error_message')) {
                                    $.DynaCP.Overlay.createOverlayError(json.error_message);
                                }
                            }
                        }
                    }).catch(function(e) {});

                })

            }
        });
    }


    // show more domains
    function initShowMore() {

        $('#show_more').click(function() {
            var displayvalue = $('#more_domains').css('display');
            if (displayvalue == 'none') {
                $('#more_domains').show();
                $('#show_more').html('Show Less');
            } else {
                $('#more_domains').hide();
                $('#show_more').html('Show More');
            }
        });

    }




    function initClickEVenter() {

        $('.container').on('click', '#cancel_edit_name_server_overlay', function(e) {
            $('#overlay_edit_name_server').fadeOut();
            $('body').removeClass('no-scroll');

        });


        $('#btn_x').click(function() {

            $('#overlay_add_name_server').fadeOut();
            $('body').removeClass('no-scroll');

        });

        $('#cancel_overlay').click(function() {

            $('#overlay_add_name_server').fadeOut();
            $('body').removeClass('no-scroll');

        });


        $('#btn_register_x').click(function() {

            $('#overlay_register_name_server').fadeOut();
            $('body').removeClass('no-scroll');

        });

        $('#btn_name_x').click(function() {

            $('#overlay_edit_name_server').fadeOut();
            $('body').removeClass('no-scroll');

        });




        $('#cancel_register').click(function() {

            $('#overlay_register_name_server').fadeOut();
            $('body').removeClass('no-scroll');

        });



    }



    // for add edit name servers
    function initEditNameServer() {
        var FieldCount = 2;
        var x = $('#edit_new').length;
        $('#add_edit_new').click(function() {

            if (x < 3) {
                FieldCount++;
                $('#edit_new').append(
                    '<div class="col-xs-12" style="margin-top: 12px;"><span class="edit_new_span">' + FieldCount + ' </span> <input type="text" name="glue_user2_server_' + (FieldCount - 1) + '" class="form-control form_display"> <span class="fa fa-trash-o delete_edit_new"></span></div>');

                x++;
            }

        });


        $("body").on("click", ".delete_edit_new", function(e) {

            var t = $(this).parent('div').next().find('span').html();
            if (t == undefined) {
                $(this).parent('div').remove();
                FieldCount--;
                x--;
            }

        });


    }


    // for select name servers

    function initAddSelectNameServer() {


        var FieldSelectServersCount = 2;
        var countselect = 1;
        $('#add_select_servers').click(function() {
            if (countselect < 12) {
                $('#select-name-servers-0').find("option:selected").attr("selected", false);
                var contentOption = $('#select-name-servers-0').html();
                FieldSelectServersCount++;
                if (FieldSelectServersCount.toString().length > 1) {

                    $('#select_servers').append('<div class="col-xs-12" style="margin-left: -7px;margin-top: 12px;"> <span class="select_servers_span" style="margin-right:1px;">' + FieldSelectServersCount + '</span><select class="SlectBox" style="width:99%;" name="glue_user_server_' + (FieldSelectServersCount - 1) + '" id="select-name-servers-' + (FieldSelectServersCount - 1) + '">' + contentOption + '</select><span class="fa fa-trash-o delete_select_servers"></span></div>');

                    $('#select-name-servers-' + (FieldSelectServersCount - 1) + '').SumoSelect();
                } else {
                    $('#select_servers').append('<div class="col-xs-12" style="margin-left: -7px;margin-top: 12px;"> <span class="select_servers_span">' + FieldSelectServersCount + '</span><select class="SlectBox" style="width:99%;" name="glue_user_server_' + (FieldSelectServersCount - 1) + '" id="select-name-servers-' + (FieldSelectServersCount - 1) + '"> ' + contentOption + '</select><span class="fa fa-trash-o delete_select_servers"></span></div>');
                    $('#select-name-servers-' + (FieldSelectServersCount - 1) + '').SumoSelect();
                }
                countselect++;
            }
        });


        $("body").on("click", ".delete_select_servers", function(e) {

            var nextValue = $(this).parent('div').next().find('span').html();
            if (nextValue == undefined) {
                $(this).parent('div').remove();
                countselect--;
                FieldSelectServersCount--;
            }

        })

    }

    // for add domain record
    function initAddDomainRecord() {

        var FieldSelectDomainRecord = 2;
        var countDomainRecord = 1;
        $('#add_select_domain_record').click(function() {
            if (countDomainRecord < 9) {
                FieldSelectDomainRecord++;
                $('#domain_record_content').append('<div class="col-xs-12 custom_dns_content" ><div class="col-xs-3"> <div style="margin-left: -9px;"> <select class="SlectBox" name="glue_dns_domain_type_' + (FieldSelectDomainRecord - 1) + '" id="selectRecordType' + (FieldSelectDomainRecord - 1) + '" style="background: #fff;"><option value="0">Select Type</option> <option value="1">A</option><option value="2">CNAME</option><option value="3">Foward</option><option value="4">AAAA</option><option value="5">TXT</option></select></div> </div><div class="col-xs-9" style="padding-right: 0px;padding-left: 0px;"><input type="text" name="glue_dns_domain_val_' + (FieldSelectDomainRecord - 1) + '" class="form-control" id="stealth_forward_text" style="width: 95%;">    <span class="fa fa-trash-o delete_domain_record"></span></div></div>');
                $('#selectRecordType' + (FieldSelectDomainRecord - 1) + '').SumoSelect();
                countDomainRecord++;

            }

        });

        $("body").on("click", ".delete_domain_record", function(e) {
            var nextItems = $(this).parent().parent('div').next().hasClass('custom_dns_content');
            if (!nextItems) {
                $(this).parent().parent('div').remove();
                countDomainRecord--;
                FieldSelectDomainRecord--;


            }

        });

    }




    // for add subdomain record
    function initAddSubdomainRecord() {

        var FieldSelectSubDomainRecord = 1;
        $('#add_select_subdomain_record').click(function() {
            if (FieldSelectSubDomainRecord < 10) {
                FieldSelectSubDomainRecord++;
                $('#subdomain_record_content').append('<div class="col-xs-12 custom_dns_content" ><div class="col-xs-3"><input type="text" name="glue_dns_sub_name_' + (FieldSelectSubDomainRecord - 1) + '"  class="form-control subdomain_form" id="subdomain_record_text"> </div><div class="col-xs-3" style="padding-left: 1px;"> <div style="margin-left: -9px;"><select class="SlectBox" name="glue_dns_sub_type_' + (FieldSelectSubDomainRecord - 1) + '" id="selectSubdomainRecordType' + (FieldSelectSubDomainRecord - 1) + '" style="background: #fff;"><option value="0">Select Type</option><option value="1">A</option><option value="2">CNAME</option><option value="3">Foward</option><option value="4">AAAA</option><option value="5">TXT</option></select> </div></div><div class="col-xs-6" style="padding-right: 0px;padding-left: 0px;margin-left: -3px;"><input type="text" name="glue_dns_sub_val_' + (FieldSelectSubDomainRecord - 1) + '"  class="form-control" id="stealth_forward_text" style="width: 93%;">    <span class="fa fa-trash-o delete_subdomain_record"></span></div></div>');
                $('#selectSubdomainRecordType' + (FieldSelectSubDomainRecord - 1) + '').SumoSelect();
            }


        });


        $("body").on("click", ".delete_subdomain_record", function(e) {
            var hasNext = $(this).parent().parent('div').next().hasClass('custom_dns_content');
            if (!hasNext) {
                $(this).parent().parent('div').remove();
                FieldSelectSubDomainRecord--;
            }

        });

    }
    // for add mxRecord

    function initAddRecorEvernt() {
        var FieldMXRecord = 1;
        $('#add_select_mx_record').click(function() {
            if (FieldMXRecord < 5) {
                FieldMXRecord++;
                $('#mx_record_content').append('<div class="col-xs-12" style="padding-left:0px; margin-top: 8px;"><div class="col-xs-10"><input type="text" name="glue_dns_mx_host_' + (FieldMXRecord - 1) + '"  class="form-control" id="stealth_forward_text">    </div> <div class="col-xs-2" style="padding-left: 0px;"><input type="text" name="glue_dns_mx_dist_' + (FieldMXRecord - 1) + '"  class="form-control" id="stealth_forward_text" style="width: 88%;" >    <span class="fa fa-trash-o delete_mx_record"></span></div></div>');
            }

        });

        $("body").on("click", ".delete_mx_record", function(e) {
            var hasnextRecord = $(this).parent().parent('div').next().hasClass('col-xs-12');
            if (!hasnextRecord) {
                $(this).parent().parent('div').remove();
                FieldMXRecord--;
            }


        });

    }

    // for domian list
    function initSelectDataForDomainsEvent() {
        $("#selectdata").change(function() {
            var selectvalue = $("#selectdata").val();
            var arrId = ['select_name_servers', 'select_name_parking', 'select_name_forwarding', 'select_stealth_forwarding', 'select_dynadot_hosting', 'select_custom_dns', 'select_free_hosting'];
            for (var i = 0; i < arrId.length; i++) {
                if (selectvalue == i + 1) {
                    $('#' + arrId[i]).show();
                } else {
                    $('#' + arrId[i]).hide();
                }
            }


        });


    }

    // for single domain
    function initSelectDataForSingleDomainEvent() {
        $("#selectdata").change(function() {
            var selectvalue = $("#selectdata").val();
            var arrId = ['select_name_servers', 'select_name_parking', 'select_name_forwarding', 'select_stealth_forwarding', 'select_dynadot_hosting', 'select_custom_dns', 'select_free_hosting', 'select_site_builder'];
            for (var i = 0; i < arrId.length; i++) {
                if (selectvalue == i + 1) {
                    $('#' + arrId[i]).show();
                } else {
                    $('#' + arrId[i]).hide();
                }
            }


        });


    }


    function removeError() {
        var err = $('#domain-edit-error');
        if (err.length > 0) {
            error.remove();
        }
    }

    function createError(msg) {
        var err = $('#domain-edit-error');
        if (err.length > 0) {
            err.html(msg);
        } else {
            var head = $('domain-edit-header');
            if (head.length > 0) {
                err = $('<div id="domain-edit-error"></div>');
                err.html(msg);
                err.insertAfter(head);
            }
        }
    }



    function init() {
        initSelectDataForDomainsEvent();
        initAddRecorEvernt();
        initAddSubdomainRecord();
        initAddDomainRecord();
        initAddSelectNameServer();
        initEditNameServer();
        initRegisterNamerServer();
        initAddNameServer();
        initTitleEvenAction();
        initEditNameServerSetting();
        initClickEVenter();

        $('#selectRecordType').SumoSelect();
        $('#selectRecordType1').SumoSelect();
        $('#selectSubdomainRecordType').SumoSelect();
        $('#selectSubdomainRecordType1').SumoSelect();
        $('#selectTime').SumoSelect();
        $('#selectStyle').SumoSelect();

    };





    $(document).ready(function() {
        init();
        $("[data-toggle='tooltip']").tooltip();

    })


})();


// $(function() {

//       $('a[class ="checkbox_a" ],a[class="no_checkbox_a"]').click(function (){

//       // var str1 = $(this).attr('href').split("?")[1];
//          var str1 = $(this).attr('href');
//         $.ajax({
//             type: "post",
//             url: str1,
//             dataType: "html",
//             success: function(data) {
//                 $('#edit_reg_name_content').remove();
//                 $('#edit_name_server_content').append(data); 
//                 $('#overlay_edit_name_server').fadeIn();
//                 $('body').addClass('no-scroll');


//             }
//         });
//           return false;



//     });



// $('.container').on('click','#edit_register_name_server_button', function(e){
//  var action_url = $("#overlay_edit_reg_name_servers_form").attr("action");
//  var flag = "submit";
//    $.ajax({
//             type: "post",
//             url:  action_url + '&submit='+flag,
//             data: $('#overlay_edit_reg_name_servers_form').serialize(),
//             dataType: "html",
//             success: function(data) {

//                 $('#overlay_reg_name_server_error').remove();

//                 if (data =='<ul id="overlay_reg_name_server_error">success</ul>') {
//                     $('#overlay_edit_name_server').fadeOut();
//                     $('body').removeClass('no-scroll');
//                     window.location.href='/account/domain/server/list.html';
//                 } else { $('#ovelay_edit_reg_nameserver_error_content').append(data); 

//               }
//             }
//         });



//  });



// });
