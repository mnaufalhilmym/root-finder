export default function Input(props) {
  return (
    <div className="flex my-1 whitespace-nowrap">
      <label
        className="flex-none"
        htmlFor="error"
        dangerouslySetInnerHTML={{ __html: props.label }}
      />
      <input
        className="flex-grow px-1 border-2 border-black rounded"
        id={props.id}
        name={props.id}
        type={props.type}
        autoComplete="off"
        min={props.min}
        step={props.step}
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
}
