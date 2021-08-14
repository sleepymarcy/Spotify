const playbackTime = document.querySelector(".playback-time");
const currentTime = document.querySelector(".curent-time");
const totalTime = document.querySelector(".total-time");
const playBtn = document.querySelector(".btn-footer-play > i");

function getArtist(id) {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9835f40629mshe9f0744f8b07fe0p13e171jsn785e2f64657a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((artistData) => {
      displayArtist(artistData);
      loadMoreTracksBTN(artistData.id);
      console.log(artistData);
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("artist loading");
}

function fetchTrack(id) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`,
    {}
  )
    .then((response) => response.json())
    .then((trackData) => {
      displayTrack(trackData.data);

      console.log(trackData.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function loadMoreTracks(event, ArtistId, tracksLoaded) {
  fetch(
    `https://strive-proxy.herokuapp.com/https://api.deezer.com/artist/${ArtistId}/top?index=${tracksLoaded}`
  )
    .then((data) => data.json())
    .then((moreData) => {
      console.log(moreData);
      displayTrack(moreData.data);
    });
}

let tracksParentContainer = document.querySelector(".trackTable");
function loadMoreTracksBTN(artistId) {
  let loadMoreBtn = document.createElement("button");
  loadMoreBtn.setAttribute("type", "button");
  loadMoreBtn.classList.add("btn", "btn-outline-light");
  loadMoreBtn.innerText = "Load More";
  tracksParentContainer.append(loadMoreBtn);

  loadMoreBtn.addEventListener("click", function (e) {
    alert(artistId);
    tracksLoaded += 5;
    loadMoreTracks(e, artistId, tracksLoaded);
  });
}

let tracksLoaded = 0;

function displayTrack(tracks) {
  let tracksContainer = document.querySelector(".trackTable tbody");

  tracks.forEach((track, index) => {
    let trackContainer = document.createElement("tr");
    trackContainer.classList.add("track-item");

    trackContainer.innerHTML = `<th scope="row">${index + 1}</th>
    <th scope="col"> 
        <a href = "album.html">
        <img src="${track.album.cover}" alt="">
         </a>
      </th>
    <td>${track.title_short}</td>
    <td>${track.rank.toLocaleString()}</td>
    <td>${secondsToMinutes(track.duration)}</td>
    `;

    tracksContainer.append(trackContainer);

    trackContainer.addEventListener("click", function () {
      loadPlayback(track);
    });
    let loadAlbum = trackContainer.querySelector("th a");
    loadAlbum.addEventListener("click", function (e) {
      alert(track.album.id);
    });
  });
}

function loadPlayback(trackItem) {
  console.log(trackItem);
  let albumImage = document.querySelector("#footer-left .album-cover-image");
  albumImage.innerHTML = `<img
  class="img-fluid"
  src="${trackItem.album.cover}"
  alt=""
/>`;
  let songTitle = document.querySelector("#footer-left .song-title");
  songTitle.innerText = `${trackItem.title_short}`;
  let songAuthor = document.querySelector("#footer-left .song-author");
  songAuthor.innerText = `${trackItem.artist.name}`;

  songAuthor.addEventListener("click", function () {
    getArtist(trackItem.artist.id);
  });

  totalTime.innerText = `${secondsToMinutes(trackItem.duration)}`;
}

function displayArtist(artist) {
  let artistHeader = document.querySelector(".artistHeader");
  let artistTitle = document.createElement("div");
  artistTitle.classList.add("artistTitle");
  artistHeader.append(artistTitle);
  console.log(artistHeader);

  let artistImage = document.querySelector(".nav-artist");
  artistImage.style.backgroundImage = `url(${artist.picture_xl})`;

  artistTitle.innerHTML = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  width="38"
  height="38"
  viewBox="0 0 172 172"
  style="fill: #000000"
>
  <g
    fill="none"
    fill-rule="nonzero"
    stroke="none"
    stroke-width="1"
    stroke-linecap="butt"
    stroke-linejoin="miter"
    stroke-miterlimit="10"
    stroke-dasharray=""
    stroke-dashoffset="0"
    font-family="none"
    font-weight="none"
    font-size="none"
    text-anchor="none"
    style="mix-blend-mode: normal"
  >
    <path d="M0,172v-172h172v172z" fill="none"></path>
    <g>
      <path
        d="M86,7.16667l16.125,17.91667l23.29167,-7.16667l5.375,23.29167l23.29167,5.375l-7.16667,23.29167l17.91667,16.125l-17.91667,16.125l7.16667,23.29167l-23.29167,5.375l-5.375,23.29167l-23.29167,-7.16667l-16.125,17.91667l-16.125,-17.91667l-23.29167,7.16667l-5.375,-23.29167l-23.29167,-5.375l7.16667,-23.29167l-17.91667,-16.125l17.91667,-16.125l-7.16667,-23.29167l23.29167,-5.375l5.375,-23.29167l23.29167,7.16667z"
        fill="#2197ee"
      ></path>
      <path
        d="M123.98333,52.31667l-48.73333,48.73333l-20.06667,-20.06667l-10.03333,10.03333l30.1,30.1l58.76667,-58.76667z"
        fill="#e3f2fd"
      ></path>
    </g>
  </g>
</svg>
<h5>Verified Artist</h5>
<h1>${artist.name}</h1>
<h6>${artist.nb_fan.toLocaleString()}</h6>`;
}

function secondsToMinutes(seconds) {
  let minutes = Math.floor(seconds / 60);
  let _seconds = Math.floor(seconds - minutes * 60);
  let timeStr = `${minutes}:${_seconds < 10 ? "0" + _seconds : _seconds}`;
  return timeStr;
}

let searchBar = document.querySelector(".search");

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

searchBar.addEventListener("click", function () {
  let searchBigBar = document.createElement("input");
  let searchPlace = document.querySelector(".main-scroll");
  let navbarToggler = document.querySelector(".navbar-toggler");

  setAttributes(searchBigBar, {
    type: "text",
    class: "form-control search-bar",
    placeholder: "Search...",
    onchange: "searchForArtist(this.value)",
  });
  searchPlace.insertBefore(searchBigBar, navbarToggler);
  //   if (searchPlace.querySelector("search-bar") == null) {
  //     searchPlace.insertBefore(searchBigBar, navbarToggler);
  //   } else {
  //     searchPlace.removeChild(searchBigBar);
  //   }
});

function searchForArtist(query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then((response) => response.json())
    .then((el) => getArtist(el.data[0].artist.id));
}

playBtn.addEventListener("click", function () {
  if (playBtn.className === "fas fa-play-circle") {
    playBtn.classList.remove("fa-play-circle");
    playBtn.classList.add("fa-pause-circle");
  } else {
    playBtn.classList.remove("fa-pause-circle");
    playBtn.classList.add("fa-play-circle");
  }
});

let totalTimeValue = totalTime.innerText.split(":");
totalTimeValue = +totalTimeValue[0] * 60 + +totalTimeValue[1];

playbackTime.addEventListener("input", function () {
  let time = playbackTime.value;
  let timeInseconds = (totalTimeValue * `${+time}`) / 100;
  let minutes = Math.floor(timeInseconds / 60);
  let seconds = Math.floor(timeInseconds - minutes * 60);
  //   console.log(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);

  playbackTime.style.backgroundSize = `${time}% 100%`;
  playbackTime.setAttribute("value", `${time}%`);
  currentTime.innerText = `${minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
});

window.onload = function (event) {
  currentTime.innerText = "0:00";
  playbackTime.style.backgroundSize = `0% 100%`;
  playbackTime.setAttribute("value", "0");
  getArtist(13);
  fetchTrack(13);
};
