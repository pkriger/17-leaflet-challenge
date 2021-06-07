var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data.features);
  createFeatures(data.features);
});

//function to return the appropriate color for the markers
function circleColor(depth) {
 var colors = ['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#c51b8a','#7a0177']
  return depth > 25 ? colors[5] :
         depth > 15 ? colors[4] :
         depth > 10 ? colors[3] :
         depth > 5 ? colors[2] :
         depth > 1 ? colors[1] :
         depth > -5 ? colors[0] :
                     "Black";
};

function circleRadius(mag) {
  return mag*6; 
};

function createFeatures(earthquakeData) {
  
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time)+
      "</p>");
  //    console.log(feature.geometry.coordinates[2]);
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array

  var earthquakes = L.geoJSON(earthquakeData, {
     pointToLayer: (feature, latlng)=> {
      var geojsonMarkerOptions = {
        fillColor: circleColor(feature.geometry.coordinates[2]),
        radius: circleRadius(feature.properties.mag),
        color: "#000",
        weight: 1,
        opacity: .75,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
     },
     onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
 
  // Bonus add addiotional tilelayer
  // var darkmap = L.tileLayer()
 
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap
    //,"Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4.5,
    layers: [streetmap, earthquakes]
  });

  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
      depth = [-5, 1, 5, 10, 15, 25],
      labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
          '<i style="background:' + circleColor(depth[i] + 1) + '"></i> ' +
          depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
      }
      return div;
  };
  
  legend.addTo(myMap);  
  // Add the layer control to the map
  //L.control.layers(baseMaps, overlayMaps, {
    //collapsed: false
  //}).addTo(myMap);
}





