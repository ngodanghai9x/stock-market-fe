import classNames from "classnames"
import React from "react"
import { hasUtilsClass } from "../lib/has-utils-class"

type PagelayoutProps = React.ComponentPropsWithoutRef<'div'>

const Pagelayout = ({ children, className, ...rest }: PagelayoutProps) => {
  return (
    <div className={
      classNames(
        'w-full',
        !hasUtilsClass('max-w') && 'max-w-screen-wide'
      )
    }>
      {children}
    </div>
  )
}

export default Pagelayout
