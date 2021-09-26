import { useEffect } from "react";

export default function RemountResult(props) {
  useEffect(() => {
    if (!props.showResult) {
      props.setShowResult(true);
    }
  });
  return <> </>;
}
