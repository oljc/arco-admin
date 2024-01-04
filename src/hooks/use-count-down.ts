import { type Ref, ref } from 'vue';
import { type Fn, useIntervalFn } from '@vueuse/core';

export interface UseCountDownOptions {
  initValue?: number;
  interval?: number;
  onChange?: (value: number) => void;
  onEnd?: Fn;
  onStart?: Fn;
}

export interface CountDownReturnType {
  /** 当前倒计时数 */
  count: Ref<number>;
  /** 开始倒计时 */
  start: Fn;
  /** 恢复倒计时 */
  resume: Fn;
  /** 暂停倒计时 */
  pause: Fn;
  /** 重置倒计时 */
  reset: Fn;
}

/**
 * 倒计时Hook
 */
export default function useCountDown(
  options: UseCountDownOptions = {}
): CountDownReturnType {
  const { initValue = 60, interval = 1000 } = options;

  const count = ref(initValue);
  const { pause, resume } = useIntervalFn(
    () => {
      count.value--;
      options.onChange?.(count.value);

      if (count.value === 0) {
        count.value = initValue;
        pause();
        options.onEnd?.();
      }
    },
    interval,
    { immediate: false }
  );

  // 开始
  const start = () => {
    resume();
    options.onStart?.();
  };

  const reset = () => {
    pause();
    count.value = initValue;
  };
  return {
    count,
    start,
    resume,
    pause,
    reset
  };
}
