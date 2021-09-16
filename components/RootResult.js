export default function RootResult(props) {
  return (
    <h5>
      The root is&nbsp;
      {props.p ? Number(props.root).toPrecision(props.p) : props.root}
    </h5>
  );
}
