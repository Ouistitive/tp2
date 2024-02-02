import Fastify from 'fastify';
import fastifyStatic from "@fastify/static";
import path from "path";
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';
import {getData} from "./api.js";

const __dirname = path.resolve();

const app = Fastify();

app.register(fastifyView, {
    engine: {
        handlebars: handlebars
    },
    templates: 'templates',
    options: {
        partials: {
            header: path.join('header.hbs'),
            footer: path.join('footer.hbs')
        }
    }
});

app.register(fastifyStatic, {
    root: path.join(__dirname, 'templates')
});

app.get('/', (req, res) => {

    res.headers({'Content-Type': 'text/html'});

    getData("https://gateway.marvel.com:443/v1/public/characters")
        .then(data => {
            res.view("index.hbs", { data });
        })
        .catch(err => {
            console.error("Erreur lors de la récupération des données :", err);
            res.status(500).send("Erreur lors de la récupération des données.");
        });

});

app.listen({ port: 3000, host: '0.0.0.0' });