// Change only after every P0 provisional register row has written approval.
export const LAUNCH = { dataVerified: false, approvedDomain: 'galdino.co.id' };
export function canIndex(site: URL | undefined) {
 return LAUNCH.dataVerified && import.meta.env.PUBLIC_INDEXING_ENABLED === 'true'
  && site?.protocol === 'https:' && site.hostname === LAUNCH.approvedDomain;
}