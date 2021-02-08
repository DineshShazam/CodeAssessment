const {MongoClient} = require('mongodb');
var _db;

module.exports = {

  connectToServer: ( callback ) => {
    MongoClient.connect( process.env.DATABASE_URL,  { useNewUrlParser: true,useUnifiedTopology:true }, function( err, client ) {
      _db  = client.db('node_assessment');
      return callback( err );
    } );
  },

  dbInstance: () => {
    return _db;
  }
} 