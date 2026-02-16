import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { JokeCard } from '../jokecard/jokecard';
import { JokeListingService } from '../../services/jokelisting/jokelisting.service';
import { JokeReaction } from '../../types/jokereaction.data';
import { JokeEditorService } from '../../services/jokeeditor/jokeeditor.service';
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
  jokes = signal<JokeSummary[]>([]);
  loadingMap = signal<Record<number, boolean>>({});

  ngOnInit() {
    this.jokeListingService.getLatestJokes().subscribe(j =>
      this.jokes.set(j)
    );
  }

  jokeReaction(jokeReaction: JokeReaction) {
    this.loadingMap.update(map => ({
      ...map,
      [jokeReaction.jokeId]: true
    }));

    this.jokeEditorService.updateJokeReaction(jokeReaction).pipe(
      finalize(() => {
        this.loadingMap.update(map => ({
          ...map,
          [jokeReaction.jokeId]: false
        }));
      })
    ).subscribe({
      next: updatedJoke => {
        if (updatedJoke) {
          this.jokes.update(list =>
            list.map(j =>
              j.jokeId === updatedJoke.jokeId ? updatedJoke : j
            )
          );
        }
      },
      error: err => {
      }
    });
  }
}
