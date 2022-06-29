import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DataService } from '../../../Service/data.service';

@Component({
  selector: 'app-donation-category',
  templateUrl: './donation-category.component.html',
  styleUrls: ['./donation-category.component.scss']
})
export class DonationCategoryComponent implements OnInit {

  first = 0;
  rows = 10;
  title: any;
  donationList: any;
  id: number;
  amount: number;
  showLoader=false;
  enableDonationName=true;
  donationName:string;
  category: string;
  description: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    private service: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.LoadDonationCategory();
  }

  Popup: boolean;
  LoadDonationCategory() {
    this.showLoader=true;
    this.service.GetDonationCategory().subscribe((res) => {
      if (res.status == true) {
        let donation = res.donationList;
        donation.forEach((donation, i) => (donation["sNo"] = i + 1));
        this.donationList = donation;
      }
      console.log("donationCategory", this.donationList);
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
    return this.donationList
      ? this.first === this.donationList.length - this.rows
      : true;
  }
  isFirstPage(): boolean {
    return this.donationList ? this.first === 0 : true;
  }
  //****************PrimeNG DataTable Pagination Method End*********************** */
  // ********************User To Remove User from User List*************************/
  SaveDonationCategory() {
    this.showLoader=true;
    this.service.SaveDonationCategory(this.id, this.donationName,this.description).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.LoadDonationCategory();
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
  OpenDialog(title: any, donation: any) {
    this.id = 0;
    this.donationName = "";
    this.description = "";
    this.title = title;
    this.enableDonationName=false;
    if (donation != null) {
      this.enableDonationName=true;
      this.id = Number(donation.id);
      this.donationName = donation.donationName;
      this.description = donation.description;
    }
    this.Popup = true;
  }
  remove(category: any) {
    this.showLoader=true;
    if (confirm("Are you sure want to block/Unblock?")) {
      this.service.BlockOrUnblockCategory(Number(category.id),category.active).subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.LoadDonationCategory();
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
  changeColor(value){
    return value?'green' : 'red' // please adapt to your need
}
}
