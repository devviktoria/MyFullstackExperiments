import { Component, effect, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, Router } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { JokeEditorService } from '../../services/jokeeditor/jokeeditor.service';
import { JokeUpsertModel } from '../../interfaces/jokeupsertmodel.data';

export enum FormMode { New, Modify };

@Component({
  selector: 'app-jokeform',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatIconModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './jokeform.html',
  styleUrl: './jokeform.scss',
})

export class Jokeform {
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  jokeEditorService = inject(JokeEditorService);

  //jokeUpsertModel$!: Observable<JokeUpsertModel | undefined>;
  joke: Signal<JokeUpsertModel | undefined>;

  jokeForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(10)]),
    source: new FormControl('', Validators.minLength(5)),
    tags: new FormControl([] as string[], [Validators.required, Validators.minLength(1), Validators.maxLength(5)])
  });

  private _formMode: FormMode = FormMode.New;
  private _snackBar = inject(MatSnackBar);

  constructor() {
    if (this.route.snapshot.params['id'] !== undefined) {
      this._formMode = FormMode.Modify;
      let jokeId = parseInt(this.route.snapshot.params['id'], 10);
      console.log("modify " + jokeId);
      this.joke = toSignal(this.jokeEditorService.getJokeUpsertData(jokeId));
    } else {
      this.joke = toSignal(this.jokeEditorService.getNewJokeUpsertData());
    }

    effect(
      () => {
        if (this.joke()) {
          this.jokeForm.patchValue(this.joke()!);
        }
      }
    )
  }

  removeTag(tag: string) {
    tag = tag.trim().toLowerCase();
    if (this.joke()) {
      const index = this.joke()!.tags.indexOf(tag);
      if (index < 0) {
        return this.joke()!.tags
      }
      this.joke()!.tags.splice(index, 1);
      this.jokeForm.controls.tags.setValue([...this.joke()!.tags]);
      return [...this.joke()!.tags];
    }

    return [] as string[];
  }

  addTag(event: MatChipInputEvent): void {
    const tag = (event.value || '').trim().toLowerCase();

    if (this.joke()) {
      const index = this.joke()!.tags.indexOf(tag);
      if (index < 0) {
        this.joke()!.tags = [...this.joke()!.tags, tag];
      }

      this.jokeForm.controls.tags.setValue([...this.joke()!.tags]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  submit(saveMode: 'draft' | 'publish') {
    if (!this.jokeForm.valid) {
      return;
    }

    if (this.joke()) {
      this.joke()!.text = this.jokeForm.controls.text.value ?? '';
      this.joke()!.source = this.jokeForm.controls.source.value ?? '';
      this.joke()!.createdDate = new Date();

      if (saveMode === 'publish') {
        this.joke()!.releasedDate = new Date();
      }

      if (this._formMode === FormMode.New) {
        this.jokeEditorService.createJoke(this.joke()!).subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: () => {
            this._snackBar.open("Server error during joke creation.", "", {
              duration: 3000
            });
          }
        });
      } else {
        this.jokeEditorService.updateJoke(this.joke()!).subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: () => {
            this._snackBar.open("Server error during joke creation.", "", {
              duration: 3000
            });
          }
        });
      }
    }
  }
}
