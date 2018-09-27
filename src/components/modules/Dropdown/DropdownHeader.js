import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import getUnhandledProps from '../../lib/getUnhandledProps'
import getElementType from '../../lib/getElementType'
import {createShorthandFactory} from '../../lib/factories'
import * as childrenUtils from '../../lib/childrenUtils'
import * as customPropTypes from '../../lib/customPropTypes'

import Icon from '../../elements/Icon/Icon'

/**
 * A dropdown menu can contain a header.
 */
function DropdownHeader(props) {
  const { children, className, content, icon } = props

  const classes = cx('header', className)
  const rest = getUnhandledProps(DropdownHeader, props)
  const ElementType = getElementType(DropdownHeader, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {content}
    </ElementType>
  )
}

DropdownHeader.propTypes = {
  /** An element type to render as (string or function) */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,
}

DropdownHeader.create = createShorthandFactory(DropdownHeader, content => ({ content }))

export default DropdownHeader
