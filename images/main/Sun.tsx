import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Sun = (props: SvgProps) => (
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
      d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
    />
    <Path
      stroke="#F5F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19.14 19.14-.13-.13m0-14.02.13-.13-.13.13ZM4.86 19.14l.13-.13-.13.13ZM12 2.08V2v.08ZM12 22v-.08.08ZM2.08 12H2h.08ZM22 12h-.08.08ZM4.99 4.99l-.13-.13.13.13Z"
    />
  </Svg>
)
export default Sun
