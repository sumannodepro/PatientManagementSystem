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
export declare type LastRecordIDCreateFormInputValues = {
    lastPatientID?: string;
    newPatientID?: string;
    owner?: string;
};
export declare type LastRecordIDCreateFormValidationValues = {
    lastPatientID?: ValidationFunction<string>;
    newPatientID?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LastRecordIDCreateFormOverridesProps = {
    LastRecordIDCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    lastPatientID?: PrimitiveOverrideProps<TextFieldProps>;
    newPatientID?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LastRecordIDCreateFormProps = React.PropsWithChildren<{
    overrides?: LastRecordIDCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LastRecordIDCreateFormInputValues) => LastRecordIDCreateFormInputValues;
    onSuccess?: (fields: LastRecordIDCreateFormInputValues) => void;
    onError?: (fields: LastRecordIDCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LastRecordIDCreateFormInputValues) => LastRecordIDCreateFormInputValues;
    onValidate?: LastRecordIDCreateFormValidationValues;
} & React.CSSProperties>;
export default function LastRecordIDCreateForm(props: LastRecordIDCreateFormProps): React.ReactElement;
