import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAuthenticationService } from './user-authentication.service';
import { environment } from '../../../environments/environment'

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

  it('should login', (done: DoneFn) => {
    const userInfo = {
      username: 'username',
      passwd: '11111'
    };
    service.login(userInfo.username, userInfo.passwd).subscribe(
      () => {
        expect(localStorage.getItem('jwt')).toBe('1234');
        done();
      }
    );
    const req = httpTestingController.expectOne(`${environment.baseUrl}/api/authtoken`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(userInfo);
    req.flush({accessToken: '1234'});
  });
});
