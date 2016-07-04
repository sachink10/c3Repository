
//Type: -
//D= Daily
//W=Weekly
//I = Intraday
//M = Monthly
function LoadValuewithGraph(type) {
    var slidervalue;
    if (type == 'D') {
        slidervalue = $('#DailyID').html();
    }
    if (type == 'W') {
        slidervalue = $('#WeekID').html();
    }
    if (type == 'M') {
        slidervalue = $('#MonthID').html();
    }
    if (type == 'I') {
        slidervalue = $('#IntradayID').html();
    }

    $.ajax({
        type: "POST",
        url: 'Dashboard/GetMonthlyData',
        cache: false,
        data: { 'sliderValue': slidervalue, 'Type': type },
        success: function (data) {
            if (data.totalCallsCount[0].TotalCallswithDisposition == null) {
                $('#dispositionCalls #dispositionCallsText').text(0);
            }
            else {
                $('#dispositionCalls #dispositionCallsText').text(data.totalCallsCount[0].TotalCallswithDisposition);
            }
            if (data.totalCallsCount[0].TotalCallswithDisposition == null) {
                $('#totalCalls #totalCallsText').text(0);
            }
            else {
                $('#totalCalls #totalCallsText').text(data.totalCallsCount[0].TotalCalls);
            }

            bindGraph1();

        },
        error: function (result) {
            alert('Cannot update selection values now!!');
        }
    })

}

//function GetMonthINfo() {
//    SonicDashboard_getDate('ex1', 'MONTHLY');

//};

//function GetWeekINfo() {
//    SonicDashboard_getDate('ex2', 'WEEKLY');
//};

//function getDaily() {
//    SonicDashboard_getDate('ex3', 'DAILY');
//};
//function getIntraday() {
//    SonicDashboard_getDate('ex4', 'INTRADAY');
//};

function bindGraph1() {
    var selectedMarketVal = $("#ddlMarkets option:selected").text();
    var selectedDealerVal = $("#delearshipselection option:selected").text();



    $.ajax({
        type: "POST",
        url: '@Url.Action("bindcharData", "Dashboard")',
        cache: false,
        dataType: "json",
        data: { 'selectedDealerVal': selectedDealerVal, 'sliderValue': d.getDate(), 'selectedMarketVal': selectedMarketVal },
        success: function (data) {

            var processed_json = new Array();

           for (i = 0; i < data.length; i++) {
               processed_json.push([data[i].Disposition, parseInt(data[i].DispCount)]);
           }

            var options = {
                chart: {

                    events: {
                        drilldown: function (e) {
                            if (!e.seriesOptions) {
                                var chart = this;
                                // Show the loading label
                                //chart.showLoading('Loading ...');
                                setTimeout(function () {
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, series);
                                }, 1000);
                            }
                        }
                    },
                    //plotBorderWidth: 1,                               
                    height: 200,
                },
                title: {
                    text: '',

                },
                //
                subtitle: {
                    //   text: 'Subtitle'
                },
                //
                xAxis: {
                    //   type: 'category',
                },

                plotOptions: {
                    series: {
                        name: "Call reasons",
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    var charttype = $('#chartType').val();


                                    bindGraphdisposition1(this.name, charttype);
                                }
                            }
                        }
                    },

                    pie:
                    {
                        innerSize: 60,
                        depth: 25
                    },

                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },


                //
                series: [{
                    //name: 'Case',
                    colorByPoint: true,
                    data: processed_json
                }],
                credits: {
                    enabled: false
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                exportButton: {
                    enabled: false
                },
                //
                drilldown: {
                    series: []
                }

            };



            // Column chart
            options.chart.renderTo = 'container';
            options.chart.Width = "100";
            options.chart.Height = "100";
            options.chart.type = $('#chartType').val();
            var chart1 = new Highcharts.Chart(options);

            $('#chart1Export').change(function () {
                var type = this.value;

                var chart = $('#container').highcharts();
                if (type == "JPEG") {
                    chart.exportChart({ type: "application/jpg" });
                }
                if (type == "PNG") {
                    chart.exportChart({ type: "application/png" });
                }
                if (type == "PDF") {
                    chart.exportChart({ type: "application/pdf" });
                }


            });



            $("#chartType").change(function () {
                var type = this.value;
                if (type !== '0') {
                    if (type == "column") {

                        options.chart.renderTo = 'container';
                        options.chart.type = 'column';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "bar") {
                        options.chart.renderTo = 'container';
                        options.chart.type = 'bar';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "pie") {
                        options.chart.renderTo = 'container';
                        options.chart.type = 'pie';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "line") {
                        options.chart.renderTo = 'container';
                        options.chart.type = 'line';
                        var chart1 = new Highcharts.Chart(options);
                    }
                }
            });
        },
        error: function (result) {
            alert('Cannot update selection values now!!');
        }
    })


}



function bindGraphdisposition1(selectedChartDispVal1, type) {
    $('#chartType2').val(type);
    $('#container2').show();
    var selectedMarketVal = $("#ddlMarkets option:selected").text();
    var selectedDealerVal = $("#delearshipselection option:selected").text();
    $.ajax({
        type: "POST",
        url: '@Url.Action("bindcharDatadispositionlvl1", "Dashboard")',
        cache: false,
        dataType: "json",
        data: { 'selectedDealerVal': selectedDealerVal, 'sliderValue': d.getDate(), 'selectedMarketVal': selectedMarketVal, 'selectedChartDispVal1': selectedChartDispVal1 },
        success: function (data) {

            var processed_json = new Array();
            //@* if (data.length == 0) {
            //    $('#container2').append("<img src=@Url.Content("~/Content/assets/images/NoData.PNG") alt=''/>");
            //    return;
            //}*@
           for (i = 0; i < data.length; i++) {
               processed_json.push([data[i].Disposition, parseInt(data[i].DispCount)]);
           }

            var options = {
                chart: {

                    events: {
                        drilldown: function (e) {
                            if (!e.seriesOptions) {
                                var chart = this;
                                // Show the loading label
                                //chart.showLoading('Loading ...');
                                setTimeout(function () {
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, series);
                                }, 1000);
                            }
                        }
                    },
                    //plotBorderWidth: 1,
                    //width: 370,
                    height: 220,
                },




                title: {
                    text: '',

                },
                //
                subtitle: {
                    //   text: 'Subtitle'
                },
                //
                xAxis: {
                    //   type: 'category',
                },
                //
                //  yAxis: {

                //   title: {
                //          margin: 2,
                //          text: 'No. of user'
                //     },
                //  },
                //
                //  legend: {
                //  enabled: true,
                //   },
                //
                plotOptions: {
                    series: {
                        name: "Call reasons",
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    var charttype = $('#chartType').val();
                                    //$('#container3').hide();
                                    //$("#container3 img").remove()
                                    bindGraphdisposition2(this.name, charttype);
                                }
                            }
                        }
                    },
                    //series:
                    //    {
                    //        pointPadding: 0.2,
                    //        borderWidth: 0,
                    //        dataLabels: {
                    //            enabled: true
                    //        }
                    //    },
                    pie:
                    {

                        innerSize: 60,
                        depth: 25

                    },

                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },


                //
                series: [{
                    //name: 'Case',
                    colorByPoint: true,

                    data: processed_json
                }],
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                credits: {
                    enabled: false
                },
                exportButton: {
                    enabled: false
                },
                //
                drilldown: {
                    series: []
                }

            };



            // Column chart
            options.chart.renderTo = 'container2';
            options.chart.Width = "100";
            options.chart.Height = "100";
            options.chart.type = type;
            var chart1 = new Highcharts.Chart(options);

            $('#chart2Export').change(function () {
                var type = this.value;

                var chart = $('#container2').highcharts();
                if (type == "JPEG") {
                    chart.exportChart({ type: "application/jpg" });
                }
                if (type == "PNG") {
                    chart.exportChart({ type: "application/png" });
                }
                if (type == "PDF") {
                    chart.exportChart({ type: "application/pdf" });
                }


            });


            $("#chartType2").change(function () {
                var type = this.value;
                if (type !== '0') {
                    if (type == "column") {

                        options.chart.renderTo = 'container2';
                        options.chart.type = 'column';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "bar") {
                        options.chart.renderTo = 'container2';
                        options.chart.type = 'bar';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "pie") {
                        options.chart.renderTo = 'container2';
                        options.chart.type = 'pie';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "line") {
                        options.chart.renderTo = 'container2';
                        options.chart.type = 'line';
                        var chart1 = new Highcharts.Chart(options);
                    }
                }
            });
        },
        error: function (result) {
            alert('Cannot update selection values now!!');
        }
    })


}



function bindGraphdisposition2(selectedChartDispVal2, charttype) {
    $('#chartType3').val(charttype);
    var selectedMarketVal = $("#ddlMarkets option:selected").text();
    var selectedDealerVal = $("#delearshipselection option:selected").text();
    $('#container3').show();

    $.ajax({
        type: "POST",
        url: '@Url.Action("bindcharDatadispositionlvl2", "Dashboard")',
        cache: false,
        dataType: "json",
        data: { 'selectedDealerVal': selectedDealerVal, 'sliderValue': d.getDate(), 'selectedMarketVal': selectedMarketVal, 'selectedChartDispVal2': selectedChartDispVal2 },
        success: function (data) {

            var processed_json = new Array();
            //@*  if (data.length == 0) {
            //    $('#container3').append("<img src=@Url.Content("~/Content/assets/images/NoData.PNG") alt=''/>");
            //    return;
            //}*@
            for (i = 0; i < data.length; i++) {
                processed_json.push([data[i].Disposition, parseInt(data[i].DispCount)]);
            }

            var options = {
                chart: {

                    events: {
                        drilldown: function (e) {
                            if (!e.seriesOptions) {
                                var chart = this;
                                // Show the loading label
                                //chart.showLoading('Loading ...');
                                setTimeout(function () {
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, series);
                                }, 1000);
                            }
                        }
                    },
                    //plotBorderWidth: 1,
                    //width: 370,
                    height: 220,
                },




                title: {
                    text: '',

                },
                //
                subtitle: {
                    //   text: 'Subtitle'
                },
                //
                xAxis: {
                    //   type: 'category',
                },
                //
                //  yAxis: {

                //   title: {
                //          margin: 2,
                //          text: 'No. of user'
                //     },
                //  },
                //
                //  legend: {
                //  enabled: true,
                //   },
                //
                plotOptions: {
                    series: {
                        name: "Call reasons",
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    var charttype = $('#chartType').val();
                                    bindGraphdisposition3(this.name, charttype);
                                }
                            }
                        }
                    },
                    //series:
                    //    {
                    //        pointPadding: 0.2,
                    //        borderWidth: 0,
                    //        dataLabels: {
                    //            enabled: true
                    //        }
                    //    },
                    pie:
                    {

                        innerSize: 60,
                        depth: 25

                    },

                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },


                //
                series: [{
                    //name: 'Case',
                    colorByPoint: true,
                    data: processed_json
                }],
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                credits: {
                    enabled: false
                },
                exportButton: {
                    enabled: false
                },
                //
                drilldown: {
                    series: []
                }

            };



            // Column chart
            options.chart.renderTo = 'container3';
            options.chart.Width = "100";
            options.chart.Height = "100";
            options.chart.type = charttype;
            //if (options.series.length >= 1) {
            var chart1 = new Highcharts.Chart(options);
//            @*  }
//    else {
//                $('#container3').append("<img id=img3 src=@Url.Content("~/Content/assets/images/NoData.PNG") alt=''/>");
//};*@

$('#chart3Export').change(function () {
    var type = this.value;

    var chart = $('#container3').highcharts();
    if (type == "JPEG") {
        chart.exportChart({ type: "application/jpg" });
    }
    if (type == "PNG") {
        chart.exportChart({ type: "application/png" });
    }
    if (type == "PDF") {
        chart.exportChart({ type: "application/pdf" });
    }


});


$("#chartType3").change(function () {
    var type = this.value;
    if (type !== '0') {
        if (type == "column") {

            options.chart.renderTo = 'container3';
            options.chart.type = 'column';
            var chart1 = new Highcharts.Chart(options);
        }
        else if (type == "bar") {
            options.chart.renderTo = 'container3';
            options.chart.type = 'bar';
            var chart1 = new Highcharts.Chart(options);
        }
        else if (type == "pie") {
            options.chart.renderTo = 'container3';
            options.chart.type = 'pie';
            var chart1 = new Highcharts.Chart(options);
        }
        else if (type == "line") {
            options.chart.renderTo = 'container3';
            options.chart.type = 'line';
            var chart1 = new Highcharts.Chart(options);
        }
    }
});
},
error: function (result) {
    alert('Cannot update selection values now!!');
}
})


}



function bindGraphdisposition3(selectedChartDispVal3, charttype) {
    $('#chartType4').val(charttype);
    var selectedMarketVal = $("#ddlMarkets option:selected").text();
    var selectedDealerVal = $("#delearshipselection option:selected").text();
    $('#container4').show();
    $.ajax({
        type: "POST",
        url: '@Url.Action("bindcharDatadispositionlvl3", "Dashboard")',
        cache: false,
        dataType: "json",
        data: { 'selectedDealerVal': selectedDealerVal, 'sliderValue': d.getDate(), 'selectedMarketVal': selectedMarketVal, 'selectedChartDispVal3': selectedChartDispVal3 },
        success: function (data) {

            var processed_json = new Array();
            //@*  if (data.length == 0) {
            //    $('#container4').append("<img src=@Url.Content("~/Content/assets/images/NoData.PNG") alt=''/>");
            //    return;
            //}*@
           for (i = 0; i < data.length; i++) {
               processed_json.push([data[i].Disposition, parseInt(data[i].DispCount)]);
           }

            var options = {
                chart: {

                    events: {
                        drilldown: function (e) {
                            if (!e.seriesOptions) {
                                var chart = this;
                                // Show the loading label
                                //chart.showLoading('Loading ...');
                                setTimeout(function () {
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, series);
                                }, 1000);
                            }
                        }
                    },
                    //plotBorderWidth: 1,
                    //width: 370,
                    height: 220,
                },




                title: {
                    text: '',

                },
                //
                subtitle: {
                    //   text: 'Subtitle'
                },
                //
                xAxis: {
                    //   type: 'category',
                },
                //
                //  yAxis: {

                //   title: {
                //          margin: 2,
                //          text: 'No. of user'
                //     },
                //  },
                //
                //  legend: {
                //  enabled: true,
                //   },
                //
                plotOptions: {
                    series: {
                        name: "Call reasons",
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {





                                }
                            }
                        }
                    },
                    //series:
                    //    {
                    //        pointPadding: 0.2,
                    //        borderWidth: 0,
                    //        dataLabels: {
                    //            enabled: true
                    //        }
                    //    },
                    pie:
                    {

                        innerSize: 60,
                        depth: 25

                    },

                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },


                //
                series: [{
                    //name: 'Case',
                    colorByPoint: true,
                    data: processed_json
                }],
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                credits: {
                    enabled: false
                },
                exportButton: {
                    enabled: false
                },
                //
                drilldown: {
                    series: []
                }

            };



            // Column chart
            options.chart.renderTo = 'container4';
            options.chart.Width = "100";
            options.chart.Height = "100";
            options.chart.type = charttype;
            var chart1 = new Highcharts.Chart(options);


            $('#chart4Export').change(function () {
                var type = this.value;

                var chart = $('#container4').highcharts();
                if (type == "JPEG") {
                    chart.exportChart({ type: "application/jpg" });
                }
                if (type == "PNG") {
                    chart.exportChart({ type: "application/png" });
                }
                if (type == "PDF") {
                    chart.exportChart({ type: "application/pdf" });
                }
                //if (type == "Excel") {
                //    chart.exportChart({ type: "application/xls" });
                //}


            });

            $("#chartType4").change(function () {
                var type = this.value;
                if (type !== '0') {
                    if (type == "column") {

                        options.chart.renderTo = 'container4';
                        options.chart.type = 'column';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "bar") {
                        options.chart.renderTo = 'container4';
                        options.chart.type = 'bar';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "pie") {
                        options.chart.renderTo = 'container4';
                        options.chart.type = 'pie';
                        var chart1 = new Highcharts.Chart(options);
                    }
                    else if (type == "line") {
                        options.chart.renderTo = 'container4';
                        options.chart.type = 'line';
                        var chart1 = new Highcharts.Chart(options);
                    }
                }
            });
        },
        error: function (result) {
            alert('Cannot update selection values now!!');
        }
    })


}