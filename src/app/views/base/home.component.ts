import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user';
import { UserService } from '../../Service/user.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userList: User[] = [];
    first = 0;
    rows = 10;
    constructor(private userService: UserService) {}
    ngOnInit(): void {
        // Get Users from UserService
        this.userList = this.userService.getUsers();
        console.log("userlist",this.userList)
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
        return this.userList ? this.first === (this.userList.length - this.rows) : true;
    }
    isFirstPage(): boolean {
        return this.userList ? this.first === 0 : true;
    }
    //****************PrimeNG DataTable Pagination Method End*********************** */
    // ********************User To Remove User from User List*************************/
    remove(id: number) {
        this.userService.removeUser(id);
        this.userList = this.userService.getUsers();
    }

}
