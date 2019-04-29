d3.csv("../data/Education/etb_awards_donegal.csv")
  .then(function(rows) {
    let qqi4 = rows.filter((v) => {
      return v.Level === "QQI Level 4";
    });
    let qqi5 = rows.filter((v) => {
      return v.Level === "QQI Level 5";
    });
    let qqi6 = rows.filter((v) => {
      return v.Level === "QQI Level 6";
    });
    let ind4 = rows.filter((v) => {
      return v.Level === "Industry Awards Level 4";
    });
    let ind5 = rows.filter((v) => {
      return v.Level === "Industry Awards Level 5";
    });
    let ind6 = rows.filter((v) => {
      return v.Level === "Industry Awards Level 6";
    });
    let lc = rows.filter((v) => {
      return v.Level === "Leaving Certificate & LCA";
    });

    var donegalEtbAwardsTraces = [{
        x: lc.map((v) => {
          return v.Year;
        }),
        y: lc.map((v) => {
          return v.Count;
        }),
        mode: 'lines+markers',
        name: 'LC',
        stackgroup: 'one'
      },
      {
        x: qqi4.map((v) => {
          return v.Year;
        }),
        y: qqi4.map((v) => {
          return v.Count;
        }),
        mode: 'lines+markers',
        name: 'QQI 4',
        stackgroup: 'one'
      },
      {
        x: qqi5.map((v) => {
          return v.Year;
        }),
        y: qqi5.map((v) => {
          return v.Count;
        }),
        mode: 'lines+markers',
        name: 'QQI 5',
        stackgroup: 'one'
      },
      {
        x: qqi6.map((v) => {
          return v.Year;
        }),
        y: qqi6.map((v) => {
          return v.Count;
        }),
        mode: 'lines+markers',
        name: 'QQI 6',
        stackgroup: 'one'
      },
      {
        x: ind4.map((v) => {
          return v.Year;
        }),
        y: ind4.map((v) => {
          return v.Count;
        }),
        mode: 'lines+markers',
        name: 'Ind 4',
        stackgroup: 'one'
      },
      {
        x: ind5.map((v) => {
          return v.Year;
        }),
        y: ind5.map((v) => {
          return v.Count;
        }),
        mode: 'lines+markers',
        name: 'Ind 5',
        stackgroup: 'one'
      },
      {
        x: ind6.map((v) => {
          return v.Year;
        }),
        y: ind6.map((v) => {
          return v.Count;
        }),
        mode: 'lines+markers',
        name: 'Ind 6',
        stackgroup: 'one'
      }
    ];

    let donegalEtbAwardsLayout = Object.assign({}, areaChartLayout);
    donegalEtbAwardsLayout.title = 'Donegal ETB Awards';

    Plotly.newPlot('donegal-etb-awards-chart', donegalEtbAwardsTraces, donegalEtbAwardsLayout, {
      modeBarButtons: areaChartModeBarButtonsInclude,
      displayModeBar: true,
      displaylogo: false,
      showSendToCloud: false,
      responsive: true
    });
  })
  .catch(function(err) {
    console.log("Error loading file:\n " + err)
  });