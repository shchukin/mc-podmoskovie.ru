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

    /* Форма */

    /* Уведомления */
    document.querySelectorAll('.alert').forEach(function (alert) {
        alert.addEventListener('click', function () {
            alert.style.display = 'none';
        });
    });

    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 27) {
            document.querySelectorAll('.alert').forEach(function (alert) {
                alert.style.display = 'none';
            });
        }
    });


    /* Сама форма */
    document.querySelectorAll('[data-js-form]').forEach(function (form) {
        const subscriptionInputs = form.querySelectorAll('.input, .choice');
        const subscriptionSubmit = form.querySelector('[data-js-submit]');
        const subscriptionSuccessAlert = document.querySelector('[data-js-alert-success]');
        const subscriptionFailureAlert = document.querySelector('[data-js-alert-failure]');

        /* Состояния инпутов (на время отправки формы инпуты должны блокироваться) */
        function disableSubscriptionInputs() {
            subscriptionInputs.forEach((input) => {
                input.querySelector('.input__widget, .choice__widget').setAttribute('disabled', 'disabled');
            });
        }

        function enableSubscriptionInputs() {
            subscriptionInputs.forEach((input) => {
                input.querySelector('.input__widget, .choice__widget').removeAttribute('disabled');
            });
        }

        /* Очистка инпутов (после успешной отправки форму должны очищаться) */
        function cleanSubscriptionInputs() {

            subscriptionInputs.forEach((input) => {

                /* Есть три варианта инпутов: */

                // 1) Текстовые инпуты внутри компонента .input (это всё, что не тег <select>):
                const textInputs = input.querySelector('.input__widget:not(select)');
                if (textInputs) {
                    textInputs.value = '';
                }

                // 2) <select> внутри .input
                const selects = input.querySelector('select.input__widget');
                if (selects) {
                    const placeholderOption = Array.from(selects.options).find(option => option.getAttribute('value') === 'placeholder');
                    if (placeholderOption) {
                        selects.value = placeholderOption.value;
                        input.classList.add('input--placeholder-is-chosen');
                    }
                }

                // 3) .choice__widget
                const choices = input.querySelector('.choice__widget');
                if (choices) {
                    choices.checked = false;
                }
            });
        }

        /* Состояния кнопки */
        function changeSubmitStateToLoading() {
            subscriptionSubmit.classList.add('button--loading');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToSuccess() {
            subscriptionSubmit.classList.remove('button--loading');
            subscriptionSubmit.classList.add('button--success');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToFailure() {
            subscriptionSubmit.classList.remove('button--loading');
            subscriptionSubmit.classList.add('button--warning');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToPristine() {
            subscriptionSubmit.classList.remove('button--loading', 'button--success', 'button--warning');
            subscriptionSubmit.removeAttribute('disabled');
        }

        /* Если пользователь начал взаимодействовать с инпутами, то убираем уведомления с прошлой попытки отправки: */
        subscriptionInputs.forEach(input => input.addEventListener('input', () => {
            subscriptionFailureAlert.style.display = 'none';
        }));


        /* Отправка */
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            /* Если с прошлой попытки висит уведомление об ошибке: */
            subscriptionFailureAlert.style.display = 'none';

            /* Начинаем отправку данных, для начала блокируем форму */
            disableSubscriptionInputs();
            changeSubmitStateToLoading();

            /* Представим, что 3000ms отправляем данные */
            setTimeout(function () {

                /* ... дальше развилка, пусть для примера будет рандом 50/50: */

                // Если данные успешно отправлены
                if (Math.random() < 0.5) {

                    // показываем зелёное уведомление:
                    subscriptionSuccessAlert.style.display = 'block';

                    // показываем галочку на кнопке:
                    changeSubmitStateToSuccess();

                    // и то и другое на 4.5 секунды:
                    setTimeout(function () {
                        subscriptionSuccessAlert.style.display = 'none';
                        changeSubmitStateToPristine();
                        enableSubscriptionInputs();

                        //и очищаем форму:
                        cleanSubscriptionInputs();
                    }, 4500);

                }

                // Если произошла ошибка
                else {

                    // показываем красное уведомление
                    subscriptionFailureAlert.style.display = 'block';

                    // Показываем восклицательный знак на кнопке:
                    changeSubmitStateToFailure();

                    // В данном случае всего 2 секунды, чтобы пользователь мог быстро вернуться к работе с формой.
                    // Уведомление в этом случае НЕ убираем -- пусть висит, пока пользователь не увидит и явно не закроет, или не начнёт заново заполнять форму / попытается отправить:
                    setTimeout(function () {
                        changeSubmitStateToPristine();
                        enableSubscriptionInputs();
                    }, 2000);

                }

            }, 3000);

        });
    });



    /* Параллакс счётчиков */
    /* https://dev.to/clementgaudiniere/create-a-parallax-effect-when-the-mouse-moves-3km0 */

    function parallax(event) {
        this.querySelectorAll(".counters__item").forEach((shift) => {
            const position = shift.getAttribute("value");

            const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;

            // Print the normalized positions (optional)
            console.log(`Normalized X: ${normalizedX}, Normalized Y: ${-normalizedY}`);


            shift.style.transform = `translateX(${normalizedX * position}px) translateY(${normalizedY * position}px)`;
        });
    }

    document.addEventListener("mousemove", parallax);

});
