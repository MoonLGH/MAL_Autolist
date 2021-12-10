require("dotenv").config();
const parse = require("./lib/parser");
const readmeutil = require("./lib/readme-util");
const git = require("korefile")

async function init(){
    let { username,readme_path,branch,gh_token,limit,width,height,filename } = process.env;

    console.log(username)
    let Animelist = await parse.AnimeLoadparseList(username,limit)
    let Mangalist = await parse.MangaLoadparseList(username,limit)

    console.log(Animelist)
    console.log(Mangalist)
    
    let readme = await readmeutil.readme(readme_path,filename,gh_token)

    let newreadme = readmeutil.appendAnime(readme,{anime:Animelist,manga:Mangalist},width,height)

    if (!gh_token) {
        throw new Error("Enter a token");
    }

    console.log("Pushing to Github")
    let file = git.createKoreFile({
        adaptor: git.createGitHubAdaptor({
            owner: readme_path.split("/")[0],
            repo: readme_path.split("/")[1],
            ref: `heads/${branch}`,
            token: gh_token
        })
    });

    file.writeFile(filename, newreadme);

    console.log(`${filename} Updated, Ending Process...`)
}

init()