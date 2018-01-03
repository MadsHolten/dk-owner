import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';

// Interface
import { ProjectSettings } from '../settings/settings.component';

@Injectable()
export class ProjectSettingsService {

  constructor(
    private lss: LocalStorageService
  ) { }

  public saveTriplestoreSettings(object: ProjectSettings) {
    // Save object to {prefix}endpointSettings
    this.lss.set('endpointSettings', object);
  }

  public getTriplestoreSettings() {
    // Get object from {prefix}endpointSettings
    return this.lss.get('endpointSettings');
  }

}
