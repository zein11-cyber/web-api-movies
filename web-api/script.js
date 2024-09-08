// USE XMLHTTPREQUEST

function getMovie(url, success){
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if( xhr.readyState === 4 ) {
            if( xhr.status === 200 ) {
                success(xhr.response);
            }
         }
    
            
    }
    xhr.open('get', url);
    xhr.send();
}

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function(){
    const inputKeyword = document.querySelector('.input-keyword');
    getMovie('http://www.omdbapi.com/?apikey=76f0751&s=' + inputKeyword.value, (res) => {
        const mv = JSON.parse(res);
        const mvs = mv.Search;
        let cards = '';
        mvs.forEach( m => cards += showCards(m));
        const movieContainer = document.querySelector('.movie-container');
        movieContainer.innerHTML = cards;

        const modalDetailButton = document.querySelectorAll('.modal-detail-button');
        modalDetailButton.forEach(btn => {
            btn.addEventListener('click', function(){
                const imdbid = this.dataset.imdbid;
                getMovie('http://www.omdbapi.com/?apikey=76f0751&i=' + imdbid, (res) =>{
                    m = JSON.parse(res);
                    const movieDetail = showMovieDetails(m);
                    const modalBody = document.querySelector('.modal-body');
                    modalBody.innerHTML = movieDetail;
                    

                })
            })
        })
    })
})



// ==============================================================================================

// USE AJAX

// $('.search-button').on('click', function(){

//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=76f0751&s=' + $('.input-keyword').val(),
//         success: results => {
//             const movies = results.Search;
//             let cards = '';
//             movies.forEach(m => {
//                 cards += showCards(m);
    
//             });
//             $('.movie-container').html(cards);
    
//             //ketika tombol detail di klik
//             $('.modal-detail-button').on('click', function(){
//                 // console.log($(this).data('imdbid'));
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=76f0751&i=' + $(this).data('imdbid'),
//                     success: m => {
                        
//                         const movieDetail = showMovieDetails(m);
//                     $('.modal-body').html(movieDetail);
//                     },
//                     error: (err) => {
//                         console.log(err.responseText);
//                     }
//                 })
//             })
//         },
//         error: (err) => {
//             console.log(err.responseText);
//         }
//     })
// });



// ===========================================================================================

// USE FETCH

// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function(){
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=76f0751&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             const movies = response.Search;
//             let cards = '';
//             movies.forEach(m => cards += showCards(m));
//             const movieContainer = document.querySelector('.movie-container');
//             movieContainer.innerHTML = cards;

//             // ketika tombol detail di klik

//             const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//             modalDetailButton.forEach(btn => {
//                 btn.addEventListener('click', function(){
//                     const imdbid = this.dataset.imdbid;
//                     fetch('http://www.omdbapi.com/?apikey=76f0751&i=' + imdbid)
//                         .then(response => response.json())
//                         .then(m => {
//                             const movieDetail = showMovieDetails(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = movieDetail;
//                         })
//                 })
//             })
                
//             });
//         })



function showCards(m){
    return `<div class="col-md-4 my-5">
                <div class="card">
                <img src="${m.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
                </div>
            </div>`;
    }


function showMovieDetails(m){
    return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                    <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                    </ul>
                </div>
                </div>
            </div>`;
}