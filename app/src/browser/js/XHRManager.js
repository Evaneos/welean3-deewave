/**
 * XHRManager
 * Handle the XHR requests
 */
export class XHRManager {
    constructor(url, data, callback) {
        callback = callback || function() {};

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Content-length', data.length);
        xhr.setRequestHeader('Connection', 'close');

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            }
        };

        xhr.send(data);
    }
}
