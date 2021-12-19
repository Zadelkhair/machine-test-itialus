import { ActivatedRoute } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import Client from 'src/app/moduls/client/client';
import Pagination from 'src/app/moduls/pagination/pagination';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  pagination?: Pagination<Client>;
  loadingData: Boolean = false;
  selectedClient?: Client;
  created_client?:number;
  updated_client?:number;

  constructor(public clientService: ClientService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.forEach((v)=>{
      if(v['created_client']){
        this.created_client = v['created_client'];
      }

      if(v['updated_client']){
        this.updated_client = v['updated_client'];
      }
    })

    //load categories
    this.loadClients(() => {
      //some itemStyle
      this.loadPagination(this.clients);
      this.itemStyle();

      if(this.created_client){
        let clnt = this.clients.find((v)=>{
          return v.client_id == this.created_client;
        });
        console.log(clnt);
        if(clnt)
          this.pagination?.goToItemPage(clnt);
      }

      if(this.updated_client){
        let clnt = this.clients.find((v)=>{
          return v.client_id == this.updated_client;
        });
        console.log(clnt);
        if(clnt)
          console.log(this.pagination?.goToItemPage(clnt));
      }

    });



  }

  loadClients(fnl: any): void {
    this.loadingData = true;
    this.clientService.all().subscribe((clients) => {
      this.clients = clients;
      this.loadingData = false;
      fnl();
    });
  }

  itemStyle(): void {
    $(function () {
      $('.close-btn').hover(function () {
        $(this).parents('.client-obj').addClass("client-obj-close-hover");
      },
        function () {
          $(this).parents('.client-obj').removeClass("client-obj-close-hover");
        });
    });

    $(function () {
      $('.edit-btn').hover(function () {
        $(this).parents('.client-obj').addClass("client-obj-edit-hover");
      },
        function () {
          $(this).parents('.client-obj').removeClass("client-obj-edit-hover");
        });
    });

    $(function () {
      $('.view-btn').hover(function () {
        $(this).parents('.client-obj').addClass("client-obj-view-hover");
      },
        function () {
          $(this).parents('.client-obj').removeClass("client-obj-view-hover");
        });
    });
  }

  loadPagination(data: Client[]) {
    this.pagination = new Pagination(data, 15, 1);
  }

  goToPage(p: number) {
    this.pagination?.goToPage(p);
  }

  nextPage() {
    console.log(1);
    this.goToPage((this.pagination?.currentPage ?? 0) + 1);
  }

  prevPage() {
    this.goToPage((this.pagination?.currentPage ?? 0) - 1);
  }

  showClientDetails(client: Client) {

    this.selectedClient = client;

    console.log(client);
    $('#modelId').modal('show');
  }

  deleteClient(client: Client) {
    this.clientService.delete(client).subscribe(() => {
      this.clients = this.clients.filter((c) => {
        return c.client_id != client.client_id;
      });
      let currPage = this.pagination?.currentPage ?? 1;
      this.loadPagination(this.clients);
      this.goToPage(currPage);
    });
  }

}
