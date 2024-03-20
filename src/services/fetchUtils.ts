/**
 * Utility Method to create options for a fetch call
 * @param method GET, POST, PUT, DELETE
 * @param body  The request body (only relevant for POST and PUT)
 * @returns
 */
export function makeOptions(method: string, body: object | null, addToken?: boolean): RequestInit {
  const opts: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  if (addToken) {
    //@ts-expect-error //ts is not able to see that the token is not null
    opts.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  return opts;
}
export async function handleHttpErrors(res: Response) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const msg = errorResponse.message ? errorResponse.message : "No details provided";
    throw new Error(msg);
  }
  if (res.status === 204) {
    return {};
  }

  return res.json();
}
