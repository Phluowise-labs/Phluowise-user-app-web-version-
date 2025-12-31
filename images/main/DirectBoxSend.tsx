import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DirectBoxSend = (props: SvgProps) => (
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
      strokeWidth={1.5}
      d="M12 8V2l-2 2M12 2l2 2"
    />
    <Path
      stroke="#F5F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M7 12c-4 0-4 1.79-4 4v1c0 2.76 0 5 5 5h8c4 0 5-2.24 5-5v-1c0-2.21 0-4-4-4-1 0-1.28.21-1.8.6l-1.02 1.08a2.999 2.999 0 0 1-4.37 0L8.8 12.6C8.28 12.21 8 12 7 12ZM5 12v-2c0-2.01 0-3.67 3-3.96M19 12v-2c0-2.01 0-3.67-3-3.96"
    />
  </Svg>
)
export default DirectBoxSend
