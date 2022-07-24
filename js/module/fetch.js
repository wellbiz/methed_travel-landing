import {declOfNum} from './declOfNum.js';
import {fetchRequest} from './fetch/fetchRequest.js';
import {
    showModal,
    createPopupStatus201,
    createPopupStatusFalse,
} from './modal.js';


const loadTours = async (cb) => {
    const res = await fetch('data.json');
    const data = await res.json();
    cb(data);
};

let bookingTour = {};
let totalPrice = 0;

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

        totalPrice = price.textContent;
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

    const FIOOnlyCirilic =
        /[а-яА-ЯЁё]{2,}\s+[а-яА-ЯЁё]{2,}\s+[а-яА-ЯЁё]{2,}/gm;
    const telNumRegesp = /\+[0-9]+/gm;
    if (FIOOnlyCirilic.test(formBookingTour.fio.value) === false) {
        alert('Введите ФИО на кириллице 3 слова');
    } else if (telNumRegesp.test(formBookingTour.phone.value) === false) {
        alert('Вводите номер только цифры и символ + вначале');
    } else {
        const dateAndPeople = document.querySelector('.reservation__data');
        const price = document.querySelector('.reservation__price');

        bookingTour.dates = formBookingTour.dates.value;
        bookingTour.people = formBookingTour.people.value;
        bookingTour.fio = formBookingTour.fio.value;
        bookingTour.phone = formBookingTour.phone.value;
        bookingTour.totalPrice = totalPrice;

        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target.className === 'overlay') {
                    overlay.remove();
                    alert('overlay');
                }
            });
        }
        showModal(bookingTour);
        formBookingTour.reset();
        dateAndPeople.textContent = '';
        price.textContent = '0 Р';
    }
});

export const checkSubmit = (data) => {
    fetch('http://localhost:3000/tours', {
        method: 'POST',
        body: JSON.stringify({
            dates: data.dates,
            people: data.people,
            fio: data.fio,
            phone: data.phone,
            price: data.totalPrice,
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => {
            if (response.status === 201) {
                createPopupStatus201();
            }
            if (response.status != 201) {
                createPopupStatusFalse();
            }
        })
        .catch((error) => console.error(error));
};
