import {declOfNum} from './declOfNum.js';
import {fetchRequest} from './fetch/fetchRequest.js';
import showModal from './modal.js';

/*
Задание №1
Дизайнер подготовил стили и вёрстку
Ваша задача интегрировать стили (ассинхронно) перед открытием модального окна
HTML-код писать не нужно, модальное окно создаем скриптами
Модальное окно открывается при клике на кнопку "Забронировать" в форме "Бронирования тура"
Данные в модальном окне должны формироваться на основе данных из формы

Задание №2
В модальном окне:
При клике на "Изменить данные" зарываем модальное окно
При клике на "Подтверждаю" зарываем модальное окно и выполняем отправку данных
После успшной отправки все элементы в форме сделать disabled
*/

const loadTours = async (cb) => {
    const res = await fetch('data.json');
    const data = await res.json();
    cb(data);
};

const initSelectDate = (data) => {
    const firstOptionDateTour = document.createElement('option');
    const firstOptionDateBooking = firstOptionDateTour.cloneNode();

    firstOptionDateTour.value = '';
    firstOptionDateTour.className = 'tour__option';
    firstOptionDateTour.textContent = 'Выбери дату';

    firstOptionDateBooking.value = '';
    firstOptionDateBooking.className = 'tour__option reservation__option';
    firstOptionDateBooking.textContent = 'Дата путешествия';

    const classNameTour = 'tour__option';
    const classNameBooking = 'tour__option reservation__option';

    createTourDate(data, firstOptionDateTour, classNameTour, 'tour');
    createTourDate(
        data,
        firstOptionDateBooking,
        classNameBooking,
        'reservation'
    );
};
const createTourDate = (data, firstOption, className, idForm) => {
    const selectDate = document.getElementById(`${idForm}__date`);

    let options = [];

    data.forEach((tour) => {
        const option = document.createElement('option');
        option.textContent = tour['date'];
        option.value = tour['date'];
        option.className = className;

        options.push(option);
    });

    selectDate.append(firstOption, ...options);
    options = [];
};

const createTourPeople = (data, idForm) => {
    const selectDate = document.getElementById(`${idForm}__date`);
    const selectPeople = document.getElementById(`${idForm}__people`);

    const firstOption = document.createElement('option');
    firstOption.textContent = 'Количество человек';
    firstOption.className = 'tour__option';

    let options = [];

    selectDate.addEventListener('change', () => {
        document
            .querySelectorAll(`#${idForm}__people option`)
            .forEach((option) => option.remove());
        if (selectDate.value === '') {
            selectPeople.append(firstOption);
        } else {
            const choisedDate = selectDate.value;

            const tour = data.find((tour) => choisedDate === tour['date']);

            for (let i = tour['min-people']; i <= tour['max-people']; ++i) {
                const option = document.createElement('option');
                option.className = 'tour__option';
                option.textContent = i;

                options.push(option);
            }
            selectPeople.append(firstOption, ...options);
            options = [];
        }
    });
};
const showInfoTour = (data) => {
    const selectPeople = document.getElementById('reservation__people');
    const selectDate = document.getElementById(`reservation__date`);

    const dateAndPeople = document.querySelector('.reservation__data');
    const price = document.querySelector('.reservation__price');

    selectPeople.addEventListener('change', () => {
        const countPeople = parseInt(selectPeople.value);
        if (isNaN(countPeople)) {
            dateAndPeople.textContent = '';
            price.textContent = '';
        } else {
            const tour = data.find(
                (tour) => selectDate.value === tour['date']
            );
            dateAndPeople.textContent = `${
                tour['date']
            }, ${countPeople} ${declOfNum(countPeople, [
                'человек',
                'человека',
                'человек',
            ])}`;

            price.textContent = new Intl.NumberFormat('ru', {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 0,
            }).format(tour['price'] * countPeople);
        }
    });

    selectDate.addEventListener('focus', () => {
        dateAndPeople.textContent = '';
        price.textContent = '';
    });
};

const initSelectPeople = (data) => {
    createTourPeople(data, 'tour');
    createTourPeople(data, 'reservation');

    showInfoTour(data);
};
loadTours(initSelectDate);
loadTours(initSelectPeople);

const formBookingTour = document.querySelector('.reservation__form');

formBookingTour.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        dates: formBookingTour.dates.value,
        people: formBookingTour.people.value,
        fio: formBookingTour.fio.value,
        phone: formBookingTour.phone.value,
    };
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target.className === 'overlay') {
                overlay.remove();
                alert('overlay');
            }
        });
    }

    document
        .querySelector('.modal__btn_confirm')
        .addEventListener('click', () => {
            overlay.remove();
            alert('Подтверждаю');
        });
    const checkSubmit = await fetchRequest(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: {
                dates: formBookingTour.dates.value,
                people: formBookingTour.people.value,
                fio: formBookingTour.fio.value,
                phone: formBookingTour.phone.value,
            },
            callback: showModal,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    );
    console.log(checkSubmit);

    // fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: {
    //         dates: formBookingTour.dates.value,
    //         people: formBookingTour.people.value,
    //         fio: formBookingTour.fio.value,
    //         phone: formBookingTour.phone.value,
    //     },
    //     callback(err, data) {
    //         if (err) {
    //             console.warn(err, data);
    //             formBookingTour.textContent = err;
    //         }
    //         document.querySelector(
    //             '.reservation__info'
    //         ).textContent = `Заявка успешно отправлена, наши менеджеры свяжутся с вами`;
    //     },
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // });
});
