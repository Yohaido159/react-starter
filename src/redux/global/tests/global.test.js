import { useDispatch } from "react-redux";
import axios from "axios";
import includes from "lodash.includes";

import { urls } from "../../../utils/urls";
import { getUserToken } from "../../../utils/utils";
import { makeApiTest } from "../../../tests_helpers/utils";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockedDispatch = jest.fn();
const dispatch = useDispatch();
dispatch.mockReturnValue(mockedDispatch);
let tokenStorage = getUserToken();

describe("shold test SendToSagaProsess", () => {
  it("should be test POST", () => {
    makeApiTest(
      { data: {} },
      {
        actionsBefore: [],
        config: { headers: {} },
        url: urls.modals.courses.course.COURSE,
        method: "POST",
        payload: {
          name: "test Api",
          course_type: "videos",
        },
        actions: [
          {
            on: "success",
            payload: "data",
            func: (data) => {
              dispatch(
                this.reduxSetItem(data, "replace", { pathDataRedux: "" })
              );
            },
          },
        ],
      }
    );
  });
  it("should be test GET", () => {
    makeApiTest(
      { data: {} },
      {
        actionsBefore: [],
        config: { headers: {} },
        url: urls.modals.courses.course.COURSE,
        method: "GET",
        payload: {
          name: "test Api",
          course_type: "videos",
        },
        actions: [
          {
            on: "success",
            payload: "data",
            func: (data) => {
              dispatch(
                this.reduxSetItem(data, "replace", { pathDataRedux: "" })
              );
            },
          },
        ],
      }
    );
  });
  it("should be test PATCH", () => {
    makeApiTest(
      { data: {} },
      {
        actionsBefore: [],
        config: { headers: {} },
        url: urls.modals.courses.course.COURSE,
        method: "PATCH",
        payload: {
          name: "test Api",
          course_type: "videos",
        },
        actions: [
          {
            on: "success",
            payload: "data",
            func: (data) => {
              dispatch(
                this.reduxSetItem(data, "replace", { pathDataRedux: "" })
              );
            },
          },
        ],
      }
    );
  });
  it("should be test DELETE", () => {
    makeApiTest(
      { data: {} },
      {
        actionsBefore: [],
        config: { headers: {} },
        url: urls.modals.courses.course.COURSE,
        method: "DELETE",
        payload: {
          name: "test Api",
          course_type: "videos",
        },
        actions: [
          {
            on: "success",
            payload: "data",
            func: (data) => {
              dispatch(
                this.reduxSetItem(data, "replace", { pathDataRedux: "" })
              );
            },
          },
        ],
      }
    );
  });
});
