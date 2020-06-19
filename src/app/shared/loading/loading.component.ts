import Swal from 'sweetalert2';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
 
  @Input() activar:boolean
  constructor() { }

  ngOnInit(): void {
    this.loading()
  }

  loading(){
      Swal.fire({
        html: "<div class='row'>"+
                  "<div class='col-2'>"+
                      "<div class='spinner-border'></div>"+
                  '</div>'+
                  "<div class='col-10'>"+
                      "<p class='text-dark'>Procesando, espere por favor...</p>"+
                  '</div>'+
              "</div>",    
        showCancelButton: false,
        showConfirmButton: false,
        width: '380px',
      });

      if(!this.activar){
        Swal.close();
      }
  }


}
