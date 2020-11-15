const headers = new Headers({
  'Content-Type': 'application/json',
  Authorization: 'basic',
});

export interface GeneralResponse<T> {
  success?: boolean;
  data?: T;
}

export default abstract class HttpClient {
  protected readonly baseURL: string;

  public constructor(apiDomain: string) {
    this.baseURL = `${process.env.REACT_APP_API_BASE}${apiDomain}`;
  }

  protected async get(path: string, data?: any) {
    try {
      const response = await fetch(`${this.baseURL}${path}`, {
        method: 'GET',
        credentials: 'include',
        body: JSON.stringify(data),
        headers,
      });
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  protected async post(path: string, data?: any) {
    try {
      const response = await fetch(`${this.baseURL}${path}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers,
      });
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  protected async put(path: string, data?: any) {
    try {
      const response = await fetch(`${this.baseURL}${path}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data),
        headers,
      });
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  protected async delete(path: string, data?: any) {
    try {
      const response = await fetch(`${this.baseURL}${path}`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(data),
        headers,
      });
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  }
}
