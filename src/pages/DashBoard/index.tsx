import {
  DashBoardWrapper,
  MainContainer,
  ColorBox,
  FormElement,
  ColorBoxContainer,
  ColorContentBox,
  TodoNotes,
  Heading,
} from "./style";
import InputValidator from "../Form/input";
import { useState, useEffect } from "react";
import { API_URLS } from "../../config/ApiUrls";
import API from "../../services/Api.Service";
import useValidator from "../../hooks/useValidator";
import { SuccessToast } from "../../components/Toaster";
const DashBoard = (props: any) => {
  const [validator, showValidationMessage] = useValidator();
  const [colorCombination, setEditUser] = useState({
    name: "",
  });
  const [allColour, setAllColour] = useState([]);

  const [todoList, setTodoList] = useState([]);

  const onChange = (name: any, value: any) => {
    setEditUser({ ...colorCombination, [name]: value });
  };
  useEffect(() => {
    API.get(API_URLS.GlobalCode, {
      params: { CategoryName: "ColourType", GlobalCodeId: "-1" },
    }).then((response: any) => {
      setAllColour(response);
    });
    getGetToDoList();
  }, []);

  function checksubmit(e: any) {
    if (validator.allValid()) {
      API.post(API_URLS.AddToDoList, { toDoListId: null, colourId: e.globalCodeId, text: colorCombination.name, actionPerformedBy: null }).then((response: any) => {
        SuccessToast(response.responseMessage)
        getGetToDoList();
      });
    } else {
      showValidationMessage(true);
    }
  }
  const getGetToDoList = () => {
    API.get(API_URLS.GetToDoList, { params: { ToDoListId: -1, ColourId: -1, PageNo: 1, PageSize: 1000, SearchValue: "", SortColumn: "", SortOrder: "" } }).then((response: any) => {
      setTodoList(response);
    });
  }

  return (
    <>
      <DashBoardWrapper>
        <MainContainer>
          <FormElement>
            <label> Enter your Todo Task</label>
            <InputValidator
              type={"text"}
              name={"name"}
              value={colorCombination.name}
              simpleValidator={validator}
              handleChange={onChange}
              customValidator="required"
              customMessage={{ required: "This field is required" }}
            />
          </FormElement>

          <ColorBoxContainer>
            {allColour?.map((x: any) => {
              return <ColorBox style={{ backgroundColor: x.codeName }} onClick={() => checksubmit(x)} />
            })}
          </ColorBoxContainer>

        </MainContainer>
        <TodoNotes>
          {todoList?.length > 0 ?
            todoList?.map((todo: any) => {
              return <ColorContentBox style={{ backgroundColor: todo.codeName }}> {todo.text}</ColorContentBox>
            }) : <Heading> No Todo Notes </Heading>}

        </TodoNotes>
      </DashBoardWrapper>
    </>
  );
};

export default DashBoard;
