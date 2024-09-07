import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const useStatus = (initialStatus: Status = "idle") => {
  const [status, setStatus] = useState<Status>(initialStatus);

  return [status, setStatus] as const;
};

export default useStatus;
