const COMPANION = '/companion';
const ROOT = '/';
const SETTINGS = '/settings';

const ROUTES = {
  ROOT,
  COMPANION,
  CREATE_COMPANION: `${COMPANION}/new`,
  UPDATE_COMPANION: (id: string) => `${COMPANION}/${id}`,
  DELETE_COMPANION: (id: string) => `${COMPANION}/${id}`,
  SETTINGS,
};

export default ROUTES;
