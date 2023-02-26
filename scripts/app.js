const search = document.querySelector('#search');
const pkmnId = document.querySelector('#number');
const pkmnDefaultPhoto = document.querySelector('#pokemon-image');
const types  = document.querySelector('#types');
const pkmnStatNumber =  document.querySelectorAll('.stat-number');
const barInner = document.querySelectorAll('.bar-inner');
const barOuter = document.querySelectorAll('.bar-outer');
const statDesc = document.querySelectorAll('.stat-desc');
const baseStats = document.querySelector('#base-stats');
const pokedex = document.querySelector('#pokedex')

const typeColors = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255]
}

const fetchApi = async (pkmnName) => {
    const pkmnNameClean = pkmnName.split(' ').join('-')
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnNameClean);
    
    if (response.status === 200) {
        const pkmnData =  await response.json()
        return pkmnData;
    }
    return false;
}

search.addEventListener('change', async (e) => {
    const pkmnData = await fetchApi(e.target.value.toLowerCase(e));

    // VALIDATION FOR WHEN POKEMON DOES NOT EXIST
    if(!pkmnData) {
        alert('Pokemon Name Does Not Exist.');
        return;
    }
    // MAIN POKEMON COLOR FOR CHANGING UI BACKGROUND
    const mainColor = typeColors[pkmnData.types[0].type.name];
    baseStats.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;


    // SETS POKEMON ID AT TOP OF PAGE
    pkmnId.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');

    // SETS POKEMON IMAGE
    pkmnDefaultPhoto.src = pkmnData.sprites.other.home.front_default;

    // UPDATES TYPE BUBBLES
    types.innerHTML = '';

    pkmnData.types.forEach((t) => {
        // CREATE ELEMENT FOR TYPE SPAN
        let newType = document.createElement('span');
        let color = typeColors[t.type.name];
        // ADD TYPE NAME AND COLOR
        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        // APPEND NEW SPAN TO OLD SPAN WITH NEW NAME AND COLOR
        types.appendChild(newType);
    });

    // UPDATE STATS AND STAT BAR
    pkmnData.stats.forEach((s, i) => {
        pkmnStatNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
        barInner[i].style.width = `${s.base_stat}%`;
        barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        barOuter[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
        statDesc[i].style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    });
})