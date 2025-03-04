import { useEffect, useState } from "react";

// hydrate 가 되었다면
const useHydrate = () => {
  const [isMount, setIsMount] = useState();
  useEffect(() => {
    setIsMount(true);
  }, []);

  return isMount;
};

export default useHydrate;
