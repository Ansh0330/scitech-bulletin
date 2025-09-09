import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  // token leke aao
  // token ko check kro
  // token se data nikal lo

  try {
    console.log(req.cookies);
    let token = req.cookies?.token;
    console.log("Token found ", token ? "YES" : "NO");
    if (!token) {
      console.log("No token");
      return res.status(401).json({
        success: false,
        message: "Authentication Failed",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Data : ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth middleware failure");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied , Only Admins are allowed to add a new section",
      });
    }
    next();
  } catch (error) {
    console.log("Auth middleware failure");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
