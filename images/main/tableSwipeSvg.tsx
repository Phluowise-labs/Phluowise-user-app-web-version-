import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TableSwipeSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.stroke || "#3B74FF"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M18.75 20.715v3.025a2.513 2.513 0 0 1-2.511 2.51H6.262a2.512 2.512 0 0 1-2.512-2.511v-9.977a2.513 2.513 0 0 1 2.511-2.512h3.693"
    />
    <Path
    //   fill="#3B74FF"
      fillOpacity={0.2}
      stroke={props.stroke || "#3B74FF"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M11.459 5.64a2.55 2.55 0 0 1 3.12-1.802L24.36 6.46a2.55 2.55 0 0 1 1.802 3.12l-2.622 9.783a2.55 2.55 0 0 1-3.12 1.801l-9.784-2.621a2.55 2.55 0 0 1-1.8-3.12l2.622-9.783Z"
    />
  </Svg>
)
export default TableSwipeSvg
