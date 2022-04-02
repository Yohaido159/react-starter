import { useSelector, useDispatch } from "react-redux";

import useModelUsers from "../../models/users/users.models";

import { usersSelector } from "../../redux/users/users.selectors";
import { passDataSelector } from "../../redux/global/global.selectors";
import { parseDateString } from "../../utils/utils";

import Button from "@mui/material/Button";

import BaseCard from "../../reuse/BaseCard/BaseCard";
import FormTextField from "../../reuse/FormTextField/FormTextField";

const Info = (props) => {
  const { className = "", style = {} } = props;
  const idForPassData = "Info";
  const userMe = useSelector(usersSelector("items.me", {}));
  const newUser = useSelector(passDataSelector(`${idForPassData}.newUser`, {}));
  const UserModel = useModelUsers();

  const userName = `${userMe.first_name} ${userMe.last_name}`;
  const dob = parseDateString(`${userMe.dob}`);

  console.log("newUser", newUser);
  const handleClick = () => {
    const first_name = newUser.name.split(" ")[0];
    const last_name = newUser.name.split(" ").splice(1, 2).join(" ");
    let name = {};
    if ((!first_name && last_name) || (first_name && !last_name)) return;

    if (first_name === "" && last_name === "") {
      name = {
        first_name: userMe.first_name,
        last_name: userMe.last_name,
      };
    } else {
      name = {
        first_name,
        last_name,
      };
    }

    UserModel.updateItem({
      id: `user/${userMe.id}`,
      payload: {
        ...name,
        dob: newUser.dob
          ? newUser.dob.toISOString().split("T")[0]
          : dob.toISOString().split("T")[0],
      },
    });
  };

  return (
    <div className={`${className} `} style={style}>
      <BaseCard title="שנה פרטים אישיים">
        <FormTextField
          className="mb-3"
          textFromState={newUser.name ? newUser.name : userName}
          idForPassData={`${idForPassData}`}
          styleOptions={{
            label: "שם מלא",
            defaultLabel: userName
              ? userName
              : "אנא הזן את שם פרטי + שם משפחה..",
            withPadding: false,
          }}
          type="text"
          initText={userName}
          id={`newUser.name`}
        />
        <FormTextField
          className=" mb-2"
          textFromState={newUser.dob ? newUser.dob : dob}
          idForPassData={`${idForPassData}`}
          styleOptions={{
            withPadding: false,
            defaultLabel: "אנא הזן תאריך לידה..",
            label: "תאריך לידה",
            dateType: "mobile",
          }}
          options={{
            type: "date",
          }}
          initText={""}
          id={`newUser.dob`}
        />
        <div className="d-flex justify-content-center">
          <Button
            onClick={handleClick}
            variant="contained"
            className="mt-2 mb-2 fs-33"
          >
            שמור שנויים
          </Button>
        </div>
      </BaseCard>
    </div>
  );
};

export default Info;
