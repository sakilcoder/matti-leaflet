const map = L.map('map',{
    zoomSnap: 0.1
}).setView([15.0394601, 101.1751232], 20); //15.0394601,101.1751232
const tiles = L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
    maxZoom: 22,
}).addTo(map);

map.options.minZoom = 17;
map.options.maxZoom = 20;

// 101.1713854520424007,15.0370657078747243 : 101.1788107051942234,15.0419516546376109

let extent=[
    [15.0370657078747243, 101.1713854520424007],
    [15.0370657078747243, 101.1788107051942234],
    [15.0419516546376109, 101.1788107051942234],
    [15.0419516546376109, 101.1713854520424007]
];

var polyExtent = L.polygon(extent);
var polygonBounds = polyExtent.getBounds();
map.fitBounds(polygonBounds);
map.setMaxBounds(polygonBounds);

var svgIconOptions = {
    iconSize: [26, 26], 
    // iconAnchor: [15, 30]
  };


function pointToLayer(feature, latlng) {
    
    var iconUrl = 'assets/symbols/'+ feature.properties.symbol;
    
    var svgIcon = L.icon({
      iconUrl: iconUrl,
      ...svgIconOptions
    });
  
    var marker = L.marker(latlng, { icon: svgIcon });
  
    return marker;
  }


let player = L.geoJson(symbols, {
    pointToLayer: pointToLayer,
    onEachFeature: function onEachZip(feature, layer) {

        var popup = L.popup();
        let str_popup = '<p style="font-size: 10px"><pre>' + feature.properties.info + '</pre></p>';
        popup.setContent(str_popup);
        layer.bindPopup(popup, popupOptions);

        layer.on('mouseover', function (e) {
            var popup = e.target.getPopup();
            popup.setLatLng(e.latlng).openOn(map);

        });

        layer.on('mouseout', function (e) {
            this.closePopup();

        });



        layer.on('click', function (e) {
            console.log(e.latlng);
        });

    }
}).addTo(map);


