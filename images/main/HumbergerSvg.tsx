import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const HumbergerSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F5F5F5"
      strokeLinecap="round"
      strokeOpacity={0.961}
      strokeWidth={2.275}
      d="M3.762 8.063h20.475M3.762 13.75h20.475M3.762 19.438h20.475"
    />
  </Svg>
)
export default HumbergerSvg
