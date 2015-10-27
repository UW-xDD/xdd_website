(function() {
  function parseContent(data, name, type, color, isJournal) {
    data["name"] = name;
    data["type"] = type;

    if (color) {
      data["color"] = color;
    }

    if (isJournal) {
      data["journal"] = "journal"
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

  var colors = ['#2D95BF', '#955BA5', '#112F41', '#068587', '#4FB99F', '#F2B134', '#ED553B', '#DBC73D', '#C44E18', '#61B594', '#C40076', '#16005A', '#C3E92E', '#363535', '#DB6E73', '#FFBB6A', '#46906E', '#175882', '#A1B4BA', '#3392B8', '#4C4C4C', '#62B072', '#2B1D2E', '#323657', '#076473', '#54B087', '#D6F567', '#6D8C75', '#D9AD77', '#BF7B75', '#74DDB8', '#F2DFA7', '#D99F59', '#D9782B', '#5C474C', '#7D736A', '#54656B', '#B04C2E'];

  $.getJSON('https://geodeepdive.org/api/v1/metrics?all', function(data) {
    var results = data.success.data.metrics;

    // Report totals
    $('.wrapper').append(parseContent(results.total, 'Total', 'totals'))

    // Report Elsevier
    $('.wrapper').append(parseContent(sourceTotal(results, 'Elsevier'), 'Elsevier', 'elsevier'))

    // Report USGS
    $('.wrapper').append(parseContent(sourceTotal(results, 'USGS'), 'USGS', 'usgs'))

    // Report the top journals
    delete results.total;
    var top10 = _.sortBy(
      Object.keys(results)
        .map(function(d) {
          return results[d]
        })
      , 'fetched')
      .reverse()
      .slice(0, colors.length - 1)
      .forEach(function(d, i) {
        $('.wrapper').append(parseContent(d, d.nospace.replace(/_/g, ' '), 't' + (i + 1), colors[i], true))
      });

  });

})();
