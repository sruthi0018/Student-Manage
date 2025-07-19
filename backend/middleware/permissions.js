// middleware/permissions.js
const checkPermission = (action) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (req.user.role === 'superadmin') return next();

    console.log(req.user.role,"req.user.role")

    const permission = req.user.permissions?.student?.[action];
    console.log(permission,'permission')
    if (permission) return next();

    return res.status(403).json({ message: `Permission denied for ${action}` });
  };
};

module.exports = checkPermission;
