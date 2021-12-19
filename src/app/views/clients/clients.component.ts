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
  filterd_clients: Client[] = [];
  pagination?: Pagination<Client>;
  loadingData: Boolean = false;
  selectedClient?: Client;
  created_client?: number;
  updated_client?: number;
  serachInput?: string;
  sortBy?: string;
  orederDesc:number = 1;

  constructor(public clientService: ClientService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.forEach((v) => {
      if (v['created_client']) {
        this.created_client = v['created_client'];
      }

      if (v['updated_client']) {
        this.updated_client = v['updated_client'];
      }
    })

    //load categories
    this.loadClients(() => {
      //some itemStyle
      this.loadPagination(this.clients);
      this.itemStyle();

      if (this.created_client) {
        let clnt = this.clients.find((v) => {
          return v.client_id == this.created_client;
        });
        console.log(clnt);
        if (clnt)
          this.pagination?.goToItemPage(clnt);
      }

      if (this.updated_client) {
        let clnt = this.clients.find((v) => {
          return v.client_id == this.updated_client;
        });
        console.log(clnt);
        if (clnt)
          this.pagination?.goToItemPage(clnt);
      }

      setTimeout(() => {
        this.created_client = -1;
        this.updated_client = -1;
      }, 5000);

    });

  }

  loadClients(fnl: any): void {
    this.loadingData = true;
    this.clientService.all().subscribe((clients) => {
      this.clients = clients;
      this.filterd_clients = this.clients;
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
    this.itemStyle();
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

  onSearchChanged() {

    let result = this.clients.filter((c) => {
      return c.first_name.toLowerCase().indexOf(this.serachInput?.toLowerCase()??'') != -1 ||
        c.last_name.toLowerCase().indexOf(this.serachInput?.toLowerCase()??'') != -1;
    });

    if (this.serachInput?.length == 0)
      result = this.clients;

    this.filterd_clients = result;

    this.loadPagination(result);

  }

  onSortByChanged() {

    let order = [0,0];

    if(this.orederDesc===1){
      order = [1,-1];
    }
    else if(this.orederDesc===2){
      order = [-1,1];
    }

    let result: Client[] = [];

    if (this.sortBy == 'first_name') {
      result = this.clients.sort((c1, c2) => {
        return c1['first_name'] > c2['first_name'] ? order[0] :
          c1['first_name'] < c2['first_name'] ? order[1] : 0;
      })
    }
    else if (this.sortBy == 'last_name') {
      result = this.clients.sort((c1, c2) => {
        return c1['last_name'] > c2['last_name'] ? order[0] :
        c1['last_name'] < c2['last_name'] ? order[1] : 0;
      })
    }
    else if (this.sortBy == 'city') {
      result = this.clients.sort((c1, c2) => {
        return c1['city'] > c2['city'] ? order[0] :
        c1['city'] < c2['city'] ? order[1] : 0;
      })
    }
    else if (this.sortBy == 'state') {
      result = this.clients.sort((c1, c2) => {
        return c1['state'] > c2['state'] ? order[0] :
        c1['state'] < c2['state'] ? order[1] : 0;
      })
    }
    else if (this.sortBy == 'date_added') {
      result = this.clients.sort((c1, c2) => {
        return c1['date_added'] > c2['date_added'] ? order[0] :
        c1['date_added'] < c2['date_added'] ? order[1] : 0;
      })
    }
    else{
      result = this.clients;
    }

    this.loadPagination(result);

  }

  changeOrder(){
    this.orederDesc++;
    this.orederDesc = this.orederDesc%3;

    this.onFilterChanged();
  }

  onFilterChanged(){
    this.onSortByChanged();
    this.onSearchChanged();
  }

}
