const fakeData = () => {
  return {
    // fake here 
  }
}

export default PackageService = {
  getFakeData: () => fakeData(),
  // other methods go here
  getUserPacakges: async (userId) => {
    // const packages = await fetch
  },
  updatePackageStatus: (packgeId, userId, newStatus) => null,
  getPackageById: (packageId) => null,
  // getPackageByQRCode: () => null,
}