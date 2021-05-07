let p_array = ['mercury.jpg','venus.png','earth.jpg','mars.jpg',
'jupiter.jpg','saturn.jpg','uranus.jpg', 'neptune.jpg'];

export const renderPlanets = function() {
    
    return `
        <table>
            <tr>
                <td id="p_tile"><button id="press_tile" target="mercure"><img id="tile_img" src="game_pics/${p_array[0]}"></button></td>
                <td id="p_tile"><button id="press_tile" target="venus"><img id="tile_img" src="game_pics/${p_array[1]}"></button></td>
                <td id="p_tile"><button id="press_tile" target="terre"><img id="tile_img" src="game_pics/${p_array[2]}"></button></td>
                <td id="p_tile"><button id="press_tile" target="mars"><img id="tile_img" src="game_pics/${p_array[3]}"></button></td>
                <td id="p_tile"><button id="press_tile" target="jupiter"><img id="tile_img" src="game_pics/${p_array[4]}"></button></td>
                <td id="p_tile"><button id="press_tile" target="saturne"><img id="tile_img" src="game_pics/${p_array[5]}"></button></td>
                <td id="p_tile"><button id="press_tile" target="uranus"><img id="tile_img" src="game_pics/${p_array[6]}"></button></td>
                <td id="p_tile"><button id="press_tile" target="neptune"><img id="tile_img" src="game_pics/${p_array[7]}"></button></td>
            </tr>
            
        </table><br>   
     `
};



export const renderPlanetInfo = function(p) {
    let mass = p["mass"]["massValue"];
    let exp = p["mass"]["massExponent"];
    return `
    <table id="planet_table" target="${p["id"]}">
        <tr>
            <th class="planet_header">Name</th>
            <th class="planet_header">Mass</th>
            <th class="planet_header">Gravity</th>
            <th class="planet_header">Density</th>
            <th class="planet_header">Radius</th>
            <th class="planet_header">Axial Tilt</th>
        </tr>
        <tr>
            <td class="planet_td" style="color:#fa0202">${p["englishName"]}</td>
            <td class="planet_td">${mass}<sup>${exp}</sup> kg</td>
            <td class="planet_td">${p["gravity"]} m/s<sup>2</sup></td>
            <td class="planet_td">${p["density"]} g/cm<sup>3</sup></td>
            <td class="planet_td">${p["polarRadius"]} km</td>
            <td class="planet_td">${p["axialTilt"]}°</td>
        </tr>
    </table> <br>
 `
};



export const handlePlanetClick = function(event) {
    let planet_name = event.data.name;
    let already_in = false;
    // check if button is already in the container
    let on_tables = document.querySelectorAll('#planet_table');
    for (let i=0; i<on_tables.length; i++) {
        const $curr_table = $(on_tables[i]);
        let table_name = $curr_table.attr('target');
        if (table_name == planet_name) {
            already_in = true;
        }
    }
    if (already_in == false) {
        let response = callPlanetInfo(planet_name);
    }
    return;
};
export async function callPlanetInfo(name) {
    let name_url = 'https://api.le-systeme-solaire.net/rest/bodies/' + name;
    const planet_info = await axios({
        method: 'get',
        url: name_url,
        withCredentials: false,
      });
    const $the_tables = $('#p_tables');
    $the_tables.prepend(renderPlanetInfo(planet_info.data));
    return planet_info.data;
};

export const handleClearBoard = function(event) {
    const $alltables = $('#p_tables');
    $alltables.empty();
};


export async function loadPlanetPage() {
    const $planets_sec = $('#planets_sec');
    $planets_sec.append(renderPlanets());


    let planetbuttons = document.querySelectorAll('#press_tile');
    for (let i=0; i<planetbuttons.length; i++) {
        const $curr_button = $(planetbuttons[i]);
        $curr_button.on("click", {
            name: $curr_button.attr('target'),
        },
        handlePlanetClick);
    }

    const $resetbutton = $('#reset_button');
    $resetbutton.on("click", handleClearBoard);

};

$(function() {
    loadPlanetPage();
});