
//function createMap(earthquakes) {
  var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5
    //layers: [streetmap, earthquakes]
    });
    // Adding a tile layer (the background map image) to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data.features);
  var markers = L.circleMarker();

  data.forEach(d => {
    var location = d.location;
    if (location) {
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
      .bindPopup(response[i].descriptor));
    }
  })

  //createFeatures(data.features);
});
   // Define a baseMaps object to hold our base layers
  //  var baseMaps = {
  //   "Light Map": lightmap
  // };
  
  //   // Create overlay object to hold our overlay layer
  // var overlayMaps = {
  //   "Earthquakes": earthquakes
  // };
  
  

//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(myMap);   


// }






