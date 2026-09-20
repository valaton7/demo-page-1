import { buildBookingMailto } from '../lib/mailto';
import {
  calculatePrice,
  formatPrice,
  type BadrumOption,
  type KvmOption,
  type PriceSelection,
  type YesNo,
} from '../lib/pricing';

function getSelectValue<T extends string>(id: string, fallback: T): T {
  const el = document.getElementById(id) as HTMLSelectElement | null;
  return (el?.value as T) || fallback;
}

function getCalculatorSelection(): PriceSelection {
  return {
    kvm: getSelectValue<KvmOption>('calc-kvm', '1 - 45 kvm'),
    badrum: getSelectValue<BadrumOption>('calc-badrum', 'Ett badrum/WC'),
    sprojs: getSelectValue<YesNo>('calc-sprojs', 'Nej'),
    balkong: getSelectValue<YesNo>('calc-balkong', 'Nej'),
  };
}

function updateCalculatorPrice(): void {
  const total = calculatePrice(getCalculatorSelection());
  const display = document.getElementById('calc-total');
  if (display) {
    display.textContent = formatPrice(total);
  }
}

function initCalculator(): void {
  const ids = ['calc-kvm', 'calc-badrum', 'calc-sprojs', 'calc-balkong'];
  for (const id of ids) {
    document.getElementById(id)?.addEventListener('change', updateCalculatorPrice);
  }
  updateCalculatorPrice();
}

function initSlideshow(): void {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.slideshow-tab'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('.slideshow-panel'));
  let current = 0;

  function showSlide(index: number): void {
    current = (index + panels.length) % panels.length;
    tabs.forEach((tab, i) => tab.classList.toggle('active', i === current));
    panels.forEach((panel, i) => panel.classList.toggle('active', i === current));
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => showSlide(i)));
  document.getElementById('slide-prev')?.addEventListener('click', () => showSlide(current - 1));
  document.getElementById('slide-next')?.addEventListener('click', () => showSlide(current + 1));
}

function initReviewsCarousel(): void {
  const track = document.getElementById('review-track');
  const dots = Array.from(document.querySelectorAll<HTMLButtonElement>('.carousel-dot'));
  if (!track || dots.length === 0) return;

  let current = 0;

  function showReview(index: number): void {
    current = (index + dots.length) % dots.length;
    track!.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => showReview(i)));
  document.getElementById('review-prev')?.addEventListener('click', () => showReview(current - 1));
  document.getElementById('review-next')?.addEventListener('click', () => showReview(current + 1));
}

function initFaq(): void {
  document.querySelectorAll<HTMLButtonElement>('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      item?.classList.toggle('open');
    });
  });
}

function initBookingForm(): void {
  const form = document.getElementById('booking-form') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const href = buildBookingMailto({
      kvm: formData.get('kvm') as KvmOption,
      badrum: formData.get('badrum') as BadrumOption,
      sprojs: formData.get('sprojs') as YesNo,
      balkong: formData.get('balkong') as YesNo,
      datum: String(formData.get('datum') ?? ''),
      namn: String(formData.get('namn') ?? ''),
      epost: String(formData.get('epost') ?? ''),
      telefon: String(formData.get('telefon') ?? ''),
      adress: String(formData.get('adress') ?? ''),
      lagenhetsnummer: String(formData.get('lagenhetsnummer') ?? ''),
    });
    window.location.href = href;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initSlideshow();
  initReviewsCarousel();
  initFaq();
  initBookingForm();
});
