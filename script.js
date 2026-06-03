async function loadWeather(){
  // 天気取得処理
}

async function loadAlerts(){

  try{

    const res = await fetch("/api/alerts");
    const data = await res.json();

    document.getElementById("alerts").innerHTML =
      "警報情報を取得しました";

  }catch{

    document.getElementById("alerts").textContent =
      "警報情報取得失敗";

  }

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

}

function showAlert(level, title){

  const banner =
    document.getElementById("alertBanner");

  banner.className = "";

  if(level === 3){
    banner.classList.add("level3");
  }

  if(level === 4){
    banner.classList.add("level4");
  }

  if(level === 5){
    banner.classList.add("level5");
  }

  banner.innerHTML =
