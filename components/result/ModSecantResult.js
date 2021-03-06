import { useEffect } from "react";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

export default function ModSecantResult(props) {
  // console.log("modsecantresult");

  let error;
  let infroot = false;

  useEffect(() => {
    if (!(error || infroot)) {
      props.setResult({
        f: f,
        p: p,
        root: result[result.length - 1].x1,
      });
    } else {
      props.setIsError(true);
      if (infroot) {
        alert("Root is infinite!");
      }
    }
  }, []);

  let { f, x0, e, p, i } = props.data;
  let dx0, fx0, x0_dx0, fx0_dx0, x1, ea;
  let step = 0,
    trend = 1;
  const result = [];
  do {
    ++step;
    try {
      dx0 = 0.01 * x0;
      fx0 = f.evaluate({ x: x0 });
      x0_dx0 = +x0 + dx0;
      fx0_dx0 = f.evaluate({ x: x0_dx0 });
      x1 = x0 - (dx0 * fx0) / (fx0_dx0 - fx0);
    } catch (e) {
      error = e;
      break;
    }
    try {
      ea = math.abs((x1 - x0) / x1);
    } catch (e) {
      error = e;
      return;
    }
    if (!Number.isFinite(x1)) {
      infroot = true;
      break;
    }
    result.push({
      step: step,
      x0: x0,
      fx0: fx0,
      x0_dx0: x0_dx0,
      fx0_dx0: fx0_dx0,
      x1: x1,
      ea: ea,
    });
    if (math.abs(x1) - math.abs(x0) > 0) {
      ++trend;
    }
    x0 = x1;
  } while (e < ea && (i ? step < i : true));

  if (step >= 10 && trend === step) {
    error = "Divergence! Try using another method!";
  }

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
              x<sub>0</sub> + 𝛿x<sub>0</sub>
            </th>
            <th className="px-3">
              f(x<sub>0</sub> + 𝛿x<sub>0</sub>)
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
              <tr>
                <td className="px-3">{res.step}</td>
                <td className="px-3">
                  {p ? Number(res.x0).toPrecision(p) : res.x0}
                </td>
                <td className="px-3">
                  {p ? Number(res.fx0).toPrecision(p) : res.fx0}
                </td>
                <td className="px-3">
                  {p ? Number(res.x0_dx0).toPrecision(p) : res.x0_dx0}
                </td>
                <td className="px-3">
                  {p ? Number(res.fx0_dx0).toPrecision(p) : res.fx0_dx0}
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
