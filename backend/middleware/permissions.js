const checkPermission = (action) => {
  return (req, res, next) => {
    if (req.user.role === 'superadmin') return next();

    const permission = req.user.permissions?.student?.[action];
    if (permission) return next();

    return res.status(403).json({ message: `Permission denied for ${action}` });
  };
};

module.exports = checkPermission;
