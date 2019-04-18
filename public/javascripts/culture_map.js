let cultureOSM = new L.TileLayer(stamenTonerUrl_Lite, {
  minZoom: min_zoom,
  maxZoom: max_zoom,
  attribution: stamenTonerAttrib
});

let cultureMap = new L.Map('culture-map');
cultureMap.setView(new L.LatLng(nwLat, nwLng), zoom);
cultureMap.addLayer(cultureOSM);

/************************************
 * culture
 ************************************/



d3.csv("../data/Cultural_Services_and_Facilities.csv")
  .then(function(data) {

    console.log("Data " + JSON.stringify(data[0]));
    // console.log("Keys: " + Object.keys(data[0]));

    // let donegalData = data.filter((v) => {
    //   return v.Region === "Donegal";
    // });
    //

    let cultureMapIcon = L.icon({
      iconUrl: '/images/marker-15.svg',
      iconSize: [30, 30], //orig size
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    let cultureCluster = L.markerClusterGroup();
    cultureData = data.map((d) => {
      let result = proj4(firstProjection, secondProjection, [+d["EASTING"], +d["NORTHING"]]);
      cultureCluster.addLayer(L.marker(new L.LatLng(result[1], result[0]), {
          icon: cultureMapIcon
        })
        .bindPopup(getPopupInfo(d)));
    });
    cultureMap.addLayer(cultureCluster);
    cultureMap.fitBounds(cultureCluster.getBounds());

    // console.log("Mapped data " + JSON.stringify(cultureData[0]));

    function getPopupInfo(d_) {
      return '<h3>' + d_["NAME"] + '</h3>' +
        '<b><i>' + d_["TYPE"] + '</i></b><br>' +
        d_["ARTFORM"] + "<br>" +
        d_["ADDRESS"] + "<br>" +
        d_["WEB"] + "<br>";
    }

  })
  .catch(function(err) {
    console.log("Error loading file\n " + err)
  });