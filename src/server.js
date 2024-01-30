import Fastify from 'fastify'
import fastifyStatic from "@fastify/static";
import path from "path"
import {fileURLToPath} from 'url'

const app = Fastify()
app.register(fastifyStatic, {
    root: path.join(__dirname, 'templates')
})
app.get('/', (req, res) => {
    res.sendFile('index.hbs')
})

app.listen({ port: 3000 })