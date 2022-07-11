import { SideBarWrapper, Header, ColorList, Colors } from "./style";
import { useState, useEffect } from "react";
import { API_URLS } from "../../config/ApiUrls";
import API from "../../services/Api.Service";
import DashBoard from "../../pages/DashBoard";



function SideBar(props: any) {
  const [allColour, setAllColour] = useState([]);
  useEffect(() => {
    API.get(API_URLS.GlobalCode, {
      params: { CategoryName: "ColourType", GlobalCodeId: "-1" },
    }).then((response: any) => {
      setAllColour(response);
    });
  }, []);

  const onFilterColor = (color: any) => {
    // let selectedItem = { color }
    debugger
    props.setColor(color);
    // localStorage.setItem("selectedItem", JSON.stringify(color));
  }
  return (
    <SideBarWrapper>
      <Header>Filters</Header>
      <ColorList>
        {allColour?.map((color: any) => {
          return <Colors style={{ backgroundColor: color.codeName }} onClick={() => onFilterColor(color)} />
        })}
      </ColorList>
      {/* <DashBoard></DashBoard> */}
    </SideBarWrapper>
  );
}

export default SideBar;
