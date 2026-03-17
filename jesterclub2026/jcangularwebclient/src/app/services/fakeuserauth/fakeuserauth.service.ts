import { Injectable, signal } from '@angular/core';
import { UserSummary } from '../../interfaces/usersummary.data'

@Injectable({
  providedIn: 'root',
})
export class FakeUserAuthService {

  protected userSummaryList: UserSummary[] = [
    { userId: 0, userName: "No one" },
    { userId: 1, userName: "Viki" },
    { userId: 2, userName: "Charles" },
    { userId: 3, userName: "Emily" },
    { userId: 4, userName: "Jack" },
  ]

  currentUser = signal<UserSummary>(this.userSummaryList[0]);

  isUserSignedIn() {
    return this.currentUser().userId !== 0;
  }

  getAllUsers(): UserSummary[] {
    return this.userSummaryList;
  }

  setUser(userId: number) {
    this.currentUser.set(this.userSummaryList.find(user => user.userId === userId) ?? this.userSummaryList[0]);
    console.log("Current user id:" + this.currentUser().userId);
  }
}
