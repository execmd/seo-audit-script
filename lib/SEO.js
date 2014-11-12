var request = require('request');

var defaultSettings = {};

function SEO() {
    var settings;
    var domain;
    var cache;


}


function getGooglePR(domain, callback) {
    var url = 'http://toolbarqueries.google.com/tbr?client=navclient-auto&ch='
            + require('pagerank-checksum')(domain) + '&features=Rank&q=info:'
            + domain + '&num=100&filter=0';

    request(url, function(err, response, body) {
        if (err) {
            return callback(err);
        }
        if (response.statusCode != 200) {
            return callback(new Error('Status code not 200'));
        }

        callback(null, body.match(/Rank_1:1:([0-9]+)/i)[1]);
    });
}


function getGoogleIP(domain, callback) {
    var url = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=site:'
            + $domain + '&filter=0';

    request(url, function(err, response, body) {
        if (err) {
            return callback(err);
        }
        if (response.statusCode != 200) {
            return callback(new Error('Status code not 200'));
        }
        var data = JSON.parse(body);
        if (data.responseStatus == 200) {
            callback(null, body.responseData.cursor.resultCount);
        }
    });
}


function getGoogleBL(domain, callback) {
    var url = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=link:'
            + $domain + '&filter=0';

    request(url, function(err, response, body) {
        if (err) {
            return callback(err);
        }
        if (response.statusCode != 200) {
            return callback(new Error('Status code not 200'));
        }
        var data = JSON.parse(body);
        if (data.responseStatus == 200) {
            callback(null, body.responseData.cursor.resultCount);
        }
    });
}

module.exports = SEO;
