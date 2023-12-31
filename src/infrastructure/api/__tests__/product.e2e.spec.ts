import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Pencil",
      price: 10,
      type: "a",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Pencil");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Pencil",
      price: -10,
      type: "a",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response1 = await request(app).post("/product").send({
      name: "Pencil",
      price: 10,
      type: "a",
    });

    expect(response1.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      name: "Notebook",
      price: 20,
      type: "a",
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("Pencil");
    expect(product1.price).toBe(10);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Notebook");
    expect(product2.price).toBe(20);
  });
});
