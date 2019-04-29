d3.csv("../data/Economy/tourism.csv").then(function(data) {

  let dcsdcTourismData = data.filter((v) => {
    return v.Region === "DCSDC";
  });

  let niTourismData = data.filter((v) => {
    return v.Region === "NI";
  });

  let dcsdcTourism = {
    x: dcsdcTourismData.map((v) => {
      return v.Origin;
    }),
    y: dcsdcTourismData.map((v) => {
      return v.Count;
    }),
    name: 'DCSDC',
    orientation: 'v',
    type: 'bar'
  };

  let niTourism = {
    x: niTourismData.map((v) => {
      return v.Origin;
    }),
    y: niTourismData.map((v) => {
      return v.Count;
    }),
    name: 'NI',
    orientation: 'v',
    type: 'bar'
  };

  let tourismData = [dcsdcTourism, niTourism];
  let tourismLayout = Object.assign({}, groupedColumnLayout);
  tourismLayout.title = 'Tourism - Overnight Stays by Origin 2016';
  tourismLayout.legend = {
    x: 0.9,
    y: 1
  };

  Plotly.newPlot('tourism-chart', tourismData, tourismLayout, {
    modeBarButtonsToRemove: modeBarButtonsRemove,
    displayModeBar: true,
    displaylogo: false,
    showSendToCloud: false,
    responsive: true
  });

}).catch(function(err) {
  console.log("Error loading file\n " + err)
});