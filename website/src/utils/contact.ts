export type ContactPayload = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
  locale: 'id' | 'en';
  website: string;
};

const text = (value: FormDataEntryValue | null, max: number) =>
  String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

export function parseContactPayload(form: FormData): ContactPayload {
  return {
    name: text(form.get('name'), 100),
    email: text(form.get('email'), 160).toLowerCase(),
    whatsapp: text(form.get('whatsapp'), 24),
    company: text(form.get('company'), 140),
    service: text(form.get('service'), 160),
    message: String(form.get('message') ?? '').replace(/\r\n/g, '\n').trim().slice(0, 3000),
    consent: form.get('consent') === 'true',
    locale: form.get('locale') === 'en' ? 'en' : 'id',
    website: text(form.get('website'), 200),
  };
}

export function validateContact(payload: ContactPayload) {
  const errors: string[] = [];
  if (payload.name.length < 2) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(payload.email)) errors.push('email');
  if (!/^[+\d][\d\s()-]{7,23}$/.test(payload.whatsapp)) errors.push('whatsapp');
  if (payload.company.length < 2) errors.push('company');
  if (payload.service.length < 2) errors.push('service');
  if (payload.message.length < 20) errors.push('message');
  if (!payload.consent) errors.push('consent');
  return errors;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] || character);
}
