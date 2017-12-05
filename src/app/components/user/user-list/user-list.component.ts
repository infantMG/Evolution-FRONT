import {Component, OnInit} from '@angular/core';
import {Page} from "../../../model/page";
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/rest/user.service";
import {userDefaultPageableSize} from "../../../common/const";


declare var NProgress: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  pageUser: Page<User> = new Page<User>();
  currentPage = 0;
  isNext = true;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    NProgress.start();
    this.userService
      .findAllPageable(0, userDefaultPageableSize)
      .subscribe(data => {
        this.pageUser = data;
        this.currentPage = 0;
        console.log(data);
        NProgress.done();
      });
  }

  public nextPage() {
    NProgress.start();
    this.currentPage = this.currentPage + 1;
    this.userService
      .findAllPageable(this.currentPage, userDefaultPageableSize)
      .subscribe(data => {
        console.log(data);
        if (data.content.length < userDefaultPageableSize) {
          this.isNext = false;
        }
        for (const a of data.content) {
          this.pageUser.content.push(a);
        }
        this.pageUser.totalElement = data.totalElement;
        NProgress.done();
      });
  }

  public sortById(): void {

  }

}