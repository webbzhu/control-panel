/**
 * This script include all event of shopping cart responsive pages.
 * 
 * @author philip
 *
 */

(function() {
  if ($.DynaCP == undefined) {
    $.DynaCP = {};
  }
  $.DynaCP.DomainNameList = {};

  var initFunctions = {};
  initFunctions.initRenewOptionOverlay = initRenewOptionOverlay;

  function initToolTips() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  function initDropDown() {
    $('.dropdown-toggle').dropdown();
  }

  function initDomainListSelectAllEvent() {
    $("#cp-dl-select-all").click(function() {
      var checkboxs = $("#cp-dl-area").find("input:checkbox");
      if (checkboxs.length > 0) {
        checkboxs.prop("checked", true);
      }
      $("#cp-dl-action-row").css("z-index","999");
      $("#domain_select_count").html("All");
      var rows = $("#cp-dl-area input:checkbox").parents("tr");
      if (rows.length > 0) {
        rows.css("background-color", "#fffbe8");
      }
    });
  }

  function initDomainListDeleteAllEvent() {
    $("#cp-dl-delete-all").click(function() {
      var checkboxs = $("#cp-dl-area input:checkbox");
      if (typeof checkboxs != typeof undefined && checkboxs.length > 0) {
        checkboxs.prop("checked", false)
      }
      $("#cp-dl-action-row").removeAttr("style");
      var row = $("#cp-dl-select-all").parents("tr");
      if (row.length > 0) {
        row.show();
      }
      var checked = $("#cp-dl-area input[type=checkbox]:checked");
      var count = checked.length;
      if (count != 0) {
        checkboxs.prop("checked", false);
      } else {
        $("#domain_select_count").html(count);
        var rows = $("#cp-dl-area input:checkbox").parents("tr");
        if (rows.length > 0) {
          rows.removeAttr("style");
        }
      }
    });
  }

  function initDomainListClickCheckboxEvent() {
    $("#cp-dl-area input[type=checkbox]").click(function() {
      if ($(this).is(":checked")) {
        $(this).parents("tr").css("background-color", "#fffbe8");
      } else {
        $(this).parents("tr").removeAttr("style");
      }
      var count = $("#cp-dl-area input[type=checkbox]:checked").length;
      var countAll = $("#cp-dl-area input[type=checkbox]").length;
      var message = $("#cp-dl-select-message");
      if (count == 0) {
        $("#cp-dl-action-row").removeAttr("style");
      } else if (count == 1) {
        $("#domain_select_count").html(count);
        $("#cp-dl-action-row").css("z-index","999");
        message.html("");
      } else if (count == countAll) {
        var html = $("#domain_select_count").html("All");
        if (typeof message != typeof undefined) {
          message.html("All domains on this page selected");
        }
      } else {
        $("#domain_select_count").html(count);
        $("#cp-dl-action-row").css("z-index","999");
        if (typeof message != typeof undefined) {
          message.html("Domains on this page selected");
        }
      }
    });
  }

  function initDropdownClickEvent() {
    $(".cp-dl-search-box-row .dropdown-menu, #dropdown-folder").click(function() {
      event.stopPropagation();
    })
  }

  function initDomainFilterEvnet() {
    var n = $("#cp-dl-select-name");
    var v = $("#cp-dl-select-value");
    var f = $("#cp-dl-add-filter");
    var h = $("#cp-dl-select-hidden");
    var t = $("#cp-dl-exclude-tlds");
    var select_name = n.find("select");
    var select_value = v.find("select");
    var add_filter = f.find("input[type='submit']");

    if (select_name.length > 0) {
      $(select_name).change(function() {
        var i = parseInt($(this).val());
        if (isNaN(i)) {
          return; // do not get correct index of select item
        }
        if (i == -1) {
          v.hide();
          t.hide();
          f.hide();
        } else if (i == 7 || i == 8) {
          v.hide();
          t.hide();
          f.show();
        } else if (h.children().length > 0) {
          var html = h.children().eq(i).html();
          if (select_value.length > 0) {
            select_value.html(html);
            if (select_value.children().length > 0) {
              select_value.val("-1");
              var first = select_value.find("option").first();
              if(first != null || first.length == 0){
                first.html("Select value...");
              }
            }
            if(select_value.children().length > 0){
              v.show();
            }
          }
          f.hide();
          t.hide();
        }
      });
    }

    if (select_value.length > 0) {
      $(select_value).change(function() {
        if ($(this).val() == -1) {
          f.hide();
          t.hide();
        } else if(select_name.val() == 1){
          f.show();
          t.show();
        } else {
          f.show();
          t.hide();
        }
      });
    }

    if (add_filter.length > 0) {
      $(add_filter).click(function() {
        if (select_name.val() != "-1" && select_value.val() != "-1") {
          if (h.children().length > 0) {
            var i = select_name.val();
            if (!isNaN(i)) {
              var item = h.find("select").eq(i);
              if (item.length > 0 && select_value.val() != -1) {
                item.val(select_value.val());
              }
            }
          }
        } else if (select_name.children().length > 0) {
          select_name.val("-1");
          v.hide();
          t.hide();
          f.hide();
          select_value.children().remove();
          $(".cp-dl-search-box-row").removeClass("open");
        }
      });
    }

    $(".cp-dl-selected-filter-value").click(function() {
      var d = $(this).parent().attr("id");
      if (d != null && d.length > 0) {
        var i = parseInt(d.replace("cp-dl-filter-", ""));
        if (isNaN(i)) {
          return; // do not get correct index of select item
        }
        var h = $("#cp-dl-select-hidden");

        if (h.children().length > 0) {
          var e = h.children().eq(i);
          if (e.length > 0) {
            e.val("-1");
            $(this).parents("form").submit();
          }
        }
      }
    });
  }

function initRenewOptionOverlay() {
  var select = $('#domain-edit-renew-options-select');
  var save = $('#domain-edit-renew-options-save');
  if (select.length > 0) {
    select.change(function() {
      if (save.is(":disabled")) {
        save.prop('disabled', false);
      }
    });
  }
  $('#cp-overlay input[type="button"]').click(function() {
    if ($(this).hasClass('cp-overlay-cancel')) {
      $.DynaCP.Overlay.closeOverlay();
    } else {
      var id = $(this).attr('id');
      if (id === 'domain-edit-renew-options-save') {
        var ids = $("input[name='cp-overlay-hidden-ids']");
        var form = $('#cp-overlay-renew-option-form');
        if (form.length > 0 && ids.length > 0 && ids.val() != '') {
          var data = {},
          url = window.location.pathname;
          $.each(form.serializeArray(),
          function() {
            data[this.name] = this.value
          });
          data.form_name = form.attr('data-name');
          data['edit-domains'] = 1;
          $.ajax({
            url: url,
            type: "POST",
            data: data
          }).done(function(responseData) {
            $.DynaCP.parseJson(responseData).then(function(json) {
              if (json.hasOwnProperty('code')) {
                if (json.code === '0') {
                  $.DynaCP.Overlay.closeOverlay();
                  location.reload();
                  $.DynaCP.Notice.createNotice(json.message);
                } else {
                  if (json.hasOwnProperty('error_message')) {
                    $.DynaCP.Overlay.createOverlayError(json.error_message);
                  }
                }
              }
            }).
            catch(function(e) {});
          })
        }
      }
    }
  });
}

  // function initDomainsSettingOverlay() {
  //   var save = $('#domains-edit-save');
  //   var select = $('#domain-edit-renew-options-select');
  //   var save = $('#domain-edit-renew-options-save')
  //   if (select.length > 0) {
  //       select.change(function () {
  //           if (save.is(":disabled")) {
  //               save.prop('disabled', false);
  //           }
  //       });
  //   }
  //   $('#cp-overlay input[type="button"]').click(function() {
  //     if ($(this).hasClass('cp-overlay-cancel')) {
  //       $.DynaCP.Overlay.closeOverlay();
  //     } else {
  //       var id = $(this).attr('id');
  //       if (id === 'domains-edit-save') {
  //         var form = $('#cp-overlay-domains-edit-form');
  //         var ids = $("input[name='domains_edit_hidden_ids']");
  //         if (form.length > 0) {
  //           var data = {},
  //           url = window.location.pathname;
  //           $.each(form.serializeArray(),
  //           function() {
  //             data[this.name] = this.value
  //           });
  //           data.form_name = form.attr('data-name');
  //           if (ids.length > 0) {
  //             data.ids = ids.val();
  //           }
  //           data['edit-domains'] = 1;
  //           $.ajax({
  //             url: url,
  //             type: "POST",
  //             data: data
  //           }).done(function(responseData) {
  //             $.DynaCP.parseJson(responseData).then(function(json) {
  //               if (json.hasOwnProperty('code')) {
  //                 if (json.code === '0') {
  //                   $.DynaCP.Overlay.closeOverlay();
  //                   var info = $("#cp-dl-area").find("." + json.update_class_name);
  //                   if (info.length > 0) {
  //                     info.attr('class', json.update_class_value);
  //                   }
  //                   $.DynaCP.Notice.createNotice(json.message);
  //                 } else {
  //                   if (json.hasOwnProperty('error_message')) {
  //                     $.DynaCP.Overlay.createOverlayError(json.error_message);
  //                   }
  //                 }
  //               }
  //             }).
  //             catch(function(e) {});
  //           })
  //         }
  //       }
  //     }
  //   });
  // }

  function initDomainsSetting() {
    $("#cp-dl-action-row input[type='button'], #cp-dl-action-row input[type='submit']").click(function() {
      var cmd = $(this).attr("id");
      if (typeof cmd != typeof undefined && cmd != false) {
        var url = window.location.pathname;
        console.log(url);
        var ids = "";
        var checked = $("#cp-dl-area input[type=checkbox]:checked");
        for (var i = 0; i < checked.length; i++) {
          var id_name = checked.eq(i).attr("name");
          if (id_name != null && id_name.length > 0) {
            ids += id_name.replace('dl_', '') + '.';
          }
        }
        if(cmd == 'unlock'){
          $(this).attr('cmd','unlock');
          $.DynaCP.Account.unlockAccount(this, ids);
          return;
        }
        if (ids != "") {
          var data = {};
          data.cmd = cmd;
          data['edit-domains'] = 1;
          data.ids = ids;
          $.ajax({
            url: url,
            type: "POST",
            data: data
          }).done(function(responseData) {
            $.DynaCP.parseJson(responseData).then(function(json) {
              if (json.code === '0') {
                removeError();
                if (json.hasOwnProperty('content') && json.hasOwnProperty('init')) {
                  $.DynaCP.Overlay.createOverlay(json.content, initFunctions[json.init]);
                } else {
                  $.DynaCP.Notice.createNotice('Unknown Error');
                }
              } else {
                if (json.hasOwnProperty('error_message')) {
                  createError(json.error_message);
                }
              }
            }).
            catch(function(e) {});
          })
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

  function initWindowScroll(){
    $(window).scroll(function(){
      var d = $("#cp-dl-action-row");
      if(d.css("z-index") == "999"){
        var searchBoxHeight = $(".cp-dl-search-box-wrap").outerHeight();
        var scrolled = $(document).scrollTop();
        var width = $(".table-responsive").width();
        if(scrolled > (searchBoxHeight + 33)){
          d.removeClass("cp-dl-scroll-normal");
          d.addClass("cp-dl-scroll-overflow");
          d.css("width",width + "px");
        } else {
          d.removeClass("cp-dl-scroll-overflow");
          d.addClass("cp-dl-scroll-normal");
          d.css("width", "100%");
        }
      }
    });
  }


  function init() {
    initDomainListClickCheckboxEvent();
    initDomainListSelectAllEvent();
    initDomainListDeleteAllEvent();
    initToolTips();
    initDropDown();
    initDomainFilterEvnet();
    initDropdownClickEvent();
    initDomainsSetting();
    initWindowScroll();
  };

  $(document).ready(function() {
    init();
  })

})();