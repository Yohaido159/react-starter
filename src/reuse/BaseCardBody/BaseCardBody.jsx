import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useBreakpoints } from "../../utils/utils";
// import { selectPassData } from "../../../redux/global/global.selectors";

import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";

// import FormTextField from "../../../reuse-components/styles/FormTextField/FormTextField";

const BaseCardBody = (props) => {
  const {
    children,
    className = "",
    style = {},
    options = {},
    styleOptions = {},
  } = props;
  const { withDelete = false, deleteButton = { onClick: () => {} } } = options;
  const { className3 } = styleOptions;
  const bp = useBreakpoints();

  const handleOnClick = (button) => (e) => {
    e.stopPropagation();
    button.onClick && button.onClick();
  };
  console.log("children", children);
  return (
    <div className={`${className} `} style={style}>
      <Grid container className="position-relative">
        {withDelete && !bp.isPhone && (
          <Grid
            item
            xs
            className="flex-grow-0 nowrap d-flex justify-content-center align-items-center ml-3 "
          >
            <IconButton onClick={handleOnClick(deleteButton)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}

        <Grid item xs className={`border p-3 ${className3}`}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
  //   const {
  //     title,
  //     subTitle,
  //     idForPassData,
  //     newTitlePath = "none",
  //     id,
  //     label,
  //     rtl = "rtl",
  //     itemName,
  //     defaultLabel,
  //     labelRow,
  //     backgroundColorTitle,
  //     onClick = () => {},
  //     setEditWithContent,
  //     fs = "fs-32",
  //     withoutPadding = true,
  //     withoutChildPadding = false,
  //     buttons = [],
  //     className = "",
  //     className2 = "",
  //     className3 = "",
  //     variant = "outlined",
  //     ref,
  //     style = {},
  //     style2 = {},
  //     style3 = {},
  //     elevation,
  //     children,
  //     button,
  //     withDelete = false,
  //     deleteButton,
  //     ...other
  //   } = props;
  //   const [editTitle, setEditTitle] = useState(false);
  //   //console.log("newTitlePath", newTitlePath);
  //   console.log("buttons", buttons);
  //   //console.log("title", title);
  //   const newTitle = useSelector((state) => selectPassData(state, newTitlePath));
  //   //console.log("newTitle", newTitle);
  //
  //   return (
  //     <div
  //       className={`${withoutPadding ? " " : "p-4"} ${
  //         rtl ? rtl : "rtl"
  //       }   ${className}`}
  //       ref={ref}
  //       style={{ width: "100%", ...style }}
  //       onClick={onClick}
  //     >
  //       <Card
  //         variant={variant}
  //         elevation={elevation ? elevation : 0}
  //         className={`${className2} `}
  //         style={{
  //           minHeight: "inherit",
  //           height: "inherit",
  //           backgroundColor: "inherit",
  //           ...style2,
  //         }}
  //       >
  //         {title && (
  //           <CardContent {...other} className="p-0 position-relative">
  //             <Grid
  //               container
  //               style={{
  //                 backgroundColor: backgroundColorTitle
  //                   ? backgroundColorTitle
  //                   : "var(--color-background-dropdown-item-hover)",
  //               }}
  //             >
  //               <Grid item xs>
  //                 <h4 className={` ${fs}`}>
  //                   {editTitle ? (
  //                     <FormTextField
  //                       itemName={itemName ? itemName : "name"}
  //                       initText={newTitle ? newTitle : title}
  //                       style={{ backgroundColor: "white" }}
  //                       type="text"
  //                       className="mr-2"
  //                       defaultLabel={defaultLabel ? defaultLabel : "אנא הזן.."}
  //                       idForPassData={idForPassData}
  //                       id={id}
  //                       required
  //                     />
  //                   ) : (
  //                     <React.Fragment>
  //                       <div
  //                         className={`pr-3 ${
  //                           subTitle ? "pt-3 pl-3 pr-3 pb-2" : "p-3"
  //                         } `}
  //                       >
  //                         {newTitle ? newTitle : title}
  //                       </div>
  //                       {subTitle && (
  //                         <div className="pr-3 pb-3 pl-3 fs-37">{subTitle}</div>
  //                       )}
  //                     </React.Fragment>
  //                   )}
  //                 </h4>
  //               </Grid>
  //               {withIds(buttons).map((button) => (
  //                 <Grid
  //                   key={button.id}
  //                   item
  //                   xs
  //                   className="flex-grow-0 nowrap d-flex justify-content-center align-items-center ml-3 "
  //                 >
  //                   <IconButton onClick={handleOnClick(button)}>
  //                     {button.icon}
  //                   </IconButton>
  //                 </Grid>
  //               ))}
  //               {withDelete && (
  //                 <Grid
  //                   item
  //                   xs
  //                   className="flex-grow-0 nowrap d-flex justify-content-center align-items-center ml-3 "
  //                 >
  //                   <IconButton onClick={handleOnClick(deleteButton)}>
  //                     <DeleteIcon />
  //                   </IconButton>
  //                 </Grid>
  //               )}
  //             </Grid>
  //             <hr className="m-0" />
  //           </CardContent>
  //         )}
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: labelRow ? "start" : "center",
  //             height: "inherit",
  //             flexDirection: labelRow ? "row" : "column",
  //             position: "relative",
  //             ...style3,
  //           }}
  //           className={`${withoutChildPadding ? "" : "p-3"} ${className3} `}
  //         >
  //           {label && (
  //             <div>
  //               {withDelete && !title && (
  //                 <Grid
  //                   item
  //                   xs
  //                   className="flex-grow-0 nowrap d-flex justify-content-center align-items-center ml-3 "
  //                 >
  //                   <IconButton onClick={handleOnClick(deleteButton)}>
  //                     <DeleteIcon />
  //                   </IconButton>
  //                 </Grid>
  //               )}
  //               <span className="ml-2 mb-2">{label}:</span>
  //             </div>
  //           )}
  //           {withDelete && !title && !label && (
  //             <Grid
  //               item
  //               xs
  //               className="position-absolute top-0 left-0 flex-grow-0 nowrap mt-1 ml-3 "
  //             >
  //               <IconButton onClick={handleOnClick(deleteButton)}>
  //                 <DeleteIcon />
  //               </IconButton>
  //             </Grid>
  //           )}
  //           {children}
  //         </div>
  //       </Card>
  //     </div>
  //   );
};

export default BaseCardBody;
