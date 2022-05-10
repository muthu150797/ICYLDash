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
  constructor( private primengConfig: PrimeNGConfig,
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
      console.log(res);
     })
  }
  OpenDialog(title: any) {
    this.title = title;
    this.Popup = true;
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
}
