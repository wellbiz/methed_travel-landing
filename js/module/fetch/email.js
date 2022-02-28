import { fetchRequest } from "./fetchRequest.js";

const formEmail = document.querySelector(".footer__form");

formEmail.addEventListener("submit", (e) => {
    e.preventDefault();

    fetchRequest("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: {
            email: formEmail.email.value,
        },
        callback(err, data) {
            if (err) {
                console.warn(err, data);
                formEmail.textContent = err;
            }
            formEmail.textContent = ``;
            const title = document.createElement("h2");
            title.className = "footer-title";
            title.textContent = `Ваша заявка успешно отправлена`;

            const result = document.createElement("p");
            result.className = "footer__text";
            result.textContent =
                "Наши менеджеры свяжутся с вами в течении 3 рабочих дней";
            formEmail.append(title, result);
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
});