import loadStyle from './loadStyle.js';
const showModal = async (err, data) => {
    await loadStyle('css/modal.css', () => {
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

        peopleDescr.textContent = `Бронирование путешествия в Индию на 6 человек`;
        dateDescr.textContent = `В даты: 24 ноября - 7 декабря`;
        priceDescr.textContent = `Стоимость тура 459 588₽`;

        buttonsBlock.className = 'modal__button';

        btnAgree.className = 'modal__btn modal__btn_confirm';
        btnAgree.textContent = 'Подтверждаю';

        btnEdit.className = 'modal__btn modal__btn_edit';
        btnEdit.textContent = 'Изменить данные';

        buttonsBlock.append(btnAgree, btnEdit);
        modal.append(title, peopleDescr, dateDescr, priceDescr, buttonsBlock);
        overlay.append(modal);
        document.body.append(overlay);
        return new Promise((resolve) => {
            overlay.addEventListener('click', (e) => {
                overlay.remove();
                alert('overlay');
                resolve(true);
            });
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
    });
};

export default showModal;
