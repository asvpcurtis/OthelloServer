import * as React from 'react';
import classnames from 'classnames';

// for form validation
// https://github.com/Remchi/reddice/blob/master/server/shared/validations/login.js
interface FormTextFieldProps {
    inputName: string
    inputId: string
    labelText: string
    inputText: string
    onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
    error: string
}
const FormTextField = (props: FormTextFieldProps) => {

    return (
        <div className={classnames('form-group', { 'has-error': props.error })}>
            <label htmlFor={props.inputName}>{props.labelText}</label>
            <input className="form-control" type="text" onChange={props.onChange} name={props.inputName} id={props.inputId} />
            {props.error && <span className="help-block">{props.error}</span>}
        </div>);

}

export default FormTextField;