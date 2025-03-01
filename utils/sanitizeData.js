exports.sanitizeUser = function (user) {
  return {
    _id: user._id,
    fullName: user.fullName,
    Phone: user.Phone,
    Email: user.Email,
    role: user.role,
  };
};

exports.sanitizeUsers = function (users) {
  return users.map((user) => ({
    _id: user._id,
    fullName: user.fullName,
    Phone: user.Phone,
    Email: user.Email,
  }));
};

exports.sanitizeDriver = function (driver) {
  return {
    _id: driver._id,
    fullName: driver.fullName,
    Phone: driver.Phone,
    Email: driver.Email,
    profileImg: driver.profileImg,
    ratingsAverage: driver.ratingsAverage,
    availableOrder: driver.availableOrder,
    wallet: driver.wallet,
    ratingsQuantity: driver.ratingsQuantity,
  };
};

exports.sanitizeDrivers = function (drivers) {
  return drivers.map((driver) => ({
    _id: driver._id,
    fullName: driver.fullName,
    Phone: driver.Phone,
    Email: driver.Email,
    profileImg: driver.profileImg,
  }));
};
