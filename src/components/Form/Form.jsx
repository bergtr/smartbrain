import React from 'react';
import './form.css'

const Form = ({ onInputChange, onSubmit }) =>{
    return (
        <div>
            <p className='f3'>somthing somthing</p>
            <div className='center'>
                <div className=' form center pa4 br3 shadow-5'>
                <input className='center f4 pa3 w-70' type="text" name="imageLink" onChange={onInputChange}/>
                <button className='w-30 grow f3 link ph3 pv2 dib white bg-blue' onClick={onSubmit}>
                    Detect
                </button>
                </div>
            </div>
        </div>
    );
}

export default Form;