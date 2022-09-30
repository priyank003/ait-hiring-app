import React , {useRef} from 'react';
import JoditEditor from "jodit-react"

const TextEditor = ({setChange , config}) => {
    const editor = useRef(null);
  return (
    <div>
        <JoditEditor ref={editor} onChange={(content) => setChange(content)} config={config} />
    </div>
  )
}

export default TextEditor