const GetRequest = (route, body) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', route, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) resolve(xhr.responseText);
        else reject(xhr.responseText);
      }
    };
    xhr.send();
  });

export default GetRequest;
