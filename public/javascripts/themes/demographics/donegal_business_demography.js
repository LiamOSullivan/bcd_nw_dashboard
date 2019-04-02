d3.csv("../data/Economy/donegal_business_demography_all.csv").then(function(data) {
  console.log("Donegal business data- \n" + data.length);
  // let businessShortNames = [];
  data.forEach(function(d) {
    d["Year"] = +d["Year"];
    d.businessShort = getFirstWord(d["Business"]);
    d["Count"] = +d["Count"];
    // businessShortNames.push(d.businessShort);
  });

  //use the first word of the 'Business' string as a short name
  function getFirstWord(s) {
    let f = s.substr(0, s.indexOf(" "));
    if (f.endsWith(",")) {
      f = f.substr(0, f.indexOf(","));
    }
    // console.log("\nf; " + f);
    return f;
  }
  // console.log("\n\nbusiness short names: \n" + businessShortNames);

  let ndx = crossfilter(data);

  let donegalBusinessYearDim = ndx.dimension(function(d) {
    return d["Year"];
  });

  let donegalBusinessBusinessDim = ndx.dimension(function(d) {
    return d["Business"];
  });
  let donegalBusinessShortDim = ndx.dimension(function(d) {

    return d.businessShort;
  });

  let donegalBusinessShortGroup = donegalBusinessShortDim.group();

  let donegalBusinessStatisticDim = ndx.dimension(function(d) {
    return d["Statistic"];
  });
  // let donegalBusinessStatisticGroup = donegalBusinessStatisticDim.group();

  // console.log("donegalBusinessShortGroup: " + JSON.stringify(donegalBusinessShortGroup.top(Infinity)));
  // console.log("\nlen: " + donegalBusinessShortGroup.size());

  let miningGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Mining") {
      // console.log("\n\n***found 1*** \t" + JSON.stringify(d["Employees (Number)"]) + "\n\n");
      return d["Count"];
    } else return 0;
  });

  let manufacturingGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Manufacturing") {
      return d["Count"];
    } else return 0;
  });

  let electricityGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Electricity") {
      return d["Count"];
    } else return 0;
  });

  let waterGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Water") {
      return d["Count"];
    } else return 0;
  });

  let constructionGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Construction") {
      return d["Count"];
    } else return 0;
  });

  let motorGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Wholesale") {
      return d["Count"];
    } else return 0;
  });

  let transportationGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Transportation") {
      return d["Count"];
    } else return 0;
  });

  let accomodationGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Accommodation") {
      return d["Count"];
    } else return 0;
  });

  let informationGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Information") {
      return d["Count"];
    } else return 0;
  });

  let financialGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Financial") {
      return d["Count"];
    } else return 0;
  });

  let realEstateGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Real") {
      return d["Count"];
    } else return 0;
  });

  let technicalGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Professional") {
      return d["Count"];
    } else return 0;
  });

  let administrativeGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Administrative") {
      return d["Count"];
    } else return 0;
  });

  let educationGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "Education") {
      return d["Count"];
    } else return 0;
  });

  let ictGroup = donegalBusinessYearDim.group().reduceSum(function(d) {
    if (d.businessShort === "ICT") {
      return d["Count"];
    } else return 0;
  });


  let donegalBusinessChart = dc.lineChart("#donegal-business-chart");
  donegalBusinessChart
    .width(800)
    .height(300)
    .margins({
      left: 50,
      top: 20,
      right: 250,
      bottom: 20
    })
    .dimension(donegalBusinessYearDim)
    .group(miningGroup, 'Mining')
    .stack(manufacturingGroup, 'Manufacturing')
    .stack(electricityGroup, 'Electricity')
    .stack(waterGroup, 'Water')
    .stack(constructionGroup, 'Construction')
    .stack(motorGroup, 'Wholesale')
    .stack(transportationGroup, 'Transportation')
    .stack(accomodationGroup, 'Accommodation')
    .stack(informationGroup, 'Information')
    .stack(financialGroup, 'Financial')
    .stack(realEstateGroup, 'Real')
    .stack(technicalGroup, 'Professional')
    .stack(administrativeGroup, 'Administrative')
    .stack(educationGroup, 'Education')
    .stack(ictGroup, 'ICT')
    .transitionDuration(750);
  donegalBusinessChart
    .x(d3.scaleLinear().domain([2008, 2014]))
    .xAxis().ticks(4).tickFormat(d3.format("d"));
  donegalBusinessChart
    .y(d3.scaleLinear().domain([0, 1000]))
    .elasticY(true);
  donegalBusinessChart
    .brushOn(false)
    .renderArea(true)
    .xyTipsOn(true);

  // //                    customise colours used on stacked areas
  //   //TODO: use colorbrewer for safe colours
  //   timeLine.ordinalColors(['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#034e7b']);
  //
  // donegalBusinessChart.title('QQI 4', function(d) {
  //   return "test";
  // });
  //   timeLine.title('3-6 Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 3-6 months";
  //   });

  //   //                    interactive legend for each stack
  donegalBusinessChart.legend(dc.legend().x(575).y(30).itemHeight(10).gap(8).autoItemWidth(false));

  //workaround for inverting the legend stack layers
  dc.override(donegalBusinessChart, 'legendables', donegalBusinessChart._legendables);

  dc.override(donegalBusinessChart, 'legendables', function() {
    let legendables = this._legendables();
    if (!this.dashStyle()) {
      return legendables.reverse();
    }
    return legendables.map(function(l) {
      l.dashstyle = this.dashStyle();
      return l.reverse();
    });
  });

  donegalBusinessStatisticDim.filter("Active Enterprise (Number)");
  donegalBusinessChart.render();

  donegalBusinessChart.on('renderlet', function(chart) {
    chart.selectAll('.dc-legend-item')
      .on('click', function(d) {
        let n = d.name.toString();
        console.log("Click on legend: " + JSON.stringify(d));
        donegalBusinessShortDim.filter(n);
        //dc.redrawAll();
        donegalBusinessChart.redraw();
      })
  });
  //
  //   select1
  //     .dimension(nameDim)
  //     .group(nameGroup)
  //     //                            .multiple(true)
  //     .controlsUseVisibility(false)
  //     .promptText('All hospitals')
  //     .width(100);
  //   select2
  //     .dimension(specialityDim)
  //     .group(specialityGroup)
  //     //                            .multiple(true)
  //     .controlsUseVisibility(false)
  //     .promptText('All treatment types')
  //     .width(100);
  //
  //   select3
  //     .dimension(ageDim)
  //     .group(ageGroup)
  //     //                            .multiple(true)
  //     //                            .numberVisible(10)
  //     .controlsUseVisibility(false)
  //     .promptText('All age groups')
  //     .width(100);
  //   //add all charts/ dc elements we want to co-interact to an array for ease
  //   var waitChartGroup;
  //   var waitCharts = [timeLine, select1, select2, select3];
  //
  //   //use underscore each to check all the interactive elements
  //   _.each(waitCharts, function(waitChart) {
  //     dc.registerChart(waitChart, waitChartGroup); //add all charts to group
  //     waitChart.on("filtered", function(chart, filter) {
  //       if (chart === select1) {
  //         if (filter === null) {
  //           d3.select('#hospital_text').text('all hospitals');
  //
  //         } else {
  //           d3.select('#hospital_text').text(filter);
  //         }
  //       } else if (chart === select2) {
  //         if (filter === null) {
  //           d3.select('#specialism_text').text('all types of treatment');
  //         } else {
  //           d3.select('#specialism_text').text(filter);
  //         }
  //       } else if (chart === select3) {
  //         if (filter === null) {
  //           d3.select('#age_text').text('of all ages');
  //
  //         } else {
  //           d3.select('#age_text').text('aged ' + filter + ' years');
  //         }
  //       }
  //     });
  //   });
  //
  //   dc.renderAll(waitChartGroup);
  //default active on load
  d3.select("#donegal-business-active-btn").on("click", function() {
    let cb = d3.select(this);
    let persons = d3.select("#donegal-business-persons-btn");
    let employees = d3.select("#donegal-business-employees-btn");
    if (!cb.classed('disabled')) {
      //if button is NOT active, de-activate all other buttons and active this
      if (!cb.classed('active')) {
        cb.classed('active', true);
        // console.log("clicked donegal-business-active-btn " + cb.classed('active'));
        persons.classed('active', false);
        employees.classed('active', false);
        donegalBusinessStatisticDim.filter("Active Enterprise (Number)");
        donegalBusinessChart.redraw();

      };
    }
  });

  d3.select("#donegal-business-persons-btn").on("click", function() {
    let cb = d3.select(this);
    let active = d3.select("#donegal-business-active-btn");
    let employees = d3.select("#donegal-business-employees-btn");
    if (!cb.classed('disabled')) {
      if (!cb.classed('active')) {
        cb.classed('active', true);
        // console.log("clicked donegal-business-persons-btn " + cb.classed('active'));
        active.classed('active', false);
        employees.classed('active', false);
        donegalBusinessStatisticDim.filter("Persons Engaged (Number)");
        donegalBusinessChart.redraw();
      }
    }
  });

  d3.select("#donegal-business-employees-btn").on("click", function() {
    let cb = d3.select(this);
    let active = d3.select("#donegal-business-active-btn");
    let persons = d3.select("#donegal-business-persons-btn");
    if (!cb.classed('disabled')) {
      if (!cb.classed('active')) {
        cb.classed('active', true);
        // console.log("clicked donegal-business-employee-btn " + cb.classed('active'));
        active.classed('active', false);
        persons.classed('active', false);
        donegalBusinessStatisticDim.filter("Employees (Number)");
        donegalBusinessChart.redraw();
      }
    }
  });
  //
  d3.select("#donegal-business-reset-btn").on("click", function() {
    let cb = d3.select(this);
    if (!cb.classed('disabled')) {
      // console.log("clicked donegal-business-persons-btn " + cb.classed('active'));
      donegalBusinessShortDim.filterAll();
      donegalBusinessChart.redraw();
    }
    //
  });


});