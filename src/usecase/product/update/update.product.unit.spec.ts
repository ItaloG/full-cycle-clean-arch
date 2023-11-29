import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  update: jest.fn(),
  findAll: jest.fn(),
});

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "updated product",
      price: 100,
    };

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should not update if product does not exists", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "updated product",
      price: 100,
    };

    await expect(() => productUpdateUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });

  it("should not update a invalid product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "updated product",
      price: -100,
    };

    await expect(() => productUpdateUseCase.execute(input)).rejects.toThrow("product: price must be greater than 0");
  });
});
