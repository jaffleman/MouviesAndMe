const API_TOKEN = '8d01e655bb67b30c4b65ba9ee95b62c7'

            
export default async function getFilmsList(text,page=1){
    const url2=`https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${text}&page=${page}`
    try {
        const response = await fetch(url2)
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }
}
export function getImageFromApi(name) {
    return `https://image.tmdb.org/t/p/w300${name}`
}

export async function getfilmsDeteils(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=fr` 
    
    try {
        
        const response = await fetch(url)
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }
}


export async function getClipData(arg) {
    try {
        console.log('New demande');
        const response = await fetch(`http://tdp.jaffleman.tech:8081/datas?arg=${arg}`)
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }
}

export async function getUpComingFilms(page) {
    const url2 = `https://api.themoviedb.org/3/discover/movie?api_key=8d01e655bb67b30c4b65ba9ee95b62c7&language=en&sort_by=release_date.asc&include_adult=false&include_video=false&page=${page}&release_date.gte=2020-01-01&year=2020`
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=fr&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=${page}`
    const url3 = `https://api.themoviedb.org/3/discover/movie?api_key=8d01e655bb67b30c4b65ba9ee95b62c7&sort_by=release_date.asc&include_adult=false&include_video=false&page=${page}&release_date.gte=2019-01-01&year=2020`
    const url4 = `https://api.themoviedb.org/3/movie/now_playing?api_key=8d01e655bb67b30c4b65ba9ee95b62c7&language=fr&page=${page}`
    try {
        
        
        const response = await fetch(url4)
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }
}