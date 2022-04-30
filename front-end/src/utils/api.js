let API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
export async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);
    if (response.status === 204) {
      return null;
    }
    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 *
 * @param {paramaters for .get} params
 * @param {AbortController.signal} signal
 * @returns posts in []
 */
export async function listPosts(params, signal) {
  const url = new URL(`${API_BASE_URL}/posts`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, []);
}

export async function readPost(post_id, signal) {
  const url = `${API_BASE_URL}/posts/${post_id}`;
  const options = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function readComments(post_id, signal) {
  const url = `${API_BASE_URL}/posts/${post_id}/comments`;
  const options = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetchJson(url, options, []);
}

export async function createLogin(login, signal) {
  const url = `${API_BASE_URL}/login`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ data: login }),
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function signup(user, signal) {
  const url = `${API_BASE_URL}/signup`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ data: user }),
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}
