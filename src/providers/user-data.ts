import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string,userID:string,url:string,loginName:string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setUserID(userID)
    this.setAvatar(url)
    this.setLoginName(loginName);
    this.events.publish('user:login');
  };

  signup(username: string,userID?:string,url?:string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setUserID(userID)
    this.setAvatar(url)
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('userId');
    this.storage.remove('avatarUrl');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };
  setUserID(userId: string): void {
    this.storage.set('userId', userId);
  };
  setLoginName(loginName: string): void {
    this.storage.set('loginName', loginName);
  };
  setAvatar(url: string): void {
    this.storage.set('avatarUrl', url);
  };
  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };
  getLoginName(): Promise<string> {
    return this.storage.get('loginName').then((value) => {
      return value;
    });
  };
  getUserID(): Promise<string> {
    return this.storage.get('userId').then((value) => {
      return value;
    });
  };
  getAvatar(): Promise<string> {
    return this.storage.get('avatarUrl').then((value) => {
      return value;
    });
  };
  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
