import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export const saveAuthToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token);
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};
