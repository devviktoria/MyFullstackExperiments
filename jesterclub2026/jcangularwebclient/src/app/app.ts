import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { FakeUserAuthService } from './services/fakeuserauth/fakeuserauth.service';
import { UserWelcome } from './layout/userwelcome/userwelcome';
import { JokeAdd } from './layout/jokeadd/jokeadd';
import { A11yModule } from "@angular/cdk/a11y";


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, MatButtonModule, MatSelectModule, MatFormFieldModule, MatToolbarModule, MatIconModule, MatMenuModule, UserWelcome, JokeAdd, A11yModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Jester Club 2026');
  private fakeUserAuthService = inject(FakeUserAuthService);
  userSummaryList = this.fakeUserAuthService.getAllUsers();
  currentUserId = this.fakeUserAuthService.currentUser().id;
  constructor() {
  }

  onUserChange(userId: number) {
    this.fakeUserAuthService.setUser(userId);
  }

  onThemeSelect(theme: 'light dark' | 'light' | 'dark') {
    const body = document.body;
    console.log(getComputedStyle(body).colorScheme);
    body.style.colorScheme = theme;
  }
}
