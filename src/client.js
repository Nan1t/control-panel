export function api(endpoint) {
    let config = getConfig();
    return config["api_url"] + endpoint;
}

function getConfig() {
    let data = null;
    let req = new XMLHttpRequest();
    req.open("GET", "/config.json", false);

    req.onload = (e) => {
        data = JSON.parse(req.responseText);
    }

    req.send();

    return data;
}