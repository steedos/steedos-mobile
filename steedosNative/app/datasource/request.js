import { getUserId, getAuthToken } from '../utils';
import { fetch } from "whatwg-fetch";

export async function request(url, options = { method: "GET", compress: false }) {
    let authToken = await getAuthToken();
    let userId = await getUserId();
    let authHeaders = {
        'X-Auth-Token': authToken,
        'X-User-Id': userId
    };
    options.headers = { ...options.headers, ...authHeaders};

    console.log('request url', url);
    console.log('request options', JSON.stringify(options));

    const response = await fetch(url, options);
    if (response.ok){
        return await response.json()
    }
    throw new Error(JSON.stringify(await response.json()));
}