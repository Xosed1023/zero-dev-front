import { Component } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';
import { ConfigurationService } from './shared/services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zerodev';
  constructor(
    private loadingService: LoadingService,
    public configService: ConfigurationService,
  ){
    if (this.loadingService.subsVar === undefined) {
      this.loadingService.subsVar = this.loadingService.invokeComponentLoading.subscribe((loading: any) => {
        this.configService.setLoadingPage(loading);
      });
    }
  }
}
