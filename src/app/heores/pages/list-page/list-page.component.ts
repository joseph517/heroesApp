import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeoresService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  constructor(
    private heroesService: HeoresService
  ){}

  public heroes: Hero[] = []

  ngOnInit(){
    this.heroesService.getHeroes()
      .subscribe(
        heores => this.heroes = heores
      )
  }

}
