```javascript
// ======================
// MOND防災センター
// script.js
// ======================

async function loadWeather(){

  try{

    const res = await fetch("/api/weather");
    const data = await res.json();

    document.getElementById("weather").innerHTML = `
      地域：${data.area}<br>
      今日：${data.today}<br>
      明日：${data.tomorrow}
    `;

  }catch(error){

    document.getElementById("weather").textContent =
      "天気情報取得失敗";

    console.error(error);

  }

}

async function loadAlerts(){

  try{

    const res = await fetch("/api/alerts");
    const data = await res.json();

    document.getElementById("alerts").innerHTML =
      "警報情報を取得しました";

  }catch(error){

    document.getElementById("alerts").textContent =
      "警報情報取得失敗";

    console.error(error);

  }

}

async function loadShelters(){

  document.getElementById("shelters").innerHTML =
    "避難所データ準備中";

}

async function loadData(){

  document.getElementById("weather").textContent =
    "天気データ取得中...";

  document.getElementById("alerts").textContent =
    "防災データ取得中...";

  document.getElementById("shelters").textContent =
    "避難所データ取得中...";

  await loadWeather();
  await loadAlerts();
  await loadShelters();

}

function playAlarm(){

  const alarm =
    document.getElementById("alarm");

  if(alarm){
    alarm.play().catch(()=>{});
  }

}

function speak(text){

  if(!window.speechSynthesis){
    return;
  }

  const msg =
    new SpeechSynthesisUtterance(text);

  msg.lang = "ja-JP";

  speechSynthesis.speak(msg);

}

function showAlert(level,title){

  const banner =
    document.getElementById("alertBanner");

  banner.className = "";

  if(level === 3){

    banner.classList.add("level3");

    speak(
      "警戒レベル3です。高齢者等避難が発令されました。"
    );

  }

  if(level === 4){

    banner.classList.add("level4");

    playAlarm();

    speak(
      "警戒レベル4です。避難指示が発令されました。"
    );

  }

  if(level === 5){

    banner.classList.add("level5");

    playAlarm();

    speak(
      "警戒レベル5です。命を守る行動を取ってください。"
    );

  }

  banner.innerHTML = `
    🚨 警戒レベル${level}<br>
    ${title}
  `;

}

function hideAlert(){

  const banner =
    document.getElementById("alertBanner");

  banner.className = "";
  banner.style.display = "none";

}

function testLevel3(){

  showAlert(
    3,
    "高齢者等避難"
  );

}

function testLevel4(){

  showAlert(
    4,
    "避難指示"
  );

}

function testLevel5(){

  showAlert(
    5,
    "緊急安全確保"
  );

}

loadData();

setInterval(
  loadData,
  300000
);
```
```javascript
// ======================
// 地図機能
// ======================

let map;
let currentMarker;

function initMap(){

  map = L.map("map").setView(
    [35.681236, 139.767125],
    12
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        "&copy; OpenStreetMap contributors"
    }
  ).addTo(map);

}

function locateUser(){

  if(!navigator.geolocation){
    return;
  }

  navigator.geolocation.getCurrentPosition(

    function(position){

      const lat =
        position.coords.latitude;

      const lng =
        position.coords.longitude;

      map.setView(
        [lat,lng],
        15
      );

      if(currentMarker){
        map.removeLayer(
          currentMarker
        );
      }

      currentMarker =
        L.marker([lat,lng])
        .addTo(map)
        .bindPopup("現在地");

      showSampleShelters(
        lat,
        lng
      );

    },

    function(error){

      console.error(error);

    }

  );

}

function showSampleShelters(
  lat,
  lng
){

  const shelters = [

    {
      name:"避難所A",
      lat:lat + 0.003,
      lng:lng + 0.002
    },

    {
      name:"避難所B",
      lat:lat - 0.004,
      lng:lng + 0.003
    }

  ];

  let html =
    "<h3>近くの避難所</h3>";

  shelters.forEach(
    shelter => {

      L.marker([
        shelter.lat,
        shelter.lng
      ])
      .addTo(map)
      .bindPopup(
        shelter.name
      );

      html += `
        ${shelter.name}<br>
      `;

    }
  );

  document.getElementById(
    "shelters"
  ).innerHTML = html;

}

initMap();
locateUser();
```
