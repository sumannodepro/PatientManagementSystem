/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DoctorCreateFormInputValues = {
    doctorName?: string;
    doctorID?: string;
    email?: string;
    phone?: string;
    specialization?: string;
    experience?: number;
    owner?: string;
};
export declare type DoctorCreateFormValidationValues = {
    doctorName?: ValidationFunction<string>;
    doctorID?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    specialization?: ValidationFunction<string>;
    experience?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DoctorCreateFormOverridesProps = {
    DoctorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    doctorName?: PrimitiveOverrideProps<TextFieldProps>;
    doctorID?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    specialization?: PrimitiveOverrideProps<TextFieldProps>;
    experience?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DoctorCreateFormProps = React.PropsWithChildren<{
    overrides?: DoctorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DoctorCreateFormInputValues) => DoctorCreateFormInputValues;
    onSuccess?: (fields: DoctorCreateFormInputValues) => void;
    onError?: (fields: DoctorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DoctorCreateFormInputValues) => DoctorCreateFormInputValues;
    onValidate?: DoctorCreateFormValidationValues;
} & React.CSSProperties>;
export default function DoctorCreateForm(props: DoctorCreateFormProps): React.ReactElement;
