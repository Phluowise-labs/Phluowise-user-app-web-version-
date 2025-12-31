import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const MoneyChangeIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F5F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M2 11V9c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v6c0 3.5-2 5-5 5h-5"
    />
    <Path
      stroke="#F5F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM18.5 9.5v5M2 15.5h5.34c.64 0 1.16.52 1.16 1.16v1.28"
    />
    <Path
      stroke="#F5F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M3.22 14.28 2 15.5l1.22 1.22M8.5 20.78H3.16c-.64 0-1.16-.52-1.16-1.16v-1.28"
    />
    <Path
      stroke="#F5F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m7.281 22 1.22-1.22-1.22-1.22"
    />
  </Svg>
)
export default MoneyChangeIcon
