var SEO = require('./lib/SEO.js');

var domains = require('./data/domains.json');

var data = [];
domains.forEach(function(domain) {
	var stat = SEO.getStats(domain);
	var dstat = [];
	for (var info in stat) {
		dstat.push(info + '=' + stat[info]);
	}
	data.push(dstat.join('; '));
});

console.log(data.join('\n'));
