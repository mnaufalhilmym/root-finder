import Input from "./Input";

export default function ExpertForm(props) {
  return (
    <>
      <Input
        display={true}
        label="f(x)="
        id="main-function"
        type="text"
        placeholder="e^(-x)-x"
        required={true}
      ></Input>
      <Input
        display={props.display}
        label="f'(x)="
        id="derivative-function"
        type="text"
        placeholder="If any"
      ></Input>
      <Input
        display={props.display}
        label="Guess root x<sub>-1</sub>="
        id="guess-root-1"
        type="number"
        step="any"
        placeholder="For Secant method"
      ></Input>
      <Input
        display={props.display}
        label="Guess root x<sub>0</sub>="
        id="guess-root0"
        type="number"
        step="any"
        placeholder="Default is 1"
      />
      <Input
        display={props.display}
        label="Error(ε)="
        id="error"
        type="number"
        min="0"
        step="any"
        placeholder="Default is 0.001"
      />
      <Input
        display={props.display}
        label="Precision="
        id="precision"
        type="number"
        min="1"
        step="any"
        placeholder="Significant figures"
      />
      <Input
        display={props.display}
        label="Iterate="
        id="iterate"
        type="number"
        min="1"
        step="1"
        placeholder="Default is 40"
      />
    </>
  );
}
