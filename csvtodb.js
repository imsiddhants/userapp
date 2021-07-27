const csvtojson = require('csvtojson')
const mongodb = require('mongodb')

var url = "mongodb://localhost:27017/SampleDb";

var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});


const fileName = "user.csv";
var arrayToInsert = [];
csvtojson().fromFile(fileName).then(source => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
         var oneRow = {
             name: source[i]["name"],
             email: source[i]["email"],
             phone: source[i]["phone"],
             gender: source[i]["gender"],
             password : source[i]["password"]
         };
         arrayToInsert.push(oneRow);
     }
     //inserting into the 
     var collectionName = 'users';
     var collection = dbConn.collection(collectionName);
     collection.insertMany(arrayToInsert, (err, result) => {
         if (err) console.log(err);
         if(result){
             console.log("Import CSV into database successfully");
         }
     });
});