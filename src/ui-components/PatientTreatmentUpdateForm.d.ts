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
export declare type PatientTreatmentUpdateFormInputValues = {
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
export declare type PatientTreatmentUpdateFormValidationValues = {
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
export declare type PatientTreatmentUpdateFormOverridesProps = {
    PatientTreatmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type PatientTreatmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: PatientTreatmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    patientTreatment?: any;
    onSubmit?: (fields: PatientTreatmentUpdateFormInputValues) => PatientTreatmentUpdateFormInputValues;
    onSuccess?: (fields: PatientTreatmentUpdateFormInputValues) => void;
    onError?: (fields: PatientTreatmentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientTreatmentUpdateFormInputValues) => PatientTreatmentUpdateFormInputValues;
    onValidate?: PatientTreatmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PatientTreatmentUpdateForm(props: PatientTreatmentUpdateFormProps): React.ReactElement;
