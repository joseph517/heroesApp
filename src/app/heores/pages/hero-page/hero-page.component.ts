import { Component, OnInit } from '@angular/core';
import { HeoresService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {

  public hero?:Hero

  constructor(
    private heroesService: HeoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({id})=> this.heroesService.getHeroesByid(id))
      )
      .subscribe(hero=>{
        if(!hero) return this.router.navigate(['/heroes/list'])

      this.hero = hero
      return
      })
  }

  goBack():void{
    this.router.navigate(['/heroes/list'])
  }
}
