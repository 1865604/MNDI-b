async function loadData(){

document.getElementById("weather").textContent =
"天気データ接続待機中";

document.getElementById("alerts").textContent =
"防災データ接続待機中";

document.getElementById("shelters").textContent =
"避難所データ接続待機中";

}

loadData();

setInterval(loadData,300000);
