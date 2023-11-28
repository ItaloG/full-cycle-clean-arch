import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const productAInput: InputCreateProductDto = {
  name: "Product",
  price: 10,
  type: "a",
};

const productBInput: InputCreateProductDto = {
  name: "Product",
  price: 10,
  type: "b",
};

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test create product use case", () => {
  it("should create a product of type A", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(productAInput);

    expect(output).toEqual({
      id: output.id,
      name: output.name,
      price: output.price,
    });
  });

  it("should create a product of type B", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(productBInput);

    expect(output).toEqual({
      id: output.id,
      name: output.name,
      price: output.price,
    });
  });
});
