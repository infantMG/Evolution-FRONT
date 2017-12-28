import {HttpClient, HttpHeaders, HttpResponse, HttpResponseBase} from '@angular/common/http';
import {User} from '../../model/user.model';
import {findAllUser, serverUrl, userRest} from '../../common/rest-url';
import {Observable} from 'rxjs/Observable';
import {Page} from '../../model/page';
import {UserForSaveDto} from '../../model/user-for-save.dto';
import {Injectable} from '@angular/core';
import {DataTransfer} from "../data-transfer.service";
import {UserDto} from "../../dto/user.dto";
import {UserUpdateDto} from "../../dto/user-update.dto";
import {UserCreateDto} from "../../dto/user-create.dto";

@Injectable()
export class UserDataService {

  private usersRest: string = serverUrl + 'user';

  constructor(private httpClient: HttpClient,
              private transfer: DataTransfer) {
  }

  public findOne(id: number): Observable<UserDto> {
    return this.httpClient
      .get<UserDto>(this.usersRest + '/' + id);
  }

  public findOneLazy(id: number): Observable<UserDto> {
    return this.httpClient
      .get<UserDto>(this.usersRest + '/' + id + '/lazy', {observe: 'response'})
      .map(response => {
        console.log(response);
        return response.body;
      });
  }

  public findAllList(): Observable<Array<UserDto>> {
    return this.httpClient
      .get<Array<UserDto>>(this.usersRest + '/list');
  }

  public findAllPage(): Observable<Page<User>> {
    return this.httpClient
      .get(this.usersRest)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }

  public postUser(user: UserCreateDto): Observable<UserDto> {
    return this.httpClient
      .post<UserDto>(this.usersRest + '/post', user, {observe: 'response'})
      .map(response => {
        if (response.status === 201) {
          return response.body;
        }
      });
  }

  public putUser(user: UserUpdateDto): Observable<UserDto> {
    return this.httpClient
      .put<UserDto>(this.usersRest, user);
  }

  public exist(username: string): Observable<boolean> {
    return this.httpClient
      .get(userRest + '/exist?username=' + username, {observe: 'response'})
      .map(response => {
        if (response.status === 204) {
          return false;
        } else if (response.status === 200) {
          return true;
        }
      })
  }

  public findAllPageable(page: number, size: number): Observable<Page<User>> {
    return this.httpClient
      .get(findAllUser + '?page=' + page + '&size=' + size)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }

  public createNewUser(user: UserForSaveDto): Observable<number> {
    return this.httpClient
      .post(userRest + '/post', user.values, {observe: 'response'})
      .map(response => {
        if (response.status === 201) {
          return 1;
        }
      },
      error => {
        if (error.status === 417) {
          return 3;
        } else if (error.status === 500) {
          return 4;
        }
      });
  }

}
