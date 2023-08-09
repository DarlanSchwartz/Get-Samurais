export default async function distanceBetweenLocations(from, to) {
    const url1 = `https://nominatim.openstreetmap.org/search?format=json&q=${from}`;
    const url2 = `https://nominatim.openstreetmap.org/search?format=json&q=${to}`;
  
    // Retorna a promessa resultante da Promise.all
    try {
        const responses = await Promise.all([fetch(url1), fetch(url2)]);
        const data = await Promise.all(responses.map(response => response.json()));
        const location1 = { lat: parseFloat(data[0][0].lat), lon: parseFloat(data[0][0].lon) };
        const location2 = { lat: parseFloat(data[1][0].lat), lon: parseFloat(data[1][0].lon) };

        function haversineDistance(lat1, lon1, lat2, lon2) {
            const R = 6371;
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance;
        }

        const distance_1 = haversineDistance(location1.lat, location1.lon, location2.lat, location2.lon);
        return distance_1.toFixed(2);
    } catch (error) {
        console.log('Erro ao buscar coordenadas:', error);
        return 'Unknown';
    }
  }
  