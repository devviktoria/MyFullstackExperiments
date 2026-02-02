import { Component, inject, computed } from '@angular/core';
import { FakeUserAuthService } from '../../services/fakeuserauth/fakeuserauth.service';

@Component({
  selector: 'app-layout-userwelcome',
  imports: [],
  templateUrl: './userwelcome.html',
  styleUrl: './userwelcome.scss',
})
export class UserWelcome {
  private fakeUserAuthService = inject(FakeUserAuthService);
  userIsSignedIn = computed(() => this.fakeUserAuthService.isUserSignedIn());;
  user = this.fakeUserAuthService.currentUser;

  constructor() { }


}
