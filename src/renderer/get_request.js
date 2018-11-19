// @flow
import axios from 'axios';
import * as adapter from 'axios/lib/adapters/http';

// const getRequest = (route: string, body?: {}) =>
//   new Promise<Object>((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', route, true);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
//         else reject(JSON.parse(xhr.responseText));
//       }
//     };
//     xhr.send();
//   });

export const getRequest = async (path: string): Promise<any> => {
  const options = {
    adapter,
  };
  const response = await axios.get(path, options);
  return response ? response.data : null;
};

export const postRequest = async (path: string, data: any): Promise<any> => {
  const response = await axios.post(path, data, { adapter });
  return response ? response.data : null;
};
