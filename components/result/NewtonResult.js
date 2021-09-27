import { useEffect } from "react";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

export default function NewtonResult(props) {
  // console.log("newton result");

  let error = false;
  let infroot = false;

  useEffect(() => {
    if (!(error || infroot)) {
      props.setResult({
        f: f,
        p: p,
        root: result[result.length - 1].x1,
      });
    } else if (error) {
      props.setIsError(true);
    } else if (infroot) {
      props.setMethod("secant");
    }
  }, []);

  let { f, df, x0, e, p, i } = props.data;
  let fx0, dfx0, x1, ea;
  let step = 1;
  const result = [];
  do {
    try {
      fx0 = f.evaluate({ x: x0 });
      dfx0 = df.evaluate({ x: x0 });
      x1 = x0 - fx0 / dfx0;
    } catch (e) {
      error = e;
      break;
    }
    try {
      ea = math.abs((x1 - x0) / x1);
    } catch (e) {
      error = e;
      break;
    }
    if (!Number.isFinite(x1)) {
      infroot = true;
      break;
    }
    result.push({
      step: step,
      x0: x0,
      fx0: fx0,
      dfx0: dfx0,
      x1: x1,
      ea: ea,
    });
    x0 = x1;
    ++step;
  } while (e < ea && (i ? step <= i : true));

  if (error) {
    alert(error);
  }

  return (
    !error && (
      <table className="my-4 mx-auto">
        <tbody>
          <tr>
            <th className="px-3">Step</th>
            <th className="px-3">
              x<sub>0</sub>
            </th>
            <th className="px-3">
              f(x<sub>0</sub>)
            </th>
            <th className="px-3">
              f'(x<sub>0</sub>)
            </th>
            <th className="px-3">
              x<sub>1</sub>
            </th>
            <th className="px-3">
              | ε<sub>t</sub> |
            </th>
          </tr>
          {result.map((res) => {
            return (
              <tr key={res.step}>
                <td className="px-3">{res.step}</td>
                <td className="px-3">
                  {p ? Number(res.x0).toPrecision(p) : res.x0}
                </td>
                <td className="px-3">
                  {p ? Number(res.fx0).toPrecision(p) : res.fx0}
                </td>
                <td className="px-3">
                  {p ? Number(res.dfx0).toPrecision(p) : res.dfx0}
                </td>
                <td className="px-3">
                  {p ? Number(res.x1).toPrecision(p) : res.x1}
                </td>
                <td className="px-3">
                  {p ? Number(res.ea).toPrecision(p) : res.ea}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
}
