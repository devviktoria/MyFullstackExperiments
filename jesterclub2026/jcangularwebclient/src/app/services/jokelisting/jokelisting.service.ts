import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { JokeSummary } from '../../interfaces/jokesummary.data';

@Injectable({
  providedIn: 'root',
})

export class JokeListingService {
  private jokeBaseUrl = 'http://localhost:5235/api/joke/';
  private latestJokesUrl = this.jokeBaseUrl + 'GetLatestJokes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getLatestJokes(): Observable<JokeSummary[]> {
    return this.http.get<JokeSummary[]>(this.latestJokesUrl, this.httpOptions)
      .pipe(
        map(jokes =>
          jokes.map(j => ({
            ...j,
            text: j.text.replace(/\\n/g, '\n')
          }))
        ),
        catchError(this.handleError<JokeSummary[]>('GetLatestJokes', []))
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
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
