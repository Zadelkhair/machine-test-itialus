import Client from 'src/app/moduls/client/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: Client = new Client();
  id: number = -1;
  invalid: any = {};
  loading: Boolean = false;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    if (id != "create") {
      this.id = parseInt(id);
      this.clientService.byid(id).subscribe((client) => {
        this.client = client;
      });
    }

  }

  submit() {

    this.invalid = {};

    if (!this.client.first_name) {
      if (!this.invalid.first_name)
        this.invalid.first_name = [];

      this.invalid.first_name.push('full name is required');
    }

    if (!this.client.last_name) {
      if (!this.invalid.last_name)
        this.invalid.last_name = [];

      this.invalid.last_name.push('last name is required');
    }

    if (!this.client.company_name) {
      if (!this.invalid.company_name)
        this.invalid.company_name = [];

      this.invalid.company_name.push('company is required');
    }

    if (!this.client.state) {
      if (!this.invalid.state)
        this.invalid.state = [];

      this.invalid.state.push('state is required');
    }

    if (!this.client.city) {
      if (!this.invalid.city)
        this.invalid.city = [];

      this.invalid.city.push('city is required');
    }

    if (!this.client.date_added) {
      if (!this.invalid.date_added)
        this.invalid.date_added = [];

      this.invalid.date_added.push('date is required');
    }

    if (!this.client.street_address) {
      if (!this.invalid.street_address)
        this.invalid.street_address = [];

      this.invalid.street_address.push('street address is required');
    }

    if (!this.client.contact_email) {
      if (!this.invalid.contact_email)
        this.invalid.contact_email = [];

      this.invalid.contact_email.push('contact email is required');
    }

    // if (Object.keys(this.invalid).length != 0) {
    //   return;
    // }

    if (this.client.client_id) {
      this.loading = true;
      this.clientService.update(this.client).subscribe((client) => {
        this.loading = false;

        console.log(client);

        console.log('updated');
        this.router.navigate(['clients'], { queryParams: { updated_client: this.client.client_id } });
      }, (error) => {
        this.loading = false;

        console.log([...error.error.message.split(',')]);

        this.invalid.server = [];
        this.invalid.server = error.error.message.split(',');
      });
    }
    else {
      this.loading = true;

      this.clientService.create(this.client).subscribe((client) => {
        this.loading = false;

        console.log('created');
        this.router.navigate(['clients'], { queryParams: { created_client: client.client_id } });
      }, (error) => {
        this.loading = false;

        this.invalid.server = [];
        this.invalid.server = error.error.message.split(',');
      });
    }
  }

}
