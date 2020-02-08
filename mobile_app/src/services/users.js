const fakeData = () => {
  return {
    // fake here
  };
};

export default UserService = {
  getFakeUser: () => fakeData(),
  // other methods go here
  SignIn: async (username, password) => {
    // const packages = await fetch
  },
  getFriends: () => {},
  addFriends: () => {},
  updateAddress: (addressId, newAddress) => {},
  addNewAddress: (newAddress) => {},
  updateLocationSchedule,
  updateSettings: (settingName, newSetting) => {}
};
