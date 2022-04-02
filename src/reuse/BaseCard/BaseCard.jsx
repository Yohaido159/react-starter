import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { withIds } from "../../../utils/utils";
// import { useBrackpoints } from "../../../hooks/manyHooks";
// import { closeModal } from "../../../redux/UI/UI.actions";
// import { selectPassData } from "../../../redux/global/global.selectors";
// import { selectIsListOpen } from "../../../redux/courses/courses.selectors";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// import FormTextField from "../../../reuse-components/styles/FormTextField/FormTextField";

const BaseCard = (props) => {
  const {
    title,
    id,
    idForPassData,
    className = "",
    style = {},
    styleOptions = {
      fs: "",
      withPadding: false,
      withChildPadding: false,
      className2: "",
      style2: {},
      className3: "",
      style3: {},
      withBorderRadius: false,
      innerBorder: false,
    },
    options = {
      isExpanded: false,
      withClose: false,
      buttons: [],
    },
    variant,
    children,
    ref,
    ...other
  } = props;

  const dispatch = useDispatch();

  return (
    <div className={`${className} w-100`} style={style}>
      <Card variant={variant} className="w-100">
        {title && true && (
          <div
            style={{
              backgroundColor: "var(--color-blue)",
              color: "var(--color-white)",
            }}
            className="pb-3 pl-3 pr-3 pt-3 mb-3 "
          >
            <h2 className={styleOptions.fs}>{title}</h2>
          </div>
        )}
        <div className="p-3">{children}</div>
      </Card>
    </div>
  );

  /*
     // <div
    //   onClick={onClick}
    //   className={`${
    //     withoutPadding ? " " : downSM ? "p-1" : "p-4"
    //   }  rtl  ${className}`}
    //   ref={ref}
    //   style={{
    //     width: "100%",
    //     ...style,
    //   }}
    // >
    //   <Card
    //     variant={variant}
    //     elevation={variant === "elevation" ? 3 : 0}
    //     className={`${className2} d-flex flex-column `}
    //     style={{
    //       minHeight: "inherit",
    //       height: "inherit",
    //       border: "unset",
    //       borderRadius: withBorderRadius ? "36px" : "unset",
    //       ...style2,
    //     }}
    //   >
    //     {title && (
    //       <CardContent
    //         {...other}
    //         style={{
    //           borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    //           borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    //           borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    //         }}
    //         onClick={isExpandedState && toggle}
    //         className={` p-0 position-relative`}
    //       >
    //         <Grid
    //           className={`${isExpandedState ? "cursor-pointer" : ""}`}
    //           container
    //           style={{
    //             background: "var(--color-background-dropdown-item-hover)",
    //             ...styleTitle,
    //           }}
    //         >
    //           {withClose && (
    //             <Grid
    //               item
    //               xs
    //               className="flex-grow-0 nowrap d-flex justify-content-center align-items-center ml-3"
    //             >
    //               <IconButton onClick={handleClose}>
    //                 <HighlightOffIcon />
    //               </IconButton>
    //             </Grid>
    //           )}
    //           <Grid item xs>
    //             <h4 className={`${fs}`}>
    //               {editTitle ? (
    //                 <FormTextField
    //                   initText={newTitle ? newTitle : title}
    //                   style={{ backgroundColor: "white" }}
    //                   type="text"
    //                   itemName={itemName}
    //                   className="mr-2"
    //                   defaultLabel="אנא הזן את שם הקטגוריה.."
    //                   idForPassData={idForPassData}
    //                   id={id}
    //                   required
    //                 />
    //               ) : (
    //                 <div className="p-3">{newTitle ? newTitle : title}</div>
    //               )}
    //             </h4>
    //           </Grid>
    //           {withIds(buttons).map((button) => (
    //             <Grid
    //               key={button.id}
    //               item
    //               xs
    //               className="flex-grow-0 nowrap d-flex justify-content-center align-items-center "
    //             >
    //               <IconButton onClick={handleOnClick(button)}>
    //                 {button.icon}
    //               </IconButton>
    //             </Grid>
    //           ))}

    //           <Grid
    //             item
    //             xs
    //             className="flex-grow-0 nowrap d-flex justify-content-center align-items-center ml-3"
    //           >
    //             <IconButton>
    //               {isExpandedState === "open" && <ExpandLessIcon />}
    //               {isExpandedState === "close" && <ExpandMoreIcon />}
    //             </IconButton>
    //           </Grid>
    //         </Grid>
    //         <hr className="m-0" />
    //       </CardContent>
    //     )}
    //     {(isExpandedState === "open" || !isExpandedState) && !isInvisible && (
    //       <div
    //         style={{
    //           borderBottom: innerBorder
    //             ? "1px solid rgba(0, 0, 0, 0.12)"
    //             : "unset",
    //           borderRight: innerBorder
    //             ? "1px solid rgba(0, 0, 0, 0.12)"
    //             : "unset",
    //           borderLeft: innerBorder
    //             ? "1px solid rgba(0, 0, 0, 0.12)"
    //             : "unset",
    //           ...style3,
    //         }}
    //         className={`${className3} ${
    //           withoutChildPadding ? "" : "p-3"
    //         } flex-grow-1`}
    //       >
    //         {children}
    //       </div>
    //     )}
    //   </Card>
    // </div>
    */
  // const isListOpen = useSelector(state => selectIsListOpen(state, forOpenClose));

  // const [isExpandedState, setIsExpandedState] = useState(isExpanded);
  // const [editTitle, setEditTitle] = useState(false);
  // const newTitle = useSelector(state => selectPassData(state, newTitlePath));
  // //console.log("newTitle", newTitle);
  // const toggle = () => {
  //   if (isExpandedState === "open") {
  //     setIsExpandedState("close");
  //   } else if (isExpandedState === "close") {
  //     setIsExpandedState("open");
  //   }
  // };

  // useEffect(() => {
  //   if (isListOpen === true) {
  //     setIsExpandedState("open");
  //   } else if (isListOpen === false) {
  //     setIsExpandedState("close");
  //   }
  // }, [isListOpen]);

  // useEffect(() => {
  //   if (isExpanded === "open") {
  //     setIsExpandedState("open");
  //   }
  // }, [isExpanded]);

  // const handleClose = e => {
  //   e.stopPropagation();
  //   if (config.close === "modal") {
  //     dispatch(closeModal(config.modalName));
  //   }
  // };

  // const handleOnClick = button => e => {
  //   e.stopPropagation();
  //   button.onClick && button.onClick();
  //   if (button.type === "edit") {
  //     setEditTitle(editTitle => !editTitle);
  //   }
  // };

  // return (
  //   <div
  //     onClick={onClick}
  //     className={`${withoutPadding ? " " : downSM ? "p-1" : "p-4"}  rtl  ${className}`}
  //     ref={ref}
  //     style={{
  //       width: "100%",
  //       ...style
  //     }}
  //   >
  //     <Card
  //       variant={variant}
  //       elevation={variant === "elevation" ? 3 : 0}
  //       className={`${className2} d-flex flex-column `}
  //       style={{
  //         minHeight: "inherit",
  //         height: "inherit",
  //         border: "unset",
  //         borderRadius: withBorderRadius ? "36px" : "unset",
  //         ...style2
  //       }}
  //     >
  //       {title && (
  //         <CardContent
  //           {...other}
  //           style={{
  //             borderTop: "1px solid rgba(0, 0, 0, 0.12)",
  //             borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  //             borderLeft: "1px solid rgba(0, 0, 0, 0.12)"
  //           }}
  //           onClick={isExpandedState && toggle}
  //           className={` p-0 position-relative`}
  //         >
  //           <Grid
  //             className={`${isExpandedState ? "cursor-pointer" : ""}`}
  //             container
  //             style={{ background: "var(--color-background-dropdown-item-hover)", ...styleTitle }}
  //           >
  //             {withClose && (
  //               <Grid
  //                 item
  //                 xs
  //                 className="flex-grow-0 nowrap d-flex justify-content-center align-items-center ml-3"
  //               >
  //                 <IconButton onClick={handleClose}>
  //                   <HighlightOffIcon />
  //                 </IconButton>
  //               </Grid>
  //             )}
  //             <Grid item xs>
  //               <h4 className={`${fs}`}>
  //                 {editTitle ? (
  //                   <FormTextField
  //                     initText={newTitle ? newTitle : title}
  //                     style={{ backgroundColor: "white" }}
  //                     type="text"
  //                     itemName={itemName}
  //                     className="mr-2"
  //                     defaultLabel="אנא הזן את שם הקטגוריה.."
  //                     idForPassData={idForPassData}
  //                     id={id}
  //                     required
  //                   />
  //                 ) : (
  //                   <div className="p-3">{newTitle ? newTitle : title}</div>
  //                 )}
  //               </h4>
  //             </Grid>
  //             {withIds(buttons).map(button => (
  //               <Grid
  //                 key={button.id}
  //                 item
  //                 xs
  //                 className="flex-grow-0 nowrap d-flex justify-content-center align-items-center "
  //               >
  //                 <IconButton onClick={handleOnClick(button)}>{button.icon}</IconButton>
  //               </Grid>
  //             ))}

  //             <Grid
  //               item
  //               xs
  //               className="flex-grow-0 nowrap d-flex justify-content-center align-items-center ml-3"
  //             >
  //               <IconButton>
  //                 {isExpandedState === "open" && <ExpandLessIcon />}
  //                 {isExpandedState === "close" && <ExpandMoreIcon />}
  //               </IconButton>
  //             </Grid>
  //           </Grid>
  //           <hr className="m-0" />
  //         </CardContent>
  //       )}
  //       {(isExpandedState === "open" || !isExpandedState) && !isInvisible && (
  //         <div
  //           style={{
  //             borderBottom: innerBorder ? "1px solid rgba(0, 0, 0, 0.12)" : "unset",
  //             borderRight: innerBorder ? "1px solid rgba(0, 0, 0, 0.12)" : "unset",
  //             borderLeft: innerBorder ? "1px solid rgba(0, 0, 0, 0.12)" : "unset",
  //             ...style3
  //           }}
  //           className={`${className3} ${withoutChildPadding ? "" : "p-3"} flex-grow-1`}
  //         >
  //           {children}
  //         </div>
  //       )}
  //     </Card>
  //   </div>
  // );
};

export default React.memo(BaseCard);
