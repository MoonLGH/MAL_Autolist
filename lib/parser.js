module.exports = {
    AnimeLoadparseList,
    MangaLoadparseList
}

let fetch = require('node-fetch');

async function AnimeLoadparseList(username,limit) {
    let dataCompleted = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/completed`)
    let dataWatching = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/watching`)
    let dataPtw = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/ptw`)

    let returnedData = {}
    returnedData.completed = (await dataCompleted.json()).anime
    returnedData.watching = (await dataWatching.json()).anime
    returnedData.ptw = (await dataPtw.json()).anime

    if(parseInt(limit) > 0) {
       returnedData.completed = returnedData.completed.slice(0,parseInt(limit))
       returnedData.watching = returnedData.watching.slice(0,parseInt(limit))
       returnedData.ptw = returnedData.ptw.slice(0,parseInt(limit))
    }

    return returnedData
}

async function MangaLoadparseList(username,limit) {
    let dataCompleted = await fetch(`https://api.jikan.moe/v3/user/${username}/mangalist/completed`)
    let dataReading = await fetch(`https://api.jikan.moe/v3/user/${username}/mangalist/reading`)
    let dataPtr = await fetch(`https://api.jikan.moe/v3/user/${username}/mangalist/ptr`)

    let returnedData = {}
    returnedData.completed = (await dataCompleted.json()).manga
    returnedData.reading = (await dataReading.json()).manga
    returnedData.ptr = (await dataPtr.json()).manga

    if(parseInt(limit) > 0) {
        returnedData.completed = returnedData.completed.slice(0,parseInt(limit))
        returnedData.reading = returnedData.reading.slice(0,parseInt(limit))
        returnedData.ptr = returnedData.ptr.slice(0,parseInt(limit))
    }

    return returnedData
}