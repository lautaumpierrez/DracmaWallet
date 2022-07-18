import env from '../../.env';

export const getFetch =
  (baseUrl: string, apiKey: string) =>
  (
    input: `/${string}`,
    init: RequestInit,
    searchParams: string[][],
  ): Promise<Response> => {
    const url = new URL(`${baseUrl}${input}`);
    searchParams.map(param => url.searchParams.append(param[0], param[1]));
    url.searchParams.append('apikey', apiKey);
    return fetch(url.toString(), init);
  };
