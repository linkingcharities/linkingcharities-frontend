import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, HttpModule, Http, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CharityService } from './charity.service';
import { Charity } from '../constants/data-types';

let testCharity1:Charity = {
  id: 1,
  register_id: 1,
  name: 'Test charity',
  description: 'Test description',
  paypal: 'asdf',
  type: 'G',
  target: 'C'
};

let testCharity2:Charity = {
  id: 2,
  register_id: 2,
  name: 'Test charity 2',
  description: 'Test description 2',
  paypal: 'asdf',
  type: 'E',
  target: 'E'
};

let testCharity3:Charity = {
  id: 3,
  register_id: 3,
  name: 'JSDF',
  description: 'ROFL',
  paypal: 'asdf',
  type: 'H',
  target: 'D'
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
      
      charityService.getCharities();
      charityService.charities$.subscribe((charities:Charity[]) => {
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
      
      charityService.getCharities();
      charityService.charities$.subscribe((charities:Charity[]) => {
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
      
      charityService.getCharity(1);
      charityService.charity$.subscribe((charity:Charity) => {
        expect(charity.id).toEqual(1);
      });
    })));
  
  it('should return undefined for charities that do not exist',
    async(inject([CharityService], (charityService:CharityService) => {
      mockBackend.connections.subscribe(
        (connection:MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: []
              }
            )));
        });
      
      charityService.getCharity(0);
      charityService.charity$.subscribe((charity:Charity) => {
        expect(charity).toBeUndefined();
      });
    })));
  
  it('should search for and return charities',
    async(inject([CharityService], (charityService:CharityService) => {
      mockBackend.connections.subscribe(
        (connection:MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [testCharity1, testCharity2, testCharity3]
              }
            )));
        });
      
      charityService.search('Test');
      charityService.charities$.subscribe((charities:Charity[]) => {
        expect(charities.length).toBeDefined();
        expect(charities.length).toEqual(2);
        expect(charities[0]).toBe(testCharity1);
        expect(charities[1]).toBe(testCharity2);
      });
    })));
  
  it('should search for and return charities (empty case)',
    async(inject([CharityService], (charityService:CharityService) => {
      mockBackend.connections.subscribe(
        (connection:MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [testCharity1, testCharity2, testCharity3]
              }
            )));
        });
      
      charityService.search('test');
      charityService.charities$.subscribe((charities:Charity[]) => {
        expect(charities.length).toBeDefined();
        expect(charities.length).toEqual(0);
      });
    })));
  
});