import * as AWSMock from 'aws-sdk-mock';
import AWS from 'AWS-sdk'
import chai from 'chai'
import chaiHttp from 'chai-http'
import 'mocha';
import server from '../server'
import { dataMock } from './utilsTest';
import {checkSequenceService, getStatsService, saveDataService} from '../services/mutant.service';
import dotenv from "dotenv";
import { get } from '../routes/routes';
dotenv.config();

let expect = chai.expect
chai.use(chaiHttp);


describe('Unit test mutant.service', async() => {

    describe('Test getStatsService ok', () => {

        before("vars", () => {
          let responseGet = dataMock;
          AWSMock.mock("DynamoDB", "query", (params, callback) => {
            console.log("Mock get rows from dynamodb");
            return callback(null, responseGet);
          });
        });

        after(() => {
          AWSMock.restore("DynamoDB");
        });

        it("Get stats", async (done) => {
            getStatsService().then((res) =>{
             expect(res).to.be.not.empty
            });

           done();
        });

       
    })

    describe('Test checkSequenceService', () => {

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

    });

    describe('Test saveDataService', () => {
        let sequence = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        let isMutant = true
        saveDataService(sequence, isMutant).then(res => {
            console.log(res)
            expect(res).to.be.true
        })

    })
   


});


