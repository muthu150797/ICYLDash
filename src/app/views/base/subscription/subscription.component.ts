import { Component, OnInit } from "@angular/core";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { DataService } from "../../../Service/data.service";
import { Observable } from "rxjs";
import { interval } from "rxjs";
import { takeWhile } from "rxjs/operators";
@Component({
  selector: "app-subscription",
  templateUrl: "./subscription.component.html",
  styleUrls: ["./subscription.component.scss"],
})
export class SubscriptionComponent implements OnInit {
  subscriptionList: any;
  first = 0;
  rows = 10;
  sub: any;
  selectedCategoryId=1;
  categoryList: any;
  constructor(
    private dataservice: DataService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.GetAllCategory();

    this.GetAllSubscription();
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
    return this.subscriptionList
      ? this.first === this.subscriptionList.length - this.rows
      : true;
  }
  isFirstPage(): boolean {
    return this.subscriptionList ? this.first === 0 : true;
  }
  //****************PrimeNG DataTable Pagination Method End*********************** */
  // ********************User To Remove User from User List*************************/
  GetAllSubscription() {
    this.dataservice.GetAllSubscription(this.selectedCategoryId).subscribe((res) => {
      if (res != null) {
        let subsList = res;
        subsList.forEach((subsList, i) => (subsList["sNo"] = i + 1));
        this.subscriptionList = subsList;
        console.log("subscription", this.subscriptionList);
      }
    });
  }
  remove(name: any, id: any) {
    if (confirm("Are you sure want to cancel subscription " + id + "?")) {
      this.dataservice.CancelSubscription(Number(id),this.selectedCategoryId).subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.ShowSuccess("Subscription deleted successfully and table will be loaded after 5 seconds");
          } else {
            this.ShowError(res.message);
          }
        },
        (err) => {
          this.ShowError("Server error,try again later");
        }
      );
      this.sub = interval(5000).subscribe((val) => {
        this.GetAllSubscription();
        this.sub.unsubscribe();
      });
    }
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
  GetAllCategory(){
    this.dataservice.GetAllCategory().subscribe((res)=>{
      let categoryData=res.donationList;
      var result = [];
      //Filtering data for  active status in category list
      categoryData.forEach((value)=>{
        if( value.active==true){
          result.push(value);
        };
      })
      this.selectedCategoryId=result[1].id;
      console.log("object",result)
      this.categoryList=result;
      console.log("All category from subscription pahe",this.categoryList);
    })
  }
}
