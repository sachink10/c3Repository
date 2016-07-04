/**
 * @Package: Ultra Admin HTML Theme
 * @Since: Ultra 1.0
 * This file is part of Ultra Admin Theme HTML package.
 */


jQuery(function($) {

    'use strict';

    var ULTRA_SETTINGS = window.ULTRA_SETTINGS || {};

    /*--------------------------------
        Chart Js Chart
     --------------------------------*/
    ULTRA_SETTINGS.chartJS = function() {





      

      
        /*Calls Chart*/
        var pieData = [{
                value: 300,
                color: "rgba(250,133,100,1.0)",
                highlight: "rgba(250,133,100,0.8)",
                label: "Wrong Number"
            }, {
                value: 150,
                color: "rgba(31,181,172,1)",
                highlight: "rgba(31,181,172,0.8)",
                label: "CSC"
            }, {
                value: 50,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "FMF"
            }, {
                value: 120,
                color: "rgba(153,114,181,1.0)",
                highlight: "rgba(153,114,181,0.8)",
                label: "IOC"
            }
        ];

        var ctx = document.getElementById("pie-chartjs").getContext("2d");
        window.myPie = new Chart(ctx).Pie(pieData);




        /* Pie chart */

        var doughnutData = [{
                value: 300,
                color: "rgba(250,133,100,1.0)",
                highlight: "rgba(250,133,100,0.8)",
                label: "Wrong Number"
            }, {
                value: 150,
                color: "rgba(31,181,172,1)",
                highlight: "rgba(31,181,172,0.8)",
                label: "CSC"
            }, {
                value: 50,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "FMF"
            }, {
                value: 120,
                color: "rgba(153,114,181,1.0)",
                highlight: "rgba(153,114,181,0.8)",
                label: "IOC"
            }

        ];

        var ctxd = document.getElementById("donut-chartjs").getContext("2d");
        window.myDoughnut = new Chart(ctxd).Doughnut(doughnutData, {
            responsive: true
        });





        /*Bar Chart*/
        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100)
        };

        var barChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                fillColor: "rgba(31,181,172,1)",
                strokeColor: "rgba(31,181,172,0.8)",
                highlightFill: "rgba(31,181,172,0.8)",
                highlightStroke: "rgba(31,181,172,1)",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }, {
                fillColor: "rgba(153,114,181,1.0)",
                strokeColor: "rgba(153,114,181,0.8)",
                highlightFill: "rgba(153,114,181,0.8)",
                highlightStroke: "rgba(153,114,181,1.0)",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }]

        }

        var ctxb = document.getElementById("bar-chartjs").getContext("2d");
        window.myBar = new Chart(ctxb).Bar(barChartData, {
            responsive: true
        });





       


    };






    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {});

    $(window).resize(function() {});

    $(window).load(function() {
        ULTRA_SETTINGS.chartJS();
    });

});
