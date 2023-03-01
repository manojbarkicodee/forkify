const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

let getjson = async function (API_URL) {
  try {
    let res = await Promise.race([fetch(`${API_URL}/`), timeout(10)]);
    let data = await res.json();
    console.log(res);
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    throw err;
  }
};

let sendjson = async function (API_URL, payload) {
  try {
    let res = await Promise.race([
      fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
      timeout(10),
    ]);
    let data = await res.json();
    console.log(res);
    if (!res.ok) throw new Error(data.message);

    return data.data.recipe;
  } catch (err) {
    throw err;
  }
};

export { getjson, sendjson };
