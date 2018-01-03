import { TestBed, inject } from '@angular/core/testing';

import { ProjectSettingsService } from './project-settings.service';

describe('LocalstorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectSettingsService]
    });
  });

  it('should be created', inject([ProjectSettingsService], (service: ProjectSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
