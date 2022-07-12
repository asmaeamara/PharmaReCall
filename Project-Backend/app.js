var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
var cors = require('cors');
const res = require('express/lib/response');
const { attachment } = require('express/lib/response');
// initialisation de l'app
var app = express();

// View Engine 
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j','maaw2022'));
var session1 = driver.session();
var session2 = driver.session();
var session3 = driver.session();
var session4 = driver.session();
var session5 = driver.session();
var sessionC = driver.session();
var session6 = driver.session();
var session7 = driver.session();
// app.get('/tracability', function(req, res){
//     session 
//       .run('MATCH (s1:supplier1) RETURN s1  LIMIT 25')
//       .then(function(result){
//           var suppArr = [];
//           result.records.forEach(function(record){
//               suppArr.push({
//                   Name : record._fields[0].identity.L1Name,
//                   Resource : record._fields[0].properties.Resource,
//                   Price : record._fields[0].properties.L1Price,
//                   Adresse : record._fields[0].properties.L1Adresse,
//                   ZipCode : record._fields[0].properties.L1Zipcode,
//                   SupplierCode : record._fields[0].properties.L1Suppliercode,
//               })
//               console.log(record._fields[0].properties);
//           });  
//           res.end(JSON.stringify(suppArr));
//       })
//       .catch(function(error){
//           console.log(error);
//       });
// });

// async function executeCypherQuery(statement, params = {}) {
//   try {
//     let session = driver.session()
//     const result = await session.run(statement, params);
//     await session.close();
//     return res.end(JSON.stringify(result));
//   } catch (error) {
//     throw error; // we are logging this error at the time of calling this method
//   }stoooo
// }

// get rappels

app.get('/allRappels', function(req, res){
  session7 
    .run('MATCH (r:recall) return r')
    .then(function(result){
        var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                    console.log(values)
                          s.push(values['2']); 
              })     
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
});

















//Pharmacy
app.get('/Pharmacy', function(req, res){
  var prodName = req.query['produit'];
  var justification = req.query['justification'];
  session1 
    .run('MATCH ()-[:DELIVERS]- >()-[:DELIVERS]->()-[:DELIVERS]->()-[:DELIVERS]->(ph:Pharmacy) WHERE ph.Product CONTAINS "'+prodName+'" RETURN DISTINCT ph LIMIT 500')
    .then(function(result){
        var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'Pharmacy'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
    
    var dateRappel = new Date();
    dateRappel.toString('yyyy-MM-dd');   

    session6
    .run('CREATE (d:recall{produit:\''+prodName+'\',justification:\''+justification+'\',date:\''+dateRappel+'\'})')
    .then(function(result){
        console.log(result)
    })
    .catch(function(error){
        console.log(error);
    });




});



app.get('/Distributor', function(req, res){
  var prodName = req.query['produit'];
  session2 
    .run('MATCH ()-[:DELIVERS]- >()-[:DELIVERS]->()-[:DELIVERS]->(d:Distributor)-[:DELIVERS]->(ph:Pharmacy) WHERE ph.Product CONTAINS "'+prodName+'" RETURN DISTINCT d LIMIT 500')
    .then(function(result){
        var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'Distributor'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
});


//Factory
app.get('/Factory', function(req, res){
  var prodName = req.query['produit'];
  session3 
    .run('MATCH ()-[:DELIVERS]- >()-[:DELIVERS]->(f:Factory)-[:DELIVERS]->()-[:DELIVERS]->(ph:Pharmacy) WHERE ph.Product CONTAINS "'+prodName+'" RETURN DISTINCT f LIMIT 500')
    .then(function(result){
        var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'Factory'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
});

//Supplier2
app.get('/Supplier2', function(req, res){
  var prodName = req.query['produit'];
  session4
    .run('MATCH ()-[:DELIVERS]->(s2:supplier2)-[:DELIVERS]->()-[:DELIVERS]->()-[:DELIVERS]->(ph:Pharmacy) WHERE ph.Product CONTAINS "'+prodName+'" RETURN DISTINCT s2 LIMIT 500')
    .then(function(result){
        var s = []; 
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'supplier2'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
});

//Supplier1
app.get('/Supplier1', function(req, res){
  var prodName = req.query['produit']; 
  session5
    .run('MATCH (s1:supplier1)-[:DELIVERS]->()-[:DELIVERS]->()-[:DELIVERS]->()-[:DELIVERS]->(ph:Pharmacy) WHERE ph.Product CONTAINS "'+prodName+'" Return DISTINCT s1 LIMIT 500')
    .then(function(result){
        var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'supplier1'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
});

// Count nodes 
app.get('/Count', function(req, res){
  sessionC 
    .run('MATCH (ph:Pharmacy) WITH count(ph) as count RETURN  count UNION ALL MATCH (f:Factory) WITH count(f) as count RETURN count UNION ALL MATCH (d:Distributor) WITH count(d) as count RETURN  count UNION ALL MATCH (s2:supplier2)  WITH count(s2) as count RETURN  count UNION ALL MATCH (s1:supplier1) WITH count(s1) as count RETURN  count ')
    .then(function(result){
      var l = [];
      result.records.forEach(function(record){
             record.forEach(function(item){
               var values = Object.values(item);
               l.push(values['0']);
             })
      })
        res.end(JSON.stringify(l));
    })
    .catch(function(error){
        console.log(error);
    });
});  

// Historique de recherche "All pharmacies"
app.get('/allPharmacy', function(req, res){
  sessionC 
    .run('MATCH (ph:Pharmacy) RETURN ph LIMIT 50')
    .then(function(result){
      var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'Pharmacy'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
});  

// Historique de recherche "All distributor"
app.get('/allDistributor', function(req, res){
  sessionC 
    .run('MATCH (d:Distributor) RETURN d LIMIT 50')
    .then(function(result){
      var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'Distributor'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
}); 

// Historique de recherche "All factory"
app.get('/allFactory', function(req, res){
  sessionC 
    .run('MATCH (f:Factory) RETURN f LIMIT 50')
    .then(function(result){
      var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      console.log(values);
                      if(values['1']['0'] == 'Factory'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
});

// Historique de recherche "All Supplier 2"
app.get('/allSupplier2', function(req, res){
  sessionC 
    .run('MATCH (s2:supplier2) RETURN s2 LIMIT 50')
    .then(function(result){
      var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'supplier2'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
}); 
// Historique de recherche "All All Supplier 1"
app.get('/allSupplier1', function(req, res){
  sessionC 
    .run('MATCH (s1:supplier1) RETURN s1 LIMIT 50')
    .then(function(result){
      var s = [];
      result.records.forEach(function(record){
              record.forEach(function(item){
                      const values = Object.values(item);
                      if(values['1']['0'] == 'supplier1'){
                          s.push(values['2']); 
              }})       
      });
        res.end(JSON.stringify(s));
    })
    .catch(function(error){
        console.log(error);
    });
});




app.listen(3000);
console.log('Server Started on Port 3000');

module.exports = app;