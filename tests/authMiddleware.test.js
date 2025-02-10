const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

describe("Auth Middleware", () => {
  it("should return 401 if no token is provided", () => {
    const req = { header: jest.fn().mockReturnValue(null) };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token, authorization denied" });
  });

  it("should proceed if token is valid", () => {
    const mockUser = { id: "12345" };
    const token = jwt.sign(mockUser, "your-jwt-secret");

    const req = { header: jest.fn().mockReturnValue(`Bearer ${token}`) };
    const res = {};
    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });
});
