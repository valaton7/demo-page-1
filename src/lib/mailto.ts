import { site } from '../data/site';
import type { BadrumOption, KvmOption, YesNo } from './pricing';

export interface BookingFormData {
  kvm: KvmOption;
  badrum: BadrumOption;
  sprojs: YesNo;
  balkong: YesNo;
  datum: string;
  namn: string;
  epost: string;
  telefon: string;
  adress: string;
  lagenhetsnummer: string;
}

export function buildBookingMailto(data: BookingFormData): string {
  const subject = 'Bokningsförfrågan – flyttstädning';
  const body = [
    'Ny bokningsförfrågan via hemsidan',
    '',
    `Namn: ${data.namn}`,
    `E-post: ${data.epost}`,
    `Telefon: ${data.telefon || '(ej angivet)'}`,
    `Adress: ${data.adress}`,
    `Lägenhetsnummer: ${data.lagenhetsnummer || '(ej angivet)'}`,
    `Önskat datum: ${data.datum}`,
    '',
    'Prisuppgifter:',
    `Kvadratmeter: ${data.kvm}`,
    `Badrum/WC: ${data.badrum}`,
    `Spröjs eller 4-sidiga fönster: ${data.sprojs}`,
    `Inglasad balkong eller altan: ${data.balkong}`,
  ].join('\n');

  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${site.email}?${params.toString()}`;
}
