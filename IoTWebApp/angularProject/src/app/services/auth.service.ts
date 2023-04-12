import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loggedin: boolean = false;

  constructor() { }

  ChangeStatus(change: boolean): any {
    this.loggedin = change;
  } 

  isLoggedIn(): boolean {
    return this.loggedin;
  } 
}
