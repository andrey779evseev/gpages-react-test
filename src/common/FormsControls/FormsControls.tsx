import React, {FC} from "react";
import s from "./FormsControls.module.css";
import {
    Field,
    WrappedFieldProps,
} from "redux-form";
import {FieldValidatorType} from "../../utils/validators/validators";


const FormControl: FC<WrappedFieldProps> = ({children, meta: {touched, error},  }) => {
    const hasError = touched && error
    return (
        <div>
            {children}
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: FC<WrappedFieldProps> = (props) => {
    //const hasError = props.meta.touched && props.meta.error
    return (
        <FormControl {...props}><textarea  {...props.input}/></FormControl>
    )
}

export const Input: FC<WrappedFieldProps> = (props) => {
    //const hasError = props.meta.touched && props.meta.error
    return (
        <FormControl {...props}><input {...props.input}/></FormControl>
    )
}



export function createField<FormKeysType extends string> (placeholder: string,
                            className: string,
                            type: string,
                            name: FormKeysType,
                            component: FC<WrappedFieldProps>,
                            validators: Array<FieldValidatorType>) {
    return (
        <div>
            <Field component={component} className={className} type={type} name={name} placeholder={placeholder}
                   validate={validators}/>
        </div>
    )
}