export const getAddressAndCoordinatesRedisKeys = (id: string) => {
  const addressKey = `${id}_address`;
  const coordinatesKey = `${id}_coordinates`;

  return { addressKey, coordinatesKey };
};
