//🇫🇷 Filtrer l'entrée de l'utilisateur avant de déclencher l'action (Frame 12 sur Figma)
//🇬🇧 Filtering the user input before triggering the action (Frame 12 of Figma)

import { useEffect, DependencyList } from 'react';

export function useDebounceEffect(
  fn,
  waitTime,
  deps,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  },[deps])
}
