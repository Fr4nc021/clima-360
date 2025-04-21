const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', locationSchema);

router.post('/clima-por-coordenada', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude e longitude são obrigatórias." });
  }

  try {
    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const { temperature, weathercode } = weatherResponse.data.current_weather;

    const weatherDescription = getWeatherDescription(weathercode);

    res.status(200).json({ temperature, weatherDescription });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clima", error: error.message });
  }
});
