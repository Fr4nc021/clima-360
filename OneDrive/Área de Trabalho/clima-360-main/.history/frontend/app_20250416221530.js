// Essa função pega a localização atual do usuário e envia para o PHP
function buscarClimaPelaLocalizacao() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          // Faz a requisição pro seu backend com lat e lon
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=$chave&units=metric&lang=pt_br`)
            .then((res) => res.json())
            .then((data) => {
              console.log("Dados do clima:", data);
  
              // Exibir o resultado no HTML (pode adaptar)
              document.getElementById("resultado").innerText = JSON.stringify(data, null, 2);
  
              // Alerta de clima, se houver
              if (data.alerta) {
                alert(data.alerta);
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
  