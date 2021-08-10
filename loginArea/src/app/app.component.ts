import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
              './app.component.normalize.css']
})
export class AppComponent {

  // Pseudo data base
  userData = 
  {   "user1" : {
          "name" : "ButchBet",
          "email" : "k.salazar@utp.edu.co",
          "pass" : "helloWorld"
      },

      "user2" : {
          "name" : "camiloRex",
          "email" : "ariasSoto.10@gmail.com",
          "pass" : "12345Hello"
      }
  };

  efectively = true;

  errorMessage = "";

  messageColor = "";

  loginStatus = "";

  createAccountStatus = "formHidden"

  // Method to hidde the login and show the regist form 
  hiddeLogin(event: Event) {
    event.preventDefault()
    
    this.loginStatus = "formHidden";

    this.createAccountStatus = "";
  }

  // Method to hidde the regist and show the login form 
  hiddeRegist(event: Event) {
    event.preventDefault()
    this.loginStatus = "";

    this.createAccountStatus = "formHidden";
  }

  // Method to prevent the reloading of the web page
  nothing(event: Event){
    event.preventDefault();
  }

  // Login event answer
  loginValidation(event: Event) {

    event.preventDefault()

    const form = <HTMLInputElement>event.target,

    main  = form.children[1],

    inputs = main.getElementsByTagName("input"),

    name = inputs[0].value,

    pass = inputs[1].value,

    counter = this.dataCheck(name, pass, 0);

    if(counter) {
      this.errorMessage = "Valid data";

      this.messageColor = "Success"
      setTimeout(() => {
          location.assign("//www.platzi.com");
      }, 2000);
  } else {
    this.errorMessage = "Incorrect data";

    this.messageColor = "Error"

    setTimeout(() => {
      this.errorMessage = "";

      this.messageColor = ""
    }, 1000)
   }
  }


  //Regist event answer
  RegistValidation(event: Event) {
    event.preventDefault();

    let form = <HTMLInputElement>event.target,

    main  = form.children[1],

    inputs = main.getElementsByTagName("input"),

    name = inputs[0].value,

    email = inputs[1].value,

    pass = inputs[2].value,

    repPass = inputs[3].value,

    counter = this.dataCheck(name, pass, 1, email, repPass);

    if(counter === 0) {
      this.errorMessage = "Valid data";

      this.messageColor = "Success";

      setTimeout(() => {
        location.assign("//www.facebook.com");
    }, 2000);

    return;
    } else if(counter === 1) {
      this.errorMessage = "The user name already exists";
    } else if(counter === 2) {
      this.errorMessage = "The email already exists";
    } else if(counter === 3) {
      this.errorMessage = "The user name and email already exist";
    } else if(counter === 4) {
      this.errorMessage = "The passwords dont match";
    } else if(counter === 5) {
      this.errorMessage = "The passwords don't match and the user name already exists";
    } else if(counter === 6) {
      this.errorMessage = "The passwords don't match and the email already exists";
    } else if(counter === 7) {
      this.errorMessage = "The passwords don't match, the user name and email already exist";
    } 

    this.messageColor = "Error";

    setTimeout(() => {
      this.errorMessage = "";
    }, 3000);
  }
  // Method to check the input data 
  dataCheck(name= "", pass = "", condition= 0, email = "", rep = "") {
    let cont = 0;

    if(condition === 0) {
      // Login form
      if(this.userData.user1.name === name && this.userData.user1.pass === pass) {
        return true;
      } else if(this.userData.user2.name === name && this.userData.user2.pass === pass) {
        return true;
      } else if(this.userData.user1.email === name && this.userData.user1.pass === pass) {
        return true;
      } else if(this.userData.user2.email === name && this.userData.user2.pass === pass) {
        return true;
      }
    } else {
      // Regist form
      if(this.userData.user1.email === email && this.userData.user1.name === name) {
        cont += 3;
      } else if(this.userData.user2.email === email && this.userData.user2.name === name) {
        cont += 3;
      } else if(this.userData.user1.email === email || this.userData.user2.email === email) {
        cont += 2;
      } else if(this.userData.user1.name === name || this.userData.user2.name === name) {
        cont += 1;
      }

      if(pass != rep) {
        cont += 4;
      }

      return cont;
    }

    return false;
  }

  // Method o rest the password 
  resetPass(event: Event) {
    event.preventDefault();

    location.assign("//platzi.com/password/reset/");
  }
}

