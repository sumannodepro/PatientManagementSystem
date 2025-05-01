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
export declare type PatientCreateFormInputValues = {
    patientID?: string;
    title?: string;
    patientName?: string;
    mobileNumber?: string;
    landlineNumber?: string;
    city?: string;
    emailId?: string;
    address?: string;
    address2?: string;
    religion?: string;
    dateOfBirth?: string;
    age?: number;
    bloodGroup?: string;
    gender?: string;
    owner?: string;
};
export declare type PatientCreateFormValidationValues = {
    patientID?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    patientName?: ValidationFunction<string>;
    mobileNumber?: ValidationFunction<string>;
    landlineNumber?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    emailId?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    address2?: ValidationFunction<string>;
    religion?: ValidationFunction<string>;
    dateOfBirth?: ValidationFunction<string>;
    age?: ValidationFunction<number>;
    bloodGroup?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientCreateFormOverridesProps = {
    PatientCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    patientID?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    patientName?: PrimitiveOverrideProps<TextFieldProps>;
    mobileNumber?: PrimitiveOverrideProps<TextFieldProps>;
    landlineNumber?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    emailId?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    address2?: PrimitiveOverrideProps<TextFieldProps>;
    religion?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
    bloodGroup?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientCreateFormProps = React.PropsWithChildren<{
    overrides?: PatientCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PatientCreateFormInputValues) => PatientCreateFormInputValues;
    onSuccess?: (fields: PatientCreateFormInputValues) => void;
    onError?: (fields: PatientCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientCreateFormInputValues) => PatientCreateFormInputValues;
    onValidate?: PatientCreateFormValidationValues;
} & React.CSSProperties>;
export default function PatientCreateForm(props: PatientCreateFormProps): React.ReactElement;
