def calculator(operation: str, a: float, b: float) -> float:
    """
    Performs basic mathematical calculations.

    Args:
        operation: add, subtract, multiply, or divide
        a: first number
        b: second number
    """

    if operation == "add":
        return a + b

    if operation == "subtract":
        return a - b

    if operation == "multiply":
        return a * b

    if operation == "divide":
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

    raise ValueError(f"Unsupported operation: {operation}")