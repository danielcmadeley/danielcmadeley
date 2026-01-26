import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  return <button className="font-mono text-stone-400 hover:text-stone-100 underline underline-offset-2 transition-colors cursor-pointer" data-cal-namespace="30min"
    data-cal-link="madeleydesignstudio/30min"
    
    data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
  >calendar.sh</button>;
};