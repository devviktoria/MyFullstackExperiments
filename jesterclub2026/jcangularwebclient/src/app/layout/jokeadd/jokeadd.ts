import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FakeUserAuthService } from '../../services/fakeuserauth/fakeuserauth.service';

@Component({
  selector: 'app-layout-joke-add',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './jokeadd.html',
  styleUrl: './jokeadd.scss',
})
export class JokeAdd {
  private fakeUserAuthService = inject(FakeUserAuthService);
  userIsSignedIn = computed(() => this.fakeUserAuthService.isUserSignedIn());;
}
