import {
  DashBoardWrapper,
  MainContainer,
  ColorBox,
  FormElement,
  ColorBoxContainer,
  ColorContentBox,
  TodoNotes,
  Heading,
  DeleteBtn,
} from "./style";
import InputValidator from "../Form/input";
import { useState, useEffect } from "react";
import { API_URLS } from "../../config/ApiUrls";
import API from "../../services/Api.Service";
import useValidator from "../../hooks/useValidator";
import { SuccessToast } from "../../components/Toaster";
import { Icon } from "semantic-ui-react";
import { IAddTodoItem, IGlobalCode, ITodoItem } from "../../models/Interfaces/IGlobalCode";
import { IDashBordProps } from "../../models/Interfaces/IDashBord";
const DashBoard = ({color}:IDashBordProps) => {
  const [validator, showValidationMessage] = useValidator();
  const [todoItem, setTodoItem] = useState<IAddTodoItem>({name: "",toDoListId: null,globalCodeId:-1});
  const [allColour, setAllColour] = useState<IGlobalCode[] | null>(null);
  const [filteredColour, setFilteredColour] = useState<IGlobalCode[] | null>(null);

  const [todoList, setTodoList] = useState([]);

  const onChange = (name: string, value: string) => {
    setTodoItem({ ...todoItem, [name]: value });
  };
  useEffect(() => {
    getGetToDoList();
    if(color?.globalCodeId){
      const filtered:IGlobalCode[] =  allColour?.filter((filtred:IGlobalCode)=>{
        return filtred.globalCodeId === color.globalCodeId
      }) as IGlobalCode[];
      setFilteredColour(filtered);
    }
    else{
      setFilteredColour(allColour);
    }
  }, [color]);

  useEffect(() => {
    API.get(API_URLS.GlobalCode, {
      params: { CategoryName: "ColourType", GlobalCodeId: "-1" },
    }).then((response: any) => {
      setAllColour(response);
      setFilteredColour(response);
    });
  }, []);

  function checksubmit(e: any) {
    if (validator.allValid()) {
      API.post(API_URLS.AddToDoList, { toDoListId: todoItem.toDoListId, colourId: e.globalCodeId, text: todoItem.name, actionPerformedBy: null }).then((response: any) => {
        SuccessToast(response.responseMessage)
        setTodoItem({ ...todoItem, name: "", toDoListId: null});
        getGetToDoList();
      });
    } else {
      showValidationMessage(true);
    }
  }
  const getGetToDoList = () => {
    API.get(API_URLS.GetToDoList, { params: { ToDoListId: -1, ColourId: color?.globalCodeId ?? -1, PageNo: 1, PageSize: 1000, SearchValue: "", SortColumn: "", SortOrder: "" } }).then((response: any) => {
      setTodoList(response);
    });
  }
  const editToDoItem = (todo: ITodoItem) => {
    setTodoItem({ name: todo.text, toDoListId: todo.toDoListId,globalCodeId:todo.colourId});
  }
  const cancelTodoItem = () => {
    setTodoItem({name: "",toDoListId: null,globalCodeId:-1});
  }
  const DeletedToDoList = () => {
    API.delete(API_URLS.DeletedToDoList, { params: { ToDoListId: todoItem.toDoListId, ActionPerformedBy: null } }).then((response: any) => {
      SuccessToast(response.responseMessage)
      cancelTodoItem();
      getGetToDoList();
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
          {todoItem?.toDoListId  && <Icon className="cancel" onClick={() => cancelTodoItem()} title="Cancel" name="cancel"/>}
          </FormElement>
          <DeleteBtn onClick={() => DeletedToDoList()}>
          {todoItem?.toDoListId &&  <Icon className="trash" title="trash" name="trash"/>}
           </DeleteBtn>
          <ColorBoxContainer>
            {filteredColour?.map((color: IGlobalCode) => {
              let selected = color.globalCodeId === todoItem.globalCodeId
              return <ColorBox style={{ backgroundColor: color.codeName }} className={`${selected}?"selected":""`} onClick={() => checksubmit(color)} />
            })}
          </ColorBoxContainer>
        </MainContainer>
        <TodoNotes>
          {todoList?.length > 0 ?
            todoList?.map((todo: ITodoItem) => {
              return <ColorContentBox style={{ backgroundColor: todo.codeName }}> {todo.text} <Icon name="pencil alternate" onClick={() => editToDoItem(todo)}/></ColorContentBox>
            }) : <Heading> No Todo Notes </Heading>}

        </TodoNotes>
      </DashBoardWrapper>
    </>
  );
};

export default DashBoard;
