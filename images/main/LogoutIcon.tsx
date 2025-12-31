import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LogoutIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F57D7D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99M15 12H3.62m2.23-3.35L2.5 12l3.35 3.35"
    />
  </Svg>
)
export default LogoutIcon
