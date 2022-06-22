import { Component, OnInit } from "@angular/core";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { DataService } from "../../../Service/data.service";

@Component({
  selector: "app-quick-donation",
  templateUrl: "./quick-donation.component.html",
  styleUrls: ["./quick-donation.component.scss"],
})
export class QuickDonationComponent implements OnInit {
  first = 0;
  rows = 10;
  title: any;
  amountList: any;
  id: number;
  amount: number;
  showLoader=false;
  constructor(
    private primengConfig: PrimeNGConfig,
    private service: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    //this.LoadQuotes();
    this.LoadQuickDonation();
  }

  Popup: boolean;
  LoadQuickDonation() {
    this.showLoader=true;
    this.service.GetQuickDonation().subscribe((res) => {
      if (res.status == true) {
        let donation = res.amountList;
        donation.forEach((donation, i) => (donation["sNo"] = i + 1));
        this.amountList = donation;
      }
      console.log("DonationAmountList", this.amountList);
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
    return this.amountList
      ? this.first === this.amountList.length - this.rows
      : true;
  }
  isFirstPage(): boolean {
    return this.amountList ? this.first === 0 : true;
  }
  //****************PrimeNG DataTable Pagination Method End*********************** */
  // ********************User To Remove User from User List*************************/
  SaveQuickDonation() {
    this.showLoader=true;
    this.service.SaveQuickDonation(this.id, this.amount).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.LoadQuickDonation();
          this.ShowSuccess(res.message);
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
  ShowError(message:any) {
    this.messageService.add({
      severity: "error",
      summary: message,
      detail: "API Key or URL is invalid.",
    });
  }
  ShowSuccess(message:any) {

    this.messageService.add({
      severity: "success",
      summary: message,
      detail: "",
    });
  }
  OpenDialog(title: any, quote: any) {
    this.id = 0;
    this.amount = 0;
    this.title = title;
    if (quote != null) {
      this.id = Number(quote.id);
      this.amount = Number(quote.amount);
    }
    this.Popup = true;
  }
  remove(id: any,amount:any) {
    this.showLoader=true;
    if (confirm("Are you sure want to delete the amount "+amount+"?")) {
      this.service.DeleteQucikAmount(Number(id)).subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.LoadQuickDonation();
            this.ShowSuccess(res.message);
            this.Popup = false;
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
