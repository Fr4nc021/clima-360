async function buscarClimaPorCoordenada(lat, lon) {
    try {
      const resposta = await fetch("http://localhost:3000/clima-por-coordenada", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ latitude: lat, longitude: lon })
      });
  
      const dados = await resposta.json();
      console.log("Clima atual:", dados);
      // Aqui você pode exibir no HTML os dados
    } catch (erro) {
      console.error("Erro ao buscar clima:", erro);
    }
  }
  