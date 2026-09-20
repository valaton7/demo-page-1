import { describe, expect, it } from 'vitest';
import { buildBookingMailto, type BookingFormData } from './mailto';

const sampleData: BookingFormData = {
  kvm: '46 - 55 kvm',
  badrum: 'Två badrum/WC',
  sprojs: 'Ja',
  balkong: 'Nej',
  datum: '2026-10-15',
  namn: 'Anna Andersson',
  epost: 'anna@example.com',
  telefon: '0701234567',
  adress: 'Storgatan 1, Sundsvall',
  lagenhetsnummer: '1203',
};

describe('buildBookingMailto', () => {
  it('targets the business email address', () => {
    const href = buildBookingMailto(sampleData);
    expect(href.startsWith('mailto:norrlandsg@tuta.com?')).toBe(true);
  });

  it('includes a Swedish subject line', () => {
    const href = buildBookingMailto(sampleData);
    expect(href).toContain('subject=');
    expect(decodeURIComponent(href)).toContain('Bokningsförfrågan');
  });

  it('includes all form fields in the body', () => {
    const url = new URL(buildBookingMailto(sampleData));
    const body = url.searchParams.get('body') ?? '';
    expect(body).toContain('Anna Andersson');
    expect(body).toContain('anna@example.com');
    expect(body).toContain('0701234567');
    expect(body).toContain('Storgatan 1, Sundsvall');
    expect(body).toContain('1203');
    expect(body).toContain('46 - 55 kvm');
    expect(body).toContain('Två badrum/WC');
    expect(body).toContain('2026-10-15');
  });
});
