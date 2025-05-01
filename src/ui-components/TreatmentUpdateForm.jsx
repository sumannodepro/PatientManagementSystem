/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getTreatment } from "../graphql/queries";
import { updateTreatment } from "../graphql/mutations";
export default function TreatmentUpdateForm(props) {
  const {
    id: idProp,
    treatment: treatmentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    treatmentName: "",
    price: "",
    description: "",
    doctorID: "",
    category: "",
    duration: "",
    discount: "",
    insuranceCovered: false,
    notes: "",
    imageUrl: "",
    owner: "",
  };
  const [treatmentName, setTreatmentName] = React.useState(
    initialValues.treatmentName
  );
  const [price, setPrice] = React.useState(initialValues.price);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [doctorID, setDoctorID] = React.useState(initialValues.doctorID);
  const [category, setCategory] = React.useState(initialValues.category);
  const [duration, setDuration] = React.useState(initialValues.duration);
  const [discount, setDiscount] = React.useState(initialValues.discount);
  const [insuranceCovered, setInsuranceCovered] = React.useState(
    initialValues.insuranceCovered
  );
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [imageUrl, setImageUrl] = React.useState(initialValues.imageUrl);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = treatmentRecord
      ? { ...initialValues, ...treatmentRecord }
      : initialValues;
    setTreatmentName(cleanValues.treatmentName);
    setPrice(cleanValues.price);
    setDescription(cleanValues.description);
    setDoctorID(cleanValues.doctorID);
    setCategory(cleanValues.category);
    setDuration(cleanValues.duration);
    setDiscount(cleanValues.discount);
    setInsuranceCovered(cleanValues.insuranceCovered);
    setNotes(cleanValues.notes);
    setImageUrl(cleanValues.imageUrl);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [treatmentRecord, setTreatmentRecord] =
    React.useState(treatmentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getTreatment.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTreatment
        : treatmentModelProp;
      setTreatmentRecord(record);
    };
    queryData();
  }, [idProp, treatmentModelProp]);
  React.useEffect(resetStateValues, [treatmentRecord]);
  const validations = {
    treatmentName: [{ type: "Required" }],
    price: [{ type: "Required" }],
    description: [],
    doctorID: [],
    category: [],
    duration: [],
    discount: [],
    insuranceCovered: [],
    notes: [],
    imageUrl: [],
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
          treatmentName,
          price,
          description: description ?? null,
          doctorID: doctorID ?? null,
          category: category ?? null,
          duration: duration ?? null,
          discount: discount ?? null,
          insuranceCovered: insuranceCovered ?? null,
          notes: notes ?? null,
          imageUrl: imageUrl ?? null,
          owner: owner ?? null,
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
            query: updateTreatment.replaceAll("__typename", ""),
            variables: {
              input: {
                id: treatmentRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TreatmentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Treatment name"
        isRequired={true}
        isReadOnly={false}
        value={treatmentName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              treatmentName: value,
              price,
              description,
              doctorID,
              category,
              duration,
              discount,
              insuranceCovered,
              notes,
              imageUrl,
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
              treatmentName,
              price: value,
              description,
              doctorID,
              category,
              duration,
              discount,
              insuranceCovered,
              notes,
              imageUrl,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              treatmentName,
              price,
              description: value,
              doctorID,
              category,
              duration,
              discount,
              insuranceCovered,
              notes,
              imageUrl,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
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
              treatmentName,
              price,
              description,
              doctorID: value,
              category,
              duration,
              discount,
              insuranceCovered,
              notes,
              imageUrl,
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
        label="Category"
        isRequired={false}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              treatmentName,
              price,
              description,
              doctorID,
              category: value,
              duration,
              discount,
              insuranceCovered,
              notes,
              imageUrl,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <TextField
        label="Duration"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={duration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              treatmentName,
              price,
              description,
              doctorID,
              category,
              duration: value,
              discount,
              insuranceCovered,
              notes,
              imageUrl,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.duration ?? value;
          }
          if (errors.duration?.hasError) {
            runValidationTasks("duration", value);
          }
          setDuration(value);
        }}
        onBlur={() => runValidationTasks("duration", duration)}
        errorMessage={errors.duration?.errorMessage}
        hasError={errors.duration?.hasError}
        {...getOverrideProps(overrides, "duration")}
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
              treatmentName,
              price,
              description,
              doctorID,
              category,
              duration,
              discount: value,
              insuranceCovered,
              notes,
              imageUrl,
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
      <SwitchField
        label="Insurance covered"
        defaultChecked={false}
        isDisabled={false}
        isChecked={insuranceCovered}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              treatmentName,
              price,
              description,
              doctorID,
              category,
              duration,
              discount,
              insuranceCovered: value,
              notes,
              imageUrl,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.insuranceCovered ?? value;
          }
          if (errors.insuranceCovered?.hasError) {
            runValidationTasks("insuranceCovered", value);
          }
          setInsuranceCovered(value);
        }}
        onBlur={() => runValidationTasks("insuranceCovered", insuranceCovered)}
        errorMessage={errors.insuranceCovered?.errorMessage}
        hasError={errors.insuranceCovered?.hasError}
        {...getOverrideProps(overrides, "insuranceCovered")}
      ></SwitchField>
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              treatmentName,
              price,
              description,
              doctorID,
              category,
              duration,
              discount,
              insuranceCovered,
              notes: value,
              imageUrl,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
      ></TextField>
      <TextField
        label="Image url"
        isRequired={false}
        isReadOnly={false}
        value={imageUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              treatmentName,
              price,
              description,
              doctorID,
              category,
              duration,
              discount,
              insuranceCovered,
              notes,
              imageUrl: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.imageUrl ?? value;
          }
          if (errors.imageUrl?.hasError) {
            runValidationTasks("imageUrl", value);
          }
          setImageUrl(value);
        }}
        onBlur={() => runValidationTasks("imageUrl", imageUrl)}
        errorMessage={errors.imageUrl?.errorMessage}
        hasError={errors.imageUrl?.hasError}
        {...getOverrideProps(overrides, "imageUrl")}
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
              treatmentName,
              price,
              description,
              doctorID,
              category,
              duration,
              discount,
              insuranceCovered,
              notes,
              imageUrl,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || treatmentModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || treatmentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
