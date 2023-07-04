import { Model } from "objection";

export class BaseModel extends Model {
  updated_at!: string;
  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
