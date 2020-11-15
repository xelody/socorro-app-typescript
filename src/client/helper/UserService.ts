import HttpClient, {GeneralResponse} from './HttpClient';
import {DiveEntry} from '../../types/DiveEntry';

interface UserDiveEntiesData {
  dives?: DiveEntry[];
}

export default class UserService extends HttpClient {
  public constructor() {
    super('/users');
  }

  public async getDiveEntiresForUser(
    userId: string,
  ): Promise<GeneralResponse<UserDiveEntiesData>> {
    return this.get(`/${userId}/entries`);
  }

  public async createEntriesForUser(
    userId: string,
    diveEntry: DiveEntry,
  ): Promise<GeneralResponse<any>> {
    return this.post(`/${userId}/entries`, diveEntry);
  }
}
