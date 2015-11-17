(function() {
  function parseContent(data, name, type, color, isJournal) {
    data["name"] = name;
    data["type"] = type;

    if (color) {
      data["color"] = color;
    }

    if (isJournal) {
      data["journal"] = "journal";
    }

    if (name === 'Elsevier' || name === 'USGS') {
      data["source"] = "Publisher";
    }

    Object.keys(data).forEach(function(d) {
      if (!(isNaN(data[d]))) {
        data[d] = commaize(data[d]);
      }
    });

    return Mustache.render(template, data);
  }

  function sourceTotal(data, source) {
    var journals = Object.keys(data)
      .map(function(d) { return data[d] })
      .filter(function(d) { if (d.source === source) { return d }});

    return {
      fetched: journals.map(function(d) { return d.fetched }).reduce(function(a, b) { return a + b}, 0),
      ocr: journals.map(function(d) { return d.ocr }).reduce(function(a, b) { return a + b}, 0),
      cuneiform: journals.map(function(d) { return d.cuneiform }).reduce(function(a, b) { return a + b}, 0),
      nlp: journals.map(function(d) { return d.nlp }).reduce(function(a, b) { return a + b}, 0),
      nlp352: journals.map(function(d) { return d.nlp352 }).reduce(function(a, b) { return a + b}, 0),
      fonttype: journals.map(function(d) { return d.fonttype }).reduce(function(a, b) { return a + b}, 0)
    }
  }

  function commaize(x) {
    x = parseInt(x);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function getRandomColor() {
    var color = randomColor();
    while (last5Colors.indexOf(color) > -1) {
      color = randomColor();
    }

    last5Colors.push(color);

    if (last5Colors.length > 5) {
      last5Colors.shift();
    }

    return color;
  }

  function randomColor() {
    return colors[Math.floor(Math.random() * (colors.length - 1))];
  }

  var last5Colors = [];

  var template = $('#template').html();
  Mustache.parse(template);

  var colors = _.shuffle(['#2D95BF', '#357BCB', '#955BA5', '#112F41', '#36424A', '#068587', '#4FB99F', '#F2B134', '#ED553B', '#DBC73D', '#C44E18', '#61B594', '#C40076', '#591C00', '#455C7B', '#16005A', '#57385C', '#363535', '#DB6E73', '#005D5C', '#FFBB6A', '#46906E', '#175882', '#A1B4BA', '#3392B8', '#4C4C4C', '#053462', '#62B072', '#2B1D2E', '#323657', '#076473', '#54B087', '#6D8C75', '#D9AD77', '#3F3E05', '#BF7B75', '#74DDB8', '#D99F59', '#D9782B', '#D9782B', '#5C474C', '#7D736A', '#54656B', '#742C4E', '#B04C2E']);

  function getRecent() {
    var deferred = Q.defer();

    $.getJSON('https://geodeepdive.org/api/v1/articles?recent&max=10', function(data) {
      var template = $('#recent_template').html();
      Mustache.parse(template);

      data.success.data.forEach(function(d) {
        var url = d.link.filter(function(j) {
          if (j.type === 'sciencedirect') {
            return j
          }
        });

        d.url = (url.length) ? url[0].url : '';

        if (d.identifier) {
          var doi = d.identifier.filter(function(j) {
            if (j.type === 'doi') {
              return j;
            }
          });

          d.doi = (doi.length) ? doi[0].id : '';
        } else {
          d.doi = '';
        }

      });

      var recent = {
        first: data.success.data.slice(0,5),
        second: data.success.data.slice(5, 10)
      }

      deferred.resolve(Mustache.render(template, recent));
    //  $('.wrapper').append();
    });

    return deferred.promise;
  }

  function getStats(recent) {
    var deferred = Q.defer();
    $.getJSON('https://geodeepdive.org/api/v1/metrics?all', function(data) {
      var results = data.success.data.metrics;

      // Report totals
      $('.wrapper').append(parseContent(results.total, 'Total', 'totals'))

      // Report Elsevier
      $('.wrapper').append(parseContent(sourceTotal(results, 'Elsevier'), 'Elsevier', 'elsevier'))

      // Report USGS
      $('.wrapper').append(parseContent(sourceTotal(results, 'USGS'), 'USGS', 'usgs'))

      $('.wrapper').append(recent);

      // Report the top journals
      delete results.total;

      _.sortBy(
        Object.keys(results)
          .map(function(d) {
            return results[d]
          })
        , 'fetched')
        .reverse()
        .slice(0, colors.length * 2)
        .forEach(function(d, i) {
          $('.wrapper').append(parseContent(d, d.nospace.replace(/_/g, ' '), 't' + (i + 1), getRandomColor(), true))
        });

        deferred.resolve();
    });
    return deferred.promise;
  }


  getRecent()
    .then(function(recent) {
      getStats(recent)
    })

})();
