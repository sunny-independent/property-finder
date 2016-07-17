'use strict';

//http://www.nestoria.co.uk/help/api
class BackendService {
  getNestoriaPropertyList(key, value, pageNumber){
    var query = this.getQuery(key, value, pageNumber);
    console.log(query);
    var promise = new Promise((resolve, reject) => {
      fetch(query)
        .then(response => response.json())
        .then(json => resolve(json.response.listings))
        .catch(reason => reject(reason));
    });
    return promise;
  }
  
  getQuery(key, value, pageNumber){
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;

    var querystring = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');

    return 'http://api.nestoria.co.uk/api?' + querystring;
  }
}

module.exports = BackendService;