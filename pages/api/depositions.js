import { SiteClient } from 'datocms-client'

export default async function req(request, response) {
  if (request.method === "POST") {
    const TOKEN = process.env.API_KEY_FULL
    const MODEL_ID = process.env.DEPOSITIONS_MODEL_ID

    const client = new SiteClient(TOKEN);
    const record = await client.items.create({
      itemType: `${MODEL_ID}`,
      ...request.body,
    });
    response.json({
      return: "True",
      record: record,
    });
    return;
  }

  response.status(404).json({
    message: "Bad request =(",
  });
}
