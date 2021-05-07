export const renderPOTD = function(data) {
    return `
    <div class="flex-child" id="potd">
        <div class="content">
            <img width="600px"; height="300px" src="${data.url}" alt="Pic of the Day">
        </div>
    </div>
    <div class="flex-child">
        <div class="content" id="potd_desc">
          <p> <strong id="bold_potd">Title:</strong> ${data["title"]}</p>
          <p> <strong id="bold_potd">Date:</strong> ${data["date"]}</p>
          <p> <strong id="bold_potd">Explanation:</strong> ${data["explanation"]}</p>
        </div>
    </div>`
};

export const embedVideo = function(data) {
    return `
    <div class="flex-child" id="potd">
        <div class="content">
            <iframe width="620" height="350"
                src="${data.url}">
            </iframe>
        </div>
    </div>
    <div class="flex-child">
        <div class="content" id="potd_desc">
          <p> <strong id="bold_potd">Title:</strong> ${data["title"]}</p>
          <p> <strong id="bold_potd">Date:</strong> ${data["date"]}</p>
          <p> <strong id="bold_potd">Explanation:</strong> ${data["explanation"]}</p>
        </div>
    </div>`
};

export const newsArticlesAPI = function(article) {
    
    return `
        <div class="flex-child" id="news_child">
            <div id="article_img_div">
                <img id="art_pic" src=${article['imageUrl']} alt="article_image_unavailable">
            </div>
            <div id="article_title_div">
                <h2 id="article_title"><a href="${article["url"]}" target="_blank">${article["title"]}</a></h2>
            </div><br>
            <div id="article_sum_div">
                <p id="art_pub">Published: ${article["publishedAt"]}</p><br>
                <p id="art_sum">${article["summary"]}</p><br><br><br>
            </div>
           
            
        </div>
    `
};




export const recentEarthPic = function(pic) {
    let id = pic["identifier"];
    let coordinates = pic["centroid_coordinates"];
    let lat = coordinates["lat"];
    let lon = coordinates["lon"];
    let year = id[0] + '' + id[1] + '' + id[2] + '' + id[3];
    let month = id[4] + '' + id[5];
    let day = id[6] + '' + id[7];
    let date_taken = month + '-' + day + '-' + year;
    let image_url = 'https://epic.gsfc.nasa.gov/archive/natural/' + 
                    year + '/' + month + '/' + day + '/jpg/epic_1b_' + id + '.jpg';
    return `
        <div class="flex-child">
            <img id="earthpic" src="${image_url}" alt="earthpic">
            <p id="coords">Taken on: ${date_taken}</p>
            <p id="coords">Lat: ${lat},<br>Long: ${lon}</p>
        </div>
    `
};

export const curiosityRoverWeather = function(data) {
    let templow = Math.round((Number(data["min_temp"]) * (9/5)) + 32);
    let temphigh = Math.round((Number(data["max_temp"]) * (9/5)) + 32);
    let d = data["terrestrial_date"];
    let actual_date = d[0] + '' + d[1] + d[2] + d[3] + d[4] + d[5] + d[6] + d[7] + d[8] + d[9];
    return `
        <div class="flex-child" id="rover_weather">
            <p id="rover_desc">The Mars Curiosity rover landed on Mars in 2012, and is functioning to this day.
            As per NASA: "Curiosity set out to answer the question: 
            Did Mars ever have the right environmental conditions to support small life forms called microbes? 
            Early in its mission, Curiosity's scientific tools found chemical and mineral evidence of past habitable environments on Mars. 
            It continues to explore the rock record from a time when Mars could have been home to microbial life". 
            The data in the following table updates with the most recent weather data retrieved from Curiosity.
            </p>
            <table id="rover_table">
                <tr>
                    <th class="rover_header">Earth Date</th>
                    <th class="rover_header">Sol</th>
                    <th class="rover_header">Temp. Low</th>
                    <th class="rover_header">Temp. High</th>
                    <th class="rover_header">Atmo. Opacity</th>
                </tr>
                <tr>
                    <td>${actual_date}</td>
                    <td>${data["sol"]}</td>
                    <td>${templow} °F</td>
                    <td>${temphigh} °F</td>
                    <td>${data["atmo_opacity"]}</td>
                </tr>
            </table>
        </div>
    `
};
export const appendISSPeople = function(person) {
    return `
        <li>${person}</li>
    `
};
export const appendISSPosition = function(position) {
    return `
        <table id="iss_table">
            <tr>
                <th class="rover_header">Longitude</th>
                <th class="rover_header">Latitude</th>
            </tr>
            <tr>
                <td>${position.longitude}</td>
                <td>${position.latitude}</td>
            </tr>
        </table>
    `
};
export async function loadHomePage() {
    const $potd = $('#appendPOTD'); // wraps around potd
    let nasa_api = '0Iqc0NH37zWuGrCjtWhnCqO3U5fOOLNWA5bFFHyV';
// NASA picture of the day request 
    const result = await axios({
        method: 'get',
        url: 'https://api.nasa.gov/planetary/apod?api_key=0Iqc0NH37zWuGrCjtWhnCqO3U5fOOLNWA5bFFHyV',
        withCredentials: false,
        
    });
    let potd_data = result.data;
    if (result.data.media_type == 'video') {
        $potd.append(embedVideo(potd_data));
    } else {
        $potd.append(renderPOTD(potd_data));
    }


//Spaceflight News API
    const articles = await axios({
        method: 'get',
        url: 'https://spaceflightnewsapi.net/api/v2/articles',
        withCredentials: false,
    });
    const $news1 = $('#news1'); 

    let appended = 0;
    for (let i=0; i<articles.data.length; i++) {
        if (appended == 4) {
            break;
        }
        if (articles.data[i]["newsSite"] == 'SpaceNews') {
            $news1.append(newsArticlesAPI(articles.data[i]));
            appended++;
        }
    }
// MAAS2 API
const curiosity = await axios({
    method: 'get',
    url: 'https://api.maas2.apollorion.com/',
    withCredentials: false,
});
const $rover = $('#rover_cont');
$rover.prepend(curiosityRoverWeather(curiosity.data));

// NASA EPIC
const recent_dates = await axios({
    method: 'get',
    url: 'https://epic.gsfc.nasa.gov/api/natural/all?api_key=0Iqc0NH37zWuGrCjtWhnCqO3U5fOOLNWA5bFFHyV',
    withCredentials: false,
});

let count = 0;
for (let i=0; i<recent_dates.data.length; i++) {
    if (count == 4) {
        break;
    }
    let most_recent_date = recent_dates.data[i]["date"];
    let most_recent_url = 'https://epic.gsfc.nasa.gov/api/enhanced/date/' + most_recent_date + '?api_key=' + nasa_api;
    const most_recent_pic = await axios({
        method: 'get',
        url: most_recent_url,
        withCredentials: false,
    });
    const $earth_pic = $('#daily_earth_pics');
    if (most_recent_pic.data.length != 0) {
        $earth_pic.append(recentEarthPic(most_recent_pic.data[0]));
        count++;
    }
}
// PEOPLE IN SPACE + ISS LOCATION
    // const astronauts = await axios({
    //     method: 'get',
    //     url: 'http://api.open-notify.org/astros.json',
    //     withCredentials: false,
    // });
    // const $iss_people = $('#astronauts_list');
    // let people = astronauts.data["people"];
    // for (let i=0; i<people.length; i++) {
    //     if (people[i]["craft"] == 'ISS') {
    //         $iss_people.append(appendISSPeople(people[i]["name"]));
    //     }
    // }

    const iss = await axios({
        method: 'get',
        url: 'https://api.wheretheiss.at/v1/satellites/25544',
        withCredentials: false,
    });
    const $iss_pos = $('#iss_location');
    $iss_pos.append(appendISSPosition(iss.data));


};

$(function() {
    loadHomePage();
});