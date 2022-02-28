export async function fetchRequest(
    url, { method = "post", callback, body, headers }
) {
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
}