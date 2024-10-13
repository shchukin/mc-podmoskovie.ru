document.addEventListener("DOMContentLoaded", (event) => {


    /* Константы */

    let isDesktop; /* т.е. не смартфон, а любой десктоп */

    function initGlobalConstant() {
        isDesktop = window.matchMedia("(min-width: 740px)").matches;
    }

    /* При открытии страницы */
    initGlobalConstant();

    /* При ресайзе страницы */
    window.addEventListener('resize', initGlobalConstant);



    /* Аккордеон */

    const accordionHandler = document.querySelectorAll('.accordion__handler');

    accordionHandler.forEach(item => {
        item.addEventListener('click', event => {
            const accordionItem = event.currentTarget.closest('.accordion__item');
            accordionItem.classList.toggle('accordion__item--expanded');
        });
    });



    /* Инициализация Swiper`ов */

    let swiperInstances = [];

    function initSwipers() {

        /* Свайпер нужен только на смартфонах */
        if (!isDesktop) {
            if (swiperInstances.length === 0) {
                document.querySelectorAll('.swiper--js-init-department').forEach((element, index) => {
                    const swiper = new Swiper(element, {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        autoHeight: false,
                        spaceBetween: 15,
                        pagination: {
                            el: element.querySelector('.swiper-pagination'),
                            type: 'fraction',
                        },
                        navigation: {
                            nextEl: element.querySelector('.swiper-button-next'),
                            prevEl: element.querySelector('.swiper-button-prev'),
                        },
                        breakpoints: {
                            570: {
                                slidesPerView: 2,
                                slidesPerGroup: 2,
                            },
                        },
                    });
                    swiperInstances.push(swiper); // Store swiper instance
                });
            }
        } else {
            if (swiperInstances.length > 0) {
                swiperInstances.forEach(swiper => swiper.destroy(true, true));
                swiperInstances = []; // Clear swiper instances
            }
        }
    }

    /* При открытии страницы */
    initSwipers();

    /* При ресайзе страницы */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initSwipers, 1000);
    });


    new Swiper('.swiper--js-init-gallery', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: false,
        spaceBetween: 15,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });



});
