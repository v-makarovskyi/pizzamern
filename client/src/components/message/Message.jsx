import React from 'react'

import './message.scss'

const Message = ({variant, children}) => {
  return (
    <div className='container'>
        {variant === 'danger' ? (
            <div className="classDanger">
                <span className='messageDanger'>{children}</span>
            </div>
        ) : (
            <div className="classSuccess">
                <span>{children}</span>
            </div>
        )}
    </div>
  )
}

export default Message