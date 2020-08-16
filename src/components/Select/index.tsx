import React, { SelectHTMLAttributes } from 'react';
import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}


const Select: React.FC<SelectProps> = ({ name, label, options, ...selectAttr }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select id={name} {...selectAttr}>
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map((option, key) => {
                    return <option key={option + "_" + key} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    )
}

export default Select;