(function() {
  function parseContent(data, name, type, color, isPublisher) {
    data["name"] = name;
    data["type"] = type;
    data["publisher"] = (isPublisher) ? "publisher" : "";
    data["source"] = (isPublisher) ? "Publisher" : data["source"];

    if (color) {
      data["color"] = color;
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
      name: source,
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

  var template = $('#template').html();
  Mustache.parse(template);


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
    });

    return deferred.promise;
  }

  function getStats(recent) {
    var deferred = Q.defer();
    $.getJSON('https://geodeepdive.org/api/v1/metrics?all', function(data) {
      var results = data.success.data.metrics;

      // Report totals
      $('.wrapper').append(parseContent(results.total, 'Total', 'totals', '#F15A5A', true));

      // Define some default colors to keep source colors consistent
      var sourceColors = ['#F0C419', '#4EBA6F', '#AA012E', '#686354', '#363863', '#556E53', '#37B7B5', '#CA4B7C',
    '#433751'];

      // Find, process, and append publishers
      _.uniq(
        Object.keys(results)
          .map(function(d) {
            return results[d].source
          })
          .filter(function(d) {
            if (d) {
              return d;
            }
          })
      )
      .map(function(source) {
        return sourceTotal(results, source);
      })
      .sort(function(a, b) {
        return b.fetched - a.fetched;
      })
      .forEach(function(source, index) {
        $('.wrapper').append(parseContent(source, source['name'], source['name'].toLowerCase(), sourceColors[index], true));
      });

      // Append the most recently fetched articles
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
        .slice(0, colorUtil.colors.length * 2)
        .forEach(function(d, i) {
          $('.wrapper').append(parseContent(d, d.nospace.replace(/_/g, ' '), 't' + (i + 1), colorUtil.random()))
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
