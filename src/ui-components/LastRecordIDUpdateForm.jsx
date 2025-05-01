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
import { getLastRecordID } from "../graphql/queries";
import { updateLastRecordID } from "../graphql/mutations";
export default function LastRecordIDUpdateForm(props) {
  const {
    id: idProp,
    lastRecordID: lastRecordIDModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    lastPatientID: "",
    newPatientID: "",
    owner: "",
  };
  const [lastPatientID, setLastPatientID] = React.useState(
    initialValues.lastPatientID
  );
  const [newPatientID, setNewPatientID] = React.useState(
    initialValues.newPatientID
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lastRecordIDRecord
      ? { ...initialValues, ...lastRecordIDRecord }
      : initialValues;
    setLastPatientID(cleanValues.lastPatientID);
    setNewPatientID(cleanValues.newPatientID);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [lastRecordIDRecord, setLastRecordIDRecord] = React.useState(
    lastRecordIDModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getLastRecordID.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLastRecordID
        : lastRecordIDModelProp;
      setLastRecordIDRecord(record);
    };
    queryData();
  }, [idProp, lastRecordIDModelProp]);
  React.useEffect(resetStateValues, [lastRecordIDRecord]);
  const validations = {
    lastPatientID: [{ type: "Required" }],
    newPatientID: [{ type: "Required" }],
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
          lastPatientID,
          newPatientID,
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
            query: updateLastRecordID.replaceAll("__typename", ""),
            variables: {
              input: {
                id: lastRecordIDRecord.id,
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
      {...getOverrideProps(overrides, "LastRecordIDUpdateForm")}
      {...rest}
    >
      <TextField
        label="Last patient id"
        isRequired={true}
        isReadOnly={false}
        value={lastPatientID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastPatientID: value,
              newPatientID,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.lastPatientID ?? value;
          }
          if (errors.lastPatientID?.hasError) {
            runValidationTasks("lastPatientID", value);
          }
          setLastPatientID(value);
        }}
        onBlur={() => runValidationTasks("lastPatientID", lastPatientID)}
        errorMessage={errors.lastPatientID?.errorMessage}
        hasError={errors.lastPatientID?.hasError}
        {...getOverrideProps(overrides, "lastPatientID")}
      ></TextField>
      <TextField
        label="New patient id"
        isRequired={true}
        isReadOnly={false}
        value={newPatientID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastPatientID,
              newPatientID: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.newPatientID ?? value;
          }
          if (errors.newPatientID?.hasError) {
            runValidationTasks("newPatientID", value);
          }
          setNewPatientID(value);
        }}
        onBlur={() => runValidationTasks("newPatientID", newPatientID)}
        errorMessage={errors.newPatientID?.errorMessage}
        hasError={errors.newPatientID?.hasError}
        {...getOverrideProps(overrides, "newPatientID")}
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
              lastPatientID,
              newPatientID,
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
          isDisabled={!(idProp || lastRecordIDModelProp)}
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
              !(idProp || lastRecordIDModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
