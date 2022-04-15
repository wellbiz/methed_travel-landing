import loadStyle from './loadStyle.js';
import {checkSubmit} from './fetch.js';

export const createPopupStatus201 = () => {
    const inputEmail = document.querySelector('.footerinput');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay_popup', 'is-visible');

    const div = document.createElement('div');
    div.classList.add('popup201');

    div.insertAdjacentHTML(
        'beforeend',
        `<button class="close" type="button"></button>
      <h2 class="title">Ваша заявка успешно отправлена</h2>
      <p class="description">Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</p>
            <div class="status__201">
                <div class="vector__img"><img src="../../img/Vector.png" alt=""></div>
            </div>`
    );

    overlay.append(div);

    document.body.append(overlay);

    return {
        overlay,
        div,
    };
};

export const createPopupStatusFalse = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay_popup', 'is-visible');

    const div = document.createElement('div');
    div.classList.add('popupfalse');

    div.insertAdjacentHTML(
        'beforeend',
        `
      <button class="close" type="button"></button>
      <h2 class="title">Упс... Что-то пошло не так</h2>
      <p class="description">Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз</p>
            <a href="#reservation" class="btnfalse">Забронировать</a>
    `
    );

    overlay.append(div);

    document.body.append(overlay);

    const btnFalse = document.querySelector('.btnfalse');
    btnFalse.addEventListener('click', () => {
        overlay.classList.remove('is-visible');
    });

    return {
        overlay,
        div,
    };
};

export const createModal = (data) => {
    const overlay = document.createElement('div');
    const modal = document.createElement('div');
    const buttonsBlock = document.createElement('div');
    const title = document.createElement('h2');
    const modalText = document.createElement('p');
    modalText.className = 'modal__text';

    const peopleDescr = modalText.cloneNode();
    const dateDescr = modalText.cloneNode();
    const priceDescr = modalText.cloneNode();

    const btnAgree = document.createElement('button');
    const btnEdit = document.createElement('button');

    overlay.className = 'overlay overlay_confirm';
    modal.className = 'modal';

    title.className = 'modal__title';
    title.textContent = 'Подтверждение заявки';

    peopleDescr.textContent = `Бронирование путешествия в Индию на ${data.people} человек`;
    dateDescr.textContent = `В даты: ${data.dates}`;
    priceDescr.textContent = `Стоимость тура ${data.totalPrice}`;

    buttonsBlock.className = 'modal__button';

    btnAgree.className = 'modal__btn modal__btn_confirm';
    btnAgree.textContent = 'Подтверждаю';

    btnEdit.className = 'modal__btn modal__btn_edit';
    btnEdit.textContent = 'Изменить данные';

    buttonsBlock.append(btnAgree, btnEdit);
    modal.append(title, peopleDescr, dateDescr, priceDescr, buttonsBlock);
    overlay.append(modal);
    document.body.append(overlay);

    return {overlay, modal};
};

export const showModal = async (data) => {
  await loadStyle('css/modal.css');


    const {overlay, modal} = createModal(data);
    modal.addEventListener('click', ({target}) => {
        if (target.classList.contains('modal__btn_confirm')) {
            checkSubmit(data);
            overlay.classList.remove('overlay');
        }
        if (target.classList.contains('modal__btn_edit'))
            overlay.classList.remove('overlay');
    });

    // overlay.addEventListener('click', (e) => {
    //     overlay.remove();
    //     alert('agree')
    // });

    // btnAgree.addEventListener('click', () => {
    //     overlay.remove();
    //     alert('agree')
    // });
    // btnEdit.addEventListener('click', () => {alert('edit')});
    //}
    //);
};
