import { API_URL, client } from "./api";

export async function listTokens() {
    try {
      let res = await client.get(`${API_URL}/tokens/list`);
      console.log(res)
      let data = res.data.data;
      return data;
    } catch (err) {
      console.log(err);
    }
}

export async function addToken(address) {
  try {
    await client.post(`${API_URL}/tokens/add`, {
      address : address
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteToken(address) {
  try {
    await client.post(`${API_URL}/tokens/del`, {
      address : address
    });
  } catch (err) {
    console.log(err);
  }
}




