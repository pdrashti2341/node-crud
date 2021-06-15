var express = require('express');
var mysql      = require('mysql');
var router = express.Router();


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodedemo'
});

connection.connect(function(err){
if(!err){
  console.log('DB connected');
}else{
  console.log('DB error')
}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* add form */
router.get('/add', function(req, res, next) {
  res.render('add-form');
});

/* insert form data */
router.post('/add-process', function(req, res, next) {
  console.log(req.body);

const mybodydata = {
  
  product_name : req.body.txt1 , 
  product_details: req.body.txt2, 
  product_price: req.body.txt3 
}
  connection.query("insert into tbl_product set ?" ,mybodydata , function(err,result){
    if(err)  throw err;
    res.redirect('/add'); 
      });

});

// display route

router.get('/display', function(req, res, next) {
  connection.query("select * from tbl_product" , function(err,db_rows){
    if(err)  throw err;
   // console.log(db_rows);
    res.render('display',{db_rows_array:db_rows})
  });
});
 // delete 
router.get('/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  console.log(deleteid);
  connection.query("delete from tbl_product where product_id=?" ,[deleteid], function(err,db_rows){
    if(err)  throw err;
   // console.log(db_rows);
    res.redirect('/display');
  });
});

// Edit get
router.get('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  console.log(editid);
  connection.query("select *  from tbl_product where product_id=?" ,[editid], function(err,db_rows){
    if(err)  throw err;
   // console.log(db_rows);
    res.render('edit',{db_rows_array:db_rows});
  });
});

// Edit post
router.post('/edit/:id', function(req, res, next) {
  var editid = req.params.id;

  var pname = req.body.txt1;
  var pdetails = req.body.txt2;
  var pprice = req.body.txt3;
  console.log(editid);
  connection.query("update tbl_product set product_name=? , product_details=? , product_price=? where product_id = ?"  ,[pname,pdetails,pprice,editid], function(err,db_rows){
    if(err)  throw err;
   res.redirect('/display');
  });
});







module.exports = router;
