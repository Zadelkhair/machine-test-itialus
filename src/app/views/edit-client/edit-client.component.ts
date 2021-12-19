import Client from 'src/app/moduls/client/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client : Client = new Client();
  id:number=-1;

  constructor(private clientService : ClientService,private route:ActivatedRoute , private router:Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    if(id != "create"){
      this.id = parseInt(id);
      this.clientService.byid(id).subscribe((client)=>{
          this.client = client;
      });
    }

  }

  submit(){

    if(this.client.client_id){
      this.clientService.update(this.client).subscribe((client)=>{
        console.log('updated');
        this.router.navigate(['clients'],{ queryParams: { updated_client: client.client_id } });
      });
    }
    else{
      this.clientService.create(this.client).subscribe((client)=>{
        console.log('created');
        this.router.navigate(['clients'],{ queryParams: { created_client: client.client_id } });
      });
    }
  }

}
