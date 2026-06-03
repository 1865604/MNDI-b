export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json"
    );

    const data = await response.json();

    const area = data[0].timeSeries[0].areas[0];

    res.status(200).json({
      success: true,
      area: area.area.name,
      today: area.weathers[0],
      tomorrow: area.weathers[1]
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

}
