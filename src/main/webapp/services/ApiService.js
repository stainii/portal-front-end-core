class ApiService {

    getJson(url) {
        return new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();

            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    const config = JSON.parse(request.responseText);
                    return resolve(config);
                } else {
                    return reject();
                }
            };

            request.open('GET', url);
            request.send();
        });
    }

}

export default ApiService