"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function clean(path) {
    let files;
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file) => {
            const curPath = `${path}/${file}`;
            if (fs.statSync(curPath).isDirectory()) {
                clean(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
exports.default = clean;
