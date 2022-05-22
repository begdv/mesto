export default class UserInfo{
  constructor({titleSelector, descriptionSelector, avatarSelector}){
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector); 
    this._avatarElement = document.querySelector(avatarSelector);         
  }   
  getUserInfo(){
    return {
      name : this._titleElement.textContent, 
      about : this._descriptionElement.textContent,
    }
  } 
  setUserInfo({name, about}){
    this._titleElement.textContent = name;
    this._descriptionElement.textContent = about;
    this._avatarElement.alt = name;
  }
  getAvatar(){
    return this._avatarElement.src 
  } 
  setAvatar(avatar){
    this._avatarElement.src = avatar;
  }  
}    