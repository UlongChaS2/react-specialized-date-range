import React from 'react'

export default function Button() {
  const test = () => {
    console.log('click')
  }

  return <button onClick={test}>click me</button>
}
