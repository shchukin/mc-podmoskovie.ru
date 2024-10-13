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



    /* Аккордеон в branches */

    const branchesHandler = document.querySelectorAll('.branches__handler');

    branchesHandler.forEach(item => {
        item.addEventListener('click', event => {
            if (!isDesktop) {
                event.preventDefault();
            }
            const branchesItem = event.currentTarget.closest('.branches__item');
            branchesItem.classList.toggle('branches__item--expanded');
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


    /* Свайпер для галлереи */

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



    /* Свайпер для образования */

    new Swiper('.swiper--js-init-education', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: true,
        spaceBetween: 15,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true, // Enables clicking on pagination bullets
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            768: {
                slidesPerView: "auto",
                slidesPerGroup: 2,
                autoHeight: false,
            }
        }
    });



    /* Pins (табы) */

    document.querySelectorAll('.pins__tab').forEach((tab) => {
        tab.addEventListener('click', function () {

            const tabsContainer = tab.closest('.pins');
            const tabSiblings = Array.from(tabsContainer.querySelectorAll('.pins__tab'));
            const tabIndex = tabSiblings.indexOf(tab);

            /* Закладки */
            const currentTab = tabsContainer.querySelector('.pins__tab--current');
            currentTab.classList.remove('pins__tab--current');
            tab.classList.add('pins__tab--current');

            /* Тельца */
            const currentBody = tabsContainer.querySelector('.pins__item--current');
            currentBody.classList.remove('pins__item--current');
            const newBody = tabsContainer.querySelectorAll('.pins__item')[tabIndex];
            newBody.classList.add('pins__item--current');
        });
    });



});
