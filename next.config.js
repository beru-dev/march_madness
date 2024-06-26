/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
    distDir: "build",
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};