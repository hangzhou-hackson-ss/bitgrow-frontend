import { useEffect, useState } from "react"
import http from "../lib/http";
function useKolList() {
  const [kol, setKol] = useState<{
    avatar: string;
    average_display: number;
    claim_reward: number;
    connectable_user: number;
    id: number;
    intro: string;
    language: number;
    name: string;
    portrait: number;
    quoted_price: number;
    total_reward: number;
    area: number;
  }[]>();
  useEffect(() => {
    http.get('kol').then(data => {
      setKol(data);
    })
  }, [])
  return kol;
}

export default useKolList
