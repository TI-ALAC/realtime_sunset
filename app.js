
function mostrarVideo(videoContainerId) {
    var videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(function(container) {
        container.style.display = 'none';
    }); 
    document.getElementById(videoContainerId).style.display = 'block';
}

function actualizarTiempoRestante() {
    var latitud = -0.1807;
    var longitud = -78.4678;
    var url = 'https://api.sunrise-sunset.org/json?lat=' + latitud + '&lng=' + longitud + '&formatted=0';
    fetch(url)
    .then(response => response.json())
    .then(data => {
        var sunsetTime = new Date(data.results.sunset);
        var ahora = new Date();
        var tiempoRestante = sunsetTime - ahora;
        if (tiempoRestante > 0 && tiempoRestante <= 5 * 60 * 1000) {
            mostrarVideo('sunsetVideoContainer');
        }
        if (tiempoRestante > 5 * 60 * 1000 || tiempoRestante < 0) {
            mostrarVideo('secondVideoContainer');
        }
    })
    .catch(error => {
        console.error('Error al obtener la información del atardecer:', error);
    });
}
setInterval(actualizarTiempoRestante, 1000); 