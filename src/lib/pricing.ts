export type KvmOption =
  | '1 - 45 kvm'
  | '46 - 55 kvm'
  | '56 - 65 kvm'
  | '66 - 75 kvm'
  | '76 - 85 kvm'
  | '86 - 95 kvm'
  | '96 - 105 kvm'
  | '106 - 115 kvm'
  | '116 - 125 kvm'
  | '125+ kvm';

export type BadrumOption =
  | 'Ett badrum/WC'
  | 'Två badrum/WC'
  | 'Tre badrum/WC'
  | 'Fyra badrum/WC';

export type YesNo = 'Ja' | 'Nej';

export interface PriceSelection {
  kvm: KvmOption;
  badrum: BadrumOption;
  sprojs: YesNo;
  balkong: YesNo;
}

const KVM_PRICES: Record<KvmOption, number> = {
  '1 - 45 kvm': 1595,
  '46 - 55 kvm': 1795,
  '56 - 65 kvm': 1995,
  '66 - 75 kvm': 2295,
  '76 - 85 kvm': 2495,
  '86 - 95 kvm': 2795,
  '96 - 105 kvm': 2995,
  '106 - 115 kvm': 3295,
  '116 - 125 kvm': 3495,
  '125+ kvm': 5000,
};

const BADRUM_PRICES: Record<BadrumOption, number> = {
  'Ett badrum/WC': 0,
  'Två badrum/WC': 350,
  'Tre badrum/WC': 700,
  'Fyra badrum/WC': 1050,
};

const YES_NO_PRICES: Record<YesNo, number> = {
  Ja: 500,
  Nej: 0,
};

export function calculatePrice(selection: PriceSelection): number {
  return (
    KVM_PRICES[selection.kvm] +
    BADRUM_PRICES[selection.badrum] +
    YES_NO_PRICES[selection.sprojs] +
    YES_NO_PRICES[selection.balkong]
  );
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('sv-SE').replace(/\u00a0/g, ' ')} kr`;
}

export const KVM_OPTIONS = Object.keys(KVM_PRICES) as KvmOption[];
export const BADRUM_OPTIONS = Object.keys(BADRUM_PRICES) as BadrumOption[];
export const YES_NO_OPTIONS: YesNo[] = ['Ja', 'Nej'];
