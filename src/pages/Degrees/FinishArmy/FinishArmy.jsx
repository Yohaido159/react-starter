import { useSelector, useDispatch } from "react-redux";

import { passDataSelector } from "../../../redux/global/global.selectors";
import { setPassData } from "../../../redux/global/global.actions";
import { funcBetweenDate } from "../../../utils/utils";

import FormTextField from "../../../reuse/FormTextField/FormTextField";

import Typography from "@mui/material/Typography";
import get from "lodash.get";
import set from "lodash.set";

const FinishArmy = (props) => {
  const { className = "", style = {}, idForPassData, road } = props;

  const dateEndArmyInYear = useSelector(
    passDataSelector(
      `${idForPassData}.thirdDegree.${road}.dateEndArmyInYear`,
      null
    )
  );

  const checkYear = (state) => {
    const endDate = get(
      state,
      `passData.${idForPassData}.thirdDegree.${road}.dateEndArmyInYear`
    );
    const now = new Date();
    const betweenDateRaw = endDate - now;
    const betweenDate = betweenDateRaw / (1000 * 60 * 60 * 24 * 30);
    set(
      state,
      `passData.${idForPassData}.thirdDegree.${road}.isEndArmyInYear`,
      betweenDate < 12
    );
  };

  return (
    <div className={`${className} `} style={style}>
      <FormTextField
        className="mb-3"
        textFromState={dateEndArmyInYear}
        idForPassData={`${idForPassData}`}
        styleOptions={{
          label: <Typography variant="h6">תאריך תת"ש</Typography>,
          defaultLabel: 'אנא הזן תאריך תת"ש..',
          withPadding: false,
          dateType: "mobile",
        }}
        options={{
          type: "date",
          func: checkYear,
        }}
        initText={new Date()}
        id={`thirdDegree.${road}.dateEndArmyInYear`}
      />
    </div>
  );
};

export default FinishArmy;
