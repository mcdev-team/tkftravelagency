jQuery(document).ready(function ($) {
    const $deslider = $('.destinations-slider > .inner');

    if ($deslider.length && !$deslider.hasClass('slick-initialized')) {
        $('<div class="outSlider-arrows"></div>').insertBefore($deslider);

        $('.outSlider-arrows').append('<button class="slick-prev slick-arrow out-prev" type="button">Prev</button>');
        $('.outSlider-arrows').append('<button class="slick-next slick-arrow out-next" type="button">Next</button>');

        $deslider.slick({
            slidesToShow: 3,
            autoplay: false,
            infinite: false,
            appendArrows: $('.outSlider-arrows'),
            prevArrow: $('.out-prev'),
            nextArrow: $('.out-next'),
            responsive: [
                {
                    breakpoint: 993, 
                    settings: {
                    slidesToShow: 2
                    }
                }, {
                    breakpoint: 767, 
                    settings: {
                    slidesToShow: 1
                    }
                }
            ]
        });

        function updateSliderMargin() {
            const containerOffsetLeft = $('.destination-slider-section > .inner').offset()?.left || 0;
            $deslider.css('margin-left', containerOffsetLeft);
        }

        updateSliderMargin();
        $(window).on('resize', updateSliderMargin);
    }
    
    // Destination slider
    /*$('.destinations-slider > .inner').slick({
    slidesToShow: 3,
    autoplay: false,
    dots: false,
    arrows: true,
    infinite: false,
    responsive: [
        {
            breakpoint: 993, 
            settings: {
            slidesToShow: 2
            }
        },
        {
            breakpoint: 767, 
            settings: {
            slidesToShow: 1
            }
        }
        ]
    });*/

    // Cruise slider
    jQuery(function($) {
    $('.cruise-slider > .inner').slick({
        slidesToShow: 4,
        autoplay: false,
        dots: false,
        arrows: true,
        infinite: false,
        centerMode: false,
        responsive: [
        {
            breakpoint: 993, 
            settings: {
            slidesToShow: 3
            }
        },
        {
            breakpoint: 767, 
            settings: {
            slidesToShow: 1
            }
        }
        ]
    });
    });


    // Testimonials slider
    $('.testimonials-slider > .inner').slick({
    slidesToShow: 3,
    autoplay: false,
    dots: false,
    arrows: true,
    infinite: false,
    centerMode: false,
        responsive: [
        {
            breakpoint: 993,
            settings: {
            slidesToShow: 2
            }
        },
        {
            breakpoint: 767, 
            settings: {
            slidesToShow: 1
            }
        }
        ]
    });

    function toggleStickyClass() {
    if ($(window).scrollTop() >= 10) {
        $('.header-section').addClass('sticky-active');
    } else {
        $('.header-section').removeClass('sticky-active');
    }
    }

    // Run on page load
    toggleStickyClass();

    // Run on scroll
    $(window).on('scroll', toggleStickyClass);

    // Back to top btn
    $(document).on('click', '.back-to-top', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    // Current year
    $('.copyright-text').children().each(function() {
    if ($(this).text().toLowerCase().includes('year')) {
        $(this).text($(this).text().replace(/year/gi, new Date().getFullYear()));
        return false;
    }
    });

    // Mobile menu logo 
    setTimeout(function() {
    jQuery('.header-section .mega-menu-container .nav-menu-ul.nav-menu-desktop')
    .prepend('<li class="site-mobile-logo"><a href="https://app.venderflow.com/v2/preview/GV97uqCmpGt1EOfhi9Tl"><img src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/9yj6LUxLIMAPfJH3kcq3/media/686785c00c858a7b675da411.webp"></a></li>')
    }, 1000)
})
