import React from 'react'

function Input({label,id,name,...props}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} {...props} />
    </>
  )
}

export default Input
