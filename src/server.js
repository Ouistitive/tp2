import { getData } from "./api.js"

console.log(await getData("https://gateway.marvel.com:443/v1/public/characters"))