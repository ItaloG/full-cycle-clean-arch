import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new OrderItem("", "Item 1", 100, "p1", 2);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new OrderItem("123", "", 100, "p1", 2);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less or equal zero", () => {
    expect(() => {
      new OrderItem("i1", "Item 1", 0, "p1", 2);
    }).toThrowError("Price must be greater than 0");
  });

  it("should throw error when productId is empty", () => {
    expect(() => {
      new OrderItem("123", "Item 1", 100, "", 2);
    }).toThrowError("ProductId is required");
  });

  it("should throw error when quantity is less or equal zero", () => {
    expect(() => {
      const item1 = new OrderItem("i1", "Item 1", 100, "p1", 0);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);

    const total = item.orderItemTotal();

    expect(total).toBe(200);
  });
});
