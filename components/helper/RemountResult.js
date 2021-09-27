import { useEffect } from "react";

export default function RemountResult(props) {
  useEffect(() => {
    // console.log("resetresult");
    
    if (!props.showResult) {
      props.setShowResult(true);
    }
  });
  return <> </>;
}
