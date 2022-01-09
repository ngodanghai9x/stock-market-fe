import { useState } from "react";

export function useNofitication() {
  const [notification, setNotification] = useState<string>()

  return { notification, setNotification }
}