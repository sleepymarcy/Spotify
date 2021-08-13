const playbackTime = document.querySelector(".playback-time");
const currentTime = document.querySelector(".curent-time");
const totalTime = document.querySelector(".total-time");
const playBtn = document.querySelector(".btn-footer-play > i");

function getArtist() {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/13", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9835f40629mshe9f0744f8b07fe0p13e171jsn785e2f64657a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((artistData) => {
      displayArtist(artistData);
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

function displayTrack(tracks) {
  let tracksContainer = document.querySelector(".trackTable tbody");
  let tracksParentContainer = document.querySelector(".trackTable");

  //   let loadMoreBtn = document.createElement("button");
  //   loadMoreBtn.setAttribute("type", "button");
  //   loadMoreBtn.classList.add("btn", "btn-outline-light");
  //   loadMoreBtn.innerText = "Load More";
  //   tracksParentContainer.append(loadMoreBtn);

  //   loadMoreBtn.addEventListener("click", function (e) {
  //     alert(e.target.parentNode.querySelector(".trackTable tbody"));
  //     fetch("https://api.deezer.com/artist/412/top?index=5", {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-key": "9835f40629mshe9f0744f8b07fe0p13e171jsn785e2f64657a",
  //         "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  //       },
  //     })
  //       .then((data) => data.json())
  //       .then((moreData) => {
  //         console.log(moreData);
  //       });
  //   });

  tracks.forEach((track, index) => {
    let trackContainer = document.createElement("tr");

    trackContainer.innerHTML = `<th scope="row">${index + 1}</th>
    <th scope="col">
      <img src="${track.album.cover} " alt="">
    </th>
    <td>${track.title_short}</td>
    <td>${track.rank.toLocaleString()}</td>
    <td>${secondsToMinutes(track.duration)}</td>
    `;

    tracksContainer.append(trackContainer);
  });

  //   tracksContainer.append(trackContainer);

  //   trackContainer.classList.add("row", "track-row");

  //   let tracksContainer = document.querySelector(".tracks");

  //   console.log(tracksContainer.childNodes["1"]);

  //   trackContainer.innerHTML += `<div
  //     class="
  //       track-info-left
  //       d-flex
  //       align-items-center
  //       justify-content-start
  //     "
  //   >
  //     <span class="track-number">1</span>
  //     <div class="track-img">
  //       <img src=${track.album.cover} alt="" />
  //     </div>
  //     <h5 class="track-title text-nowrap">${track.title}</h5>
  //   </div>
  //   <div class="track-info-middle track-listeners">
  //     <span>${track.rank}</span>
  //   </div>
  //   <div
  //     class="
  //       track-info-right track-length
  //       d-flex
  //       align-items-center
  //       justify-content-start
  //     "
  //   >
  //     <button class="track-like">
  //       <i class="far fa-heart"></i>
  //     </button>
  //     <span>${secondsToMinutes(track.duration)}</span>
  //     <button class="track-more">
  //       <svg
  //         role="img"
  //         height="16"
  //         width="16"
  //         viewBox="0 0 32 32"
  //         class="Svg-sc-1bi12j5-0 fIDrcz"
  //       >
  //         <path
  //           d="M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"
  //         ></path>
  //       </svg>
  //     </button>
  //   </div>`;
  //   tracksContainer.append(trackContainer);
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
  let timeStr = `${minutes}:${_seconds}`;
  return timeStr;
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
  console.log("page is fully loaded", event.curr);
  getArtist();
  fetchTrack(13);
};
