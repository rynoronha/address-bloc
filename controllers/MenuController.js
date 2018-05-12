const inquirer = require('inquirer');
const ContactController = require("./ContactController");

 module.exports = class MenuController {
   constructor(){
     this.mainMenuQuestions = [
       {
         type: "list",
          name: "mainMenuChoice",
          message: "Please choose from an option below: ",
          choices: [
            "Add new contact",
            "Get current date",
            "Exit"
          ]
       }
     ];
     this.book = new ContactController();
   }

   main(){
     console.log(`Welcome to AddressBloc!`);
     inquirer.prompt(this.mainMenuQuestions).then((response) => {
       switch(response.mainMenuChoice){
         case "Add new contact":
           this.addContact();
           break;
         case "Exit":
           this.exit();
         case "Get current date":
           this.getDate();
           break;
         default:
           console.log("Invalid input");
           this.main();
       }
     })
     .catch((err) => {
       console.log(err);
     });
   }

   clear(){
     console.log("\x1Bc");
   }

   addContact(){
     this.clear();
     inquirer.prompt(this.book.addContactQuestions).then((answers) => {
       this.book.addContact(answers.name, answers.phone).then((contact) => {
         console.log("Contact added successfully!");
         this.main();
       }).catch((err) => {
         console.log(err);
         this.main();
       });
     });

   }

   getDate(){
     this.clear();
     var today = new Date();
     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var day = today.getDate();
     var month = months[today.getMonth()];
     var year = today.getFullYear();
     console.log(month + "/" + day + "/" + year);
     this.main();
   }

   getContactCount(){
     return this.contacts.length;
   }

   exit(){
     console.log("Thanks for using AddressBloc!");
     process.exit();
   }

   remindMe(){
     return "Learning is a life-long pursuit";
   }

 }
