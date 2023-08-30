import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import { convertHourStringtoMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3333' //se der merda apague esta linha
}))

const prisma = new PrismaClient()

//HTTP METHODS

//GET para quando for pega algo no banco
//POST para quando for criar

//PUT para alteração de uma entidade por completo
//PATCH para alteração específica dentro de uma entidade

//DELETE para remoção de alguma entidade no banco
//-------------------------------------------------------

//PARAMETROS

//Query: localhost:3333/ads?page=5
//Não-estático, fácil identificação

//Route: localhost:3333/ads/5
//Estático, mais difícil identificação

//Body: localhost:3333/ads
//Não é mostrado, ótimo para senhas etc.

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads:true
                }
            }
        }
    })

    return response.json(games)
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body:any = request.body;

    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringtoMinutes(body.hourStart),
            hourEnd: convertHourStringtoMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.json(ad)
});

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id:true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where:{
            gameId:gameId
        },
        orderBy:{
            createAt: 'desc'
        }
    })
    
    return response.json(ads.map(ad =>{
        return{
            ...ad,
            weekDays: ad.weekDays.split(","),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const id = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where:{
            id:adId
        },
    })
    
    return response.json(id);
})

app.listen(3333)