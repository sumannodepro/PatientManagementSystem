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
export declare type PatientChiefCompliantCreateFormInputValues = {
    profileId?: string;
    patientName?: string;
    mobileNumber?: string;
    chiefComplaint?: string;
    findings?: string;
    diagnosis?: string;
    date?: string;
    doctorname?: string;
    payment?: string;
    treatment?: string;
    owner?: string;
};
export declare type PatientChiefCompliantCreateFormValidationValues = {
    profileId?: ValidationFunction<string>;
    patientName?: ValidationFunction<string>;
    mobileNumber?: ValidationFunction<string>;
    chiefComplaint?: ValidationFunction<string>;
    findings?: ValidationFunction<string>;
    diagnosis?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    doctorname?: ValidationFunction<string>;
    payment?: ValidationFunction<string>;
    treatment?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientChiefCompliantCreateFormOverridesProps = {
    PatientChiefCompliantCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    profileId?: PrimitiveOverrideProps<TextFieldProps>;
    patientName?: PrimitiveOverrideProps<TextFieldProps>;
    mobileNumber?: PrimitiveOverrideProps<TextFieldProps>;
    chiefComplaint?: PrimitiveOverrideProps<TextFieldProps>;
    findings?: PrimitiveOverrideProps<TextFieldProps>;
    diagnosis?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    doctorname?: PrimitiveOverrideProps<TextFieldProps>;
    payment?: PrimitiveOverrideProps<TextFieldProps>;
    treatment?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientChiefCompliantCreateFormProps = React.PropsWithChildren<{
    overrides?: PatientChiefCompliantCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PatientChiefCompliantCreateFormInputValues) => PatientChiefCompliantCreateFormInputValues;
    onSuccess?: (fields: PatientChiefCompliantCreateFormInputValues) => void;
    onError?: (fields: PatientChiefCompliantCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientChiefCompliantCreateFormInputValues) => PatientChiefCompliantCreateFormInputValues;
    onValidate?: PatientChiefCompliantCreateFormValidationValues;
} & React.CSSProperties>;
export default function PatientChiefCompliantCreateForm(props: PatientChiefCompliantCreateFormProps): React.ReactElement;
