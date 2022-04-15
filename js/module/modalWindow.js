import {declOfNum} from './declOfNum.js';

export const createModalWindow = () => {
    const overlay = document.createElement('div');
    overlay.className = 'overlay overlay_confirm';

    const modalBlock = document.createElement('div');
    modalBlock.className = 'modal';

    const title = document.createElement('h2');
    title.className = 'modal__title';
    title.textContent = 'Подтверждение заявки';

    const textDescrCountPeople = document.createElement('p');
    textDescrCountPeople.className = 'modal__text';
    textDescrCountPeople.textContent = `Бронирование путешествия в Индию на ${countPeople} ${declOfNum(
        countPeople,
        ['человек', 'человека', 'человек']
    )}`;

    const textDescrDateTour = document.createElement('p');
    textDescrDateTour.className = 'modal__text';
    textDescrDateTour.textContent = `В даты: ${date}`;

    const textDescrPrice = document.createElement('p');
    textDescrPrice.className = 'modal__text';
    textDescrPrice.textContent = `Стоимость тура ${new Intl.NumberFormat(
        'ru',
        {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0,
        }
    ).format(priceTour * countPeople)}`;

    const buttonsBlock = document.createElement('div');

    const buttonAgree = document.createElement('button');
    buttonAgree.className = 'modal__btn modal__btn_confirm';
    buttonAgree.textContent = 'Подтверждаю';
    const buttonEdit = document.createElement('button');
    buttonEdit.className = 'modal__btn modal__btn_edit';
    buttonEdit.textContent = 'Изменить данные';

    buttonsBlock.append(buttonAgree, buttonEdit);
    modalBlock.append(
        title,
        textDescrCountPeople,
        textDescrDateTour,
        textDescrPrice,
        buttonsBlock
    );
    overlay.append(modalBlock);
    return overlay;
};
