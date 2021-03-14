import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserAuthenticationService } from './user-authentication.service';

describe('UserAuthenticationService', () => {
  let service: UserAuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(UserAuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check whether login', () => {
    expect(service.checkLogin()).toBe(false);
  });

  it('should login', (done: DoneFn) => {
    const userInfo = {
      username: 'username',
      passwd: '11111'
    };
    service.login(userInfo.username, userInfo.passwd).subscribe(
      token => {
        expect(token).toBe('1234');
        done();
      }
    );
    const req = httpTestingController.expectOne('api/authtoken');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(userInfo);
    req.flush({access_token: '1234'});
  });
});
