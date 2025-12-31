import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CheckedSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 -2 22 22"
    {...props}
  >
    <Path
      fill="gray"
      fillRule="evenodd"
      d="M14.463 5.15a1.625 1.625 0 0 1-.069 2.298L6.97 14.445a1.625 1.625 0 0 1-2.279-.049L1.558 11.18a1.625 1.625 0 0 1 2.33-2.267l2.016 2.071 6.262-5.9a1.625 1.625 0 0 1 2.297.067Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CheckedSvg;
