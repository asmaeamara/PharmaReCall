function RequeteAxios(){
    var pharmacyData = null;
    var distributorData = null;
    var factoryData = null;
    var supp2Data = null;    
    var supp1Data = null;
    var parameter = document.getElementById("prod").value;
    var justification = document.getElementById("justification").value;
    var viz;
    
            var config = {
                container_id: "viz",
                server_url: "bolt://localhost:7687",
                server_user: "neo4j",
                server_password: "maaw2022",
                labels: {
                    "Pharmacy": {
                        "caption": "Name",
                    },
                    "Distributor": {
                      "caption": "Name",
                    },
                    "Factory": {
                    "caption": "Name",
                    },
                    "supplier2": {
                    "caption": "Name",
                    },
                    "supplier1": {
                    "caption": "Name",
                    },
                    

                },
                relationships: {
                    "DELIVERS": {
                        "thickness": "weight",
                        "caption": false
                    }
                },
                initial_cypher: "MATCH p=()-[:DELIVERS]- >()-[:DELIVERS]->()-[:DELIVERS]->()-[:DELIVERS]->(ph:Pharmacy) WHERE ph.Product CONTAINS \""+parameter+"\" RETURN  * LIMIT 500"
            };

            viz = new NeoVis.default(config);
            viz.render();
        

    axios.get('http://localhost:3000/Pharmacy',{
        params: {
        produit : parameter,
        justification : justification 
        }})
          .then(function (resPh) {
            // handle success
            axios.get('http://localhost:3000/Distributor',{
                params: {
                produit : parameter
                }})
            .then(function(respDis) {
              axios.get('http://localhost:3000/Factory',{
                params: {
                produit : parameter
                }})
              .then(function (respFact) {
              axios.get('http://localhost:3000/Supplier2',{
                params: {
                produit : parameter
                }})
                .then(function(respSup2) {
                  axios.get('http://localhost:3000/Supplier1',{
                    params: {
                    produit : parameter
                    }})
                  .then(function(respSup1) {
                    $('#sup1_table').DataTable( {searching : false ,
                      paging : false ,
                      info : false,
                      data: respSup1.data,
                      "columnDefs": [
                        { "width": "20%", "targets": 0 }
                      ],
                      "columns": [
                          { data: "Name" },
                          { data: "Resource" },
                          { data: "Price" },
                          { data: "Address" },
                          { data: "SupplierCode" },
                      ]
                      } );
                  })
                  .catch(function (errSup1) {
                  console.log(errSup1);
                  })
            $('#sup2_table').DataTable( {searching : false ,
              paging : false ,
              info : false,
            data: respSup2.data,
            "columnDefs": [
              { "width": "20%", "targets": 0 }
            ],
            "columns": [
                { data: "Name" },
                { data: "RawItem" },
                { data: "Price" },
                { data: "Address" },
                { data: "SupplierCode" },
                    ]
                    } );
                 })
                 .catch(function (errSup2) {
                  console.log(errSup2);
              })
            $('#fact_table').DataTable( {searching : false ,
              paging : false ,
              info : false,
            data: respFact.data,
            "columnDefs": [
              { "width": "20%", "targets": 0 }
            ],
            "columns": [
                { data: "Name" },
                { data: "Product" },
                { data: "Price" },
                { data: "Address" },
                { data: "Suppliers" },
            ]
            } );
              }) 
              .catch(function (errFact) {
               console.log(errFact);
              })
            $('#dist_table').DataTable( {
              searching : false ,
              paging : false ,
              info : false,
              data: respDis.data,
            
            "columns": [
            
                { data: "Name" },
                { data: "Product" },
                { data: "Price" },
                { data: "Address" },
                { data: "Local" },
            ]
            } );
            })
            .catch(function (errDis) {
            console.log(errDis);
            })
            $('#phar_table').DataTable( {
              searching : false ,
              paging : false ,
              info : false,
              data : resPh.data,
              "columns": [
                  { data: "Name" },
                  { data: "BatchCode"},
                  { data: "Price" },
                  { data: "Piece" },
                  { data: "City" },
              ]
          } );

          }) 
          .catch(function (errPh) {
            // handle error
            console.log(errPh);
          })
          .then(function () {
            // always executed
          });

        }
         
function getCount(){
  axios.get('http://localhost:3000/Count')
      .then(function (res) {

        var pharCount = res.data['0'];
        var disCount = res.data['1'];
        var factCount = res.data['2'];
        var sup1Count = res.data['3'];
        var sup2Count = res.data['4'];
        document.getElementById('phc').textContent += String(pharCount);
        document.getElementById('fc').textContent += String(disCount);
        document.getElementById('dc').textContent += String(factCount);
        document.getElementById('s2c').textContent += String(sup2Count);
        document.getElementById('s1c').textContent += String(sup1Count);

        console.log(res)
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      })
      .then(function () {
        // always executed
      })






}



function RequeteAxios2(){
  var pharmacyData = null;
  var distributorData = null;
  var factoryData = null;
  var supp2Data = null;    
  var supp1Data = null;

      

axios.get('http://localhost:3000/allPharmacy')
        .then(function (resPh) {
          // handle success
          axios.get('http://localhost:3000/allDistributor')
          .then(function(respDis) {
            axios.get('http://localhost:3000/allFactory')
            .then(function (respFact) {
            axios.get('http://localhost:3000/allSupplier2')
              .then(function(respSup2) {
                axios.get('http://localhost:3000/allSupplier1')
                .then(function(respSup1) {
                  $('#sup1_table_all').DataTable( {searching : false ,
                    paging : false ,
                    info : false,
                    data: respSup1.data,
                    "columnDefs": [
                      { "width": "20%", "targets": 0 }
                    ],
                    "columns": [
                        { data: "Name" },
                        { data: "Resource" },
                        { data: "Price" },
                        { data: "Address" },
                        { data: "SupplierCode" },
                    ]
                    } );
                })
                .catch(function (errSup1) {
                console.log(errSup1);
                })
          $('#sup2_table_all').DataTable( {searching : false ,
            paging : false ,
            info : false,
          data: respSup2.data,
          "columnDefs": [
            { "width": "20%", "targets": 0 }
          ],
          "columns": [
              { data: "Name" },
              { data: "RawItem" },
              { data: "Price" },
              { data: "Address" },
              { data: "SupplierCode" },
                  ]
                  } );
               })
               .catch(function (errSup2) {
                console.log(errSup2);
            })
            console.log(respFact.data);
          $('#fact_table_all').DataTable( {searching : false ,
            paging : false ,
            info : false,
          data: respFact.data,
          "columnDefs": [
            { "width": "20%", "targets": 0 }
          ],
          "columns": [
              { data: "Name" },
              { data: "Product" },
              { data: "Price" },
              { data: "Address" },
              { data: "Suppliers" },
          ]
          } );
            }) 
            .catch(function (errFact) {
             console.log(errFact);
            })
          $('#dist_table_all').DataTable( {
            searching : false ,
            paging : false ,
            info : false,
            data: respDis.data,
          
          "columns": [
          
              { data: "Name" },
              { data: "Product" },
              { data: "Price" },
              { data: "Address" },
              { data: "Local" },
          ]
          } );
          })
          .catch(function (errDis) {
          console.log(errDis);
          })
          $('#phar_table_all').DataTable( {
            searching : false ,
            paging : false ,
            info : false,
            data : resPh.data,
            "columns": [
                { data: "Name" },
                { data: "BatchCode"},
                { data: "Price" },
                { data: "Piece" },
                { data: "City" },
            ]
        } );

        }) 
        .catch(function (errPh) {
          // handle error
          console.log(errPh);
        })
        .then(function () {
          // always executed
        });

      }

function rappel(){
  var container = document.getElementById('rappel_container');
  axios.get('http://localhost:3000/allRappels')
        .then(function (resRappel) {

              resRappel.data.forEach(element => {

                container.innerHTML += ' <div class=\"bs-toast toast fade show bg-primary\" role=\"alert\" aria-live=\"assertive\" ><div class=\"toast-header\"><i class=\"bx bx-bell me-2\"></i><div class=\"me-auto fw-semibold\">'+element.produit+'</div><small>'+String(element.date).substring(0,21)+'</small><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></b></div><div class=\"toast-body\">'+element.justification+'</div></div>';
              });

              console.log(resRappel.data);


        }).catch(function (errPh) {
          // handle error
          console.log(errPh);
        })











}









