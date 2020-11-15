import HttpClient, {GeneralResponse} from './HttpClient';
import {DiveEntry} from '../../types/DiveEntry';

interface SingleEntryEntity {
  dive: DiveEntry;
}

export default class DiveEntriesService extends HttpClient {
  public constructor() {
    super('/entries');
  }

  public async getEntry(
    entryId: string,
  ): Promise<GeneralResponse<SingleEntryEntity>> {
    return await this.get(`/${entryId}`);
  }

  public async editEntry(
    entryId: string,
    entry: DiveEntry,
  ): Promise<GeneralResponse<SingleEntryEntity>> {
    return this.post(`/${entryId}`, entry);
  }

  public async deleteEntry(entryId: string): Promise<GeneralResponse<any>> {
    return await this.delete(`/${entryId}`);
  }
}
