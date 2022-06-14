import Hapi from '@hapi/hapi'
import Routes from './routes.js'

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV != 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors:{
                origin: ['*']
            }
        }
    })

    server.route(Routes)

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    console.log(`Server running on ${server.info.id}`)
}

init()