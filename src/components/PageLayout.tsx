import classNames from "classnames"
import React from "react"
import { hasUtilsClass } from "../lib/has-utils-class"

type PageLayoutProps = React.ComponentPropsWithoutRef<'div'>

const PageLayout = ({ children, className, ...rest }: PageLayoutProps) => {
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

export default PageLayout
