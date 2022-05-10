import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  notification:any;
  todayReport:any;
  countReport=0;
  constructor(private http:HttpClient) { }
  Login(email:any,password:any){
    let url=environment.baseUrl+'api/Account/Login'
   return this.http.post<any>(url,{
    "userName": email,
    "password": password,
    "userId": 0
   });
  }
  GetAllUsers() {
    let url=environment.baseUrl+'api/Account/GetAllUserDetails'
    return this.http.post<any>(url,null);
    }
 //Display notification panel
  SaveTodayReport(todayReport:any){
    this.countReport=todayReport.length;
  }
  GetSupportReq() {
    let url=environment.baseUrl+'api/Configuration/GetSupportReq'
    return this.http.post<any>(url,null)
  }
  GetAllTransaction(startDate:any,endDate:any,today:any){
    // let url=environment.baseUrl+'api/Payment/GetAllTransaction'
       let url=environment.baseUrl+'api/Payment/GetAllTransaction';
    return this.http.post<any>(url,{
      "StartDate":startDate,
      "EndDate":endDate,
       "TodayReport":today
    })
  }
  GetQuotes(){
    let url=environment.baseUrl+'api/Donations/GetQuotes'
    return this.http.post<any>(url,null)
  }
  SaveQoute(quoteId,quoteTitle){
    let url=environment.baseUrl+'api/Configuration/SaveQuotes'
    return this.http.post<any>(url,{
      "quotesId": quoteId,
      "quotesTitle": quoteTitle
    })
  }
  DeleteQuote(quoteId){
    let url=environment.baseUrl+'api/Configuration/DeleteQuotes'
    return this.http.post<any>(url,{
      "quotesId": quoteId,
      "quotesTitle": ""
    })
  }
  GetQuickDonation(){
    let url=environment.baseUrl+'api/Donations/GetDonationAmount'
    return this.http.post<any>(url,null)
  }
  SaveQuickDonation(id:any,amount:any){
    let url=environment.baseUrl+'api/Configuration/SaveQuickDonation'
    return this.http.post<any>(url,{
      "id": id,
      "amount":amount,
      "donationCategoryId": 0
    })
  }
  DeleteQucikAmount(id:any){
    console.log(id);
    let url=environment.baseUrl+'api/Configuration/DeleteQuickDonation'
    return this.http.post<any>(url,{
      "id": id,
      "amount": 0,
      "donationCategoryId": 0
    })
  }
  GetDonationCategory(){
    let url=environment.baseUrl+'api/Donations/GetDonations'
    return this.http.post<any>(url,null)
  }
  SaveDonationCategory(id: number, donationName: string, description: any) {
    let url=environment.baseUrl+'api/Configuration/SaveDonationType';
    return this.http.post<any>(url,{
      "id": id,
      "donationName": donationName,
      "description": description,
      "accountNumber": "",
      "message": ""
    });
  }
  DeleteDonationCategory(id:any){
    let url=environment.baseUrl+'api/Configuration/DeleteDonationType'
    return this.http.post<any>(url,{
      "id": id,
      "donationName": "",
      "description": "",
      "accountNumber": "",
    })
  }
  RequestPassword(emailId:any){
    alert(emailId)
    let url= 'https://localhost:7274/api/Account/ResetPassword';
    return this.http.post<any>(url,{
      "userName": emailId,
      "password": "",
      "userId": 0
    })
  }
  VerfiyOTP(newPassword:any,OTP:any){
    let url=environment.baseUrl+'api/Account/VerifyOTP'
    return this.http.post<any>(url,{
      "status": true,
      "message": "",
      "otp": OTP,
      "userId":Number(localStorage.getItem('userId')),
      "newPassword": newPassword
    })
  }
}
