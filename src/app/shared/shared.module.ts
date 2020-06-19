import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PaginadorComponent } from './paginador/paginador.component';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    PaginadorComponent,
    LoadingComponent,   
   ],
  imports: [
    CommonModule,
    NgbPaginationModule,    
    NgbModule
  ],
  entryComponents:[
    PaginadorComponent,
    LoadingComponent
  ],
  exports:[
    PaginadorComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
