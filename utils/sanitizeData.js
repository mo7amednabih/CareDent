exports.sanitizeUser = function (user) {
  return {
    _id: user._id,
    fullName: user.fullName,
    Phone: user.Phone,
    Email: user.Email,
    role: user.role,
    healthRecord: user.healthRecord,
    profileImg: user.profileImg,
  };
};

exports.sanitizeUsers = function (users) {
  return users.map((user) => ({
    _id: user._id,
    fullName: user.fullName,
    Phone: user.Phone,
    Email: user.Email,
    role: user.role,
    healthRecord: user.healthRecord,
    profileImg: user.profileImg,
  }));
};
