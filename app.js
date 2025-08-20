function loadScript(src, callback) {
    var script = document.createElement('script')
    script.src = src
    script.onload = callback
    script.onerror = function() {
        setTimeout(function(){ loadScript(src, callback) }, 2000)
    }
    document.head.appendChild(script)
}
loadScript("https://code.jquery.com/jquery-3.6.0.min.js", function () {
    jQuery.noConflict();
    loadScript("https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js", function () {
        jQuery(function ($) {

            // Destination slider
            const $deslider = $('.destinations-slider > .inner');
            if ($deslider.length && !$deslider.hasClass('slick-initialized')) {
                const $deArrowContainer = $('<div class="outSlider-arrows"></div>').insertBefore($deslider);
                const $dePrev = $(`<button class="slick-prev slick-arrow out-prev" type="button">Prev</button>`);
                const $deNext = $(`<button class="slick-next slick-arrow out-next" type="button">Next</button>`);
                $deArrowContainer.append($dePrev).append($deNext);
                $deslider.slick({
                    slidesToShow: 5,
                    autoplay: false,
                    appendArrows: $deArrowContainer,
                    prevArrow: $dePrev,
                    nextArrow: $deNext,
                    variableWidth: false, 
                    responsive: [
                        { breakpoint: 1800, settings: { slidesToShow: 4 } },
                        { breakpoint: 993, settings: { slidesToShow: 2 } },
                        { breakpoint: 767, settings: { slidesToShow: 1, centerMode: false } }
                    ]
                });
                function updateDeSliderMargin1() {
                    const deContainerOffsetLeft = $('.c-section > .inner').offset()?.left || 0;
                    $deslider.css('margin-left', deContainerOffsetLeft);
                }
                updateDeSliderMargin1();
                $(window).on('resize', updateDeSliderMargin1);
            }

            // Mosaic slider
            const $mosaicSlider = $('.mosaic-slider');
            if ($mosaicSlider.length && !$mosaicSlider.hasClass('slick-initialized')) {
                const $deArrowContainer = $('<div class="outSlider-arrows"></div>').insertBefore($mosaicSlider);
                const $dePrev = $(`<button class="slick-prev slick-arrow out-prev" type="button">Prev</button>`);
                const $deNext = $(`<button class="slick-next slick-arrow out-next" type="button">Next</button>`);
                $deArrowContainer.append($dePrev).append($deNext);
                $mosaicSlider.slick({
                    slidesToShow: 1,
                    autoplay: false,
                    appendArrows: $deArrowContainer,
                    prevArrow: $dePrev,
                    nextArrow: $deNext
                });
            }

            // Cruise slider
            const $crslider = $('.cruise-slider > .inner');
            if ($crslider.length && !$crslider.hasClass('slick-initialized')) {
                const $crArrowContainer = $('<div class="outSlider-arrows"></div>').insertBefore($crslider);
                const $crPrev = $(`<button class="slick-prev slick-arrow out-prev" type="button">Prev</button>`);
                const $crNext = $(`<button class="slick-next slick-arrow out-next" type="button">Next</button>`);
                $crArrowContainer.append($crPrev).append($crNext);
                $crslider.slick({
                    slidesToShow: 6,
                    autoplay: false,
                    appendArrows: $crArrowContainer,
                    prevArrow: $crPrev,
                    nextArrow: $crNext,
                    responsive: [
                        { breakpoint: 1300, settings: { slidesToShow: 5 } },
                        { breakpoint: 1180, settings: { slidesToShow: 4 } },
                        { breakpoint: 993, settings: { slidesToShow: 3 } },
                        { breakpoint: 767, settings: { slidesToShow: 2 } },
                        { breakpoint: 500, settings: { slidesToShow: 1 } }
                    ]
                });
                function updateDeSliderMargin() {
                    const deContainerOffsetLeft = $('.c-section > .inner').offset()?.left || 0;
                    $crslider.css('margin-left', deContainerOffsetLeft);
                }
                updateDeSliderMargin();
                $(window).on('resize', updateDeSliderMargin);
            }

            // Testimonials slider
            $('.testimonials-slider > .inner').slick({
                slidesToShow: 3,
                autoplay: false,
                dots: false,
                arrows: true,
                infinite: false,
                centerMode: false,
                responsive: [
                    { breakpoint: 993, settings: { slidesToShow: 2 } },
                    { breakpoint: 767, settings: { slidesToShow: 1 } }
                ]
            });

            function toggleStickyClass() {
                if ($(window).scrollTop() >= 10) {
                    $('.header-section').addClass('sticky-active');
                } else {
                    $('.header-section').removeClass('sticky-active');
                }
            }
            toggleStickyClass();
            $(window).on('scroll', toggleStickyClass);

            $(document).on('click', '.back-to-top', function(e) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            });

            $('.copyright-text').children().each(function() {
                if ($(this).text().toLowerCase().includes('year')) {
                    $(this).text($(this).text().replace(/year/gi, new Date().getFullYear()));
                    return false;
                }
            });

            setTimeout(function() {
                $('.header-section .mega-menu-container .nav-menu-ul.nav-menu-desktop')
                    .prepend('<li class="site-mobile-logo"><a href="https://app.venderflow.com/v2/preview/GV97uqCmpGt1EOfhi9Tl"><img src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/9yj6LUxLIMAPfJH3kcq3/media/686785c00c858a7b675da411.webp"></a></li>')
            }, 1000)

        })
    })

})
