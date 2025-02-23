"use strict";

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll); //собітие при скроле
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeigth = animItem.offsetHeight; //полную высоту элемента
            const animItemOffset = offset(animItem).top;// насколько обїект находится ниже чем верх страниці
            const animStart = 4; // регулирует момент старта анимаци при достижении 1/4 его вісоті

            let animItemPoint = window.innerHeight - animItemHeigth / animStart; //высота окна браузера - высота объекта

            if (animItemHeigth > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeigth)) {
                //если прокрутили до позиции объекто - точка  старта но меньше чем похиция объекта + его высота
                animItem.classList.add('_active');
              } else {
                if  (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);

}