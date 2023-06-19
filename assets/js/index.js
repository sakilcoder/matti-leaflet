const map = L.map('map', {
    zoomSnap: 0.1
}).setView([15.03829, 101.174], 17.7); //15.0394601,101.1751232
// v {lat: 15.041063111000028, lng: 101.17601792800008}
// lat: 15.038292312000067, lng: 101.17408535400006


map.options.minZoom = 17.7;
map.options.maxZoom = 20;

// var imageBounds = [[51.49, -0.1], [51.51, -0.07]];
let extent = [
    [15.0370657078747243, 101.1713854520424007],
    [15.0370657078747243, 101.1788107051942234],
    [15.0419516546376109, 101.1788107051942234],
    [15.0419516546376109, 101.1713854520424007]
];

var polyExtent = L.polygon(extent);
var polygonBounds = polyExtent.getBounds();
// map.fitBounds(polygonBounds);
map.setMaxBounds(polygonBounds);

var imageOverlay = L.imageOverlay('assets/basemap/gelandeplan.png', polygonBounds);
imageOverlay.addTo(map);

function pointToLayer(feature, latlng) {

    return L.circleMarker(latlng, {
        radius: 16,
        opacity: 0,
        fillOpacity: 0
    });
}

let player = L.geoJson(symbols, {
    pointToLayer: pointToLayer,
    onEachFeature: function onEachZip(feature, layer) {

        var popup = L.popup();
        let str_popup = '<p style="font-size: 10px"><pre>' + feature.properties.info + '</pre></p>';
        popup.setContent(str_popup);
        layer.bindPopup(popup, popupOptions);
    }
}).addTo(map);

map.on('zoomend', function () {
    var zoom = map.getZoom();
    console.log(zoom);
    var newRadius = 16;

    if(zoom<18){
        newRadius=16;
    }else if (zoom>=18 && zoom<18.5){
        newRadius=20;
    }else if (zoom>=18.5 && zoom<19){
        newRadius=30;
    }else if (zoom>=19 && zoom<19.5){
        newRadius=42;
    }else{
        newRadius=58;
    }


    player.eachLayer(function (layer) {
        layer.setRadius(newRadius);
    });
});