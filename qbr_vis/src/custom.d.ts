interface GoatCounter {
  count: (opts: { path?: string }) => void;
}

interface Window {
  goatcounter?: GoatCounter;
}