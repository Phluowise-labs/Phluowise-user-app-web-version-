import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Warning = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF7576"
      d="M7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0Zm0 3a.913.913 0 0 1 .91.996l-.365 4.006a.548.548 0 0 1-1.09 0l-.364-4.006A.913.913 0 0 1 7 3Zm0 8a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z"
    />
  </Svg>
)
export default Warning
