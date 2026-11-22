import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-client-list',
  styleUrl: './client-list.css',
  templateUrl: './client-list.html',
})
export class ClientList {
  constructor(private authService: AuthService, private router: Router) {
    if (!authService.isLoggedIn()) {
      router.navigate(['login']);
    }
  }
}
