import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Heart = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <Path
      fill="#E68226"
      fillRule="evenodd"
      stroke="#E68226"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.171}
      d="M9.514 16.238 6.09 12.723 2.693 9.21a5.037 5.037 0 0 1 0-6.924 4.497 4.497 0 0 1 6.572.364l.25.245.246-.255a4.497 4.497 0 0 1 6.572-.365 5.037 5.037 0 0 1 0 6.925l-3.397 3.514-3.422 3.525Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Heart
