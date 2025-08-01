const songJSON = [
{
    id: 1,
    names: "Runaway",
    artist: "Aurora",
    image: "multimedia/Song_img/Aurora_-_Runaway.png",
    genre: "Pop",
    source: "multimedia/Songs/Runaway.mp3"
},

{
    id: 2,
    names: "Shape of you",
    artist: "Ed Sheeran",
    image: "multimedia/Song_img/size_m.webp",
    genre: "Pop",
    source: "multimedia/Songs/Shape of you.mp3"
},

{
    id: 3,
    names: "Someone like you",
    artist: "Adele",
    image: "multimedia/Song_img/someone_like_you.webp",
    genre: "Pop",
    source: "multimedia/Songs/Someone like you.mp3"
},

{
    id: 4,
    names: "Sugar",
    artist: "Maroon 5",
    image: "multimedia/Song_img/sugar.jpeg",
    genre: "Hip-hop",
    source: "multimedia/Songs/Sugar.mp3"
},

{
    id: 5,
    names: "The Nights",
    artist: "Avicii",
    image: "multimedia/Song_img/night.jpeg",
    genre: "Hip-hop",
    source: "multimedia/Songs/The Nights.mp3"
},

{
    id: 6,
    names: "Wonderwall",
    artist: "asis",
    image: "multimedia/Song_img/wonder.jpeg",
    genre: "Rock",
    source: "multimedia/Songs/Wonderwall.mp3"
}
];

let currentIndex = 0;
let playlists = {}; 
let selectedPlaylist = null;


//.........ALL SONGS SECTION............

const songList = document.getElementById("songlist");
const genreSelect = document.getElementById("genreselect");



function showSongs(genre1) {
    songList.innerHTML = ""; // Clear previous songs

    for (let i = 0; i < songJSON.length; i++) {
        if (genre1 === "All" || songJSON[i].genre === genre1) {
            const para = document.createElement("p");
            para.className = "songlistpara song-" + songJSON[i].id;
            para.textContent = songJSON[i].names;
            songList.appendChild(para);
        }
    }

    //song card
const elements = document.getElementsByClassName("songlistpara");
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function(){
        renderCurrentSong(this.textContent);
    });
}
}
// Function to display songs based on genre
genreSelect.addEventListener("change", function(){
    showSongs(this.value);
});

//Initialize the list
window.onload = function () {
    showSongs("All");
    renderCurrentSong("Runaway");
};



//...............SONG CARD function.................
function renderCurrentSongIndex(index)
{
    const song = songJSON[index];
    if (!song) return;

    currentIndex = index;

    const songCard = document.getElementById("song-card");
    songCard.innerHTML = "";

    const songPlayer = document.getElementById("song-player");
    songPlayer.innerHTML = "";

            const songImg = document.createElement("img");
            songImg.className = "songimg";
            songImg.setAttribute("src",song.image);

            const songTitle = document.createElement("p");
            songTitle.className = "songtitle";
            songTitle.textContent = song.names;

            const songArtist = document.createElement("p");
            songArtist.className = "songartist";
            songArtist.textContent = song.artist;

            //.......SONG PLAYER TAB........
            const songplayer = document.createElement("audio");
            songplayer.className = "song-player";
            songplayer.setAttribute("controls",true);
            songplayer.setAttribute("autoplay",true);
            const audiosrc = document.createElement("source");
            audiosrc.setAttribute("src",song.source);
            songplayer.appendChild(audiosrc);
            songPlayer.appendChild(songplayer);


            songCard.appendChild(songImg);
            songCard.appendChild(songTitle);
            songCard.appendChild(songArtist);
        }


//.......NEXT PREV BUTTON..................
document.getElementById("next").addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % songJSON.length;
    renderCurrentSongIndex(currentIndex);
});

document.getElementById("prev").addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + songJSON.length) % songJSON.length;
    renderCurrentSongIndex(currentIndex);
});

function renderCurrentSong(songName) {
    const song = songJSON.find(s => s.names === songName);
    if (!song) return;
    currentIndex = songJSON.indexOf(song);
    renderCurrentSongIndex(currentIndex);
}


//...........CREATE PLAYLIST..........
document.getElementById("create-playlist").addEventListener("click",function(){
    createPlaylist();
});

function createPlaylist() {
    const playName = document.getElementById("play-name").value.trim();
    if (playName === "") {
        alert("ENTER PLAYLIST NAME.......");
        return;
    }

    if (playlists[playName]) {
        alert("Playlist already exists.");
        return;
    }

    playlists[playName] = []; 
    selectedPlaylist = playName;

    const allPlay = document.getElementById("all-playlist");
    const playPara = document.createElement("p");
    playPara.className = "songlistpara";
    playPara.textContent = playName;

    playPara.addEventListener("click", function () {
        selectedPlaylist = this.textContent;
        renderCurrentPlaylist(selectedPlaylist);
    });

    allPlay.appendChild(playPara);
    document.getElementById("play-name").value = ""; 
}


document.getElementById("addplaylist").addEventListener("click", function () {
    if (!selectedPlaylist) {
        alert("Please select a playlist first.");
        return;
    }

    const currentSong = songJSON[currentIndex];
    const playlist = playlists[selectedPlaylist];

    // Avoid duplicates
    const isAlreadyAdded = playlist.some(function (s) {
        return s.id === currentSong.id;
    });

    if (!isAlreadyAdded) {
        playlist.push(currentSong);
        renderCurrentPlaylist(selectedPlaylist);
    } else {
        alert("Song already in playlist.");
    }
});


function renderCurrentPlaylist(playlistName) {
    const currentPlaylistDiv = document.getElementById("current-playlist");
    currentPlaylistDiv.innerHTML = "";

    const playlist = playlists[playlistName];

    playlist.forEach(function (song) {
        const songEntry = document.createElement("p");
        songEntry.className = "songlistpara";
        songEntry.textContent = song.names + " - " + song.artist;

        // Optional: allow clicking to play the song
        songEntry.addEventListener("click", function () {
            renderCurrentSong(song.names);
        });

        currentPlaylistDiv.appendChild(songEntry);
    });
}



function toggleTheme() {
    const checkbox = document.getElementById("theme-toggle-checkbox");
    const label = document.getElementById("theme-label");

    const isDark = checkbox.checked;
    document.body.classList.toggle("dark-theme", isDark);
    label.textContent = isDark ? "Light" : "Dark";

    localStorage.setItem("theme", isDark ? "dark" : "light");
}


window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    const checkbox = document.getElementById("theme-toggle-checkbox");
    const label = document.getElementById("theme-label");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        checkbox.checked = true;
        label.textContent = "Light";
    } else {
        label.textContent = "Dark";
    }
});





