export function proMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (!req.user.isPro) {
    return res.status(403).json({
      message: "PRO subscription required",
    });
  }

  next();
}
