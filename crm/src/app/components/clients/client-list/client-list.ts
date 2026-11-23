import { Component, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client-service';
import { Client } from '../../../models/client';

@Component({
  imports: [],
  selector: 'app-client-list',
  styleUrl: './client-list.css',
  templateUrl: './client-list.html',
})
export class ClientList {
  public clients = signal<Client[]>([]);

  constructor(private authService: AuthService, private router: Router, private clientService: ClientService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    clientService.loadClients().subscribe((data) => {
      this.clients.set(data);
    });
  }
}
