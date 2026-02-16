import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { JokeCard } from '../jokecard/jokecard';
import { JokeListingService } from '../../services/jokelisting/jokelisting.service';
import { JokeReaction } from '../../types/jokereaction.data';
import { JokeEditorService } from '../../services/jokeeditor/jokeeditor.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { JokeSummary } from '../../interfaces/jokesummary.data';

@Component({
  selector: 'app-jokelist',
  imports: [JokeCard],
  templateUrl: './jokelist.html',
  styleUrl: './jokelist.scss',
})
export class Jokelist implements OnInit {
  private jokeListingService = inject(JokeListingService);
  private jokeEditorService = inject(JokeEditorService);
  //jokes$ = this.jokeListingService.getLatestJokes();
  //jokes = toSignal(this.jokeListingService.getLatestJokes());
  jokes = signal<JokeSummary[]>([]);

  ngOnInit() {
    this.jokeListingService.getLatestJokes().subscribe(j =>
      this.jokes.set(j)
    );
  }

  jokeReaction(jokeReaction: JokeReaction) {
    this.jokeEditorService.updateJokeReaction(jokeReaction).subscribe(
      updatedJoke => {
        if (updatedJoke) {
          this.jokes.update(list =>
            list.map(j => j.jokeId === updatedJoke!.jokeId ? updatedJoke : j)
          );
        }
      }
    );

  }

}
