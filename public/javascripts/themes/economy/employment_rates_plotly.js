d3.csv("../data/Economy/employment_rates.csv").then(function(data) {

  let ds16Data = data.filter((v) => {
    return v.Region === "D&S (16+)";
  });

  let ds1664Data = data.filter((v) => {
    return v.Region === "D&S (16-64 y.o.)";
  });

  let donegal16Data = data.filter((v) => {
    return v.Region === "Donegal (16+)";
  });

  let donegal1664Data = data.filter((v) => {
    return v.Region === "Donegal (16-64 y.o.)";
  });

  let empRateDS16 = {
    x: ds16Data.map((v) => {
      return v.Year;
    }),
    y: ds16Data.map((v) => {
      return v.Rate;
    }),
    mode: 'lines+markers',
    name: 'D&S (16+)'
  };

  let empRateDS1664 = {
    x: ds1664Data.map((v) => {
      return v.Year;
    }),
    y: ds1664Data.map((v) => {
      return v.Rate;
    }),
    mode: 'lines+markers',
    name: 'D&S (16-64 y.o.)'

  };

  let empRateDon16 = {
    x: donegal16Data.map((v) => {
      return v.Year;
    }),
    y: donegal16Data.map((v) => {
      return v.Rate;
    }),
    mode: 'lines+markers',
    name: 'Donegal (16+)'
  };

  let empRateDon1664 = {
    x: donegal1664Data.map((v) => {
      return v.Year;
    }),
    y: donegal1664Data.map((v) => {
      return v.Rate;
    }),
    mode: 'lines+markers',
    name: 'Donegal (16-64 y.o.)'
    // visible: 'legendonly'
  };


  let empRateData = [empRateDS1664, empRateDS16, empRateDon16, empRateDon1664];

  let empRatelayout = multilineChartLayout;
  empRatelayout.title = 'Employment Rates by Age Category';
  empRatelayout.legend = {
    x: 1,
    y: 0.5
  };

  Plotly.newPlot('employment-rates-chart', empRateData, empRatelayout, {
    modeBarButtonsToRemove: modeBarButtonsRemove,
    displayModeBar: true,
    displaylogo: false,
    showSendToCloud: false,
    responsive: true
  });

})