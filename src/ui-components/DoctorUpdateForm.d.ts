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
export declare type DoctorUpdateFormInputValues = {
    doctorName?: string;
    doctorID?: string;
    email?: string;
    phone?: string;
    specialization?: string;
    experience?: number;
    owner?: string;
};
export declare type DoctorUpdateFormValidationValues = {
    doctorName?: ValidationFunction<string>;
    doctorID?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    specialization?: ValidationFunction<string>;
    experience?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DoctorUpdateFormOverridesProps = {
    DoctorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    doctorName?: PrimitiveOverrideProps<TextFieldProps>;
    doctorID?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    specialization?: PrimitiveOverrideProps<TextFieldProps>;
    experience?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DoctorUpdateFormProps = React.PropsWithChildren<{
    overrides?: DoctorUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    doctor?: any;
    onSubmit?: (fields: DoctorUpdateFormInputValues) => DoctorUpdateFormInputValues;
    onSuccess?: (fields: DoctorUpdateFormInputValues) => void;
    onError?: (fields: DoctorUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DoctorUpdateFormInputValues) => DoctorUpdateFormInputValues;
    onValidate?: DoctorUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DoctorUpdateForm(props: DoctorUpdateFormProps): React.ReactElement;
