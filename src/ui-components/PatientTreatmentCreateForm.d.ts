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
export declare type PatientTreatmentCreateFormInputValues = {
    invoiceNumber?: string;
    patientID?: string;
    treatmentID?: string;
    treatmentName?: string;
    price?: number;
    discount?: number;
    totalAmount?: number;
    date?: string;
    doctorID?: string;
    modeOfPayment?: string;
    owner?: string;
};
export declare type PatientTreatmentCreateFormValidationValues = {
    invoiceNumber?: ValidationFunction<string>;
    patientID?: ValidationFunction<string>;
    treatmentID?: ValidationFunction<string>;
    treatmentName?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    discount?: ValidationFunction<number>;
    totalAmount?: ValidationFunction<number>;
    date?: ValidationFunction<string>;
    doctorID?: ValidationFunction<string>;
    modeOfPayment?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientTreatmentCreateFormOverridesProps = {
    PatientTreatmentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    invoiceNumber?: PrimitiveOverrideProps<TextFieldProps>;
    patientID?: PrimitiveOverrideProps<TextFieldProps>;
    treatmentID?: PrimitiveOverrideProps<TextFieldProps>;
    treatmentName?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    discount?: PrimitiveOverrideProps<TextFieldProps>;
    totalAmount?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    doctorID?: PrimitiveOverrideProps<TextFieldProps>;
    modeOfPayment?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientTreatmentCreateFormProps = React.PropsWithChildren<{
    overrides?: PatientTreatmentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PatientTreatmentCreateFormInputValues) => PatientTreatmentCreateFormInputValues;
    onSuccess?: (fields: PatientTreatmentCreateFormInputValues) => void;
    onError?: (fields: PatientTreatmentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientTreatmentCreateFormInputValues) => PatientTreatmentCreateFormInputValues;
    onValidate?: PatientTreatmentCreateFormValidationValues;
} & React.CSSProperties>;
export default function PatientTreatmentCreateForm(props: PatientTreatmentCreateFormProps): React.ReactElement;
