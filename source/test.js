
var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("./functions/index");
let should = chai.should();
const axios = require('./functions/node_modules/axios') ; 
chai.use(chaiHttp);

describe('create functions', function() {
    var host = 'http://localhost:5001/test-43bfd/us-central1/';
    var path = 'addUser';
    

    it('add - valid input ', function(done) {
        chai
            .request(host)
            .post(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name : 'testname', email : 'test@email.com', number: '123123'})
            .end(function(error, res) {
                res.should.have.status(200) ;
                res.body.success.should.eq(1) ;
                
                done(error) ; 

            });

    });

    it('add function - null param', function(done) {
        chai
            .request(host)
            .post(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function(error, res) {
                res.should.have.status(400) ;
                res.body.success.should.eq(0) ;                
                
                done(error) ; 

            });
    });

    it('add function - invalid param format ', function(done) {
        chai
            .request(host)
            .post(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name : 'testname', email : 'test@', number: '123123'})
            .end(function(error, res) {
                res.should.have.status(400) ;
                res.body.success.should.eq(0) ;                
                
                done(error) ; 

            });
    });
});




describe('read functions', function() {
    var host = 'http://localhost:5001/test-43bfd/us-central1/';
    var path = 'getUserByID';

    it('Read by ID - valid id ', function(done) {
        chai
            .request(host)
            .get(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({id: 'Y76Wo7YS1sgQkoD7gwy9'})
            .end(function(error, res) { 
                res.should.have.status(200) ;
                res.body.success.should.eq(1) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 
                // if (error) {
                //     done(error);
                // } else {
                //     done();
                // }
            });
    });

    it('Read by ID - invalid/null param', function(done) {
        chai
            .request(host)
            .get(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function(error, res) {
                res.should.have.status(200) ;
                res.body.success.should.eq(0) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 

            });
    });

    it('get all users - no params', function(done) {
        chai
            .request(host)
            .get('getAllUsers')
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function(error, res) {
                res.should.have.status(200) ;
                res.body.success.should.eq(1) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 
                // if (error) {
                //     done(error);
                // } else {
                //     done();
                // }
            });
    });
});





describe('update functions', function() {
    var host = 'http://localhost:5001/test-43bfd/us-central1/';
    var path = 'updateUserData';

    it('add - valid input ', function(done) {
        chai
            .request(host)
            .put(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({"id": "Y76Wo7YS1sgQkoD7gwy9", "updates" : {"name":"mohan"}})
            .end(function(error, res) {
                res.should.have.status(200) ;
                res.body.success.should.eq(1) ;
                //res.body.data.id.length.to.not.eq(0) ;                 
                // result.body.data.year.should.eq("2017")
                done(error) ; 

            });
    });

    it('update function - invalid/null param', function(done) {
        chai
            .request(host)
            .put(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function(error, res) {
                res.should.have.status(400) ;
                res.body.success.should.eq(0) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 
                // if (error) {
                //     done(error);
                // } else {
                //     done();
                // }
            });
    });

    it('update function - id not present', function(done) {
        chai
            .request(host)
            .put(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({"id": "4mphAATgSiSlsfzgFz", "updates" : {"name":"mihir"}})
            .end(function(error, res) {
                res.should.have.status(400) ;
                res.body.success.should.eq(0) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 
                // if (error) {
                //     done(error);
                // } else {
                //     done();
                // }
            });
    });
});


describe('delete functions', function() {
    var host = 'http://localhost:5001/test-43bfd/us-central1/';
    var path = 'deleteUserByID';

    it('delete - valid input id ', function(done) {
        chai
            .request(host)
            .delete(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({id : 'goASkCG9gfophVRywd9B'})
            .end(function(error, res) {
                res.should.have.status(200) ;
                res.body.success.should.eq(1) ;
                //res.body.data.id.length.to.not.eq(0) ;                 
                // result.body.data.year.should.eq("2017")
                done(error) ; 

            });
    });

    it('delete function - non existent input id', function(done) {
        chai
            .request(host)
            .delete(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({id : '7YfZxseVBqs9qwmVWuhu'})
            .end(function(error, res) {
                res.should.have.status(200) ;
                res.body.success.should.eq(1) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 
                // if (error) {
                //     done(error);
                // } else {
                //     done();
                // }
            });
    });


    it('delete function - empty params', function(done) {
        chai
            .request(host)
            .delete(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function(error, res) {
                res.should.have.status(400) ;
                res.body.success.should.eq(0 ) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 
                // if (error) {
                //     done(error);
                // } else {
                //     done();
                // }
            });
    });
});


describe('Part II functions', function() {
    var host = 'http://localhost:5001/test-43bfd/us-central1/';
    var path = 'books';

    it('part II - valid input id ', function(done) {
        chai
            .request(host)
            .post(path)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({"url" : "https://www.google.com", "id" : "tCCaANTCC2MZWiApq7Q6", "tags": {"test": "test"} })
            .timeout(10000)
            .end(function(error, res) {
                res.should.have.status(200) ;
                res.body.success.should.eq(1) ;
                //res.body.data.id.length.to.not.eq(0) ;                 
                // result.body.data.year.should.eq("2017")
                done(error) ; 

            });
    });

    it('part II - No inputs', function(done) {
        chai
            .request(host)
            .post(path)
            // .field('myparam' , 'test')
            .timeout(10000)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function(error, res) {
                res.should.have.status(400) ;
                res.body.success.should.eq(0) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 

            });
    });


    it('Part III - invalid inputs', function(done) {
        chai
            .request(host)
            .post(path)
            .timeout(10000)
            // .field('myparam' , 'test')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({"url" : "https://www.gle.com", "id" : "abcd", "tags": {"test": "test"} })
            
            .end(function(error, res) {
                res.should.have.status(400) ;
                res.body.success.should.eq(0) ;                
                // result.body.data.year.should.eq("2017")
                done(error) ; 

            });
    });
});