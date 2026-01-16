const insta = require("instagram-url-direct");
console.log("Type:", typeof insta);
console.log("Keys:", Object.keys(insta));
if (typeof insta === 'object') {
    console.log("Default type:", typeof insta.default);
}
