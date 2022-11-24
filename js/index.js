let search_btn = document.getElementById('search_btn')
let search_inp = document.getElementById('search_inp')
let input_search = document.querySelector('.input_search')
let banner_intro = document.getElementById('banner-intro')
let key = '095a344ece033cd1bd8bd0bb8b6693c5'

console.log(search_btn);

function outsideClick(event, search_btn)	{
  var clickedOut = true;

  if (event.target == search_btn || search_btn.contains(event.target)) {
    clickedOut = false;
  }

  if (clickedOut) return true;
  else return false;
}

window.addEventListener('click', function(e) {
  if (outsideClick(e, search_btn)) {
    search_inp.style.display = 'none';
    input_search.classList.remove('input_search_active')
  }
});

search_btn.onclick = () => {
  search_inp.style.display = 'block';
  input_search.classList.add('input_search_active')
}

let path_popular = 'https://api.themoviedb.org/3/movie/popular?api_key=095a344ece033cd1bd8bd0bb8b6693c5&language=es-ES&page=1'

fetch (path_popular)
    .then(response => response.json())
    .then(data => {
        let popular_movies = data.results;

        let num_random = peli_aleatoria(popular_movies);
        let random_movie = popular_movies[num_random];
        console.log(num_random);
        console.log(random_movie);
        let random_movie_id = random_movie.id;
        
        let random_path_id = `https://api.themoviedb.org/3/movie/${random_movie_id}/images?api_key=095a344ece033cd1bd8bd0bb8b6693c5`

        peticion_img(random_path_id);
        let div_header = document.createElement('div')
        banner_intro.appendChild(div_header)


        div_header.innerHTML = 
            `
            <main class="px-3">
            <h1 class="text-center p-1 mt-2">${random_movie.original_title}</h1>
            <p class="lead fs-5 text-center p-1 m-5">${random_movie.overview}</p>
            
        </main>
            `
    });


function peticion_img(path){
    fetch(path)
        .then(response => response.json())
        .then(data => {
            let n = Math.floor(getRandomArbitrary(0, data.backdrops.length))
            let movie_img = data.backdrops[n].file_path
            print_header(movie_img, banner_intro)
            /* imprimir_img(movie_img, banner_intro) */
        })
}

/* function imprimir_img(file_path, container){
    let div = document.createElement('div')
    container.appendChild(div)

    div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${file_path}" alt="">
    `
}  */

function peli_aleatoria(array){
    let max_num = array.length;
    let num_random = getRandomArbitrary(0, max_num);
    num_random = parseInt(num_random);

    return(num_random);
}

function getRandomArbitrary(min,max) {
    return Math.random() * (max - min) + min;
}

//header 
function print_header(file_path, container){
    container.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500${file_path}")`;
    container.style.backgroundSize = "cover";
}



