import { useEffect } from "react";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

export default function SecantResult(props) {
  let error;

  useEffect(() => {
    if (!error) {
      props.setResult({
        f: f,
        p: p,
        root: result[result.length - 1].x1,
      });
    } else {
      props.setIsError(true);
    }
  }, []);

  let { f, x_1, x0, e, p, i } = props.data;
  let fx_1, fx0, x1, ea;
  let step = 1;
  const result = [];
  do {
    try {
      fx_1 = f.evaluate({ x: x_1 });
      fx0 = f.evaluate({ x: x0 });
      x1 = x0 - (fx0 * (x_1 - x0)) / (fx_1 - fx0);
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
    result.push({
      step: step,
      x_1: x_1,
      fx_1: fx_1,
      x0: x0,
      fx0: fx0,
      x1: x1,
      ea: ea,
    });
    x_1 = x0;
    x0 = x1;
    ++step;
  } while (e < ea && (i ? step <= i : true));

  if (error) {
    alert(error);
  }

  return (
    !error && (
      <table className="my-4">
        <tbody>
          <tr>
            <th className="px-3">Step</th>
            <th className="px-3">
              x<sub>-1</sub>
            </th>
            <th className="px-3">
              f(x<sub>-1</sub>)
            </th>
            <th className="px-3">
              x<sub>0</sub>
            </th>
            <th className="px-3">
              f(x<sub>0</sub>)
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
                  {p ? Number(res.x_1).toPrecision(p) : res.x_1}
                </td>
                <td className="px-3">
                  {p ? Number(res.fx_1).toPrecision(p) : res.fx_1}
                </td>
                <td className="px-3">
                  {p ? Number(res.x0).toPrecision(p) : res.x0}
                </td>
                <td className="px-3">
                  {p ? Number(res.fx0).toPrecision(p) : res.fx0}
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
