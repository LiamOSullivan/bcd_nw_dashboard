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
// let cultureCluster = L.markerClusterGroup();
// let cultureMapIcon = L.icon({
//   iconUrl: '/images/transport/bicycle-15.svg',
//   iconSize: [30, 30], //orig size
//   iconAnchor: [iconAX, iconAY] //,
//   //popupAnchor: [-3, -76]
// });

d3.csv("../data/Cultural_Services_and_Facilities.csv")
  .then(function(data) {

    console.log("Data " + JSON.stringify(data[0]));
    // console.log("Keys: " + Object.keys(data[0]));

    // let donegalData = data.filter((v) => {
    //   return v.Region === "Donegal";
    // });
    //
    cultureData = data.map((d) => {
      let result = proj4(firstProjection, secondProjection, [+d["EASTING"], +d["NORTHING"]]);
      let marker = L.marker(new L.LatLng(result[1], result[0]))
      // , {
      //   icon: waterLevelMapIcon
      // });
      marker.bindPopup(getPopupInfo(d));
      cultureMap.addLayer(marker);
    });

    // console.log("Mapped data " + JSON.stringify(cultureData[0]));

    function getPopupInfo(d_) {
      return d_["NAME"] + "<br>" +
        d_["TYPE"] + "<br>" +
        d_["ADDRESS"] + "<br>" +
        d_["WEB"] + "<br>";

    }

    //
    // let dcsdcData = data.filter((v) => {
    //   return v.Region === "DCSDC";
    // });
    //
    // dcsdcData = dcsdcData.map((v) => {
    //   return {
    //     Band: v["Age band"],
    //     Count: parseFloat(v["Count"].replace(/,/g, ''))
    //   }
    // });
    //
    // // console.log("Mapped DCSDC data " + JSON.stringify(dcsdcData[0]));
    //
    // let donegalPopBands = {
    //   x: donegalData.map((v) => {
    //     return v.Band;
    //   }),
    //   y: donegalData.map((v) => {
    //     return v.Count;
    //   }),
    //   name: 'Donegal',
    //   orientation: 'v',
    //   type: 'bar'
    // };
    //
    // let dcsdcPopBands = {
    //   x: dcsdcData.map((v) => {
    //     return v.Band;
    //   }),
    //   y: dcsdcData.map((v) => {
    //     return v.Count;
    //   }),
    //   name: 'DCSDC',
    //   orientation: 'v',
    //   type: 'bar'
    // };
    //
    // let popBandsData = [donegalPopBands, dcsdcPopBands];
    // let popBandsLayout = Object.assign({}, groupedColumnLayout);
    // popBandsLayout.title = 'Population by Age Band';
    // popBandsLayout.legend = {
    //   x: 1,
    //   y: 0.5
    // };
    //
    // Plotly.newPlot('pop-bands-chart', popBandsData, popBandsLayout, {
    //   modeBarButtonsToRemove: modeBarButtonsRemove,
    //   displayModeBar: true,
    //   displaylogo: false,
    //   showSendToCloud: false,
    //   responsive: true
    // });

  })
  .catch(function(err) {
    console.log("Error loading file\n " + err)
  });