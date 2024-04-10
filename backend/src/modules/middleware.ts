const jwt = require("jsonwebtoken");

// function to check if the token has expired or not
export function requireAuthDirective(resolve, source, args, context, info) {
  const requiresAuth = info.fieldNodes[0].directives.some(
    (d) => d.name.value === "requireAuth"
  );

  if (requiresAuth) {
    const token = context.req.headers.authorization;

    if (!token) {
      throw new Error("Unauthorized: Token not provided");
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("Unauthorized: Invalid token");
      }

      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Unauthorized: Token has expired");
      }

      context.req.user = decoded;
    });
  }

  // Call the original resolver function
  return resolve();
}
