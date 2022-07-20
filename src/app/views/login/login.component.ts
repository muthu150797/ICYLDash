import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from "../../Service/data.service";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  providers:[MessageService]
})
export class LoginComponent {
  title="";
  Popup=false;
  Popup2=false;
   OTP='';
   userId=0;
  recoverEmailId="";
  isLoading=false;
  loginForm = new FormGroup({
    email: new FormControl(
      "admin@icyl.com",
      Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ])
    ),
    password: new FormControl("admin123", Validators.required),
  });
  alertsDismiss: any = [];
  newPassword: string;
  constructor(
     private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router,
     private service: DataService) {}
  ngOnInit(){
    this.primengConfig.ripple = true;
    if(localStorage.getItem('userId')!=null)
    return this.router.navigate(['dashboard'])
  }
  RequestPassword(){

     this.service.RequestPassword(this.recoverEmailId).subscribe((res)=>{
      console.log("reset password",res);
      if(res.status){
        this.userId=res.userId;
        this.ShowSuccess(res.message);
        this.OpenDialog2("Verify OTP");
        return this.router.navigate([''])

      }
      else this.ShowError(res.message);

     })
  }
  VerifyOTP(){
   this.service.VerfiyOTP(this.newPassword,this.OTP,this.userId).subscribe((res)=>{
    console.log("verify res",res)
    if(res.status){
      this.ShowSuccess(res.message);
      this.OpenDialog2("Verify OTP");
    }
    else this.ShowError(res.message);

    this.Popup2=false;
   })
  }
  OpenDialog2(title: any) {
    this.newPassword='';
    this.recoverEmailId='';
    this.title = title;
    this.Popup2 = true;
    this.Popup = false;

  }
  OpenDialog(title: any) {
    this.recoverEmailId='';
    this.newPassword='';
    this.title = title;
    this.Popup = true;
    this.Popup2=false;
  }

  Login() {
    this.isLoading=true;
    this.service
      .Login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (res) => {
          console.log("login res", res);
          if (res.role === "admin" && res.statusCode == 200) {
            localStorage.setItem("userId", res.userId);
            this.router.navigate(["dashboard"]);
          } else {
           this.ShowError("Please check your username password")
          }
        },
        (err) => {
          console.log("error", err);
        }
      );
      this.isLoading=false;
  }
  ShowError(message:any) {
    this.messageService.add({
      severity: "error",
      summary: message,
      detail: "",
    });
  }
  ShowSuccess(message:any) {
    this.messageService.add({
      severity: "success",
      summary: message,
      detail: "",
    });
  }
}
