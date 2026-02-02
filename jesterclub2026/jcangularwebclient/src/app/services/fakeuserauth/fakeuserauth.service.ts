import { Injectable, signal } from '@angular/core';
import { UserSummary } from '../../interfaces/usersummary.data'

@Injectable({
  providedIn: 'root',
})
export class FakeUserAuthService {

  protected userSummaryList: UserSummary[] = [
    { id: 0, name: "No one" },
    { id: 1, name: "Viki" },
    { id: 2, name: "Charles" },
  ]

  currentUser = signal<UserSummary>(this.userSummaryList[0]);

  isUserSignedIn() {
    return this.currentUser().id !== 0;
  }

  getAllUsers(): UserSummary[] {
    return this.userSummaryList;
  }

  setUser(userId: number) {
    this.currentUser.set(this.userSummaryList.find(user => user.id === userId) ?? this.userSummaryList[0]);
    console.log("Current user id:" + this.currentUser().id);
  }
}
