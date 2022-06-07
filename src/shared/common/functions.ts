import { app } from "src/main";

export async function getAppUrl() {
  return `${await app.getUrl()}/`;
}
