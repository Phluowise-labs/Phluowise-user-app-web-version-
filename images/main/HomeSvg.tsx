import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const HomeSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.stroke || "#fff" } 
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M14 21.858v-3.75M10.275 2.921 3.537 8.17C2.413 9.046 1.5 10.908 1.5 12.32v9.262c0 2.9 2.362 5.275 5.263 5.275h14.475c2.9 0 5.262-2.375 5.262-5.262v-9.1c0-1.513-1.012-3.45-2.25-4.313l-7.725-5.412c-1.75-1.225-4.562-1.163-6.25.15Z"
    />
  </Svg>
)
export default HomeSvg
