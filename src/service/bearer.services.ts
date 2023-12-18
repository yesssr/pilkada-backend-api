import { Bearers } from "../model/bearers";

export class BearerService {
  static getAllBeares = () => {
    return Bearers.query().select("id", "name", "codename", "logo");
  };
}
