import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { JokeCard } from '../jokecard/jokecard';
import { JokeListingService } from '../../services/jokelisting/jokelisting.service';

@Component({
  selector: 'app-jokelist',
  imports: [AsyncPipe, JokeCard],
  templateUrl: './jokelist.html',
  styleUrl: './jokelist.scss',
})
export class Jokelist {
  private jokeListingService = inject(JokeListingService);
  jokes$ = this.jokeListingService.getLatestJokes();

}
