import { createServer} from 'https'
import { parse } from 'url'
import next from 'next'
import fs from 'fs'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const httpOptions = {
    key: fs.readFileSync('./certificates/localhost.key'),
    cert: fs.readFileSync('./certificates/localhost.crt')
}
app.prepare().then(() => { 
    createServer(httpOptions, (req, res) => { 
        
        const parsedUrl = parse(req?.url ?? '', true)
        handle(req, res, parsedUrl)
    }).listen(8080, () => { 
        //if (err) throw err
        console.log("> server started on https://localhost:8080")
    })
})