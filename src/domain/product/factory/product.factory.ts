import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import { randomUUID } from "node:crypto";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(randomUUID(), name, price);

      case "b":
        return new ProductB(randomUUID(), name, price);

      default:
        throw new Error("Product type not supported");
    }
  }
}
