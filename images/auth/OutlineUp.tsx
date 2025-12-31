import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const OutLineUp = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m6 15 6-6 6 6"
    />
  </Svg>
);

export default OutLineUp;
