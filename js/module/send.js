const fetchRequest = async (
    url,
    {method = 'post', callback, body, headers}
) => {
    try {
        const options = {
            method,
        };
        if (body) options.body = JSON.stringify(body);
        if (headers) options.headers = headers;

        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            if (callback) callback(null, data);
            return;
        }
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    } catch (err) {
        callback(err);
    }
};

const formBookingTour = document.querySelector('.reservation__form');

formBookingTour.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: {
            dates: formBookingTour.dates.value,
            people: formBookingTour.people.value,
            fio: formBookingTour.fio.value,
            phone: formBookingTour.phone.value,
        },
        callback(err, data) {
            if (err) {
                console.warn(err, data);
                formBookingTour.textContent = err;
            }
            formBookingTour.textContent = `Заявка успешно отправлена, наши менеджеры свяжутся с вами`;
        },
        headers: {
            'Content-Type': 'application.json',
        },
    });
});

const formEmail = document.querySelector('.footer__form');

formEmail.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: {
            email: formEmail.email.value,
        },
        callback(err, data) {
            if (err) {
                console.warn(err, data);
                formEmail.textContent = err;
            }
            formEmail.textContent = ``;
            const title = document.createElement('h2');
            title.className = 'footer-title';
            title.textContent = `Ваша заявка успешно отправлена`;

            const result = document.createElement('p');
            result.className = 'footer__text';
            result.textContent =
                'Наши менеджеры свяжутся с вами в течении 3 рабочих дней';
            formEmail.append(title, result);

        },
        headers: {
            'Content-Type': 'application.json',
        },
    });
});
