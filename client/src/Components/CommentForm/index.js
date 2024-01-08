import { useState } from 'react';
import './index.css';
const CommentForm = ({blogId, handleSubmit, submitLabel, hasCancelButton = false, initialText = "", handleCancel }) => {
    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;
    const onSubmit = event => {
        event.preventDefault();
        // console.log("blogId: " + blogId);
        // if(blogId)
            handleSubmit(text);
        setText('');
    }
    // console.log(text);
    return (
        <form onSubmit={onSubmit}>
            <textarea
                className='comment-form-textarea'
                value={text}
                onChange={(e) => setText(e.target.value)}

            />
            <button className='comment-form-button' disabled={isTextareaDisabled}>{submitLabel}</button>
            {hasCancelButton && (
                <button type='button' className='comment-form-button comment-form-cancel-button' onClick={handleCancel}>Cancel</button>
            )}
        </form>
    )
}

export default CommentForm;

