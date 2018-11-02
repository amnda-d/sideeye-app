// @flow
const getRequest = (route: string, body?: {}) =>
  new Promise<Object>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', route, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
        else reject(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  });

export default getRequest;
