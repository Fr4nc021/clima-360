<?php
header("Content-Type: application/json");

//chave da API 
$chave = "6085103515cb46b654a7f47c44002cc2";   // https://home.openweathermap.org/users/sign_up (fazer a sua inscrição e pegar o codigo da API)

// Recebe cidade ou coordenadas
$cidade = $_GET['cidade'] ?? null;
$lat = $_GET['lat'] ?? null;
$lon = $_GET['lon'] ?? null;

// Monta a URL
if ($lat && $lon) {
    $url = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=$chave&units=metric&lang=pt_br";
} elseif ($cidade) {
    $url = "https://api.openweathermap.org/data/2.5/weather?q=$cidade&appid=$chave&units=metric&lang=pt_br";
} else {
    echo json_encode(["erro" => "Parâmetros não informados."]);
    exit;
}
echo json_encode([
    'nome' => $cidade,
    'temperatura' => $temperatura,
    'descricao' => $descricao
  ]);

// Faz a chamada
$response = file_get_contents($url);
echo $response;
