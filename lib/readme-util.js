module.exports = {
    readme,
    appendAnime
} 

const atob = require("atob")
const fetch = require('node-fetch');
const patternstart = "<!-- MAL_ANIME_COMPLETE:start -->"
const patternend = "<!-- MAL_ANIME_COMPLETE:end -->"

async function dofetch(url,settings){
    let fetching = await fetch(url,{headers:{"Authorization":`token ${settings.gh_token}`}})
    let data = await fetching.json()
    return data
}

function decodeFromBase64(input) {
    input = input.replace(/\s/g, '');
    return decodeURIComponent(escape(atob( input )));
  }

  
async function readme(path,filename,gh_token) {
    let fetchrepo = await dofetch(`https://api.github.com/repos/${path}/git/trees/main`,{gh_token})
    if(!fetchrepo.tree.find(x => x.path === 'README.md')){
        throw new Error("No README.md found")
    }
    let readme = await dofetch(fetchrepo.tree.find(x => x.path === filename).url,{gh_token})

    return decodeFromBase64(readme.content)
}

function appendAnime(readme,data,w,h){
    if(readme.includes("<!-- MAL_ANIME_COMPLETED:start -->") && readme.includes("<!-- MAL_ANIME_COMPLETED:end -->")){
        readme = appendAnimeCompleted(readme,data,w,h)
    }
    if(readme.includes("<!-- MAL_ANIME_WATCHING:start -->") && readme.includes("<!-- MAL_ANIME_WATCHING:end -->")){
        readme = appendAnimeWatching(readme,data,w,h)
    }
    if(readme.includes("<!-- MAL_ANIME_PTW:start -->") && readme.includes("<!-- MAL_ANIME_PTW:end -->")){
        readme = appendAnimePTW(readme,data,w,h)
    }

    if(readme.includes("<!-- MAL_MANGA_COMPLETED:start -->") && readme.includes("<!-- MAL_MANGA_COMPLETED:end -->")){
        readme = appendMangaCompleted(readme,data,w,h)
    }
    if(readme.includes("<!-- MAL_MANGA_READING:start -->") && readme.includes("<!-- MAL_MANGA_READING:end -->")){
        readme = appendMangaReading(readme,data,w,h)
    }
    if(readme.includes("<!-- MAL_MANGA_PTR:start -->") && readme.includes("<!-- MAL_MANGA_PTR:end -->")){
        readme = appendMangaPTR(readme,data,w,h)
    }
    return readme
}

function appendAnimeCompleted(readme,data,w,h){
    let patternstart = "<!-- MAL_ANIME_COMPLETED:start -->"
    let patternend = "<!-- MAL_ANIME_COMPLETED:end -->"

    let start = readme.indexOf(patternstart)
    let end = readme.indexOf(patternend)
    
    data = data.anime.completed.map(x => `<img height="${h}px" width="${w}px" title="${x.title}" src="${x.image_url}">`).join(" ")

    let newreadme = readme.substring(0,start+patternstart.length) + "\n\n" + data + "\n\n" + readme.substring(end,readme.length)

    return newreadme
}

function appendAnimeWatching(readme,data,w,h){
    let patternstart = "<!-- MAL_ANIME_WATCHING:start -->"
    let patternend = "<!-- MAL_ANIME_WATCHING:end -->"

    let start = readme.indexOf(patternstart)
    let end = readme.indexOf(patternend)
    
    data = data.anime.watching.map(x => `<img height="${h}px" width="${w}px" title="${x.title}" src="${x.image_url}">`).join(" ")

    let newreadme = readme.substring(0,start+patternstart.length) + "\n\n" + data + "\n\n" + readme.substring(end,readme.length)

    return newreadme
}

function appendAnimePTW(readme,data,w,h){
    let patternstart = "<!-- MAL_ANIME_PTW:start -->"
    let patternend = "<!-- MAL_ANIME_PTW:end -->"

    let start = readme.indexOf(patternstart)
    let end = readme.indexOf(patternend)
    
    data = data.anime.ptw.map(x => `<img height="${h}px" width="${w}px" title="${x.title}" src="${x.image_url}">`).join(" ")

    let newreadme = readme.substring(0,start+patternstart.length) + "\n\n" + data + "\n\n" + readme.substring(end,readme.length)

    return newreadme
}

// Manga appender

function appendMangaCompleted(readme,data,w,h){
    let patternstart = "<!-- MAL_MANGA_COMPLETED:start -->"
    let patternend = "<!-- MAL_MANGA_COMPLETED:end -->"

    let start = readme.indexOf(patternstart)
    let end = readme.indexOf(patternend)
    
    data = data.manga.completed.map(x => `<img height="${h}px" width="${w}px" title="${x.title}" src="${x.image_url}">`).join(" ")

    let newreadme = readme.substring(0,start+patternstart.length) + "\n\n" + data + "\n\n" + readme.substring(end,readme.length)

    return newreadme
}

function appendMangaReading(readme,data,w,h){
    let patternstart = "<!-- MAL_MANGA_READING:start -->"
    let patternend = "<!-- MAL_MANGA_READING:end -->"

    let start = readme.indexOf(patternstart)
    let end = readme.indexOf(patternend)
    
    data = data.manga.reading.map(x => `<img height="${h}px" width="${w}px" title="${x.title}" src="${x.image_url}">`).join(" ")

    let newreadme = readme.substring(0,start+patternstart.length) + "\n\n" + data + "\n\n" + readme.substring(end,readme.length)

    return newreadme
}

function appendMangaPTR(readme,data,w,h){
    let patternstart = "<!-- MAL_MANGA_PTR:start -->"
    let patternend = "<!-- MAL_MANGA_PTR:end -->"

    let start = readme.indexOf(patternstart)
    let end = readme.indexOf(patternend)
    
    data = data.manga.ptr.map(x => `<img height="${h}px" width="${w}px" title="${x.title}" src="${x.image_url}">`).join(" ")

    let newreadme = readme.substring(0,start+patternstart.length) + "\n\n" + data + "\n\n" + readme.substring(end,readme.length)

    return newreadme
}