"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWSMock = __importStar(require("aws-sdk-mock"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
require("mocha");
const server_1 = __importDefault(require("../server"));
const utilsTest_1 = require("./utilsTest");
const mutant_service_1 = require("../services/mutant.service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let expect = chai_1.default.expect;
chai_1.default.use(chai_http_1.default);
describe('Unit test mutant.service', () => __awaiter(void 0, void 0, void 0, function* () {
    describe('Test getStatsService ok', () => {
        before("vars", () => {
            let responseGet = utilsTest_1.dataMock;
            AWSMock.mock("DynamoDB", "query", (params, callback) => {
                return callback(null, responseGet);
            });
        });
        after(() => {
            AWSMock.restore("DynamoDB");
        });
        it("Get stats", (done) => __awaiter(void 0, void 0, void 0, function* () {
            (0, mutant_service_1.getStatsService)().then((res) => {
                expect(res).to.be.not.empty;
            });
            done();
        }));
    });
    describe('Test checkSequenceService', () => {
        it('Check sequence ok', () => {
            let sequence = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
            let isCheck = (0, mutant_service_1.checkSequenceService)(sequence);
            expect(isCheck).to.be.true;
        });
        it('Check sequence bad', () => {
            let sequence = ["ATGCGA", "CTGTGA", "GACGAG", "ATGCGA", "CAGACA", "ATGCGA"];
            let isCheck = (0, mutant_service_1.checkSequenceService)(sequence);
            expect(isCheck).to.be.false;
        });
    });
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
}));
describe("Unit test mutant.controller", () => {
    it('Test mutant error', (done) => {
        chai_1.default.request(server_1.default)
            .post('/mutant')
            .send({ dna: [] })
            .end((res, err) => {
            expect(err).to.have.status(400);
            done();
        });
    });
    it('Test mutant error', (done) => {
        chai_1.default.request(server_1.default)
            .post('/mutant')
            .send({ dna: ["ATGCGJ", "CTGTJA", "GACGAG", "ATGCGA", "CAGACA", "ATGCGA"] })
            .end((res, err) => {
            expect(err).to.have.status(400);
            done();
        });
    });
});
