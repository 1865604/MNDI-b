export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://www.jma.go.jp/bosai/warning/data/warning/map.json"
    );

    const data = await response.json();

    res.status(200).json({
      success: true,
      updated: data.reportDatetime,
      warnings: data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

}
