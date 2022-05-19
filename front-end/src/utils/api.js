import axios from 'axios';

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

export async function signupUser(user, signal) {
  const url = `${API_BASE_URL}/register`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ data: user }),
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function createPost(post, signal) {
  const url = `${API_BASE_URL}/posts`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ data: post }),
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function handleReaction(
  post_id,
  user_id,
  signal,
  reaction,
  method
) {
  const url = `${API_BASE_URL}/reactions/${user_id}/${reaction}s`;
  const options = {
    method,
    body: JSON.stringify({ data: { post_id } }),
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function readPostReaction(user_id, post_id, signal) {
  const url = `${API_BASE_URL}/reactions/${user_id}/post/${post_id}`;
  const options = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetchJson(url, options, []);
}

export async function getPostReactionTotal(post_id, signal) {
  const url = `${API_BASE_URL}/reactions/${post_id}/total`;
  const options = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function readUserProfile(user_id, signal) {
  const url = `${API_BASE_URL}/profiles/${user_id}`;
  const options = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetchJson(url, options, '');
}

export async function createComment(comment, signal) {
  const url = `${API_BASE_URL}/comments`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ data: comment }),
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function destroyComment(comment_id, signal) {
  console.log(comment_id);
  const url = `${API_BASE_URL}/comments`;
  const options = {
    method: 'DELETE',
    body: JSON.stringify({ data: { comment_id } }),
    headers,
    signal,
  };
  console.log(options);
  return await fetchJson(url, options, {});
}

export async function readProfile(user_id, signal) {
  const url = `${API_BASE_URL}/profiles/${user_id}`;
  const options = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function readProfileStats(user_id, signal) {
  const url = `${API_BASE_URL}/profiles/${user_id}/stats`;
  const options = {
    method: 'GET',
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}

export async function searchData(type, search, signal) {
  const url = `${API_BASE_URL}/search/${type}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ data: { search } }),
    headers,
    signal,
  };
  return await fetchJson(url, options, []);
}

export async function postAvatar(avatar, user_id) {
  const url = `${API_BASE_URL}/images/avatar/${user_id}`;
  console.log(avatar, user_id, url);
  const formData = new FormData();
  formData.append('avatar', avatar);
  return await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
