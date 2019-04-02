d3.csv("../data/Demographics/population_projections.csv").then(function(data) {

  data.forEach(function(d) {
    d["Year"] = +d["Year"];
    d["Count"] = +d["Count"];
  });
  console.log("Population data- \n" + JSON.stringify(data[0]));

  let ndx = crossfilter(data);

  let populationYearDim = ndx.dimension(function(d) {
    return d["Year"];
  });

  let populationRegionDim = ndx.dimension(function(d) {
    return d["Region"];
  });

  let dsGroup = populationYearDim.group().reduceSum(function(d) {
    if (d["Region"] === "D&S") {
      return d["Count"];
    } else return 0;
  });

  let niGroup = populationYearDim.group().reduceSum(function(d) {
    if (d["Region"] === "NI") {
      // console.log("\n\n***found 1*** \t" + JSON.stringify(d["Count"]) + "\n\n");
      return d["Count"];
    } else return 0;
  });

  let donegalGroup = populationYearDim.group().reduceSum(function(d) {
    if (d["Region"] === "Donegal") {
      return d["Count"];
    } else return 0;
  });

  let roiGroup = populationYearDim.group().reduceSum(function(d) {
    if (d["Region"] === "ROI") {
      return d["Count"];
    } else return 0;
  });

  let populationChart = dc.lineChart("#population-chart");
  populationChart
    .width(800)
    .height(300)
    .margins({
      left: 50,
      top: 20,
      right: 250,
      bottom: 20
    })
    .dimension(populationYearDim)
    .group(dsGroup, 'D&S')
    .stack(niGroup, 'NI')
    .stack(donegalGroup, 'Donegal')
    .stack(roiGroup, 'ROI')
    .transitionDuration(750);
  populationChart
    .x(d3.scaleLinear().domain([2016, 2038]))
    .xAxis().ticks(4).tickFormat(d3.format("d"));
  populationChart
    .y(d3.scaleLinear().domain([0, 1000]))
    .elasticY(true);
  populationChart
    .brushOn(false)
    .renderArea(true)
    .xyTipsOn(true);

  // //                    customise colours used on stacked areas
  //   //TODO: use colorbrewer for safe colours
  //   timeLine.ordinalColors(['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#034e7b']);
  //
  // populationChart.title('QQI 4', function(d) {
  //   return "test";
  // });
  //   timeLine.title('3-6 Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 3-6 months";
  //   });

  //   //                    interactive legend for each stack
  populationChart.legend(dc.legend().x(575).y(30).itemHeight(10).gap(8).autoItemWidth(false));

  //workaround for inverting the legend stack layers
  dc.override(populationChart, 'legendables', populationChart._legendables);

  dc.override(populationChart, 'legendables', function() {
    let legendables = this._legendables();
    if (!this.dashStyle()) {
      return legendables.reverse();
    }
    return legendables.map(function(l) {
      l.dashstyle = this.dashStyle();
      return l.reverse();
    });
  });

  //default to regional figures
  populationRegionDim.filterFunction(function(d) {
    return d === 'Donegal' || d === 'D&S';
  });
  populationChart.render();

  populationChart.on('renderlet', function(chart) {
    chart.selectAll('.dc-legend-item')
      .on('click', function(d) {
        let n = d.name.toString();
        console.log("Click on legend: " + JSON.stringify(d));
        populationRegionDim.filterFunction(function(d) {
          return d === 'Donegal' || d === 'D&S';
        });
        //dc.redrawAll();
        populationChart.redraw();
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
  // //default active on load
  // d3.select("#donegal-business-active-btn").on("click", function() {
  //   let cb = d3.select(this);
  //   let persons = d3.select("#donegal-business-persons-btn");
  //   let employees = d3.select("#donegal-business-employees-btn");
  //   if (!cb.classed('disabled')) {
  //     //if button is NOT active, de-activate all other buttons and active this
  //     if (!cb.classed('active')) {
  //       cb.classed('active', true);
  //       // console.log("clicked donegal-business-active-btn " + cb.classed('active'));
  //       persons.classed('active', false);
  //       employees.classed('active', false);
  //       donegalBusinessStatisticDim.filter("Active Enterprise (Number)");
  //       populationChart.redraw();
  //
  //     };
  //   }
  // });
  //
  // d3.select("#donegal-business-persons-btn").on("click", function() {
  //   let cb = d3.select(this);
  //   let active = d3.select("#donegal-business-active-btn");
  //   let employees = d3.select("#donegal-business-employees-btn");
  //   if (!cb.classed('disabled')) {
  //     if (!cb.classed('active')) {
  //       cb.classed('active', true);
  //       // console.log("clicked donegal-business-persons-btn " + cb.classed('active'));
  //       active.classed('active', false);
  //       employees.classed('active', false);
  //       donegalBusinessStatisticDim.filter("Persons Engaged (Number)");
  //       populationChart.redraw();
  //     }
  //   }
  // });
  //
  // d3.select("#donegal-business-employees-btn").on("click", function() {
  //   let cb = d3.select(this);
  //   let active = d3.select("#donegal-business-active-btn");
  //   let persons = d3.select("#donegal-business-persons-btn");
  //   if (!cb.classed('disabled')) {
  //     if (!cb.classed('active')) {
  //       cb.classed('active', true);
  //       // console.log("clicked donegal-business-employee-btn " + cb.classed('active'));
  //       active.classed('active', false);
  //       persons.classed('active', false);
  //       donegalBusinessStatisticDim.filter("Employees (Number)");
  //       populationChart.redraw();
  //     }
  //   }
  // });
  // //
  // d3.select("#donegal-business-reset-btn").on("click", function() {
  //   let cb = d3.select(this);
  //   if (!cb.classed('disabled')) {
  //     // console.log("clicked donegal-business-persons-btn " + cb.classed('active'));
  //     donegalBusinessShortDim.filterAll();
  //     populationChart.redraw();
  //   }
  //   //
  // });


});