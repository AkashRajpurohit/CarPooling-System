'use strict';

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

(function(global) {
    var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ];

    var Samples = global.Samples || (global.Samples = {});
    var Color = global.Color;

    Samples.utils = {
        // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
        srand: function(seed) {
            this._seed = seed;
        },

        rand: function(min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },

        numbers: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 1;
            var from = cfg.from || [];
            var count = cfg.count || 8;
            var decimals = cfg.decimals || 8;
            var continuity = cfg.continuity || 1;
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },

        labels: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 100;
            var count = cfg.count || 8;
            var step = (max - min) / count;
            var decimals = cfg.decimals || 8;
            var dfactor = Math.pow(10, decimals) || 0;
            var prefix = cfg.prefix || '';
            var values = [];
            var i;

            for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },

        months: function(config) {
            var cfg = config || {};
            var count = cfg.count || 12;
            var section = cfg.section;
            var values = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = MONTHS[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
            }

            return values;
        },

        color: function(index) {
            return COLORS[index % COLORS.length];
        },

        transparentize: function(color, opacity) {
            var alpha = opacity === undefined ? 0.5 : 1 - opacity;
            return Color(color).alpha(alpha).rgbString();
        }
    };

    // DEPRECATED
    window.randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };

    // INITIALIZATION

    Samples.utils.srand(Date.now());

    // Google Analytics
    /* eslint-disable */
    if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-28909194-3', 'auto');
        ga('send', 'pageview');
    }
    /* eslint-enable */

}(this));

var draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line = Chart.controllers.line.extend({
    draw: function() {
        draw.apply(this, arguments);
        let ctx = this.chart.chart.ctx;
        let _stroke = ctx.stroke;
        ctx.stroke = function() {
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.50)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;
            _stroke.apply(this, arguments)
            ctx.restore();
        }
    }
});


var config = {
    type: 'line',
    data: {
        labels: ['01/15', '02/15', '03/21', '04/11', '04/11'],
        datasets: [{
            backgroundColor: '#707070',
            borderColor: '#707070',
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: false,
        }]
    },
    options: {
        legend:{
            display:false
        },
        elements: {
            point:{
                radius: 0
            }
        },
        responsive:true,
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
        tooltips: {enabled: false},
        hover: {mode: null},
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month',
                },
                gridLines: {
                    display: false,
                    color:'#AAB2B7',
                    fontColor:'#AAB2B7',
                    drawBorder: false,
                },
                ticks: {
                    display:true,
                    fontColor: '#AAB2B7',
                    fontFamily:'Roboto'
                },
            }],
            yAxes: [{
                display: false,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                },
                gridLines: {
                    display: false,
                    color:'#AAB2B7'
                },
            }]
        }
    }
};
var config1 = {
    type: 'line',
    data: {
        labels: ['01/15', '02/15','03/15'],
        datasets: [{
            backgroundColor: '#707070',
            borderColor: '#707070',
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: false,
        }]
    },
    options: {
        legend:{
            display:false
        },
        elements: {
            point:{
                radius: 0
            }
        },
        responsive: true,
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
        tooltips: {enabled: false},
        hover: {mode: null},
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month',
                },
                gridLines: {
                    display: false,
                    color:'#AAB2B7',
                    fontColor:'#AAB2B7',
                    drawBorder: false,
                },
                ticks: {
                    display:false,
                    fontColor: '#AAB2B7',
                    fontFamily:'Roboto'
                },
            }],
            yAxes: [{
                display: false,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                },
                gridLines: {
                    display: false,
                    color:'#AAB2B7'
                },
            }]
        }
    }
};
var config2 = {
    type: 'line',
    data: {
        labels: ['01/15', '02/15','03/15'],
        datasets: [{
            backgroundColor: '#707070',
            borderColor: '#707070',
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: false,
        }]
    },
    options: {
        legend:{
            display:false
        },
        elements: {
            point:{
                radius: 0
            }
        },
        responsive: true,
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
        tooltips: {enabled: false},
        hover: {mode: null},
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month',
                },
                gridLines: {
                    display: false,
                    color:'#AAB2B7',
                    fontColor:'#AAB2B7',
                    drawBorder: false,
                },
                ticks: {
                    display:false,
                    fontColor: '#AAB2B7',
                    fontFamily:'Roboto'
                },
            }],
            yAxes: [{
                display: false,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                },
                gridLines: {
                    display: false,
                    color:'#AAB2B7'
                },
            }]
        }
    }
};
var config3 = {
    type: 'line',
    data: {
        labels: ['01/15', '02/15','03/15'],
        datasets: [{
            backgroundColor: '#707070',
            borderColor: '#707070',
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: false,
        }]
    },
    options: {
        legend:{
            display:false
        },
        elements: {
            point:{
                radius: 0
            }
        },
        responsive: true,
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
        tooltips: {enabled: false},
        hover: {mode: null},
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month',
                },
                gridLines: {
                    display: false,
                    color:'#AAB2B7',
                    fontColor:'#AAB2B7',
                    drawBorder: false,
                },
                ticks: {
                    display:false,
                    fontColor: '#AAB2B7',
                    fontFamily:'Roboto'
                },
            }],
            yAxes: [{
                display: false,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                },
                gridLines: {
                    display: false,
                    color:'#AAB2B7'
                },
            }]
        }
    }
};
window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    window.myLine = new Chart(ctx1, config1);
    var ctx2 = document.getElementById('canvas2').getContext('2d');
    window.myLine = new Chart(ctx2, config2);
    var ctx3 = document.getElementById('canvas3').getContext('2d');
    window.myLine = new Chart(ctx3, config3);
};
document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return randomScalingFactor();
        });
    });
    window.myLine.update();
});
var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];
    var newDataset = {
        label: 'Dataset ' + config.data.datasets.length,
        backgroundColor: newColor,
        borderColor: newColor,
        data: [],
        fill: false
    };
    for (var index = 0; index < config.data.labels.length; ++index) {
        newDataset.data.push(randomScalingFactor());
    }
    config.data.datasets.push(newDataset);
    window.myLine.update();
});
document.getElementById('addData').addEventListener('click', function() {
    if (config.data.datasets.length > 0) {
        var month = MONTHS[config.data.labels.length % MONTHS.length];
        config.data.labels.push(month);
        config.data.datasets.forEach(function(dataset) {
            dataset.data.push(randomScalingFactor());
        });
        window.myLine.update();
    }
});
document.getElementById('removeDataset').addEventListener('click', function() {
    config.data.datasets.splice(0, 1);
    window.myLine.update();
});
document.getElementById('removeData').addEventListener('click', function() {
    config.data.labels.splice(-1, 1); // remove the label first
    config.data.datasets.forEach(function(dataset) {
        dataset.data.pop();
    });
    window.myLine.update();
});