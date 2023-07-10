import { FilledLinkToWebField, LinkField, LinkType } from '@prismicio/types';

export function isWebLink(field: LinkField): field is FilledLinkToWebField {
  return field?.link_type === LinkType['Web'];
}
