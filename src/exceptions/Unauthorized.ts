export class Unauthorized extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "Unauthorized";
  }
}
