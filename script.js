document.addEventListener('DOMContentLoaded', function () {
    // Плавная прокрутка для навигации
    const smoothScroll = function (target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;

        const animation = function (currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });

    // Мобильное меню
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Функция переключения меню
    function toggleMenu() {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    }

    // Обработчик клика на бургер
    burger.addEventListener('click', toggleMenu);

    // Обработчик клика на ссылки
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                toggleMenu();
            }
        });
    });


    // Таймер обратного отсчета
    const countdown = function () {
        const countDate = new Date('July 30, 2023 00:00:00').getTime();
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        document.querySelector('.days').innerText = textDay;
        document.querySelector('.hours').innerText = textHour;
        document.querySelector('.minutes').innerText = textMinute;
        document.querySelector('.seconds').innerText = textSecond;
    };

    setInterval(countdown, 1000);

    // Добавьте это перед обработчиком отправки формы
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function (e) {
        // Удаляем все нецифровые символы
        let cleaned = e.target.value.replace(/\D/g, '');

        // Форматируем номер
        if (cleaned.length > 0) {
            if (cleaned.length <= 11) {
                if (cleaned.length === 11) {
                    cleaned = `+${cleaned.substring(0, 1)} (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 9)}-${cleaned.substring(9)}`;
                } else if (cleaned.length === 10) {
                    cleaned = `+7 (${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 8)}-${cleaned.substring(8)}`;
                }
            }
        }

        e.target.value = cleaned;
    });

    // Улучшенная функция показа уведомлений
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Стили для уведомления
        const styles = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3'
        };

        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = styles[type];
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        notification.style.animation = 'slideIn 0.5s ease-out';

        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 1000);
        }, 13000);
    }



    // Уведомления
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // FAQ аккордеон
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Анимация появления элементов при скролле
    const fadeInElements = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeInElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Кнопка "Наверх"
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Валидация формы
    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        let isValid = true;

        if (name.value.trim() === '') {
            showError(name, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else {
            removeError(name);
        }

        if (email.value.trim() === '') {
            showError(email, 'Пожалуйста, введите ваш email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Пожалуйста, введите корректный email');
            isValid = false;
        } else {
            removeError(email);
        }

        if (phone.value.trim() === '') {
            showError(phone, 'Пожалуйста, введите ваш номер телефона');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Пожалуйста, введите корректный номер телефона');
            isValid = false;
        } else {
            removeError(phone);
        }

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            formGroup.appendChild(error);
        } else {
            errorElement.textContent = message;
        }
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone));
    }

    // Обработка отправки формы
    const applicationForm = document.getElementById('applicationForm');
    applicationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            // Здесь можно добавить код для отправки данных на сервер
            console.log('Форма отправлена');
            showNotification('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        }
    });

    // Lazy loading для изображений
    const images = document.querySelectorAll('img[data-src]');
    const imgOptions = {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px"
    };

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            imgObserver.unobserve(img);
        });
    }, imgOptions);

    images.forEach(img => imgObserver.observe(img));

    // Анимация счетчика
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const increment = target / 200; // Скорость анимации

        const updateCount = () => {
            if (count < target) {
                count += increment;
                el.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                el.innerText = target;
            }
        };

        updateCount();
    }

    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Плавное появление элементов при скролле
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Инициализация всех функций
    function init() {
        countdown();
        // Добавьте здесь вызовы других функций, которые должны выполняться при загрузке страницы
    }

    init();
});


// Функция для обновления таймера
function updateTimer() {
    const now = new Date();
    const launchDate = new Date("October 23, 2025 18:00:00").getTime();
    const timeLeft = launchDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    } else {
        // Если время вышло, можно показать сообщение или выполнить другое действие
        document.querySelector('.countdown').textContent = "Курс уже начался!";
    }
}

// Обновляем таймер каждую минуту
setInterval(updateTimer, 60000);

// Вызываем функцию сразу при загрузке страницы
updateTimer();


