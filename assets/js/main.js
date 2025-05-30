gsap.registerPlugin(ScrollTrigger);

$(document).ready(function(){


    const intro = gsap.timeline({
        onStart: () => {
            $('body').css('overflow', 'hidden');
        },
        onComplete: () => {
            $('body').css('overflow', '');
        }
    });
    
    intro.from('.load .text', {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: 'power2.out',
    }, 'a')
    .to('.load', {
        duration: 1,
        yPercent: -100,
        ease: 'power3.out',
    }, 'b+=1');
    

    mainSwiper = new Swiper('.sc-visual .swiper', {
        loop: true,
        effect: 'fade',
        speed: 1000,
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    const visualText = gsap.timeline({
        scrollTrigger:{
            trigger: '.sc-visual',
            start: '0% 0%',
            end: '100% 50%',
            scrub: 1,
        }
    });
    visualText.fromTo('.sc-visual .title', {
        opacity: 0.4,
        y: 320,
        letterSpacing: "-0.1em",
    }, {
        opacity: 1,
        letterSpacing: "-0.03em",
    },'a')
    visualText.to('.sc-visual', {
        scale: 0.97,
    }, 'b')
    visualText.to('.sc-visual .swiper', {
        borderRadius: 30,
    }, 'b')

    function menuStaggerUp(target){
        gsap.from($(target).find('>*'),{
            opacity: 0,
            y: 15,
            stagger: 0.1,
            duration: .7,
            ease: "power2.out"
        });
    }

    $btnMenu = $('.btn-menu');

    $btnMenu.click(function(){
        $(this).toggleClass('active');
        $('.sm-nav').toggleClass('active');

        if ($(this).hasClass('active')){
            $('body').css('overflow', 'hidden');
            menuStaggerUp('.sm-nav [data-menu-motion="up-stagger"]')
        } else {
            $('body').css('overflow', 'visible');
        }
    });
    
    $('.sm-nav .nav-link').click(function(e){
        e.preventDefault();
        
        const menuSection = $($(this).attr('href'));
        
        $('.sm-nav').removeClass('active');
        $('.btn-menu').removeClass('active');
        $('#header .inner .link').css('opacity', 1);
        $('body').css('overflow', 'visible');

        setTimeout(() => {
            $('html, body').animate({
                scrollTop: menuSection.offset().top
            }, 300);
        }, 300);
    })

    $(document).on('mousemove', function (e) {
        $('.cursor-dot').css({
          left: e.clientX,
          top: e.clientY
        });
    });   
    
    let rotation = 0;
    gsap.ticker.add(() => {
        rotation += 2,
        gsap.set('.cursor-dot', { rotation: rotation });
    });

    $(document).on('mouseenter', 'a, .link, .hov, .link-wrap, .btn-link, .close-popup, .btn-menu, .btn-top, .profile', function () {
        $('.cursor-dot').addClass('hover');
    });
    $(document).on('mouseleave', 'a, .link, .hov, .link-wrap, .btn-link, .close-popup, .btn-menu, .btn-top, .profile', function () {
        $('.cursor-dot').removeClass('hover');
    });

    const scroll = gsap.timeline({
        scrollTrigger: {
            trigger: "#wrapper",
            start: "0% top",
            end: "130% bottom",
            scrub: 1,
        }
    });
    scroll.to('.scrollbar', {
        height: "100%"
    });

    $('[data-motion="up"]').each(function(i,item){
        gsap.from(item,{
          scrollTrigger:{
            trigger:item,
            start:"0% 60%",
            end:"100% 100%",
          },
          opacity:0,
          y:10,
        })
    })

    $('[data-motion="up-stagger"]').each(function(i,item){
        gsap.from($(this).find('>*'),{
          scrollTrigger:{
            trigger:item,
            start: "top 90%",
            end: "bottom 60%",
          },
          opacity:0,
          stagger:0.1,
          y:15,
        })
    });

    let lastScrollTop = 0;

    $(window).on('scroll', function() {
        const curr = $(this).scrollTop();
        const headerH = $('#header').height();
        const windowWidth = $(window).width();

        if (curr < lastScrollTop && curr > 20) {
            $('.btn-wrap').addClass('hide');
        } else {
            $('.btn-wrap').removeClass('hide');
        }

        lastScrollTop = curr;
    });

    $('.btn-wrap').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    $('nav a[href^="#"]').click(function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        $('html, body').animate({
            scrollTop: $(targetId).offset().top
        }, 400);
        
        return false;
    });

    const about = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-about",
            start: "0% 0%",
            end: "100% 50%",
            scrub: 1,
        }
    });
    about.fromTo('.background', {
        filter: 'grayscale(100%) blur(0.2px)',
        opacity: 0.1,
    }, {
        filter: 'grayscale(0%) blur(0px)',
        opacity: 0.3,
    });
    
    
    const $wrapper = $('.sc-main .swiper-wrapper');
    const scrollAmount = $wrapper[0].scrollWidth - $(window).width();
    
    const main = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-main",
            start: "top top",
            end: () => `+=${scrollAmount + 500}`, 
            scrub: true,
            pin: true,
            anticipatePin: 1,
        }
    });
    

    main.from(".sc-main .headline .title", {
      xPercent: -30,
      opacity: 0,
    },'a')
    .from(".sc-main .swiper .swiper-slide", {
        yPercent: 100,
        stagger: 0.1,
        opacity: 0,
        ease: "power2.out",
    },'a')
    .from(".sc-main .headline .desc", {
        xPercent: -30, 
        opacity: 0,
    },'a')
    .to(".sc-main .swiper-wrapper", {
      x: -scrollAmount - 500,
      ease: "power1.inOut",
    },'a+=.5')
    .to('.background', {
        opacity: 0,
    }, 'b')

    $(document).on("mouseenter", ".sc-main .swiper-slide", function () {
        $(".sc-main .swiper-slide").not(this).css("pointer-events", "none");
    }).on("mouseleave", ".sc-main .swiper-slide", function () {
        $(".sc-main .swiper-slide").css("pointer-events", "");
    });

    $('.sc-main .swiper-slide').on('mouseenter', function(){
        $('.sc-main .swiper-slide').css('z-index', '');
        $(this).css('z-index', 9999);
    });

    $('.sc-main .swiper-slide').on('mouseleave', function(){
        $(this).css('z-index', '');
    });

    const side = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-side",
            start: "-10% 0%",
            end: "90% 90%",
            scrub: 1,
        },
    });

    side.from('.sc-side .side-wrap .title', {
        xPercent: -30,
        opacity: 0,
        ease: "power2.out"
    }, 'a')
    .from(".sc-side .side-wrap .desc", {
        opacity: 0,
    }, 'a')
    .from('.sc-side .side-item',{
        xPercent: 50,
        opacity: 0, 
        stagger: 0.2,
    }, 'b+1')
    .to('.sc-side .side-wrap', {
        scale: 0.97,
    }, 'c')

    ScrollTrigger.create({
        trigger: ".sc-side",
        start: "-100px top",
        end: "bottom bottom",
        onEnter: function(){
            $("#header").addClass("inverted");
        },
        onLeaveBack: function(){
            $("#header").removeClass("inverted");
        },
    });

    $(window).on("resize", function(){
        ScrollTrigger.refresh();
    });



    const cloneList = $('#footer .title-wrap').clone();
    $('#footer .title-flex').append(cloneList);

    
    $('.sc-side .link').on('mousemove', function (e) {
        const $imgArea = $(this).find('.img-area');
        const offsetX = e.pageX - $(this).offset().left;
        const offsetY = e.pageY - $(this).offset().top;

        const imgWidth = $imgArea.outerWidth();
        const imgHeight = $imgArea.outerHeight();

        $imgArea.css({
            top: (offsetY - imgHeight / 2) + 'px',
            left: (offsetX - imgWidth / 2) + 'px'
        });
    }).on('mouseenter', function () {
        $(this).find('.img-area').css('opacity', 1);
    }).on('mouseleave', function () {
        $(this).find('.img-area').css('opacity', 0);
    });

    $('.btn-link.more, .sc-main img').on('click', function(e) {
        e.preventDefault();
        
        const $currentItem = $(this).closest('.sc-main .swiper-slide');
        
        const $detailContent = $currentItem.find('.group-detail').html();
        
        $('body').append(`
        <div class="fixed-detail-popup">
            <div class="popup-content" data-lenis-prevent>
            ${$detailContent}
            </div>
            <button class="close-popup"></button>
        </div>
        <div class="detail-overlay"></div>
        `);
    
        $('.sc-main .swiper-slide').css('pointer-events', 'none');
        
        $('body').css({
            overflow: 'hidden',
            height: '100vh'
        });
        
        return false;
    });
    
    $(document).on('click', '.detail-overlay, .close-popup', closeDetail);
    
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetail();
        }
    });
    
    function closeDetail() {
        $('.fixed-detail-popup, .detail-overlay').remove();
        $('.sc-main .swiper-slide').css('pointer-events', '');

        $('body').css({
            overflow: '',
            height: ''
        });
    }

});