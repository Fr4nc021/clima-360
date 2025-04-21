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
  
              // Exemplo de alerta simples
              if (data.weather && data.weather[0].main === "Thunderstorm") {
                alert("⚠️ Tempestade à vista!");
              }
            })
            .catch((err) => {
              console.error("Erro ao buscar clima:", err);
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