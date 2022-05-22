export default class UserInfo{
  constructor({titleSelector, aboutSelector, avatarSelector}){
    this._titleElement = document.querySelector(titleSelector);
    this._aboutElement = document.querySelector(aboutSelector); 
    this._avatarElement = document.querySelector(avatarSelector);         
  }   
  getUserInfo(){
    return {
      name : this._titleElement.textContent, 
      about : this._aboutElement.textContent,
    }
  } 
  setUserInfo({name, about}){
    this._titleElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.alt = name;
  }
  getAvatar(){
    return this._avatarElement.src 
  } 
  setAvatar(avatar){
    this._avatarElement.src = avatar;
  }  
}    