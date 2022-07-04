import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../Service/data.service";
import { navItems } from "../../_nav";
import { MessageService, PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  providers: [MessageService],
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  notificationCount: any;
  year = new Date().getFullYear();
  servive2: DataService;
  supportReq: any;
  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private service: DataService,
    private messageService: MessageService
  ) {
    this.servive2 = this.service;
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit(): void {
    this.LoadSupportReq();
    this.primengConfig.ripple = true;
  }
  Logout() {
    localStorage.removeItem("userId");
    this.router.navigate([""]);
  }
  GetNotification() {
    this.notificationCount = this.service.countReport;
    this.ShowInfo(
      "Today you've received " + this.notificationCount + " donation"
    );
  }
  LoadSupportReq() {
    this.service.GetSupportReq().subscribe((res) => {
      this.supportReq = res;
      console.log(res);
    });
  }
  ShowInfo(message: any) {
    this.messageService.add({
      severity: "info",
      summary: message,
      detail: "",
    });
  }
  SendEmail(report) {
    console.log("Send Email", report);
    this.service.ReplyToUser(report).subscribe((res)=>{
      console.log("response from server for send mail",res);
      if(res.statusCode==200)
      this.ShowInfo("Email has been sent to "+report.userName);
      else
      this.ShowInfo("Failed to Email, try again")
    })
  }
}
