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
  const [todoItem, setTodoItem] = useState({
    name: "",
    toDoListId: -1

  });
  const [allColour, setAllColour] = useState([]);
  const [todoList, setTodoList] = useState([]);

  const onChange = (name: any, value: any) => {
    setTodoItem({ ...todoItem, [name]: value });
  };
  useEffect(() => {
    debugger
    getGetToDoList(props.color.globalCodeId)
  }, [props.color]);

  useEffect(() => {
    API.get(API_URLS.GlobalCode, {
      params: { CategoryName: "ColourType", GlobalCodeId: "-1" },
    }).then((response: any) => {
      setAllColour(response);
    });
    getGetToDoList(-1);
  }, []);

  function checksubmit(e: any) {
    debugger
    if (validator.allValid()) {
      API.post(API_URLS.AddToDoList, { toDoListId: null, colourId: e.globalCodeId, text: todoItem.name, actionPerformedBy: null }).then((response: any) => {
        SuccessToast(response.responseMessage)
        setTodoItem({ ...todoItem, name: "" });
        getGetToDoList(-1);
      });
    } else {
      showValidationMessage(true);
    }
  }
  const getGetToDoList = (colorId: any) => {
    debugger
    API.get(API_URLS.GetToDoList, { params: { ToDoListId: -1, ColourId: colorId, PageNo: 1, PageSize: 1000, SearchValue: "", SortColumn: "", SortOrder: "" } }).then((response: any) => {
      setTodoList(response);
    });
  }
  const editToDoItem = (todo: any) => {
    setTodoItem({
      name: todo.text,
      toDoListId: todo.toDoListId
    });
  }
  const cancleToDoItem = () => {
    setTodoItem({
      name: "",
      toDoListId: -1
    });
  }
  const DeletedToDoList = () => {
    API.delete(API_URLS.DeletedToDoList, { params: { ToDoListId: todoItem.toDoListId, ActionPerformedBy: null } }).then((response: any) => {
      SuccessToast(response.responseMessage)
      setTodoItem({
        name: "",
        toDoListId: -1
      });
      getGetToDoList(-1);
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
              value={todoItem.name}
              simpleValidator={validator}
              handleChange={onChange}
              customValidator="required"
              customMessage={{ required: "This field is required" }}
            />
          </FormElement>
          <button onClick={() => DeletedToDoList()}>delete</button>
          <button onClick={() => cancleToDoItem()}>cancle</button>

          <ColorBoxContainer>
            {allColour?.map((x: any) => {
              return <ColorBox style={{ backgroundColor: x.codeName }} onClick={() => checksubmit(x)} />
            })}
          </ColorBoxContainer>

        </MainContainer>
        <TodoNotes>
          {todoList?.length > 0 ?
            todoList?.map((todo: any) => {
              return <ColorContentBox onClick={() => editToDoItem(todo)} style={{ backgroundColor: todo.codeName }}> {todo.text}</ColorContentBox>
            }) : <Heading> No Todo Notes </Heading>}

        </TodoNotes>
      </DashBoardWrapper>
    </>
  );
};

export default DashBoard;
