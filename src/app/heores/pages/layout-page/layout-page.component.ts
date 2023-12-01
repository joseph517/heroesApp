import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  public sidebarItems = [
    {
      label: 'Listado',
       icon: 'label',
       url: './list'
    },
    {
      label: 'Agregar',
      icon: 'add',
      url: './new-hero'
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search'
    }
  ]

  get userEmail(): User | undefined{
    return this.authService.currentUser
  }

  onLogOut(){
    this.authService.logOut()
    this.router.navigate(['/auth/login'])
  }

}
