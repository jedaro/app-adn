import chai from 'chai'
import chaiHttp from 'chai-http'
import 'mocha';
import server from '../server'
import { dataMock } from './utilsTest';
import * as service from '../services/mutant.service';
import dotenv from "dotenv";
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import  mongoose  from 'mongoose';
import { Sequence } from '../model/sequence.model';


require('sinon-mongo')

dotenv.config();
process.env.NODE_ENV = "testing"
let expect = chai.expect
chai.use(chaiHttp);
chai.use(sinonChai)

const sandbox = sinon.createSandbox();



describe('Unit test mutant.service', () => {

    describe("Test getStatsService ok", () => {

      beforeEach(() => {
    

      })

      afterEach(() => {
        sandbox.restore();
      })
      
      it("Get stats", async () => {
        let res = await service.getStatsService();
        console.log("-------- " + res);
        expect(res).to.be.not.empty;
 
      });
    });

    /*describe('Test checkSequenceService', () => {

        it('Check sequence ok', () => {
            let sequence = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
            let isCheck = checkSequenceService(sequence)
            expect(isCheck).to.be.true
            
        })

        it('Check sequence bad', () => {
            let sequence = ["ATGCGA","CTGTGA","GACGAG","ATGCGA","CAGACA","ATGCGA"]
            let isCheck = checkSequenceService(sequence)
            expect(isCheck).to.be.false
            
        })

    }); */

  /* describe("Test saveDataService", () => {
      it("saved", () => {
        let sequence = [
          "ATGCGA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG",
        ];
        let isMutant = true;
        saveDataService(sequence, isMutant).then((res) => {
          console.log(res);
          expect(res).to.be.true;
        });
      });
    });*/


});

function beforeAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function afterAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}
/*
describe("Unit test mutant.controller", () => {

    it('Test mutant error', (done) => {
        chai.request(server)
        .post('/mutant')
        .send({dna:[]})
        .end((res, err) => {
            expect(err).to.have.status(400)
            done()
        })

    })

    it('Test mutant error', (done) => {
      chai.request(server)
      .post('/mutant')
      .send({dna:["ATGCGJ","CTGTJA","GACGAG","ATGCGA","CAGACA","ATGCGA"]})
      .end((res, err) => {
          expect(err).to.have.status(400)
          done()
      })

  })
}) */



