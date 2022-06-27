
import React from 'react'
import Cover from './Cover';
type Props = {
    state: string
}

const HangIndex = (props: Props) => {
    const {state} = props;
    if(state === 'cover'){
        return <Cover></Cover>
    }else if(state === 'pking'){
        
    }
  return (
    <div>HangIndex</div>
  )
}