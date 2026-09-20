import { describe, expect, it } from 'vitest';
import { calculatePrice, formatPrice, type PriceSelection } from './pricing';

describe('calculatePrice', () => {
  it('sums base kvm price with no add-ons', () => {
    const selection: PriceSelection = {
      kvm: '1 - 45 kvm',
      badrum: 'Ett badrum/WC',
      sprojs: 'Nej',
      balkong: 'Nej',
    };
    expect(calculatePrice(selection)).toBe(1595);
  });

  it('adds badrum surcharge for two bathrooms', () => {
    const selection: PriceSelection = {
      kvm: '1 - 45 kvm',
      badrum: 'Två badrum/WC',
      sprojs: 'Nej',
      balkong: 'Nej',
    };
    expect(calculatePrice(selection)).toBe(1945);
  });

  it('adds spröjs and balkong surcharges', () => {
    const selection: PriceSelection = {
      kvm: '66 - 75 kvm',
      badrum: 'Tre badrum/WC',
      sprojs: 'Ja',
      balkong: 'Ja',
    };
    expect(calculatePrice(selection)).toBe(2295 + 700 + 500 + 500);
  });

  it('uses top kvm tier for 125+ kvm', () => {
    const selection: PriceSelection = {
      kvm: '125+ kvm',
      badrum: 'Fyra badrum/WC',
      sprojs: 'Ja',
      balkong: 'Ja',
    };
    expect(calculatePrice(selection)).toBe(5000 + 1050 + 500 + 500);
  });
});

describe('formatPrice', () => {
  it('formats SEK with Swedish locale grouping', () => {
    expect(formatPrice(3295)).toBe('3 295 kr');
  });
});
