import * as React from "react"
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg"
const Flag = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={20}
      height={21}
      x={2}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.5 3.5v18"
      />
      <Path
        fill="#555"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.5 5h7L16 6.5h3.5a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H16l-3.5-1.5h-7V5Z"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.5 21.5h4"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill="#3B74FF" d="M0 .5h24v24H0V.5Z" />
    </G>
  </Svg>
)
export default Flag
