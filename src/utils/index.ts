export function dispatch<T = unknown>(
  element: HTMLElement,
  eventName: string,
  detail?: T,
  options?: Partial<CustomEventInit<T>>,
): void {
  element.dispatchEvent(
    new CustomEvent<T>(eventName, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: false,
      ...options,
    }),
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let _counter = 0;
export function uniqueId(prefix = 'ui'): string {
  return `${prefix}-${++_counter}`;
}
