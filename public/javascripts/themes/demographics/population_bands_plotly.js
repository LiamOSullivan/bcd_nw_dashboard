d3.csv("../data/Demographics/population_age_profile.csv").then(function(data) {

  // console.log("Data " + JSON.stringify(data[0]));
  // console.log("Keys: " + Object.keys(data[0]));

  let donegalData = data.filter((v) => {
    return v.Region === "Donegal";
  });

  donegalData = donegalData.map((v) => {
    return {
      Band: v["Age band"],
      Count: parseFloat(v["Count"].replace(/,/g, ''))
    }
  });

  // console.log("Mapped Donegal data " + JSON.stringify(donegalData[0]));

  let dcsdcData = data.filter((v) => {
    return v.Region === "DCSDC";
  });

  dcsdcData = dcsdcData.map((v) => {
    return {
      Band: v["Age band"],
      Count: parseFloat(v["Count"].replace(/,/g, ''))
    }
  });

  // console.log("Mapped DCSDC data " + JSON.stringify(dcsdcData[0]));

  let donegalPopBands = {
    x: donegalData.map((v) => {
      return v.Band;
    }),
    y: donegalData.map((v) => {
      return v.Count;
    }),
    name: 'Donegal',
    orientation: 'v',
    type: 'bar'
  };

  let dcsdcPopBands = {
    x: dcsdcData.map((v) => {
      return v.Band;
    }),
    y: dcsdcData.map((v) => {
      return v.Count;
    }),
    name: 'DCSDC',
    orientation: 'v',
    type: 'bar'
  };

  let popBandsData = [donegalPopBands, dcsdcPopBands];
  let popBandsLayout = {
    barmode: 'group',
    paper_bgcolor: '#001f35',
    plot_bgcolor: '#001f35',
    width: 700,
    height: 300,
    showlegend: true,
    annotations: []
  };


  Plotly.newPlot('pop-bands-chart', popBandsData, popBandsLayout, {
    modeBarButtonsToRemove: modeBarButtonsRemove,
    displayModeBar: true,
    showSendToCloud: false,
    responsive: true
  });

});