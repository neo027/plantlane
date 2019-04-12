import React, {Component} from 'react';

import './ShopTheLook.css';

import lookbook_01 from '../../assets/lookbook/lookbook-01.jpg';
import lookbook_01_2 from '../../assets/lookbook/lookbook-01-2.jpg';

import lookbook_02 from '../../assets/lookbook/lookbook-02.jpg';

import lookbook_03 from '../../assets/lookbook/lookbook-03.jpg';
import lookbook_03_1 from '../../assets/lookbook/lookbook-03-1.jpg';
import lookbook_03_2 from '../../assets/lookbook/lookbook-03-2.jpg';
import lookbook_03_3 from '../../assets/lookbook/lookbook-03-3.jpg';

import lookbook_10 from '../../assets/lookbook/lookbook-10.jpg';
import lookbook_10_1 from '../../assets/lookbook/lookbook-10-1.jpg';

import lookbook_11 from '../../assets/lookbook/lookbook-11.jpg';
import lookbook_11_1 from '../../assets/lookbook/lookbook-11-1.jpg';
import lookbook_11_2 from '../../assets/lookbook/lookbook-11-2.jpg';

import lookbook_12 from '../../assets/lookbook/lookbook-12.jpg';
import lookbook_12_1 from '../../assets/lookbook/lookbook-12-1.jpg';

import lookbook_13 from '../../assets/lookbook/lookbook-13.jpg';
import lookbook_13_1 from '../../assets/lookbook/lookbook-13-1.jpg';
import lookbook_13_2 from '../../assets/lookbook/lookbook-13-2.jpg';

import lookbook_14 from '../../assets/lookbook/lookbook-14.jpg';
import lookbook_14_1 from '../../assets/lookbook/lookbook-14-1.jpg';

import lookbook_15 from '../../assets/lookbook/lookbook-15.jpg';
import lookbook_15_1 from '../../assets/lookbook/lookbook-15-1.jpg';

import lookbook_16 from '../../assets/lookbook/lookbook-16.jpg';
import lookbook_16_1 from '../../assets/lookbook/lookbook-16-1.jpg';
import lookbook_16_2 from '../../assets/lookbook/lookbook-16-2.jpg';

import lookbook_17 from '../../assets/lookbook/lookbook-17.jpg';
import lookbook_17_1 from '../../assets/lookbook/lookbook-17-1.jpg';

import lookbook_18 from '../../assets/lookbook/lookbook-18.jpg';
import lookbook_18_1 from '../../assets/lookbook/lookbook-18-1.jpg';
import lookbook_18_2 from '../../assets/lookbook/lookbook-18-2.jpg';

// import loader from '../../assets/loader.svg';

import $ from 'jquery';
import 'slick-carousel';

import jQueryBridget from 'jquery-bridget';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
jQueryBridget('isotope', Isotope, $);
imagesLoaded.makeJQueryPlugin($);


class component extends Component {

	componentDidMount(){
        let $window = $(window),
        $body = $('body'),
        $html = $('html'),
        $ttPageContent = $('#tt-pageContent'),
        $ttFooter = $('footer'),
        $ttHeader = $('header'),
        $ttLeftColumnAside = $ttPageContent.find('.leftColumn.aside'),
        $ttFilterOptions = $ttPageContent.find('.tt-filters-options'),


    blocks = {
        ttCalendarDatepicker: $ttPageContent.find('.calendarDatepicker'),
        ttSliderBlog: $ttPageContent.find('.tt-slider-blog'),
        ttSliderBlogSingle: $ttPageContent.find('.tt-slider-blog-single'),
        ttVideoBlock: $('.tt-video-block'),
        ttBlogMasonry: $ttPageContent.find('.tt-blog-masonry'),
        ttPortfolioMasonry: $ttPageContent.find('.tt-portfolio-masonry'),
        ttProductMasonry: $ttPageContent.find('.tt-product-listing-masonry'),
        ttInputCounter: $('.tt-input-counter'),
        ttCollapseBlock: $('.tt-collapse-block'),
        modalVideoProduct: $('#modalVideoProduct'),
        modalAddToCart: $('#modalAddToCartProduct'),
        ttMobileProductSlider: $('.tt-mobile-product-slider'),
        ttCollapse: $ttPageContent.find('.tt-collapse'),
        ttProductListing: $ttPageContent.find('.tt-product-listing'),
        ttCountdown: $ttPageContent.find('.tt-countdown'),
        ttBtnColumnClose: $ttLeftColumnAside.find('.tt-btn-col-close'),
        ttBtnToggle: $ttFilterOptions.find('.tt-btn-toggle a'),
        ttBtnAddProduct: $ttPageContent.find('.tt_product_showmore'),
        ttOptionsSwatch: $ttPageContent.find('.tt-options-swatch'),
        ttProductItem: $ttPageContent.find('.tt-product, .tt-product-design02'),
        ttProductDesign02: $ttPageContent.find('.tt-product-design02'),
        ttProductDesign01: $ttPageContent.find('.tt-product'),
        ttFilterDetachOption: $ttLeftColumnAside.find('.tt-filter-detach-option'),
        ttFilterSort: $ttFilterOptions.find('.tt-sort'),
        ttShopCart: $ttPageContent.find('.tt-shopcart-table, .tt-shopcart-table-02'),
        
        ttSliderLookbook: $ttPageContent.find('.tt-slider-lookbook'),

        ttCaruselLookbook: $ttPageContent.find('.tt-carousel-lookbook'),

        ttLookbook: $ttPageContent.find('.tt-lookbook'),
        ttLookBookMasonry: $ttPageContent.find('.tt-lookbook-masonry'),
        
        ttPortfolioContent: $ttPageContent.find('.tt-portfolio-content'),
        ttAirSticky: $ttPageContent.find('.airSticky'),
        ttfooterMobileCollapse: $ttFooter.find('.tt-collapse-title'),
        ttBackToTop: $('.tt-back-to-top'),
        ttHeaderDropdown: $ttHeader.find('.tt-dropdown-obj'),
        mobileMenuToggle: $('.tt-menu-toggle'),
        ttCarouselProducts: $('.tt-carousel-products'),
        ttSliderFullwidth: $('.tt-slider-fullwidth'),
        ttCarouselBrands: $('.tt-carousel-brands'),
        sliderRevolution: $('.slider-revolution'),
        ttItemsCategories: $ttPageContent.find('.tt-items-categories'),
        ttDotsAbsolute: $ttPageContent.find('.tt-dots-absolute'),
        ttAlignmentImg: $ttPageContent.find('.tt-alignment-img'),
        ttModalQuickView: $('#ModalquickView'),
        ttProductSingleBtnZomm: $ttPageContent.find('.tt-product-single-img .tt-btn-zomm'),
        ttPromoFixed: $('.tt-promo-fixed'),
    
        mainSliderSlick: $('.mainSliderSlick'),
    
        ttSlickSlider: $ttPageContent.find('.tt-slick-slider'),
    };

    var ttwindowWidth = window.innerWidth || $window.width();


    if (blocks.mainSliderSlick.length) {
        mainSliderSlick();
        dataBg('[data-bg]');
    };
    function mainSliderSlick() {
        var $el = blocks.mainSliderSlick;
        $el.find('.slide').first().imagesLoaded({
          background: true
        }, function(){
          setTimeout(function () {
                $el.parent().find('.loading-content').addClass('disable');
          }, 1200);
        });
        $el.on('init', function (e, slick) {
          var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
          doAnimations($firstAnimatingElements);
        });
        $el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
          var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
          var $animatingElements = $currentSlide.find('[data-animation]');
          doAnimations($animatingElements);
        });
        $el.slick({
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 5500,
            fade: true,
            speed: 1000,
            pauseOnHover: false,
            pauseOnDotsHover: true,
            responsive: [{
                breakpoint: 1025,
                settings: {
                  dots: false,
                  arrows: true
                }
            }]
        });
    };
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
            var $this = $(this);
            var $animationDelay = $this.data('animation-delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
              'animation-delay': $animationDelay,
              '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function () {
              $this.removeClass($animationType);
            });
            if ($this.hasClass('animate')) {
              $this.removeClass('animation');
            }
        });
    };
    function dataBg(el) {
      $(el).each(function () {
        var $this = $(this),
          bg = $this.attr('data-bg');
        $this.css({
          'background-image': 'url(' + bg + ')'
        });
      });
    };

    if (blocks.ttSlickSlider.length) {
        blocks.ttSlickSlider.slick({
          dots: true,
          arrows: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
           responsive: [{
            breakpoint: 1025,
            settings: {
             dots: false,
            }
          }]
        });
    };

    if (blocks.ttLookbook.length) {
        ttLookbook(ttwindowWidth);
    };
    


    if (blocks.ttSliderLookbook.length) {
        blocks.ttSliderLookbook.slick({
          dots: true,
          arrows: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true
        });
    };

     if (blocks.ttCaruselLookbook.length) {
        blocks.ttCaruselLookbook.slick({
          dots: true,
          arrows: true,
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 3,
          adaptiveHeight: true,
          responsive: [{
            breakpoint: 1025,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 790,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        });
    };

    if (blocks.ttMobileProductSlider.length) {
        blocks.ttMobileProductSlider.slick({
          dots: false,
          arrows: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
           lazyLoad: 'progressive',
        });
        if($html.hasClass('ie')){
          blocks.ttModalQuickView.each(function() {
              blocks.ttMobileProductSlider.slick("slickSetOption", "infinite", false);
          });
        };
    };

    if (blocks.ttSliderBlog.length) {
        blocks.ttSliderBlog.slick({
          dots: false,
          arrows: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true
        });
    };

    if (blocks.ttSliderBlogSingle.length) {
        blocks.ttSliderBlogSingle.slick({
          dots: false,
          arrows: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true
        });
    
        var ttSlickQuantity = $('.tt-slick-quantity');
        if (ttSlickQuantity.length) {
            ttSlickQuantity.find('.total').html(blocks.ttSliderBlogSingle.slick("getSlick").slideCount);
            blocks.ttSliderBlogSingle.on('afterChange', function(event, slick, currentSlide){
                var currentIndex = $('.slick-current').attr('data-slick-index');
                currentIndex++;
                ttSlickQuantity.find('.account-number').html(currentIndex);
            });
        };
    
        var ttSlickButton = $('.tt-slick-button');
        if (ttSlickButton.length) {
            ttSlickButton.find('.slick-next').on('click',function(e) {
                blocks.ttSliderBlogSingle.slick('slickNext');
            });
            ttSlickButton.find('.slick-prev').on('click',function(e) {
                blocks.ttSliderBlogSingle.slick('slickPrev');
            });
        };
    };


    // function initSwatch($obj){
    //     $obj.each(function(){
    //         var $this = $(this),
    //             jsChangeImg = $this.hasClass('js-change-img'),
    //             optionsColorImg = $this.find('.options-color-img');

    //         $this.on('click', 'li', function(e) {
    //             var $this = $(this);
    //             $this.addClass('active').siblings().removeClass('active');
    //             if(jsChangeImg){
    //                 addImg($this);
    //             };
    //             return false;
    //         });
    //         if (optionsColorImg.length) {
    //             addBg(optionsColorImg);
    //         };
    //     });
    // };
    // function addBg(optionsColorImg){
    //   $(optionsColorImg).each(function() {
    //         $(this).css({
    //           'background-image': 'url(' + $(this).attr('data-src') + ')'
    //         });
    //   });
    // };
    // function addImg($this){
    //     var $objData = $this.find('.options-color-img'),
    //         $objDataImg = $objData.attr('data-src'),
    //         $objDataImgHover = $objData.attr('data-src-hover') || false,
    //         $objImgWrapper = $this.closest('.tt-product').find('.tt-image-box'),
    //         $objImgMain = $objImgWrapper.find('.tt-img img'),
    //         $objImgMainHover = $objImgWrapper.find('.tt-img-roll-over img');

    
    //     if($objDataImg.length){
    //         $objImgMain.attr('src', $objDataImg);
    //     };

    
    //     if($objDataImg.length){
    //         var checkDisable =  $objImgMainHover.closest('.tt-img-roll-over');
    //         $objImgMainHover.attr('src', $objDataImgHover);
    //         if(checkDisable.hasClass('disable')){
    //           checkDisable.removeClass('disable');
    //         };
    //     };

    //     if($objDataImgHover === false){
    //       $objImgMainHover.closest('.tt-img-roll-over').addClass('disable');
    //     };
    // };
  
   if (blocks.ttDotsAbsolute.length) {
      ttSlickDots();
   };
  
    $window.on('load', function () {
        if ($body.length) {
            $body.addClass('loaded');
        };
     
        if (blocks.ttProductItem.length) {
        
        };
        
        if (blocks.ttProductMasonry.length) {
           gridProductMasonr();
        };
        if (blocks.ttLookBookMasonry.length) {
         gridLookbookMasonr();
        };
        if (blocks.ttBlogMasonry.length) {
         gridGalleryMasonr();
        };
        if (blocks.ttPortfolioMasonry.length) {
          gridPortfolioMasonr();
      
        };
    });


    function ttSlickDots() {
        blocks.ttDotsAbsolute.each(function(){
            var $this = $(this).find('.slick-dots');
            if($this.is(':visible')){
                var upperParent = $this.closest('[class ^= container]');
                if (upperParent.length){
                   upperParent.css({'paddingBottom' : parseInt($this.height(), 10) + parseInt($this.css('marginTop'), 10)});
                }
            }
        });
    };

    function debouncer(func, timeout) {
        var timeoutID;
        return function() {
            var scope = this,
                args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() {
                func.apply(scope, Array.prototype.slice.call(args));
            }, timeout);
        }
    };

    function ttLookbook(ttwindowWidth){
    
        var objPopup = $('.tt-lookbook-popup');
        if(!objPopup.length){
            $body.append('<div class="tt-lookbook-popup"><div class="tt-lookbook-container"></div></div>');
        };

        blocks.ttLookbook.on('click', '.tt-hotspot' , function(e) {
            var $this = $(this),
                ttwindowWidth = window.innerWidth || $window.width(),
                ttCenterBtn = $('.tt-btn').innerHeight() / 2,
                ttWidthPopup = $('.tt-hotspot-content').innerWidth();


            ttwindowWidth <= 789 ?  ttLookbookMobile($this) : ttLookbookDesktop($this);

        
             function ttLookbookDesktop($this){

                if ($this.hasClass('active')) return;

                var objTop = $this.offset().top + ttCenterBtn,
                    objLeft = $this.offset().left,
                    objContent = $this.find('.tt-hotspot-content').detach();

                popupOpenDesktop(objContent, objTop, objLeft);

            };

            function popupOpenDesktop(objContent, objTop, objLeft){
            
                var halfWidth =  ttwindowWidth / 2,
                    objLeftFinal = 0;

                if(halfWidth < objLeft){
                    objLeftFinal = objLeft - ttWidthPopup - 7;
                    popupShowLeft(objLeftFinal);
                } else{
                    objLeftFinal = objLeft + 45;
                    popupShowRight(objLeftFinal);
                };

                $('.tt-lookbook-popup').find('.tt-lookbook-container').append(objContent);
                $this.addClass('active').siblings().removeClass('active');

                function popupShowLeft(objLeftFinal){
                  $('.tt-lookbook-popup').css({
                        'top' : objTop,
                        'left' : objLeftFinal,
                        'display' : 'block'
                      }, 300).animate({
                          marginLeft: 26 + 'px',
                          opacity: 1
                      }, 300);
                };
                function popupShowRight(objLeftFinal){
                    $('.tt-lookbook-popup').css({
                        'top' : objTop,
                        'left' : objLeftFinal,
                        'display' : 'block'
                      }).animate({
                          marginLeft: -26 + 'px',
                          opacity: 1
                      });
                };
            };
        
            function ttLookbookMobile($this){
                var valueTop = $this.attr('data-top') + '%',
                    valueLeft = $this.attr('data-left') + '%';

                $this.find('.tt-btn').css({
                    'top' : valueTop,
                    'left' : valueLeft
                });
                $this.css({
                    'top' : '0px',
                    'left' : '0px',
                    'width' : '100%',
                    'height' : '100%'
                });
                $this.addClass('active').siblings().removeClass('active');
                $this.find('.tt-content-parent').fadeIn(200);
            };
        
            if(ttwindowWidth <= 789){
                if ($('.tt-btn-close').is(e.target)){
                    closePopupMobile();
                    return false;
                };
                if ($('.tt-hotspot').is(e.target)){
                    closePopupMobile();
                };
                $(document).mouseup(function(e){
                    if (!$('.tt-lookbook-popup').is(e.target) && $('.tt-lookbook-popup').has(e.target).length === 0 && !$('.tt-hotspot').is(e.target) && $('.tt-hotspot').has(e.target).length === 0){
                         closePopupDesctop();
                    };
                });
            };
        
            if(ttwindowWidth > 789){
          
              $(document).mouseup(function(e){
                  if ($('.tt-btn-close').is(e.target)){
                      closePopupDesctop();
                      return false;
                  };
                  if (!$('.tt-lookbook-popup').is(e.target) && $('.tt-lookbook-popup').has(e.target).length === 0 && !$('.tt-hotspot').is(e.target) && $('.tt-hotspot').has(e.target).length === 0){
                       closePopupDesctop();
                  };
              });
            };

            function closePopupDesctop(){
            
                var detachContentPopup = $('.tt-lookbook-popup').removeAttr("style").find('.tt-hotspot-content').detach();
                $('.tt-hotspot.active').removeClass('active').find('.tt-content-parent').append(detachContentPopup);
            };
            function closePopupMobile(){
                if($('.tt-lookbook-container').is(':has(div)')){
                  var checkPopupContent = $('.tt-lookbook-container').find('.tt-hotspot-content').detach();
                  $('.tt-hotspot.active').find('.tt-content-parent').append(checkPopupContent);
                };
                $('.tt-lookbook').find('.tt-hotspot.active').each(function(index) {
                  var $this = $(this),
                    valueTop = $this.attr('data-top') + '%',
                    valueLeft = $this.attr('data-left') + '%';

                $this.removeClass('active').removeAttr("style").css({
                    'top' : valueTop,
                    'left' : valueLeft,
                }).find('.tt-btn').removeAttr("style").next().removeAttr("style");
                });
            };
            function checkclosePopupMobile(){
                $('.tt-hotspot').find('.tt-content-parent').each(function() {
                    var $this = $(this);
                    if($this.css('display') === 'block'){
                      var $thisParent = $this.closest('.tt-hotspot'),
                        valueTop = $thisParent.attr('data-top') + '%',
                        valueLeft = $thisParent.attr('data-left') + '%';

                      $this.removeAttr("style").prev().removeAttr("style");
                      $thisParent.removeAttr("style").css({
                        'top' : valueTop,
                        'left' : valueLeft,
                      });
                    };
                });
            };
            $(window).resize(debouncer(function(e) {
                var ttwindowWidth = window.innerWidth || $window.width();
                if(ttwindowWidth <= 789){
                    closePopupMobile();
                } else {
                    closePopupDesctop();
                    checkclosePopupMobile();
                };
            }));
        });
    };

    function gridGalleryMasonr() {
    
        var $grid = blocks.ttBlogMasonry.find('.tt-blog-init').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry',
        });
    
        $grid.imagesLoaded().progress( function() {
          $grid.isotope('layout').addClass('tt-show');
        });
    
        var ttFilterNav =  blocks.ttBlogMasonry.find('.tt-filter-nav');
        if (ttFilterNav.length) {
            var filterFns = {
                ium: function() {
                  var name = $(this).find('.name').text();
                  return name.match(/ium$/);
                }
            };
        
           ttFilterNav.on('click', '.button', function() {
                var filterValue = $(this).attr('data-filter');
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                  filter: filterValue
                });
                $(this).addClass('active').siblings().removeClass('active');
            });
        };
        var isotopShowmoreJs = $('.isotop_showmore_js .btn'),
            ttAddItem = $('.tt-add-item');
        if (isotopShowmoreJs.length && ttAddItem.length) {
            isotopShowmoreJs.on('click', function(e) {
                e.preventDefault();
                $.ajax({
                    url: 'ajax_post.php',
                    success: function(data) {
                      var $item = $(data);
                      ttAddItem.append($item);
                      $grid.isotope('appended', $item);
                      adjustOffset();
                    }
                });
                function adjustOffset(){
                    var offsetLastItem = ttAddItem.children().last().children().offset().top - 180;
                    $($body, $html).animate({
                        scrollTop: offsetLastItem
                    }, 500);
                };
                return false;
             });
        };
    };

    function gridProductMasonr() {
    
        var $grid = blocks.ttProductMasonry.find('.tt-product-init').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry',
        });
    
        $grid.imagesLoaded().progress( function() {
          $grid.isotope('layout');
        });
    
        var ttFilterNav =  blocks.ttProductMasonry.find('.tt-filter-nav');
        if (ttFilterNav.length) {
            var filterFns = {
                ium: function() {
                  var name = $(this).find('.name').text();
                  return name.match(/ium$/);
                }
            };
        
           ttFilterNav.on('click', '.button', function() {
                var filterValue = $(this).attr('data-filter');
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                  filter: filterValue
                });
                $(this).addClass('active').siblings().removeClass('active');
            });
        };
    
        var isotopShowmoreJs = $('.isotop_showmore_js .btn'),
            ttAddItem = $('.tt-add-item');
        if (isotopShowmoreJs.length && ttAddItem.length) {
            isotopShowmoreJs.on('click', function(e) {
                e.preventDefault();
                $.ajax({
                    url: 'ajax_product_metro.php',
                    success: function(data) {
                      var $item = $(data);
                      ttAddItem.append($item);
                      $grid.isotope('appended', $item);
                  
                      adjustOffset();
                    }
                });
                function adjustOffset(){
                    var offsetLastItem = ttAddItem.children().last().children().offset().top - 80;
                    $($body, $html).animate({
                        scrollTop: offsetLastItem
                    }, 500);
                };
                return false;
             });
        };
    };

    function gridLookbookMasonr() {
    
        var $grid = blocks.ttLookBookMasonry.find('.tt-lookbook-init').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry',
            gutter: 0
        });
    
        $grid.imagesLoaded().progress( function() {
          $grid.addClass('tt-show').isotope('layout');
        });
    
        var isotopShowmoreJs = $('.isotop_showmore_js .btn'),
            ttAddItem = $('.tt-add-item');
        if (isotopShowmoreJs.length && ttAddItem.length) {
            isotopShowmoreJs.on('click', function(e) {
                e.preventDefault();
                $.ajax({
                    url: 'ajax_post.php',
                    success: function(data) {
                      var $item = $(data);
                      ttAddItem.append($item);
                      $grid.isotope('appended', $item);
                       adjustOffset();
                    }
                });
                function adjustOffset(){
                    var offsetLastItem = ttAddItem.children().last().children().offset().top - 180;
                    $($body, $html).animate({
                        scrollTop: offsetLastItem
                    }, 500);
                };
                return false;
             });
        };
    };

    function gridPortfolioMasonr() {
    
        var $grid = blocks.ttPortfolioMasonry.find('.tt-portfolio-content').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry',
        });
    
        $grid.imagesLoaded().progress( function() {
          $grid.isotope('layout').addClass('tt-show');
        });
    
        var ttFilterNav =  blocks.ttPortfolioMasonry.find('.tt-filter-nav');
        if (ttFilterNav.length) {
            var filterFns = {
                ium: function() {
                  var name = $(this).find('.name').text();
                  return name.match(/ium$/);
                }
            };
        
           ttFilterNav.on('click', '.button', function() {
                var filterValue = $(this).attr('data-filter');
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                  filter: filterValue
                });
                $(this).addClass('active').siblings().removeClass('active');
            });
        };
    
        var isotopShowmoreJs = $('.isotop_showmore_js .btn'),
            ttAddItem = $('.tt-add-item');
        if (isotopShowmoreJs.length && ttAddItem.length) {
            isotopShowmoreJs.on('click', function(e) {
                e.preventDefault();
                $.ajax({
                    url: 'ajax_portfolio.php',
                    success: function(data) {
                      var $item = $(data);
                      ttAddItem.append($item);
                      $grid.isotope('appended', $item);
                  
                      adjustOffset();
                    }
                });
                function adjustOffset(){
                    var offsetLastItem = ttAddItem.children().last().children().offset().top - 180;
                    $($body, $html).animate({
                        scrollTop: offsetLastItem
                    }, 500);
                };
                return false;
             });
        };
    };

	}

	render(){
		return (
			<React.Fragment>
				<div className="tt-breadcrumb">
					<div className="container">
						<ul>
							<li><a href="/">Plantlane</a></li>
							<li>Shop The Look</li>
						</ul>
					</div>
				</div>
				<div id="tt-pageContent">
					<div className="container-indent">
						<div className="container-fluid">
							<div className="tt-block-title">
								<h1 className="tt-title">SHOP THE LOOK</h1>
							</div>
							<div className="tt-slider-lookbook arrow-location-center row tt-dots-absolute slick-animated-show-js">
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_01} alt=""/>
										<div className="tt-hotspot" style={{top: '35%', left: '64%'}} data-top="35" data-left="54">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_01} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Outdoor Oak Dining Set</div></h2>
														<div className="tt-price">
															<span className="new-price">₹30,000</span>
															<span className="old-price">₹40,000</span>
														</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
										<div className="tt-hotspot" style={{top: '57%', left: '48%'}} data-top="57" data-left="48">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_01_2} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Individual Chairs</div></h2>
														<div className="tt-price">₹6500</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_02} alt=""/>
										<div className="tt-hotspot" style={{top: '39%', left: '44%'}} data-top="39" data-left="44">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_02} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Indoor Sofa (3 Seater, White)</div></h2>
														<div className="tt-price">₹27500</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_03} alt=""/>
										<div className="tt-hotspot" style={{top: '47%', left: '45%'}} data-top="47" data-left="45">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_03_1} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Indoor Big Chair</div></h2>
														<div className="tt-price">₹8750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
										<div className="tt-hotspot" style={{top: '41%', left: '55%'}} data-top="41" data-left="55">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_03_2} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Big Planter</div></h2>
														<div className="tt-price">₹2750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
										<div className="tt-hotspot" style={{top: '41%', left: '55%'}} data-top="41" data-left="55">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_03_3} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Reading Floorstander Lamp</div></h2>
														<div className="tt-price">₹4750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container-indent">
						<div className="container-fluid-custom container-fluid-custom-mobile-padding">
							<div className="tt-block-title">
								<h1 className="tt-title">YOU MAY BE INTERESTED IN THESE</h1>
								<div className="tt-description">NEW ARRIVALS</div>
							</div>
							<div className="tt-lookbook-masonry">
								<div className="tt-lookbook-init tt-grid-col-3 tt-add-item tt-show">
									<div className="element-item">
										<div className="tt-lookbook">
											<img src={lookbook_10} alt=""/>
											<div className="tt-hotspot" style={{top: '60%', left: '37%'}} data-top="79" data-left="37">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_10_1} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Kayak #1 Stained glass suncatcher hanging from silver steel chain</div></h2>
															<div className="tt-price">₹750</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="element-item">
										<div className="tt-lookbook">
											<img src={lookbook_11} alt=""/>
											<div className="tt-hotspot" style={{top: '22%', left: '49%'}} data-top="22" data-left="49">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_11_1} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Denim Boyfriend Trucker Jacket</div></h2>
															<div className="tt-price">₹750</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
											<div className="tt-hotspot" style={{top: '27%', left: '10%'}} data-top="55" data-left="34">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_11_2} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Luna Floor Lamp</div></h2>
															<div className="tt-price">₹1750</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="element-item">
										<div className="tt-lookbook">
											<img src={lookbook_12} alt=""/>
											<div className="tt-hotspot" style={{top: '40%', left: '40%'}} data-top="40" data-left="40">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_12_1} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Nevada Planters (Set of 2)</div></h2>
															<div className="tt-price">₹500</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
											<div className="tt-hotspot" style={{top: '70%', left: '20%'}} data-top="40" data-left="40">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_12} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Metal stand for plants</div></h2>
															<div className="tt-price">₹1500</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="element-item">
										<div className="tt-lookbook">
											<img src={lookbook_13} alt=""/>
											<div className="tt-hotspot" style={{top: '35%', left: '61%'}} data-top="35" data-left="61">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_13_1} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Geometric Terrarium/</div></h2>
															<div className="tt-price">₹850</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
											<div className="tt-hotspot" style={{top: '40%', left: '27%'}} data-top="40" data-left="27">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_13_2} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Cool Boy Pineapple</div></h2>
															<div className="tt-price">₹750</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="element-item">
										<div className="tt-lookbook">
											<img src={lookbook_14} alt=""/>
											<div className="tt-hotspot" style={{top: '53%', left: '67%'}} data-top="47" data-left="67">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_14_1} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Geometric Plant Stand Oak Wood</div></h2>
															<div className="tt-price">₹650</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="element-item">
										<div className="tt-lookbook">
											<img src={lookbook_15} alt=""/>
											<div className="tt-hotspot" style={{top: '37%', left: '47%'}} data-top="37" data-left="47">
												<div className="tt-btn"></div>
												<div className="tt-content-parent">
													<div className="tt-hotspot-content">
														<div className="tt-btn-close"></div>
														<div className="tt-img">
															<div><img src={lookbook_15_1} alt=""/></div>
														</div>
														<div className="tt-description">
															<h2 className="tt-title"><div>Wine Glass Holder, Smartphone Dock/Speaker.</div></h2>
															<div className="tt-price">₹2499</div>
															<button className="btn plantlane-btn-primary">ADD TO CART</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container-indent">
						<div className="container-fluid-custom container-fluid-custom-mobile-padding">
							<div className="tt-block-title">
								<h1 className="tt-title">CURATED COLLECTION</h1>
								<div className="tt-description">SELLING HOT</div>
							</div>
							<div className="tt-carousel-lookbook arrow-location-center row tt-dots-absolute slick-animated-show-js">
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_16} alt=""/>
										<div className="tt-hotspot" style={{top: '30%', left: '50%'}} data-top="30" data-left="50">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_16_1} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Large ABSTRACT Print of Painting</div></h2>
														<div className="tt-price">₹1750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
										<div className="tt-hotspot" style={{top: '60%', left: '20%'}} data-top="30" data-left="50">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_16_2} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Yellow Chair</div></h2>
														<div className="tt-price">₹5750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_17} alt=""/>
										<div className="tt-hotspot" style={{top: '34%', left: '57%'}} data-top="34" data-left="57">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_17} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Triple Moon Phase Dream Catcher</div></h2>
														<div className="tt-price">₹750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
										<div className="tt-hotspot" style={{top: '30%', left: '14%'}} data-top="78" data-left="44">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_17_1} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Wall Hanging Thing</div></h2>
														<div className="tt-price">₹750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_18} alt=""/>
										<div className="tt-hotspot" style={{top: '22%', left: '27%'}} data-top="22" data-left="27">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_18_1} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Brass Plant Hanger</div></h2>
														<div className="tt-price">₹750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
										<div className="tt-hotspot" style={{top: '34%', left: '58%'}} data-top="34" data-left="58">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_18_2} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Abstract Oil Paint On Canvas</div></h2>
														<div className="tt-price">₹6999</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_12} alt=""/>
										<div className="tt-hotspot" style={{top: '40%', left: '40%'}} data-top="40" data-left="40">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_12_1} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Nevada Planters (Set of 2)</div></h2>
														<div className="tt-price">₹500</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
										<div className="tt-hotspot" style={{top: '70%', left: '20%'}} data-top="40" data-left="40">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_12} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Metal stand for plants</div></h2>
														<div className="tt-price">₹1500</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_17} alt=""/>
										<div className="tt-hotspot" style={{top: '34%', left: '57%'}} data-top="34" data-left="57">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_17} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Triple Moon Phase Dream Catcher</div></h2>
														<div className="tt-price">₹750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
										<div className="tt-hotspot" style={{top: '30%', left: '14%'}} data-top="78" data-left="44">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_17_1} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Wall Hanging Thing</div></h2>
														<div className="tt-price">₹750</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className="tt-lookbook">
										<img src={lookbook_14} alt=""/>
										<div className="tt-hotspot" style={{top: '53%', left: '67%'}} data-top="47" data-left="67">
											<div className="tt-btn"></div>
											<div className="tt-content-parent">
												<div className="tt-hotspot-content">
													<div className="tt-btn-close"></div>
													<div className="tt-img">
														<div><img src={lookbook_14_1} alt=""/></div>
													</div>
													<div className="tt-description">
														<h2 className="tt-title"><div>Geometric Plant Stand Oak Wood</div></h2>
														<div className="tt-price">₹650</div>
														<button className="btn plantlane-btn-primary">ADD TO CART</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default component;