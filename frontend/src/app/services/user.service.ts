import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'selectedUserId';
  private readonly DEFAULT_USER = 'userA';
  
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser$: Observable<string>;

  constructor() {
    const storedUser = localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_USER;
    this.currentUserSubject = new BehaviorSubject<string>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  getCurrentUser(): string {
    return this.currentUserSubject.value;
  }

  setCurrentUser(userId: string): void {
    localStorage.setItem(this.STORAGE_KEY, userId);
    this.currentUserSubject.next(userId);
  }

  getAvailableUsers(): string[] {
    return ['userA', 'userB', 'userC'];
  }
}
