import {
  USER_REGISTER,
  USER_LOGIN,
  GET_ROLES,
  GET_AGENTS,
  GET_USERS,
  DELETE_USER,
  UPDATE_USER,
  GET_ALL_CUSTOMERS,
  GET_ALL_EMPLOYEES,
  USER_DETAILS,
  GET_USERS_NAME_USERNAME,
  GET_STATE_LIST,
  GET_CITY_LIST,
  GET_Agent_Change,
  GET_USERBY_AGENT,
  GET_PINCODE_DATA,
  GET_AGENTS_LIST,
} from "./../actions/type";

const initialState = {
  user: {},
  users: [],
  customers: [],
  employees: [],
  roles: [],
  agents: [],
  userData: [],
  userDataDetails: [],
  userByName: [],
  stateList: [],
  cityList: [],
  agentChangeRes: {},
  userListByAgent: [],
  pincodeData: [],
  agentsList: [],
  openingStockList: []
};
export default function (state = initialState, action) {
  // console.log(action)
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case GET_AGENTS:
      return {
        ...state,
        agents: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USERS_NAME_USERNAME:
      return {
        ...state,
        userByName: action.payload,
      };
    case USER_DETAILS:
      return {
        ...state,
        userDataDetails: action.payload,
      };
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case DELETE_USER:
      var updatedUsers = [];
      updatedUsers = state.users.filter((user) => {
        if (user._id != action.payload) return user;
      });
      return {
        ...state,
        users: updatedUsers,
      };

    case UPDATE_USER:
      console.log("##action.payload", action.payload);
      console.log("##state.users", state.users);

      let updatedUser = state.users.map((user) => {
        if (user._id == action.payload._id) return action.payload;
        return user;
      });
      return {
        ...state,
        users: updatedUser,
        user: {},
      };

    case GET_STATE_LIST:
      return {
        ...state,
        stateList: action.payload,
      };
    case GET_CITY_LIST:
      return {
        ...state,
        cityList: action.payload,
      };
    case GET_Agent_Change:
      return {
        ...state,
        agentChangeRes: action.payload,
      };

    case GET_USERBY_AGENT:
      return {
        ...state,
        userListByAgent: action.payload,
      };
    case GET_PINCODE_DATA:
      return {
        ...state,
        pincodeData: action.payload,
      };
    case GET_AGENTS_LIST:
      return {
        ...state,
        agentsList: action.payload,
      };
    default:
      return state;
  }
}
