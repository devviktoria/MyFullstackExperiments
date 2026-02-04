import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { JokeUpsertModel } from '../../interfaces/jokeupsertmodel.data';
import { FakeUserAuthService } from '../fakeuserauth/fakeuserauth.service';

@Injectable({
  providedIn: 'root',
})

export class JokeEditorService {
  fakeUserAuthService = inject(FakeUserAuthService);
  private jokeBaseUrl = 'http://localhost:5235/api/joke/';
  readonly upsertJokeUrl: string = 'upsert';
  private newJokeUrl = this.jokeBaseUrl + this.upsertJokeUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }
  //joke.text =joke.text.replace(/\\n/g, '\n'
  getNewJokeUpsertData(): Observable<JokeUpsertModel> {
    return this.http.get<JokeUpsertModel>(this.newJokeUrl, this.httpOptions)
      .pipe(map(j => ({
        ...j,
        userId: this.fakeUserAuthService.currentUser().id
      })),
        catchError(this.handleError<JokeUpsertModel>('GetNewJokeUpsertData', undefined))
      );
  }

  getJokeUpsertData(id: number): Observable<JokeUpsertModel | undefined> {
    return this.http.get<JokeUpsertModel>(`${this.jokeBaseUrl}${id}/${this.upsertJokeUrl}`, this.httpOptions)
      .pipe(map(j => ({
        ...j,
        text: j.text.replace(/\\n/g, '\n')
      })),
        catchError(this.handleError<JokeUpsertModel>('GetJokeUpsertData', undefined))
      );
  }

  createJoke(joke: JokeUpsertModel): Observable<void> {
    return this.http.post<void>(this.jokeBaseUrl, joke, this.httpOptions).pipe(
      catchError(this.handleError<void>('create joke'))
    );
  }

  updateJoke(joke: JokeUpsertModel): Observable<void> {
    let url: string = `${this.jokeBaseUrl}${joke.jokeId}`;
    return this.http.put<void>(url, joke, this.httpOptions).pipe(
      catchError(this.handleError<void>('update joke'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error during ${operation}`, error);
      //return of(result as T);
      return throwError(() => new Error(`Server error during ${operation}.`));
    };
  }
}
