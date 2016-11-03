import { AppStateService } from './app-state.service';
import { TestBed, inject } from '@angular/core/testing';

describe('App state service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStateService]
    });
  });
  
  it('should load and accept modifications', inject([AppStateService],
    (appState:AppStateService) => {
      expect(appState).toBeDefined();
      expect(appState.leftPos).toBe(0);
      expect(appState.rightPos).toBe(appState.stepSize);
      
      appState.leftPos = 10;
      appState.rightPos = 15;
      
      expect(appState.leftPos).toBe(10);
      expect(appState.rightPos).toBe(15);
    }
  ));
  
});