import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DataService } from '../../../Service/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList: any;
  first = 0;
  rows = 10;
  showLoader=false;
  title: any;
  quoteValue = "";
  quoteId: any;
  value: number = 0;
  constructor(
    private primengConfig: PrimeNGConfig,
    private service: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // let interval = setInterval(() => {
    //   this.value = this.value + Math.floor(Math.random() * 10) + 1;
    //   if (this.value >= 100) {
    //     this.value = 100;
    //     this.messageService.add({
    //       severity: "info",
    //       summary: "Success",
    //       detail: "Process Completed",
    //     });
    //     clearInterval(interval);
    //   }
    // }, 2000);
    this.primengConfig.ripple = true;
    this.LoadAllUsers();
  }

  Popup: boolean;

  LoadAllUsers() {
    this.showLoader=true;
    this.service.GetAllUsers().subscribe((res) => {
      // if (res.status == true) {
         let users = res;
         users.forEach((users, i) => (users["sNo"] = i + 1));
         this.usersList = users;
      // }
      console.log("users",  this.usersList);
    });
    this.showLoader=false;
  }
  //****************PrimeNG DataTable Pagination method Start*********************** */
  //***************Reference: https://primefaces.org/primeng/showcase/#/table/page********** */
  next() {
    this.first = this.first + this.rows;
  }
  prev() {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.usersList
      ? this.first === this.usersList.length - this.rows
      : true;
  }
  isFirstPage(): boolean {
    return this.usersList ? this.first === 0 : true;
  }
  //****************PrimeNG DataTable Pagination Method End*********************** */
  // ********************User To Remove User from User List*************************/
  SaveQuote() {
    this.showLoader=true;
    this.service.SaveQoute(this.quoteId, this.quoteValue).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.ShowSuccess(res.message);
          //this.LoadQuotes();
          this.Popup = false;
        } else {
          this.ShowError(res.message);
        }
      },
      (err) => {
        this.ShowError("Server error,try again later");
      }
    );
    this.showLoader=false;
  }
  ShowError(message: any) {
    this.messageService.add({
      severity: "error",
      summary: message,
      detail: "API Key or URL is invalid.",
    });
  }
  ShowSuccess(message: any) {
    this.messageService.add({
      severity: "success",
      summary: message,
      detail: "",
    });
  }
  OpenDialog(title: any, quote: any) {
    this.quoteId = 0;
    this.quoteValue = "";
    this.title = title;
    if (quote != null) {
      this.quoteId = Number(quote.quotesId);
      this.quoteValue = quote.quotesTitle;
    }
    this.Popup = true;
  }
  remove(quoteId) {
    this.showLoader=true;
    if (confirm("Are you sure want to delete?")) {
      this.service.DeleteQuote(quoteId).subscribe(
        (res) => {
          if (res.statusCode === 200) {
            //this.LoadQuotes();
            this.Popup = false;
            this.ShowSuccess(res.message);
          } else {
            this.ShowError(res.message);
          }
        },
        (err) => {
          this.ShowError("Server error,try again later");
        }
      );
    }
    this.showLoader=false;
  }

}
