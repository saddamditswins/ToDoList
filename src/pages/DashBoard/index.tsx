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
    <div className="container-view">
      <div className="ui input">
        <InputValidator
          type={"text"}
          name={"name"}
          value={colorCombination.name}
          simpleValidator={validator}
          handleChange={onChange}
          customValidator="required"
          customMessage={{ required: "this field is required" }}
        />
      </div>
      <Button onClick={checksubmit}>Primary</Button>
    </div >
  );
};

export default DashBoard;
