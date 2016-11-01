import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, HttpModule, Http, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CharityService } from './charity.service';
import { Charity } from '../constants/data-types';

let testCharity1 = {
  id: 1,
  register_id: 1,
  name: 'Test charity',
  description: 'Test description'
};

let testCharity2 = {
  id: 2,
  register_id: 2,
  name: 'Test charity 2',
  description: 'Test description 2'
};

describe('Charity service', () => {
  let mockBackend:MockBackend;
  
  // Reference: https://github.com/krimple/angular2-unittest-samples-release/blob/master/src/app/services/blog.service.spec.ts
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CharityService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend:XHRBackend, defaultOptions:BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));
  
  it('should get charities', done => {
    let charityService:CharityService;
    
    // Fake response
    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection:MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [testCharity1]
              }
            )));
        });
      
      charityService = getTestBed().get(CharityService);
      expect(charityService).toBeDefined();
      
      charityService.getCharities().then((charities:Charity[]) => {
        expect(charities.length).toBeDefined();
        expect(charities.length).toEqual(1);
        expect(charities[0].id).toEqual(1);
        done();
      });
    });
  });
  
  it('should get charities async',
    async(inject([CharityService], (charityService:CharityService) => {
      mockBackend.connections.subscribe(
        (connection:MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [testCharity1]
              }
            )));
        });
      
      charityService.getCharities().then((charities:Charity[]) => {
        expect(charities.length).toBeDefined();
        expect(charities.length).toEqual(1);
        expect(charities[0].id).toEqual(1);
      });
    })));
  
  it('should get a single charity by id',
    async(inject([CharityService], (charityService:CharityService) => {
      mockBackend.connections.subscribe(
        (connection:MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [testCharity1, testCharity2]
              }
            )));
        });
      
      charityService.getCharity(1).then((charity:Charity) => {
        expect(charity.id).toEqual(1);
      });
    })));
  
  it('should return undefined for charities that do not exist',
    async(inject([CharityService], (charityService:CharityService) => {
      mockBackend.connections.subscribe(
        (connection:MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [testCharity1, testCharity2]
              }
            )));
        });
      
      charityService.getCharity(0).then((charity:Charity) => {
        expect(charity).toBeUndefined();
      });
    })));
});