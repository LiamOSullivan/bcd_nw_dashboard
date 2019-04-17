d3.csv("../data/Education/higher_education_enrollments_2015.csv").then(function(data) {
  let enrollHigher = {
    y: data.map((v) => {
      return ' ' + v["Institution"]; //add a space to pad the axis title in bar
    }),
    x: data.map((v) => {
      return v.Count;
    }),
    name: 'Higher Education Enrollments 2015 by Institution',
    orientation: 'h',
    type: 'bar',
    // mode: 'bars+text'

  };
  let enrollHigherData = [enrollHigher];
  let enrollHigherLayout = OBJECT.assign({}, rowChartLayout);
  enrollHigherLayout.title: 'Higher Education Enrollments 2015 by Institution';

  Plotly.newPlot('enrollment-higher-ed-chart', enrollHigherData, enrollHigherLayout, {
    modeBarButtons: modeBarButtonsInclude,
    displayModeBar: true,
    showSendToCloud: false

  });

  //workaround to place y axis labels on bars
  document.getElementById('enrollment-higher-ed-chart').on('plotly_afterplot', function() {
    let yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
    for (let i = 0; i < yAxisLabels.length; i++) {
      yAxisLabels[i].setAttribute('text-anchor', 'start');
    }
  })
});

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

    let eschoolEnrollmentslayout = {
      title: 'School Enrollments, North West City Region',
      paper_bgcolor: '#001f35',
      plot_bgcolor: '#001f35',
      showlegend: true,
      annotations: []
    };

    Plotly.newPlot('school-enrollments-chart', schoolEnrollmentsData, eschoolEnrollmentslayout, {
      modeBarButtonsToRemove: modeBarButtonsRemove,
      displayModeBar: true
    });

  })
  .catch(function(err) {
    console.log("Error loading file:\n " + err)
  });