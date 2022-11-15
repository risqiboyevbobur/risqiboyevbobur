const axios = require('axios');
const telegramApi = require('node-telegram-bot-api')
require('dotenv').config()

const token =process.env.Bot_token;
const Base_urel = process.env.urel;

const Bot = new telegramApi(token, {
    webHook: {
    port: process.env.PORT
    }
})

Bot.setWebHook(`${APP_URL}/Bot${token}`)


Bot.on('message', async(msg) => {

    let countryName = msg.text;
    let chatId = msg.chat.id
    let data

if(msg.text === '/start'){
    Bot.sendMessage(chatId, `Assalomu aleykum ${msg.from.first_name}  😀`)


    

    Bot.sendMessage(chatId, `Siz bu bot orqali sizni qiziqtirgan mamlakatlar haqida ma'lumotlar olishingiz mumkin!😎😉  `)




    Bot.sendMessage(chatId,`Davlat nomini Ingliz tilida kiriting👌🏻`  )
}else{
    // Bot.sendMessage(chatId, ` bunday so'z topilmadi`)
            
    await axios.get(`${Base_urel}/${countryName}?fullText=true`)
    .then(res =>{
        console.log(res);
       data = res.data[0];
    
    }).catch(err => {
        console.log(err)
    })
    if(data )
    {
        Bot.sendPhoto(chatId,`${data.flags.png}`, {caption: `
Poytaxti :) ${data.capital[0]}
Joylashuvi :) ${data.continents}
Aholisi :) ${data.population}
Pul birligi :) ${Object.keys(data.currencies)[0]}
Asosiy tillari :) ${Object.values(data.languages).map(item => item)}
Xaritadan ko'rish :) ${data.maps.googleMaps}
`})
 
        // console.log(data.flags.png);

    }else{
    Bot.sendMessage(chatId, `Kechirasiz bunday so'z topilmadi.`)
}
}


    // await axios.get(`${Base_urel}/${countryName}?fullText=true`)
    // .then(res =>{
    //     console.log(res);
    //    data = res.data;
    //    console.log(data);
    // })

}) 