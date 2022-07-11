import { DashBoardWrapper, MainContainer, ColorBox, FormElement, ClorBoxContainer } from "./style";
import { Input } from "semantic-ui-react";
import InputValidator from "../Form/input"
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react"
import { API_URLS } from "../../config/ApiUrls";
import API from "../../services/Api.Service";
import useValidator from "../../hooks/useValidator";
const DashBoard = (props: any) => {
  const [validator, showValidationMessage] = useValidator();
  const [colorCombination, setEditUser] = useState({
    color: "",
    colorId: null,
    name: "",
  });
  const [allColour, setAllColour] = useState([]);

  const onChange = (name: any, value: any) => {
    setEditUser({ ...colorCombination, [name]: value, });
  }
  useEffect(() => {
    API.get(API_URLS.GlobalCode, { params: { CategoryName: "ColourType", GlobalCodeId: "-1" } }).then((response: any) => {
      setAllColour(response);
    });
  }, [])

  function checksubmit(e: any) {
    if (validator.allValid()) {
    } else {
      showValidationMessage(true);
    }
  }

  return (
    <>
      <DashBoardWrapper>
        <MainContainer>
          <FormElement>
            <label>  Enter your Todo Task</label>
            <InputValidator
              type={"text"}
              name={"name"}
              value={colorCombination.name}
              simpleValidator={validator}
              handleChange={onChange}
              customValidator="required"
              customMessage={{ required: "this field is required" }}
            />
          </FormElement>
          <ClorBoxContainer>

            <ColorBox style={{ backgroundColor: "#b0d8f5" }} />
            <ColorBox style={{ backgroundColor: "#cc5af2" }} />

          </ClorBoxContainer>
        </MainContainer>
      </DashBoardWrapper>

    </>
  );
};

export default DashBoard;
