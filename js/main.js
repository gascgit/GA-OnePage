
(function ($, window, document) {

    // - - - - - - - - - - OPTIONS - - - - - - - - - - - - - - //        
    op = {
        lazyload: false, // LAZY LOAD ELEMENTS ON SCROLL / IN VIEW
        fullpanels: false, // MAKE ALL PANELS HEIGHT OF WINDOW
        valignnavbar: true, // VERTICAL ALIGN TOP MENU
        navbarhighlight: true, // HIGHLIGHT MENU ITEM WHEN ITS SECTION IS IN VIEW
        regonload: false, // REGISTER POPUP ON LOAD
        bodyfade: false, // BODY HIDE ON RESIZE AND LOAD
        headerfixed: true, // FIX HEADER TO TOP
        headeropacity: true, // CHANGE HEADER OPACITY ON SCROLL
        headerlogoresize: true // RESIZE HEADER LOGO ON SCROLL
    };

    $(function () {
        $(window).load(function () {

            // - - - - - - - - - - VERTICAL ALIGN NAVBAR - - - - - - - - - - - - - - //
            function vAlignNav() {
                var navbar = $("#navbar-container");
                if (op.valignnavbar === "bottom") {
                    navbar.css("margin-top", "auto");
                    if (!isXS()) {
                        navH = navbar.height();
                        navContainerH = $(".navbar").height();
                        navbar.css("margin-top", navContainerH - navH - 15 + "px");
                    }
                } else if (op.valignnavbar) {
                    navbar.css("margin-top", "auto");
                    if (!isXS()) {
                        navH = navbar.height() / 2;
                        navContainerH = $("nav").height() / 2;
                        navbar.css("margin-top", navContainerH - navH + "px");
                    }
                }
            }
            // - - - - - - - - - - SET FULL HEIGHT PANELS - - - - - - - - - - - - - - //
            function fullPanel() {
                if (op.fullpanels) {
                    $(".section").css("height", winSize(false) - $(".navbar-inverse").height() + "px");
                }
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - RETURN WINDOW SIZE - - - - - - - - - - - - - - //
            function winSize(w, half) {
                divide = half ? 2 : 1;
                console.log(w + " ::: " + half);
                if (w) {
                    return $(window).width() / divide;
                } else {
                    return $(window).height() / divide;
                }
            }
            // - - - - - - - - - - - - - - - - - - - - //

            var winW = winSize(true);
            var firstFire = true;

            // - - - - - - - - - - INITIAL LOAD AND RESIZE - - - - - - - - - - - - - - //
            function isLoaded(inChk) {
                // - - - - - - - - - - PAUSE ON LOAD
                setTimeout(function () {
                    // - - - - - - - - - - MAKE SURE WINDOW SIZE HAS ACTUALLY CHANGED (TABLET/PHONE KEYBOARD)
                    if (inChk === true || winW !== winSize(true)) {
                        fullPanel();
                        sameHeight();
                        vAlignNav();
                        vAlign();
                        fadeIn();
                    }
                    winW = winSize(true);
                    firstFire = false;
                }, 250);
            }
            isLoaded(firstFire);
            $(window).resize(function () {
                setTimeout(function () {
                    if (winW !== winSize(true)) {
                        isLoaded(firstFire);
                    }
                }, 250);
            });
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - FADE IN BODY ON LOAD - - - - - - - - - - //
            function fadeIn() {
                if (op.headerfixed) {
                    $("body").css("padding-top", $("nav").height());
                    $("nav").addClass("navbar-fixed-top");
                } else {
                    $("nav").removeClass("navbar-fixed-top").css("margin-bottom", "0");
                }
            }
            //
            // - - - - - - - - - - IS MOBI ONLY - - - - - - - - - - //
            function isCell() {
                return (/Android|webOS|iPhone|iPod|BlackBerry|BB|IEMobile|Windows Phone|Silk|Opera Mini/i.test(navigator.userAgent)) ? true : false;
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - IS MOBI OR TABLET - - - - - - - - - - //
            function isMobi() {
                return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) ? true : false;
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - IS XS VISIBLE - - - - - - - - - - //
            function isXS() {
                return $("#is-xs").css("display") === "block" ? true : false;
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - IS SM VISIBLE - - - - - - - - - - //
            function isSM() {
                return $("#is-sm").css("display") === "block" ? true : false;
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - MAIN MENU SCROLLER - - - - -  - - - - - //
            var navit = $('.navit');
            navit.on({
                "click": function (event) {
                    event.preventDefault();
                    if (isXS()) {
                        $(".navbar-collapse").animate({
                            height: "1px"
                        }).removeClass("in");
                    }
                    var thsNav = $(this).attr("href");
                    if (thsNav !== 'body') {
                        $(".panelbox").hide();
                        $(thsNav).fadeIn();
                    }
                    if ($(thsNav).length) {
                        $("body").bind('mousewheel DOMMouseScroll', function (e) {
                            return false;
                        });
                        if (op.headerfixed) {
                            getPad = $(".navbar-inverse").height(); // FIXED TOP HEADER
                            if (op.headerlogoresize && $("nav").height() > 100) { // IF LOGO RESIZES, NAV BAR HEIGHT GETS SMALLER ON SCROLL
                                getPad -= 40; // DIFFERENCE OF HEIGHT SIZE BETWEEN BIG AND SMALL LOGO
                            }
                        } else {
                            getPad = 0;
                        }
                        scrollIt = setTimeout(function () {
                            $('html, body').animate({
                                scrollTop: $(thsNav).offset().top - getPad
                            }, 1500, function () {
                                $("body").unbind('mousewheel DOMMouseScroll');
                            });
                        }, 500);
                    }
                }
            });
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - MAIN MENU CHANGE INDICATOR ON SCROLL - - - - - - - - - - //
            function scrollToTop() {
                return $(document).scrollTop();
            }

            var getLast = '';
            $(window).on('scroll', function () {
                // - - - - - - - - - - SIZE OF LOGO ON SCROLL - - - - - - - - - - //
                if (op.headerlogoresize) {
                    var logo = $('#logo');
                    //var threshold = 0;
                    var threshold = $("nav").height();
                    if (scrollToTop() > threshold) {
                        logo.addClass("small");
                    } else {
                        logo.removeClass("small");
                    }
                    setTimeout(function () {
                        vAlignNav();
                    }, 250);
                }

                // - - - - - - - - - - BACKGROUND OPACITY ON SCROLL - - - - - - - - - - //
                if (op.headeropacity) {
                    var nav = $('nav');
                    if (scrollToTop() > $("nav").height()) {
                        nav.addClass("opacity");
                    } else {
                        nav.removeClass("opacity");
                    }
                }

                // - - - - - - - - - - HIGHLIGHT NAVBAR MENU ITEM - - - - - - - - - - //
                if (op.navbarhighlight) {
                    var scrollTop = $(this).scrollTop();
                    var section = $('.section');
                    section.each(function () {
                        var topDistance = $(this).offset().top;
                        getprev = getLast;
                        firstSection = section.eq(0).offset().top - ($(".navbar-inverse").height() + 1);
                        if ((topDistance - ($(".navbar-inverse").height() + 1)) < scrollTop) {
                            $(".navbar-form a").removeClass("actv");
                            getLast = $(this).attr("id");
                            $("#navbar-container [href=#" + getLast + "]").addClass("actv");
                        } else if (scrollTop < firstSection) {
                            $(".navbar-form a").removeClass("actv");
                            $("#navbar-container [href=body]").addClass("actv");
                        }
                    });
                }
                // - - - - - - - - - - - - - - - - - - - - //
                //
                // - - - - - - - - - - FADE IN SECTION ON SCROLL - - - - - - - - - - //
                if (op.lazyload) {
                    var section = $('.section');
                    section.each(function (i) {
                        var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 5;
                        var bottom_of_window = $(window).scrollTop() + $(window).height();
                        var elemTop = $(this).offset().top;
                        var elemBottom = elemTop + $(this).height();

                        if (bottom_of_window > bottom_of_object) {
                            $(this).animate({
                                'opacity': '1'
                            }, 400);
                        } else if (elemTop < elemBottom) {
                            $(this).stop(true, false).animate({
                                'opacity': '0'
                            }, 250);
                        }
                    });
                }
                // - - - - - - - - - - - - - - - - - - - - //
            });
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - VERTICAL ALIGN ELEMENT TO PARENT - - - - - - - - - - //
            function vAlign(inParent) {
                setTimeout(function () {
                    $(".valign").each(function () {
                        parentH = !inParent ? $(this).parent().height() / 2 : inParent;
                        thsH = $(this).height() / 2;
                        $(this).css("margin-top", parentH - thsH + "px");
                    });
                }, 200);
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - FANCYBOX - - - - - - - - - - //
            $(".fbox").fancybox({
                padding: 0
            });
            $(".fancybox").fancybox({
                padding: 0
            });

            // - - - - - - - - - - TRIGGER REGISTRATION ON LOAD - - - - - - - - - - //
            if (op.regonload) {
                $.fancybox.open([{
                        href: '#registernowPop'
                    }], {
                    padding: 0,
                    maxWidth: 950
                });
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - HASHTAG LISTENER ON LOAD (THANK YOU)- - - - - - - - - - //
            var hash = window.location.hash;
            if (hash === "#thankyou") {
                $("#registernow-pop .title2").html("THANK YOU FOR REGISTERING<br/>WITH SUMMERFIELDS");
                thankYou = "<div class='col-md-12 text-center'><p style='color:#756724'>Thank you for registering with Riverside Trail. Stay tuned for your first exclusive update coming soon.</p></div>";
                $("#registernow-pop #regform-container .row").html(thankYou);
                getPad = $(".navbar-header").height();
                $("#regbox-title").html("THANK YOU FOR REGISTERING<br/>WITH RIVERSIDE SUMMERFIELDS");
                $("#regbox-text").html("<p class='text-center'>Stay tuned for your first exclusive update coming soon.</p>");
                $('html, body').animate({
                    scrollTop: $("#registernow-pop").offset().top
                }, 1500);
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - FORM VALIDATION - - - - - - - - - - //
            var submitformbutton = $(".submitformBtn");
            submitformbutton.on({
                "click": function () {
                    err = false;
                    regID = $(this).attr("data-regformid");
                    $(regID + " .req," + regID + " .selector").removeClass("input-err");
                    $(".err-msg").hide();
                    $(regID + " .req").each(function () {
                        if (!$(this).val()) {
                            if ($(this).attr("data-target")) {
                                $($(this).attr("data-target")).addClass("input-err");
                                $(regID + " .err-msg").show();
                                err = true;
                            } else {
                                $(this).addClass("input-err");
                                $(regID + " .err-msg").show();
                                err = true;
                            }
                        }
                    });
                    if (err) {
                        return false;
                    }
                }
            });
            $("input[type=text], input[type=email]").bind("click focus", function () {
                $(".err-msg").hide();
                $(this).removeClass("input-err");
            });
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - ONLY NUMBERS IN PHONE FIELD - - - - - - - - - - //
            var numbersonly = $(".numonly");
            numbersonly.keydown(function (e) {
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                        // Allow: Ctrl+A, Command+A
                                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                                // Allow: home, end, left, right, down, up
                                        (e.keyCode >= 35 && e.keyCode <= 40)) {
                            // let it happen, don't do anything
                            return;
                        }
                        // Ensure that it is a number and stop the keypress
                        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    });
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - SAME HEIGHT ROW / COLUMN - - - - - - - - - - //
            // .sameH = Parent, .sameHRow = Child, .sameHVBot = Element (ie button) you want to centre and align to bottom
            function sameHeight() {
                $(".sameHRow").css("height", "auto");
                $(".valign").css("margin-top", "0");

                var valigncentre = $(".sameHVBot");
                setTimeout(function () {
                    if (!isXS() && !isSM()) {
                        $(".sameH").each(function () {
                            setH = 0;
                            setVBotH = 0;
                            $(".sameHRow", this).each(function () {
                                $(".sameHVBot", this).css({
                                    "position": "absolute"
                                });
                                sameHVBotMargin = (($(".sameHVBot", this).outerWidth() / 2) * -1);
                                if ($(".sameHVBot", this).outerHeight() > setVBotH) {
                                    setVBotH = $(".sameHVBot", this).outerHeight();
                                }
                                if ($(this).height() > setH) {
                                    setH = $(this).height();
                                }
                                $(".sameHVBot", this).css({
                                    "margin-left": sameHVBotMargin + "px",
                                    "left": "50%",
                                    "bottom": "20px"
                                });
                            });
                            $(".sameHRow", this).height(setH + setVBotH);
                        });
                    } else {
                        valigncentre.css({
                            "position": "relative",
                            "margin": "0 auto",
                            "left": "inherit",
                            "bottom": "inherit"
                        });
                    }
                }, 100);
            }
            // - - - - - - - - - - - - - - - - - - - - //
            //
            // - - - - - - - - - - SLICK SLIDER - - - - - - - - - - //
            if ($(".slider-fullwidth").length) {
                $('.slider-fullwidth').slick();
            }

            $('.slider-centered').on('init', function (event) {
                centerNav();
            });

            function centerNav() {
                setTimeout(function () {
                    divW = ($('.slider-centered .slick-current').outerWidth());
                    console.log($('.slider-centered .slick-current').offset().left + " : " + ($('.slider-centered .slick-current').offset().left - $(".slider-centered").offset().left));
                    setLeft = ($('.slider-centered .slick-current').offset().left - $(".slider-centered").offset().left);
                    left = setLeft - (divW / 2) - 25;
                    right = setLeft + (divW + (divW / 2)) - 30;
                    $(".slider-centered .slick-prev").css("left", left + "px");
                    $(".slider-centered .slick-next").css("left", right + "px");
                }, 250);
            }
            $(window).resize(centerNav);

            if ($(".slider-centered").length) {
                $('.slider-centered').slick({
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 3,
                    responsive: [{
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 3
                            }
                        }, {
                            breakpoint: 480,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
            // - - - - - - - - - - end SLICK SLIDER - - - - - - - - - - //
        });
    });
}(window.jQuery, window, document));
