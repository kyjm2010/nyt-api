/* script.js */

const loader = document.querySelector("#loader")
const stories = document.querySelector('#stories')
const section = document.querySelector('#section')
const refreshBtn = document.querySelector('#refresh')

section.addEventListener('change', () =>{
    loader.classList.remove('hidden')
    stories.innerHTML = ''
    setTimeout(function(){ callAPI(); }, 1000);
})

refreshBtn.addEventListener('click', () =>{
    stories.innerHTML = ''
    loader.classList.remove('hidden')
    setTimeout(function(){ callAPI(); }, 1000);
})
callAPI()
async function callAPI() {
    const res = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section.value}.json?api-key=y7bYAls0qT2pnctqjjMKaMW9P6Ws5cmI`)
    const data = await res.json()
    console.log(data)
    let output = ''
    for(let i = 0; i < data.results.length; i++){
        output += `<div class="story">`
        let title = data.results[i].title
        let section = data.results[i].section
        let abstract = data.results[i].abstract
        if(data.results[i].byline == ''){
            byline = 'Unknown Author'
        } else{

            byline = data.results[i].byline
        }
        let date = moment(data.results[0].published_date).format("L")
        output += `<h4 class="section">${section}</h4>`
        data.results[i].multimedia == null ? output += `<a href="${data.results[i].short_url}"><img class="image" src="images/unavailable.jpg"/></a>`: output += `<a href="${data.results[i].short_url}"><img class="image" src="${data.results[i].multimedia[0].url}"/></a>`
        output += `<h4 class="title">${title}</h4>`
        output += `<div class="info">`
        output += `<p class="byline">${byline}</p>`
        output += `<p class="date">${date}</p>`
        output += `</div>`
        output += `<p class="abstract">${abstract}</p>`
        output += `<div class="line">`
        output += `</div>`
        output += `</div>`
    }
    loader.classList.add('hidden')
    stories.classList.remove('hidden')
    stories.innerHTML = output
}


