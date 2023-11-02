import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeoresService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit{

  constructor(
    private heroesService: HeoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
    ){}

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl('')

  })

  public publishers = [
    {id:'DC Comics', desc: 'DC - Comics'},
    {id:'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero
    return hero
  }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return

    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.heroesService.getHeroesByid(id)),
      ).subscribe( hero =>{
        if(!hero) return this.router.navigateByUrl('/')

        this.heroForm.reset(hero)

        return

      } )

  }

  onSubmit():void{
    if (this.heroForm.invalid) return

    if (this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero=>{
          this.showSnackbar(`${hero.superhero} update`)

        })

        return
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero=>{
        this.router.navigate(['heroes/edit', hero.id])
        this.showSnackbar(`${hero.superhero} created`)


      })
  }

  showSnackbar(mesaje:string):void{
    this.snackBar.open(mesaje, 'done',{
      duration: 2500
    })
  }

}
