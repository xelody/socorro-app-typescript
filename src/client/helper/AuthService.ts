import HttpClient, {GeneralResponse} from './HttpClient';

export default class AuthService extends HttpClient {
  public constructor() {
    super('/auth');
  }

  public checkAuth(): Promise<GeneralResponse<any>> {
    return this.get('/check');
  }

  public signin(
    username: string,
    password: string,
  ): Promise<GeneralResponse<any>> {
    return this.post('/login', {
      username,
      password,
    });
  }

  public signout(): Promise<GeneralResponse<any>> {
    return this.get('/check');
  }
}
