import React from 'react'
import '../styles/form.css'

function Input({type,name,placeholder,value,oninput,checked,onchange,id,require}) {
  return (
    <div className='inputField'>
            <label htmlFor={id}>{name}:</label>
            <input 
            type={type}
            name={name} 
            placeholder={placeholder}
            value={value}
            onInput={oninput}
            checked={checked}
            onChange={onchange}
            id={id}
            required={require}/>
        </div>
  )
}

export default Input