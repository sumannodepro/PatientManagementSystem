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
export declare type PrescriptionUpdateFormInputValues = {
    patientID?: string;
    patientName?: string;
    doctorID?: string;
    doctorName?: string;
    prescription?: string;
    date?: string;
    owner?: string;
};
export declare type PrescriptionUpdateFormValidationValues = {
    patientID?: ValidationFunction<string>;
    patientName?: ValidationFunction<string>;
    doctorID?: ValidationFunction<string>;
    doctorName?: ValidationFunction<string>;
    prescription?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PrescriptionUpdateFormOverridesProps = {
    PrescriptionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    patientID?: PrimitiveOverrideProps<TextFieldProps>;
    patientName?: PrimitiveOverrideProps<TextFieldProps>;
    doctorID?: PrimitiveOverrideProps<TextFieldProps>;
    doctorName?: PrimitiveOverrideProps<TextFieldProps>;
    prescription?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PrescriptionUpdateFormProps = React.PropsWithChildren<{
    overrides?: PrescriptionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    prescription?: any;
    onSubmit?: (fields: PrescriptionUpdateFormInputValues) => PrescriptionUpdateFormInputValues;
    onSuccess?: (fields: PrescriptionUpdateFormInputValues) => void;
    onError?: (fields: PrescriptionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PrescriptionUpdateFormInputValues) => PrescriptionUpdateFormInputValues;
    onValidate?: PrescriptionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PrescriptionUpdateForm(props: PrescriptionUpdateFormProps): React.ReactElement;
