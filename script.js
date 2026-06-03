async function loadData(){

document.getElementById("weather").textContent =
"天気データ接続待機中";

document.getElementById("alerts").textContent =
"防災データ接続待機中";

document.getElementById("shelters").textContent =
"避難所データ接続待機中";

}

async function loadData(){

  await loadWeather();
  await loadAlerts();

};

setInterval(loadData,300000);
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
