
// set default value click
var clickwindow = false;
$(document).ready(function() {

    // close aler bar 
    $('#close-alert-site-bar').click(function (){
      $('.alert-site-maintenance').slideUp("slow");;

    });

    $('#close-alert-promote-bar').click(function (){
      $('.alert-promote').fadeOut('slow');
      
       $.cookie("promo", "1337429941", { expires: 7, path: "/" }); 
    });

    $(window).resize(function() {
        

    var menuClick = $('.sidebar-menu').find('ul:visible').hasClass('menu-open');
    
    var sidebarMenuHeight = parseInt($('.sidebar-menu').get(0).offsetHeight);
    

     if ($(window).height() > 820) {
        $('.sidebar-menu').height($(window).height());
     } else {
         if (menuClick) {
            var content  = $('.sidebar-menu').find('ul:visible').parent().find('span').html();
            if (content == 'My Domains') {
                $('.sidebar-menu').height(820);
                $('.sidebar').attr('style', 'overflow-y: scroll;');
            }
            if (content == 'My Marketplace' || content == 'My Info') {
                $('.sidebar-menu').height(750);
                $('.sidebar').attr('style', 'overflow-y: scroll;');
            }

            if (content == 'Tools') {
                $('.sidebar-menu').height(590);
                $('.sidebar').attr('style', 'overflow-y: scroll;');
                if ($(window).height() > 590 ) {
                $('.sidebar-menu').height($(window).height());
               }
            }

            
        } else {
            if ($(window).height() < 590) {
                $('.sidebar-menu').height(500);
                $('.sidebar').attr('style', 'overflow-y: scroll;');
            } else {
                $('.sidebar-menu').height($(window).height());
            }
            
        }
     
        
        
        }
       
    });

 sidebarMenu();
 
 $('#fileupload').mouseup(function(){
    
      clickwindow = true;
  })
 $('#fileupload1').mouseup(function(){
      clickwindow = true;
  })
 

 $('#fileupload').mouseenter(function(){
    
     $('#user_dropdown_avatar_uploader_button').addClass('photo-opacity');
  });
  

  $('#fileupload').mouseleave(function(){
    
      $('#user_dropdown_avatar_uploader_button').removeClass('photo-opacity');
  });
  
 $.fn.bootstrapDropdownHover();

});

 

// sidebar menu
function sidebarMenu() {

  if ($(window).height() < 500) {
    $('.sidebar').attr('style', 'overflow-y: scroll;');
    $('.sidebar-menu').height(500);
  }
   
    var menu = $('.sidebar-menu');
    var animationSpeed = 300;

    $(menu).on('click', 'li a', function(e) {


     


        var $this = $(this);
        var checkElement = $this.next();

        if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function() {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");

           
       
        if ($(window).height() < 500) {
         $('.sidebar').attr('style', 'overflow-y: scroll;');
         $('.sidebar-menu').height(500);

         } else {
             $('.sidebar-menu').height($(window).height());
         }
            
        }

        
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            // alert(parseInt($('.sidebar-menu').get(0).offsetHeight));
            //parent menu
            
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            ul.removeClass('menu-open');
            var parent_li = $this.parent("li");
            // check span content
            var check_content =  parent_li.find('span').html();
            checkElement.slideDown(animationSpeed, function() {
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');


                // alert(parseInt($('.sidebar-menu').get(0).offsetHeight));

                // alert($(window).height());

                if (check_content == 'My Domains') {
                    
                     if ($(window).height() < 820) {
                      
                      $('.sidebar').attr('style', 'overflow-y: scroll;');
                      $('.sidebar-menu').height(820);
                } 

                }

                if (check_content == 'My Marketplace' || check_content == 'My Info') {
                   
                     if ($(window).height() < 750) {
                      
                      $('.sidebar').attr('style', 'overflow-y: scroll;');
                      $('.sidebar-menu').height(750);
                } else {
                    $('.sidebar').removeAttr('style');
                }
                }

                if (check_content == 'Tools') {
                  
                    if ($(window).height() < 590) {
                      
                      $('.sidebar').attr('style', 'overflow-y: scroll;');
                      $('.sidebar-menu').height(590);
                } else {
                    $('.sidebar').removeAttr('style');
                }
                }

            });
            

        }
         
        if ($this.parent("li").is('.treeview')) {
            var parent = $this.parents('ul').first();
            parent.find('li.active').removeClass('active');
            parent.find('.messageactive').removeClass('messageactive');
            $this.parent("li").addClass('active');

        }
        // click a add class,remove other class 
        if ($this.parent().parent("ul").is('.treeview-menu')) {
            $this.parent().parent("ul").find('.messageactive').removeClass('messageactive');
            var parent = $this.parent().parent().parents('ul').first();
            parent.find('li.active').removeClass('active');
            $this.parent().parent().parent("li").addClass('active');
            $this.addClass('messageactive');
        }

        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    });


}

;(function ($, window, document, undefined) {


  var pluginName = 'bootstrapDropdownHover',
      defaults = {
        clickBehavior: 'default',                      
        hideTimeout: 200
      },
      _hideTimeoutHandler,
      _hardOpened = false,
      _touchstartDetected = false,
      _mouseDetected = false;

  function BootstrapDropdownHover(element, options) {
    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  function bindEvents(dropdown) {
    $('body').one('touchstart.dropdownhover', function() {
      _touchstartDetected = true;
    });

    $('body').one('mouseenter.dropdownhover', function() {
      if (!_touchstartDetected) {
        _mouseDetected = true;
      }
    });



    $('.dropdown-toggle, .dropdown-menu', dropdown.element.parent()).on('mouseenter.dropdownhover', function() {
              //for small windows don't  mouseenter
              var detectedvalue = dropdown.element.find('span').hasClass('fa-item-right');
              if (detectedvalue) {
                      if ($(window).width() < 767 ) {
                          return;
                      }   
                 
              }

      //touch device
      if(_mouseDetected && !$(this).is(':hover')) {
        _mouseDetected = false;
      }

      if (!_mouseDetected) {
        return;
      }

      clearTimeout(_hideTimeoutHandler);
      if (!dropdown.element.parent().hasClass('open')) {
        _hardOpened = false;
        dropdown.element.dropdown('toggle');
      }
    });

    $('.dropdown-toggle, .dropdown-menu', dropdown.element.parent()).on('mouseleave.dropdownhover', function () {
        
        var  detectedvalue = dropdown.element.find('span').hasClass('fa-item-right');
        if (detectedvalue) {
            if ($(window).width() < 767 ) {
                 return;
            }   
        }
        
        if (clickwindow) {
            setTimeout(function(){
                clickwindow = false;
            },1000);
            
            return;

        }
      if (!_mouseDetected) {
        return;
      }

      if (_hardOpened) {
        return;
      }
      _hideTimeoutHandler = setTimeout(function () {
        if (dropdown.element.parent().hasClass('open')) {
          dropdown.element.dropdown('toggle');
        }
      }, dropdown.settings.hideTimeout);
    });

    dropdown.element.on('click.dropdownhover', function (e) {
      if (!_mouseDetected) {
        return;
      }

      switch(dropdown.settings.clickBehavior) {
        case 'default':
          return;
        case 'disable':
          e.preventDefault();
          e.stopImmediatePropagation();
          break;
        case 'sticky':
          if (_hardOpened) {
            _hardOpened = false;
          }
          else {
            _hardOpened = true;
            if (dropdown.element.parent().hasClass('open')) {
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          }
          return;
      }
    });
  }

  function removeEvents(dropdown) {
    $('.dropdown-toggle, .dropdown-menu', dropdown.element.parent()).off('.dropdownhover');
    $('.dropdown-toggle, .dropdown-menu', dropdown.element.parent()).off('.dropdown');
    dropdown.element.off('.dropdownhover');
    $('body').off('.dropdownhover');
  }

  BootstrapDropdownHover.prototype = {

    init: function () {
      this.setClickBehavior(this.settings.clickBehavior);
      this.setHideTimeout(this.settings.hideTimeout);
      bindEvents(this);
      return this.element;
    },
    setClickBehavior: function(value) {
      this.settings.clickBehavior = value;
      return this.element;
    },
    setHideTimeout: function(value) {
      this.settings.hideTimeout = value;
      return this.element;
    },
    destroy: function() {
      clearTimeout(_hideTimeoutHandler);
      removeEvents(this);
      this.element.data('plugin_' + pluginName, null);
      return this.element;
    }
  };


  $.fn[pluginName] = function (options) {
    var args = arguments;

    if (options === undefined || typeof options === 'object') {
      if (!$.contains(document, $(this)[0])) {
        $('[data-toggle="dropdown"]').each(function (index, item) {
          $(item).bootstrapDropdownHover(options);
        });
      }
      return this.each(function () {
        // not a select
        if (!$(this).hasClass('dropdown-toggle') || $(this).data('toggle') !== 'dropdown') {
          $('[data-toggle="dropdown"]', this).each(function (index, item) {
            // For each nested select
            $(item).bootstrapDropdownHover(options);
          });
        } else if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new BootstrapDropdownHover(this, options));
        }
      });

     
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

      var returns;

      this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof BootstrapDropdownHover && typeof instance[options] === 'function') {
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });

      return returns !== undefined ? returns : this;
    }

  };

})(jQuery, window, document);

