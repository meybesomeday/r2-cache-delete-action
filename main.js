const http = require("https")

const options = {
    "method": "POST",
    "hostname": "api.cloudflare.com",
    "port": null,
    "path": process.env.API_PATH,
    "headers": {
        "Content-Type": "application/json",
        "X-Auth-Email": process.env.X_AUTH_EMAIL,
        "X-Auth-Key": process.env.X_AUTH_KEY
    }
};

let files = []
let urls = process.env.URLS.split(',')
for (let url of urls) {
    if (url) {
        file = {
                    url: url,
                    headers: {
                        Origin: process.env.ORIGIN,
                        Scheme: "https",
                        Host: process.env.HOST,
                        Referer: process.env.REFERER
                    }
                }
        files.push(file)
    }
}

console.log(files)

const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});
const data = {
    files: files
}
req.write(JSON.stringify(data));
req.end();