import { getAccess, refreshAccess } from '~/helperFunctions';

export default function ({ store }) {
  getAccess(store);
  setInterval(() => {
    refreshAccess(store);
  }, 3540000);
}
