var template = $('#template').html();
Mustache.parse(template);

$.getJSON('https://geodeepdive.org/api/v1/metrics?all', function(data) {
  var results = data.success.data.metrics;

  // Report totals
  $('.wrapper').append(parseContent(results.total, 'Total', 'totals'))

  // Report Elsevier
  $('.wrapper').append(parseContent(sourceTotal(results, 'Elsevier'), 'Elsevier', 'elsevier'))

  // Report USGS
  $('.wrapper').append(parseContent(sourceTotal(results, 'USGS'), 'USGS', 'usgs'))

  // Find top 10
  delete results.total;
  var top10 = _.sortBy(
    Object.keys(results)
      .map(function(d) {
        return results[d]
      })
    , 'fetched')
    .reverse()
    .slice(0, 9)
    .forEach(function(d, i) {
      $('.wrapper').append(parseContent(d, d.nospace.replace(/_/g, ' '), 't' + (i + 1)))
    });

});

function parseContent(data, name, type) {
  data["name"] = name;
  data["type"] = type;

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
