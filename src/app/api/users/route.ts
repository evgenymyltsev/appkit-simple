import { apiPost, apiGet } from "../database";
import { migrate } from "../migrations";

export async function POST(req: Request) {
  const body = await req.json();
  const { address } = body;
  migrate();

  const query = `
    INSERT INTO users (address)
    VALUES (?)
    ON CONFLICT DO NOTHING
  `;
  const values = [address];

  let status, respBody;
  await apiPost(query, values)
    .then(() => {
      status = 200;
      respBody = { message: "Successfully created user" };
    })
    .catch((err) => {
      status = 400;
      respBody = err;
    });
  return Response.json(respBody, {
    status,
  });
}

export async function GET() {
  const query = `
       SELECT * from users
     `;

  let status, body;
  try {
    await apiGet(query)
      .then((res) => {
        status = 200;
        body = res;
      })
      .catch((err: Error) => {
        status = 400;
        body = { error: err };
      });
    return Response.json(body, {
      status,
    });
  } catch (error: any) {
    console.error(error.message);
    return Response.json(
      { error: error },
      {
        status: 400,
      }
    );
  }
}
