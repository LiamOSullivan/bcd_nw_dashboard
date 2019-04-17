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
    width: 700,
    height: 400,
    showlegend: true,
    annotations: []
  };

  Plotly.newPlot('school-enrollments-chart', schoolEnrollmentsData, eschoolEnrollmentslayout, {
    modeBarButtonsToRemove: modeBarButtonsRemove,
    displayModeBar: true
  });




})