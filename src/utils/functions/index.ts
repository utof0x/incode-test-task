export const getExpiration = () => {
  return Date.parse(
    new Date(new Date().setDate(new Date().getDate() + 30)).toString()
  ).toString();
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const getRefreshTokenExpiration = (): string | null => {
  return localStorage.getItem("refreshTokenExpiration");
};

export const getIsRefreshTokenExpired = (): boolean => {
  const refreshToken = getRefreshToken();
  const refreshTokenExpiration = getRefreshTokenExpiration();
  const currentDateTimestamp = Date.now();
  const refreshTokenExpired =
    currentDateTimestamp > Number(refreshTokenExpiration);

  if (refreshToken && refreshTokenExpiration && refreshTokenExpired) {
    return true;
  }

  return false;
};
