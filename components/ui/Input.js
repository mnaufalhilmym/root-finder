import { forwardRef } from "react";

export default forwardRef(Input);

function Input(props, ref) {
  return (
    <div
      className={`flex my-1 whitespace-nowrap ${props.display ? `` : `hidden`}`}
    >
      <label
        className="flex-none"
        htmlFor="error"
        dangerouslySetInnerHTML={{ __html: props.label }}
      />
      <input
        className="flex-grow px-1 border-2 border-black focus:outline-none focus:border-blue-500 rounded"
        id={props.id}
        name={props.id}
        type={props.type}
        autoComplete="off"
        min={props.min}
        step={props.step}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        ref={ref}
      />
    </div>
  );
}
