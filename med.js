let show_ids = ['tt3230854','tt8111088','tt7772588','tt3952222','tt2261227'];
let movie_ids = ['tt0816692','tt3659388','tt0112384','tt5442430','tt0910970'];
let list_to_append = [];

export const showAPI = function(show) {
    let poster_url = 'https://image.tmdb.org/t/p/w1280/' + show['poster_path'];
    return `
        <div class="flex-child" id="show_tile">
            <img src=${poster_url} alt="poster">
            <h2 id="show_title">${show["original_name"]} (${show['vote_average']})</h2>
            <p id="show_desc">${show["overview"]}</p>
        </div>
        
    `
};
export const movieAPI = function(movie) {
    let poster_url = 'https://image.tmdb.org/t/p/w1280/' + movie['poster_path'];
    return `
        <div class="flex-child" id="show_tile">
            <img src=${poster_url} alt="poster">
            <h2 id="show_title">${movie["original_title"]} (${movie['vote_average']})</h2>
            <p id="show_desc">${movie["overview"]}</p>
        </div>
    `
};
export async function handleShowButton(event) {
    const $media_list = $('#media_search');
    $media_list.remove();
    const $content = $('#apppend_content');
    $content.empty();
    for (let i=0; i<show_ids.length; i++) {
        let send_url = 'https://api.themoviedb.org/3/find/' + show_ids[i] + '?api_key=ddb8663c1132306f5ec9acacd6ce9578&language=en-US&external_source=imdb_id';
        const result = await axios({
            method: 'get',
            url: send_url,
            withCredentials: false,
        });
        $content.append(showAPI(result.data['tv_results'][0]));
    }
    const $searchform = $('#media_content');
    $searchform.append(showSearch());
    const $year_submit = $('#submit_search');
    $year_submit.on("click", {
        button_type: $year_submit.attr('target'),
    }, handleYearSubmit);
};
export async function handleMovieButton(event) {
    const $media_list = $('#media_search');
    $media_list.remove();
    const $content = $('#apppend_content');
    $content.empty();
    
    for (let i=0; i<movie_ids.length; i++) {
        let send_url = 'https://api.themoviedb.org/3/find/' + movie_ids[i] + '?api_key=ddb8663c1132306f5ec9acacd6ce9578&language=en-US&external_source=imdb_id';
        const result = await axios({
            method: 'get',
            url: send_url,
            withCredentials: false,
        });
        $content.append(movieAPI(result.data['movie_results'][0]));
    }
    const $searchform = $('#media_content');
    $searchform.append(movieSearch());
    const $year_submit = $('#submit_search');
    $year_submit.on("click", {
        button_type: $year_submit.attr('target'),
    }, handleYearSubmit);
};

export const showSearch = function() {
    return `
    <div class="container" id="media_search">
        <p id="search_desc">
            Depicted above are some of my favorite shows - plus a couple
            on my watch list - involving space or sci-fi. 
            Looking for more sci-fi shows? Enter a year range
            in the form of "startyear-endyear"
            to find out the most popular
            sci-fi shows that were released during that time.</p><br>
        <label for="myYears">Enter a Year Range:</label>
        <input type="text" maxlength="9" name="myYears" id="myYears" list="yearsRangeList">
        <datalist id="yearsRangeList">
            <option>1960-1969</option>
            <option>1970-1979</option>
            <option>1980-1989</option>
            <option>1990-1999</option>
            <option>2000-2009</option>
            <option>2010-2019</option>
            <option>2020-2021</option>
        </datalist>
        <button id="submit_search" target="show">Search</button><br>
        <div class="container" id="media_years_list">

        </div>
    </div>
    `
}
export const movieSearch = function() {
    return `
    <div class="container" id="media_search">
        <p id="search_desc">
            Depicted above are some of my all time favorite space/sci-fi movies.
            Looking for more sci-fi movies? Enter a year range
            in the form of "startyear-endyear"
            to find out the most popular
            sci-fi movies that were released during that time.</p><br>
        <label for="myYears">Enter a Year Range:</label>
        <input type="text" maxlength="9" name="myYears" id="myYears" list="yearsRangeList">
        <datalist id="yearsRangeList">
            <option>1960-1969</option>
            <option>1970-1979</option>
            <option>1980-1989</option>
            <option>1990-1999</option>
            <option>2000-2009</option>
            <option>2010-2019</option>
            <option>2020-2021</option>
        </datalist>
        <button id="submit_search" target="movie">Search</button>
        <div class="container" id="media_years_list">

        </div>
    </div>
    `
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const checkFormat = function(yr) {
    let valid = [];
    let err = false;
    for (let i=1960; i<2022; i++) {
        valid.push(i);
    }
    const $movies_list = $('#media_years_list');
    let start = yr[0] + '' + yr[1] + yr[2] + yr[3];
    let end = yr[5] + '' + yr[6] + yr[7] + yr[8];
    let range = [];
    let num_start = Number(start);
    let num_end = Number(end);

    if (num_end < num_start) {
        err = true;
    }
    if (valid.includes(num_start) == false || valid.includes(num_end) == false) {
        err = true;
    }
    if (yr.length > 9 || yr.length < 9) {
        err = true;
    }
    
    if (err == true) {
        $movies_list.prepend('<div id="errormess"><p>Error: Please enter a valid range<p></div>');
    }
    return err;
}

export async function handleYearSubmit(event) {
    list_to_append = [];
    const $movies_list = $('#media_years_list');
    $movies_list.empty();
    let yr = $('#mediapage').find('#myYears').val(); // gives range of years
    let err = checkFormat(yr);
    if (err == true) {
        return;
    }
    let start = yr[0] + '' + yr[1] + yr[2] + yr[3];
    let end = yr[5] + '' + yr[6] + yr[7] + yr[8];
    let range = [];
    let i_start = Number(start);
    let i_end = Number(end);

    for (let i = i_start; i <= i_end; i++) { // range of years to get content from
        range.push(i);
    }
    range.sort();
    
    if (event.data.button_type == 'movie') {
        for (let i=0; i<range.length; i++) {
            // sleep(10000).then(() => { getMoviesFromYear(range[i]); });
            let result = getMoviesFromYear(range[i]);
        }
        // testAppends(range);
        sleep(2000).then(() => { appendYears(range); });
    } else if (event.data.button_type == 'show') {
        for (let i=0; i<range.length; i++) {
            let result = getShowsFromYear(range[i]);
        }
        sleep(2000).then(() => { appendYears(range); });
    }
    return;
    
};
export const appendYears = function(range) {
    const $media_list = $('#media_years_list');
    if (list_to_append.length == 0) {
        $media_list.prepend('<div id="errormess"><p>Error: Please enter a valid range<p></div>');
        return;
    }
    for (let i=0; i<range.length; i++) {
        for (let j=0; j<list_to_append.length; j++) {
            if (list_to_append[j].year == range[i]) {
                $media_list.append(list_to_append[j].append);
            }
        }
    }
    return;
};

export const appendYearlyMedia = function(year, titles) {
    return `
    <p id="listed_years" target="${year}"><strong id="searchyearbold">${year}: </strong> ${titles}</p><br>
    `
};

export async function getMoviesFromYear(year) {
    let send_url = 'https://api.themoviedb.org/3/discover/movie?api_key=ddb8663c1132306f5ec9acacd6ce9578&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=' + year + '&with_genres=878';
    const movies = await axios({
        method: 'get',
        url: send_url,
        withCredentials: false,
    });
    let movie_titles = [];
    for (let i=0; i<movies.data["results"].length; i++) {
        movie_titles.push(movies.data["results"][i]["title"])
    }
    const $movies_list = $('#media_years_list');
    let movie_string = movie_titles[0]; // first movie
    for (let i=1; i<movie_titles.length; i++) {
        movie_string = movie_string + ', ' + movie_titles[i];
    }
    if (movie_titles.length != 0) { 
        let obj = {};
        obj.year = year;
        obj.append = appendYearlyMedia(year, movie_string);
        list_to_append.push(obj);
    }
    return movies.data;
    
};
export async function getShowsFromYear(year) {
    let send_url = 'https://api.themoviedb.org/3/discover/tv?api_key=ddb8663c1132306f5ec9acacd6ce9578&language=en-US&sort_by=popularity.desc&first_air_date_year=' + year + '&page=1&with_genres=10765&include_null_first_air_dates=false';
    const shows = await axios({
        method: 'get',
        url: send_url,
        withCredentials: false,
    });
    let show_titles = [];
    for (let i=0; i<shows.data["results"].length; i++) {
        show_titles.push(shows.data["results"][i]["name"])
    }
    const $media_list = $('#media_years_list');
    let show_string = show_titles[0]; // first movie
    for (let i=1; i<show_titles.length; i++) {
        show_string = show_string + ', ' + show_titles[i];
    }
    if (show_titles.length != 0) {
        let obj = {};
        obj.year = year;
        obj.append = appendYearlyMedia(year, show_string);
        list_to_append.push(obj);
    }
    return shows.data;
    
};


export async function loadMediaPage() {
    const $page = $('#mediapage'); // wraps around body
    // Movie Database API - WORKS
    const $content = $('#apppend_content');
    for (let i=0; i<show_ids.length; i++) {
        let send_url = 'https://api.themoviedb.org/3/find/' + show_ids[i] + '?api_key=ddb8663c1132306f5ec9acacd6ce9578&language=en-US&external_source=imdb_id';
        const result = await axios({
            method: 'get',
            url: send_url,
            withCredentials: false,
        });
        $content.append(showAPI(result.data['tv_results'][0]));
    }
    
    const $show_button = $('#show_button');
    $show_button.on("click", handleShowButton);

    const $movie_button = $('#movie_button');
    $movie_button.on("click", handleMovieButton);

    const $searchform = $('#media_content');
    $searchform.append(showSearch());

    const $year_submit = $('#submit_search');
    $year_submit.on("click", {
        button_type: $year_submit.attr('target'),
    }, handleYearSubmit);

    
};

$(function() {
    loadMediaPage();
});















// const result = await axios({
    //     method: 'POST',
    //     url: "https://api.igdb.com/v4/games",
    //     headers: {
    //         'Accept': 'application/json',
    //         'Client-ID': '1wa9by2dugyg8on4glc2skezxakalb',
    //         'Authorization': 'Bearer dg464mahahtha6kbguc7n6pp0tsqfv'
    //     },
    //   });

    // const result = await axios({
    //         method: 'post',
    //         url: 'https://id.twitch.tv/oauth2/token?client_id=1wa9by2dugyg8on4glc2skezxakalb&client_secret=7x2vn12umjcffmlpiw81yn7n4f34lw&grant_type=client_credentials',
    //         withCredentials: false,
    // });

    // const result = await axios({
    //     url: 'https://api.igdb.com/v4/games',
    //     method: 'POST',
    //     headers: {'Client-ID': '1wa9by2dugyg8on4glc2skezxakalb','Authorization': 'Bearer dg464mahahtha6kbguc7n6pp0tsqfv'},
    //     data: "fields *; where id = 740;"
    // });

