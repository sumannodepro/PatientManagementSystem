/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createPatientTreatment } from "../graphql/mutations";
export default function PatientTreatmentCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    invoiceNumber: "",
    patientID: "",
    treatmentID: "",
    treatmentName: "",
    price: "",
    discount: "",
    totalAmount: "",
    date: "",
    doctorID: "",
    modeOfPayment: "",
    owner: "",
  };
  const [invoiceNumber, setInvoiceNumber] = React.useState(
    initialValues.invoiceNumber
  );
  const [patientID, setPatientID] = React.useState(initialValues.patientID);
  const [treatmentID, setTreatmentID] = React.useState(
    initialValues.treatmentID
  );
  const [treatmentName, setTreatmentName] = React.useState(
    initialValues.treatmentName
  );
  const [price, setPrice] = React.useState(initialValues.price);
  const [discount, setDiscount] = React.useState(initialValues.discount);
  const [totalAmount, setTotalAmount] = React.useState(
    initialValues.totalAmount
  );
  const [date, setDate] = React.useState(initialValues.date);
  const [doctorID, setDoctorID] = React.useState(initialValues.doctorID);
  const [modeOfPayment, setModeOfPayment] = React.useState(
    initialValues.modeOfPayment
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setInvoiceNumber(initialValues.invoiceNumber);
    setPatientID(initialValues.patientID);
    setTreatmentID(initialValues.treatmentID);
    setTreatmentName(initialValues.treatmentName);
    setPrice(initialValues.price);
    setDiscount(initialValues.discount);
    setTotalAmount(initialValues.totalAmount);
    setDate(initialValues.date);
    setDoctorID(initialValues.doctorID);
    setModeOfPayment(initialValues.modeOfPayment);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const validations = {
    invoiceNumber: [],
    patientID: [{ type: "Required" }],
    treatmentID: [{ type: "Required" }],
    treatmentName: [{ type: "Required" }],
    price: [{ type: "Required" }],
    discount: [],
    totalAmount: [],
    date: [],
    doctorID: [],
    modeOfPayment: [],
    owner: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          invoiceNumber,
          patientID,
          treatmentID,
          treatmentName,
          price,
          discount,
          totalAmount,
          date,
          doctorID,
          modeOfPayment,
          owner,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createPatientTreatment.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PatientTreatmentCreateForm")}
      {...rest}
    >
      <TextField
        label="Invoice number"
        isRequired={false}
        isReadOnly={false}
        value={invoiceNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              invoiceNumber: value,
              patientID,
              treatmentID,
              treatmentName,
              price,
              discount,
              totalAmount,
              date,
              doctorID,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.invoiceNumber ?? value;
          }
          if (errors.invoiceNumber?.hasError) {
            runValidationTasks("invoiceNumber", value);
          }
          setInvoiceNumber(value);
        }}
        onBlur={() => runValidationTasks("invoiceNumber", invoiceNumber)}
        errorMessage={errors.invoiceNumber?.errorMessage}
        hasError={errors.invoiceNumber?.hasError}
        {...getOverrideProps(overrides, "invoiceNumber")}
      ></TextField>
      <TextField
        label="Patient id"
        isRequired={true}
        isReadOnly={false}
        value={patientID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID: value,
              treatmentID,
              treatmentName,
              price,
              discount,
              totalAmount,
              date,
              doctorID,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.patientID ?? value;
          }
          if (errors.patientID?.hasError) {
            runValidationTasks("patientID", value);
          }
          setPatientID(value);
        }}
        onBlur={() => runValidationTasks("patientID", patientID)}
        errorMessage={errors.patientID?.errorMessage}
        hasError={errors.patientID?.hasError}
        {...getOverrideProps(overrides, "patientID")}
      ></TextField>
      <TextField
        label="Treatment id"
        isRequired={true}
        isReadOnly={false}
        value={treatmentID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID: value,
              treatmentName,
              price,
              discount,
              totalAmount,
              date,
              doctorID,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.treatmentID ?? value;
          }
          if (errors.treatmentID?.hasError) {
            runValidationTasks("treatmentID", value);
          }
          setTreatmentID(value);
        }}
        onBlur={() => runValidationTasks("treatmentID", treatmentID)}
        errorMessage={errors.treatmentID?.errorMessage}
        hasError={errors.treatmentID?.hasError}
        {...getOverrideProps(overrides, "treatmentID")}
      ></TextField>
      <TextField
        label="Treatment name"
        isRequired={true}
        isReadOnly={false}
        value={treatmentName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID,
              treatmentName: value,
              price,
              discount,
              totalAmount,
              date,
              doctorID,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.treatmentName ?? value;
          }
          if (errors.treatmentName?.hasError) {
            runValidationTasks("treatmentName", value);
          }
          setTreatmentName(value);
        }}
        onBlur={() => runValidationTasks("treatmentName", treatmentName)}
        errorMessage={errors.treatmentName?.errorMessage}
        hasError={errors.treatmentName?.hasError}
        {...getOverrideProps(overrides, "treatmentName")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID,
              treatmentName,
              price: value,
              discount,
              totalAmount,
              date,
              doctorID,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Discount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={discount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID,
              treatmentName,
              price,
              discount: value,
              totalAmount,
              date,
              doctorID,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.discount ?? value;
          }
          if (errors.discount?.hasError) {
            runValidationTasks("discount", value);
          }
          setDiscount(value);
        }}
        onBlur={() => runValidationTasks("discount", discount)}
        errorMessage={errors.discount?.errorMessage}
        hasError={errors.discount?.hasError}
        {...getOverrideProps(overrides, "discount")}
      ></TextField>
      <TextField
        label="Total amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalAmount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID,
              treatmentName,
              price,
              discount,
              totalAmount: value,
              date,
              doctorID,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.totalAmount ?? value;
          }
          if (errors.totalAmount?.hasError) {
            runValidationTasks("totalAmount", value);
          }
          setTotalAmount(value);
        }}
        onBlur={() => runValidationTasks("totalAmount", totalAmount)}
        errorMessage={errors.totalAmount?.errorMessage}
        hasError={errors.totalAmount?.hasError}
        {...getOverrideProps(overrides, "totalAmount")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID,
              treatmentName,
              price,
              discount,
              totalAmount,
              date: value,
              doctorID,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Doctor id"
        isRequired={false}
        isReadOnly={false}
        value={doctorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID,
              treatmentName,
              price,
              discount,
              totalAmount,
              date,
              doctorID: value,
              modeOfPayment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.doctorID ?? value;
          }
          if (errors.doctorID?.hasError) {
            runValidationTasks("doctorID", value);
          }
          setDoctorID(value);
        }}
        onBlur={() => runValidationTasks("doctorID", doctorID)}
        errorMessage={errors.doctorID?.errorMessage}
        hasError={errors.doctorID?.hasError}
        {...getOverrideProps(overrides, "doctorID")}
      ></TextField>
      <TextField
        label="Mode of payment"
        isRequired={false}
        isReadOnly={false}
        value={modeOfPayment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID,
              treatmentName,
              price,
              discount,
              totalAmount,
              date,
              doctorID,
              modeOfPayment: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.modeOfPayment ?? value;
          }
          if (errors.modeOfPayment?.hasError) {
            runValidationTasks("modeOfPayment", value);
          }
          setModeOfPayment(value);
        }}
        onBlur={() => runValidationTasks("modeOfPayment", modeOfPayment)}
        errorMessage={errors.modeOfPayment?.errorMessage}
        hasError={errors.modeOfPayment?.hasError}
        {...getOverrideProps(overrides, "modeOfPayment")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              invoiceNumber,
              patientID,
              treatmentID,
              treatmentName,
              price,
              discount,
              totalAmount,
              date,
              doctorID,
              modeOfPayment,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
