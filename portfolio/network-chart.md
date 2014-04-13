---
layout: home
title: Network Chart
---

<!-- <link href="https://rawgithub.com/poderopedia/panama-network/master/css/index.css" rel="stylesheet"> -->
<script src="https://rawgithub.com/poderopedia/panama-network/master/js/lib/d3.min.js"></script>
<!-- <script src="https://rawgithub.com/poderopedia/panama-network/master/src/pty.js"></script>-->
<!-- <link href="https://rawgithub.com/poderopedia/panama-network/master/css/font-awesome.min.css" rel="stylesheet">-->


<div class="container">

    <h1>Network Chart</h1>

    <div id="demo"></div>

    <p>Masega developed a web tool for the <a href="http://www.poderopedia.org/">Poderopedia Foundation</a> aimed at visualizing the influence networks of candidates for the Panama 2014 elections. The application is based on our Network-Chart script.</p>

    <p>The project is hosted by the press agency <a href="http://www.prensa.com/"> La Prensa </a>, in a section called <a href="http://candidatos2014.prensa.com/"> La Ruta 2014 </a> which recopilates information about the (then) upcomming elections. The following pictures are screenshots of the home page and the page corresponding to a candidate to the vice-presidency respectively.
    </p>

    <img src="{{site.baseurl}}/portfolio/img/panama3.jpg" class="img-responsive" alt="Homepage">

    <img src="{{site.baseurl}}/portfolio/img/panama4.jpg" class="img-responsive" alt="Candidate-page">

    <p> Below is a partial view of the relation map of candidate Marta Linares and a closer look at the relation map of Presidential candidate José Domingo Arias. </p>

    <img src="{{site.baseurl}}/portfolio/img/panama1.jpg" class="img-responsive" alt="Network">


    <img src="{{site.baseurl}}/portfolio/img/panama2.jpg" class="img-responsive" alt="Website">

    <p>The Network Chart demo and documentation can be seen at the following <a href="http://poderopedia.github.io/panama-network/">URL</a>. The code is licensed as open-souce and hosted in a GitHub <a href="https://github.com/poderopedia/panama-network"> repository</a>. It includes many more features as clickable node to expand the graph with new data, refresh and fullscreen among others.</p>

    <div id="demo-network-chart"></div>

    <p> The Network Chart can support much bigger amounts of data as it is shown in the <a href="{{ site.baseurl }}/portfolio/random-network.md"> Random Network </a>example.  The following is a screenshot corresponding to a graph with 1000 nodes and randomly assigned links.

    <img src="{{site.baseurl}}/portfolio/img/panama2.jpg" class="img-responsive" alt="Website">


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
d3.json('https://rawgithub.com/poderopedia/panama-network/master/data/A.json', function(error, data) {

     if (error) { return error; }

     var width = parseInt(d3.select('#demo-network-chart').style('width'), 10),
         height = 400;

     var chart01 = pty.chart.network()
         .width(width)
         .height(height)
         .nodeRadius(15)
         .nodeClass(function(d) { return d.type; })
         .nodeLabel(function(d) { return d.id; })
         .nodeBaseURL(function(d) { return 'https://rawgithub.com/poderopedia/panama-network/master/data/' + d.id + '.json'; });


     d3.select('div#hdemo-network-chart').data([data]).call(chart01);
 });
</script>