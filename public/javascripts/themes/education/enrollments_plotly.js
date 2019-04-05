d3.csv("../data/Education/school_enrollments.csv").then(function(data) {

  let enrollmentPriData = data.filter((v) => {
    return v.Level === "Primary";
  });
  let enrollmentSecData = data.filter((v) => {
    return v.Level === "Secondary";
  });


  let enrollmentPri = {
    x: enrollmentPriData.map((v) => {
      return v.Year;
    }),
    y: enrollmentPriData.map((v) => {
      return v.Count;
    }),
    mode: 'lines+markers',
    name: 'Primary'
  };

  let enrollmentSec = {
    x: enrollmentSecData.map((v) => {
      return v.Year;
    }),
    y: enrollmentSecData.map((v) => {
      return v.Count;
    }),
    mode: 'lines+markers',
    name: 'Secondary'
  };

  let schoolEnrollmentsData = [enrollmentPri, enrollmentSec];

  let schoolEnrollmentslayout = rowChartLayout;
  schoolEnrollmentslayout.title = 'School Enrollments, North West City Region';
  schoolEnrollmentslayout.height = 475;
  Plotly.newPlot('enrollments-school-chart', schoolEnrollmentsData, schoolEnrollmentslayout, {
    modeBarButtons: multilineModeBarButtonsInclude,
    displaylogo: false,
    displayModeBar: true
  });
});

d3.csv("../data/Education/higher_education_enrollments_2015.csv").then(function(data) {
  let enrollHigher = {
    y: data.map((v) => {
      return ' ' + v["Institution"]; //add a space to pad the axis title in bar
    }),
    x: data.map((v) => {
      return v.Count;
    }),
    transforms: [{
      type: 'sort',
      target: 'x',
      order: 'ascending'
    }],
    name: 'Higher Education Enrollments 2015 by Institution',
    orientation: 'h',
    type: 'bar',
    // mode: 'bars+text'

  };
  let enrollHigherData = [enrollHigher];
  let enrollHigherLayout = rowChartLayout;
  enrollHigherLayout.title = "Higher Education Enrollments 2015 by Institution";
  enrollHigherLayout.height = 475;
  Plotly.newPlot('enrollments-higher-ed-chart', enrollHigherData, enrollHigherLayout, {
    // clickMode: 'select',
    modeBarButtons: rowChartModeBarButtonsInclude,
    displayModeBar: true,
    displaylogo: false,
    showSendToCloud: false,
    responsive: true,
  });
  //workaround to place y axis labels on bars
  document.getElementById('enrollments-higher-ed-chart').on('plotly_afterplot', function() {
    let yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
    for (let i = 0; i < yAxisLabels.length; i++) {
      yAxisLabels[i].setAttribute('text-anchor', 'start');
    }
  })
});

d3.csv("../data/Education/lit_enrollments_2015.csv").then(function(data) {
  let enrollLit = {
    y: data.map((v) => {
      return ' ' + v["Field of Study (ISCED)"]; //add a space to pad the axis title in bar
    }),
    x: data.map((v) => {
      return v.Count;
    }),
    transforms: [{
      type: 'sort',
      target: 'x',
      order: 'ascending'
    }],
    name: 'Letterkenny IT Enrollments 2015',
    orientation: 'h',
    type: 'bar',
    // mode: 'bars+text'

  };
  let enrollLitData = [enrollLit];
  let enrollLitLayout = {
    title: 'Letterkenny IT Enrollments 2015',
    yaxis: {
      showticklabels: true
    },
    paper_bgcolor: '#001f35',
    plot_bgcolor: '#001f35',
    width: chartWidth,
    height: 400,
    showlegend: false,
    annotations: []
  };


  Plotly.newPlot('enrollments-lit-chart', enrollLitData, enrollLitLayout, {
    modeBarButtons: rowChartModeBarButtonsInclude,
    displayModeBar: true,
    displaylogo: false,
    showSendToCloud: false,
    responsive: true
  });
  //workaround to place y axis labels on bars
  document.getElementById('enrollments-lit-chart').on('plotly_afterplot', function() {
    let yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
    for (let i = 0; i < yAxisLabels.length; i++) {
      yAxisLabels[i].setAttribute('text-anchor', 'start');
    }
  })
});

d3.csv("../data/Education/uu_enrollments_2015.csv").then(function(data) {
  let enrollUu = {
    y: data.map((v) => {
      return ' ' + v["Subject area"]; //add a space to pad the axis title in bar
    }),
    x: data.map((v) => {
      return v.Count;
    }),
    transforms: [{
      type: 'sort',
      target: 'x',
      order: 'ascending'
    }],
    name: 'Ulster University Enrollments 2015',
    orientation: 'h',
    type: 'bar',
    // mode: 'bars+text'

  };
  let enrollUuData = [enrollUu];
  let enrollUuLayout = {
    title: 'Ulster University Enrollments 2015',
    yaxis: {
      showticklabels: true
    },
    paper_bgcolor: '#001f35',
    plot_bgcolor: '#001f35',
    width: chartWidth,
    height: 400,
    showlegend: false,
    annotations: []
  };


  Plotly.newPlot('enrollments-uu-chart', enrollUuData, enrollUuLayout, {
    modeBarButtons: rowChartModeBarButtonsInclude,
    displayModeBar: true,
    displaylogo: false,
    showSendToCloud: false,
    responsive: true

  });
  //workaround to place y axis labels on bars
  document.getElementById('enrollments-uu-chart').on('plotly_afterplot', function() {
    let yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
    for (let i = 0; i < yAxisLabels.length; i++) {
      yAxisLabels[i].setAttribute('text-anchor', 'start');
    }
  })
});