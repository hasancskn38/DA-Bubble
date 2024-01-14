import { Injectable } from '@angular/core';
import { Auth, EmailAuthProvider, getAuth, reauthenticateWithCredential } from '@angular/fire/auth';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root',
})



export class UserDataService {
  currentUser:object = {};
  usersFromDatabase = [];
  
  guestUser:boolean ;

  private userData: { name: string, email: string, password: string } = { name: '', email: '', password: '' };

  constructor(
    private auth: Auth,
    private sharedService: SharedService,
    ) { 
    sharedService.headerContentReady = false ;
    this.currentUser = this.getFromLocalStorage('currentUser');
  }
  
  setUserData(data: { name: string, email: string, password: string }) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

  /**
   * storage user in localStorage
   * 
   * @param userName {string} - name to storage
   * @param userMail {string} - email to storage
   */
  saveCurrentUserLocalStorage(userName:string,userMail:string,profileImgNr:string) {
    let object = {name : userName, mail:userMail, imgNr : profileImgNr}
    const objectString = JSON.stringify(object);
    localStorage.setItem('currentUser',objectString);
    this.currentUser = object;
    this.guestUser = userName === 'Gast' ;
    this.sharedService.currentUserName = this.currentUser['name'] ;
  }

  /**
   * clear current user key in local storage
   * 
   */
  clearCurrentUserLocalStorage(){
    localStorage.removeItem('currentUser');
  }

  /**
   * save stuff in the local storage
   * 
   * @param key(string) key for the localStorage
   * @param object what you want to storage
   */
  saveToLocalStorage(key, object) {
    const objectString = JSON.stringify(object);
    localStorage.setItem(key,objectString);
  }

  /**
   * load stuff from the localStorage with the correct key
   * 
   * @param key(string) to load from the right part
   * @returns object from the given key
   */
  getFromLocalStorage(key){
    const storedObjectString = localStorage.getItem(key);
    const storedObjectAsJSON = JSON.parse(storedObjectString);
    this.sharedService.headerContentReady = true ;
    return storedObjectAsJSON;
  }

  /**
   * get the current User from authentication
   * 
   * @returns name and mail from the current logged user or nothing if no user is logged in
   */
  getCurrentUser() {
    const user = this.auth.currentUser;
    if (user) {
      let currentUserEmail = user.email;
      let currentUserName = user.displayName;
      return { name : currentUserName, mail :currentUserEmail};
    } else {
      // No user is signed in.
      return {};
    }

  }

  /**
   * reauthentication with password if session is over 
   * 
   * @param password(string) password from user
   * @returns true or false , in dependency of success
   */
  reAuthenticate(password: string): boolean {
    let reAuthenticateSuccess = false;
    const auth = getAuth();

    const emailAuthProvider = EmailAuthProvider.credential(this.auth.currentUser.email, password);
    reauthenticateWithCredential(this.auth.currentUser, emailAuthProvider).then(() => {
      reAuthenticateSuccess = true;
    }).catch((error) => {
      reAuthenticateSuccess = false;
    });
    return reAuthenticateSuccess;
  }
}