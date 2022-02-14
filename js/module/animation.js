const docEl = document.documentElement;

const currentPageUp = () => {
    const up = document.querySelector('.top');

    const heightViewPort = docEl.clientHeight - up.clientHeight; //высота экрана - высота картинки
    const maxScroll = docEl.scrollHeight - docEl.clientHeight; // высота скролла с учетом картинки

    const percentScroll = (window.pageYOffset * 100) / maxScroll; // проценты скролла
    const shareHeightViewPort = heightViewPort / 100; //значение экрана в пикселях для 1-го процента
    up.style.transform = `translateY(${
        -shareHeightViewPort * percentScroll
    }px)`;
};

window.addEventListener('scroll', currentPageUp);

currentPageUp();
