// Call Api
document.getElementById("searchBtn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value;
  const url = `https://api.lyrics.ovh/suggest/${searchInput}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displaySongs(data.data))
    .catch((error) =>
      displayError("Something Wrong! Please try again later!!!")
    );
});

// display Song
const displaySongs = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = " ";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
    </div>
    <audio controls>
         <source src="${song.preview}" type="audio/mpeg">
    </audio>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>`;
    songContainer.appendChild(songDiv);
  });
};

// Get lyric
const getLyric = (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLyrics(data.lyrics))
    .catch((error) =>
      displayError("Sorry! Invalid Search, Please try again!!!")
    );
};

// Display lyrics
const displayLyrics = (lyrics) => {
  const lyricsDiv = document.getElementById("song-lyrics");
  lyricsDiv.innerText = lyrics;
};

// Error Msg Function
const displayError = (error) => {
  const errorMssg = document.getElementById("error-msg");
  errorMssg.innerText = error;
};
