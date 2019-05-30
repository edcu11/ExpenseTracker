var async = require( 'async' );
module.exports = function( app, cb ) {
  var datasources = Object.keys( app.dataSources );
  async.eachSeries( datasources, function( dsName, cb ) {
    var ds = app.dataSources[ dsName ];
    ds.isActual( function( err, actual ) {
      if ( err ) return cb( err );
      if ( actual ) { console.log( 'datasource', dsName, 'is up to date' ); return cb(); }
      ds.autoupdate( function( err ) {
        if ( err ) return cb( err );
        console.log( 'datasource', dsName, 'updated' );
        cb();
      });
    });
  }, cb );
};