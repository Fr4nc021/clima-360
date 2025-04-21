function buscarClimaPelaLocalizacao() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const chave = "6085103515cb46b654a7f47c44002cc2"; 
  
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&units=metric&lang=pt_br`)
            .then((res) => res.json())
            .then((data) => {
              console.log("Dados do clima:", data);
  
              document.getElementById("resultado").innerText = JSON.stringify(data, null, 2);

              verificarAlertasClimaticos(data);
            })
            .catch((err) => {
              console.error("Erro ao buscar clima:", err);
              alert("Erro ao buscar clima. Tente novamente.");
            });
        },
          (error) => {
          console.error("Erro ao obter localização:", error.message);
          alert("Não foi possível acessar sua localização.");
        }
      );
    } else {
      alert("Geolocalização não é suportada nesse navegador.");
    }
  }
  
    function verificarAlertasClimaticos(data) {
    const temp = data.main.temp;
    const weather = data.weather[0].main;
    const description = data.weather[0].description;
  
    // Temperaturas extremas
    if (temp >= 35) {
      alert("Alerta: Calor extremo!");
    } else if (temp <= 5) {
      alert("Alerta: Frio intenso!");
    }
  
    // Condições climáticas severas
    if (weather === "Thunderstorm") {
      alert("Alerta de tempestade: " + description);
    } else if (weather === "Rain" || weather === "Drizzle") {
      alert("Alerta de chuva: " + description);
    } else if (weather === "Snow") {
      alert("Alerta de neve!");
    }
  }