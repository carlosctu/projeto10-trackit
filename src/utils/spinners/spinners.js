import { ThreeDots, MutatingDots } from "react-loader-spinner";

function ThreeDotsSpinner() {
  return <ThreeDots color="#ffffff" height={65} width={80} />;
}
function MutatingDotsSpinner() {
  return <MutatingDots height={80} width={80} />;
}

export { ThreeDotsSpinner, MutatingDotsSpinner };
