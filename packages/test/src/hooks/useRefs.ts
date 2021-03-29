import { ref, onBeforeUpdate, Ref } from 'vue';

export function useRefs(): [Ref<any[]>, (index: number) => (el: any) => void] {
  const refs = ref<any[]>([]);

  onBeforeUpdate(() => {
    refs.value = [];
  });

  const setRefs = (index: number) => (el: any) => {
    refs.value[index] = el;
  };

  return [refs, setRefs];
}
