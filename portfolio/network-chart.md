---
layout: home
title: Network Chart
---

<!-- <link href="https://rawgithub.com/poderopedia/panama-network/master/css/index.css" rel="stylesheet"> -->
<script src="https://rawgithub.com/poderopedia/panama-network/master/js/lib/d3.min.js"></script>
<script src="https://rawgithub.com/poderopedia/panama-network/master/src/pty.js"></script>
<link href="https://rawgithub.com/poderopedia/panama-network/master/css/font-awesome.min.css" rel="stylesheet">

<div class="container">

    <h1>Network Chart</h1>

    <div id="demo"></div>

    Masega developed a web tool for <a href="http://www.poderopedia.org/">Poderopedia Foundation</a> aimed at visualizing the influence networks of candidates for the Panama 2014 elections. The application is based on our Network-Chart script (link to demo).

    <img src="{{site.baseurl}}/portfolio/img/panama1.jpg" class="img-responsive" alt="Network">

    The above is a partial view of the relation map of candidate Marta Linares. Below, a closer look at the relation map of Presidential candidate José Domingo Arias.

    <img src="{{site.baseurl}}/portfolio/img/panama2.jpg" class="img-responsive" alt="Website">

    The project is hosted at this <a href="http://candidatos2014.prensa.com/">URL</a>.

</div>

<script>
d3.json('{{site.baseurl}}/portfolio/data/network-data.json', function(error, data) {

    if (error) {
        console.log(error);
        return error;
    }

    var width = parseInt(d3.select('#demo').style('width'), 10),
        height = 400;

    var legend = [
        {name: 'Persona',     type: 'persona'},
        {name: 'Candidato',   type: 'candidato'},
        {name: 'Institución', type: 'institucion'}
    ];

    var chart01 = pty.chart.network()
        .width(width)
        .height(height)
        .nodeRadius(15)
        .nodeLabel(function(d) { return d.name; })
        .nodeClass(function(d) { return d.type; })
        .nodeBaseURL(function(d) { return 'https://rawgithub.com/poderopedia/panama-network/master/data/' + d.id + '.json'; })
        .nodeURL(function(d) { return 'https://rawgithub.com/poderopedia/panama-network/master/pages/' + d.id; })
        .legendItems(legend);

    d3.select('div#demo').data([data]).call(chart01);
});
</script>

<script>
// d3.json('https://rawgithub.com/poderopedia/panama-network/master/data/A.json', function(error, data) {

//     if (error) { return error; }

//     var width = parseInt(d3.select('#huge-demo').style('width'), 10),
//         height = 400;

//     var chart01 = pty.chart.network()
//         .width(width)
//         .height(height)
//         .nodeRadius(15)
//         .nodeClass(function(d) { return d.type; })
//         .nodeBaseURL(function(d) { return 'https://rawgithub.com/poderopedia/panama-network/master/data/' + d.id + '.json'; });


//     d3.select('div#huge-demo').data([data]).call(chart01);
// });
</script>