import axios from "axios";
import {
  ADD_AGENT,
  DELETE_USER,
  GET_AGENTS,
  GET_ALL_CUSTOMERS,
  GET_ALL_EMPLOYEES,
  GET_ERRORS,
  GET_ROLES,
  GET_USERS,
  UPDATE_USER,
  USER_DETAILS,
  USER_LOGIN,
  USER_REGISTER,
  GET_USERS_NAME_USERNAME,
  GET_STATE_LIST,
  GET_CITY_LIST,
  GET_Agent_Change,
  GET_USERBY_AGENT,
  GET_PINCODE_DATA,
  GET_AGENTS_LIST,
} from "./type";
import { message, notification } from "antd";
import { getFullCart } from "./cartActions";
import { fetchAllProducts } from "./productActions";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from "./yourProgressBarActions";
import Swal from "sweetalert2";
let IsLoggedIn = false;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const login = (user, history, pathName) => async (dispatch) => {
  try {
    var res = await axios.post(`${backend_uri_server}/api/v1/user/login`, user);
    const loginMessage = () => {
      // message.success({
      //   content: `Welcome Back ${res.data.name}!`,
      // });

      Toast.fire({
        icon: "success",
        title: `Welcome Back ${res.data.name}!`,
      });
      console.log("login error");
    };
    IsLoggedIn = true;
    //user
    if (
      res.data.role === "622a47e017844801d2c839a4" &&
      // ||res.data.role === "622a47d2a0c03827d4f07294"
      pathName === "/login-register"
    ) {
      localStorage.setItem("token", res.data.jwtToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("isCreditUser", res.data.isCreditUser);
      localStorage.setItem("roleName", res.data.roleName);
      localStorage.setItem("userName", res.data.name);
      loginMessage();
      // history.push("/");
      dispatch(getFullCart());
      dispatch(fetchAllProducts());
    } else if (
      res.data.role === "629346b53e2dcbf2f6d43763" &&
      pathName === "/salesPerson/login"
    ) {
      localStorage.setItem("token", res.data.jwtToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("roleName", res.data.roleName);
      localStorage.setItem("userName", res.data.name);
      history.push("/dagaImpex/AddNewSales");
      loginMessage();
    }
    //admin Pannel
    else if (
      pathName === "/login-register" &&
      res.data.role !== "629346b53e2dcbf2f6d43763"
    ) {
      localStorage.setItem("token", res.data.jwtToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("roleName", res.data.roleName);
      localStorage.setItem("userName", res.data.name);
      history.push("/dagaImpex");
      loginMessage();
    }
    dispatch({
      type: USER_LOGIN,
      payload: res.data,
    });
  } catch (error) {
    console.log("error", error);
    if (error.status !== undefined && error.status === 400) {
      history.push("/500");
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: error?.response?.data,
      });
    }
  }
};

export const createUser = (user, history) => async (dispatch) => {
  try {
    let resp = await axios.post(`${backend_uri_server}/api/v1/user`, user);
    message.success(resp.data.message);
    localStorage.setItem("otpValidation", resp.data.data.otp);
    localStorage.setItem("userId", resp.data.data._id);
    return resp;
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const submitPasword = (obj) => async (dispatch) => {
  try {
    let resp = await axios.post(
      `${backend_uri_server}/api/v1/updatePassword`,
      obj
    );
    if (resp.status == 200) {
      message.success(resp.data);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const reSendOtp = (obj) => async (dispatch) => {
  try {
    let resp = await axios.post(`${backend_uri_server}/api/v1/reSendOtp`, obj);
    if (resp.status == 200) {
      message.success(resp.data.message);
      localStorage.setItem("otpValidation", resp.data.data);
    }
    return resp;
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const clearOtp = (obj) => async (dispatch) => {
  try {
    let resp = await axios.post(`${backend_uri_server}/api/v1/clearOtp`, obj);
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const addAgent = (agentObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/agent`,
      agentObj
    );
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Agent Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      });
    }
    // message.success(`Agent "${response.data.name}" Added Successfully`);
    // window.location.reload(0);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getRoles = () => async (dispatch) => {
  let response = await axios.get(`${backend_uri_server}/api/v1/role`);
  try {
    dispatch({
      type: GET_ROLES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const getAgents = () => async (dispatch) => {
  let response = await axios.get(`${backend_uri_server}/api/v1/agent`);
  try {
    dispatch({
      type: GET_AGENTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const agentWhatsAppNotification = (obj) => async (dispatch) => {
  try {
    let resp = await axios.post(
      `${backend_uri_server}/api/v1/changeMsgStatusinAgent`,
      obj
    );
    if (resp && resp.status == 200) {
      message.success(resp.data.message);
    }
    return resp;
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const registerUserInternal = (user) => async (dispatch) => {
  try {
    let resp = await axios.post(
      `${backend_uri_server}/api/v1/admin/user`,
      user
    );
    const RegistrationMessage = () => {
      message.success({
        content: " Registration Successful, User Added!",
      });
    };
    RegistrationMessage();
    window.location.reload(0);
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getAllUsers = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/users?perPage=${30}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });
    dispatch(hideProgressBar());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const deleteUser = (id) => async (dispatch) => {
  let response = await axios.delete(`${backend_uri_server}/api/v1/user/${id}`);
  try {
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
    message.success(`User "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateUser = (userObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/user`,
      userObj
    );
    if (response.status == 200) {
      message.success(`User "${response.data.name}" Updated Successfully`);
    }
    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });
  } catch (error) {
    console.log("##error", error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.message,
    });
  }
};

export const changeGrAmount = (obj) => async (dispatch) => {
  try {
    let res = await axios.patch(`${backend_uri_server}/api/v1/user/gr`, obj);
    await message.success(`GR Amount Changed Succesfully`);
    window.location.reload(0);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getUsers = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/userList?perPage=30&limit=${limit}`
    );

    if (response.data.data[0]) {
      const sortedEmployees = [...response.data.data[0]].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      dispatch(hideProgressBar());
      dispatch({
        type: GET_ALL_EMPLOYEES,
        payload: sortedEmployees,
      });
    }

    if (response.data.data[1]) {
      const sortedCustomers = [...response.data.data[1]].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      dispatch({
        type: GET_ALL_CUSTOMERS,
        payload: sortedCustomers,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

//for getting userData by_id
export const getUser = (id) => async (dispatch) => {
  let response = await axios.get(`${backend_uri_server}/api/v1/user/${id}`);
  try {
    dispatch({
      type: USER_DETAILS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for updating email of a user
export const updateUserEmail = (emailObj) => async (dispatch) => {
  let response = await axios.patch(
    `${backend_uri_server}/api/v1/updateUserEmail`,
    emailObj
  );
  try {
    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });
    // message.success("Email updated successfully")
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Profile Updated Successfully.",
    }).then((result) => {
      if (result.isConfirmed) {
        // window.location.reload();
      }
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//for updating password of a user
export const updateUserPassword = (passwordObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/updateUserPassword`,
      passwordObj
    );
    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });

    {
      response &&
        response.status == 200 &&
        // message.success("Password updated successfully")
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Password Updated Successfully.",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
    }
  } catch (error) {
    message.error(error.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for updating user address
export const updateUserAddress = (addressObj) => async (dispatch) => {
  let response = await axios.patch(
    `${backend_uri_server}/api/v1/updateUserAddress`,
    addressObj
  );

  try {
    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });

    message.success("Address updated successfully");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for Adding user address
export const addUserAddress = (addressObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/addressUpdate`,
      addressObj
    );
    message.success("Address Added successfully");
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for Adding user address
export const updateEcomUserAddress = (addressObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateEcomUserAddress`,
      addressObj
    );
    if (response && response.status === 200) {
      // message.success("Address Update successfully")
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Address Updated Successfully.",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      message.success("Something Went Wrong");
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for deleting user address
export const addDeleteAddress = (addressObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteAddress`,
      addressObj
    );
    message.success("Address Deleted successfully");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for cashPayment Purchase
export const paymentPurchase = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/paymentDone`,
      obj
    );
    if (response.status == 200) {
      message.success(response.data);
    }
    return response;
  } catch (error) {
    message.error(error.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    return;
  }
};

// for getting user by name or username
export const userByNameOrUsername = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_USERS_NAME_USERNAME,
      payload: [],
    });
  } else {
    try {
      let response = await axios.patch(
        `${backend_uri_server}/api/v1/userByNameOrUsername`,
        obj
      );
      dispatch({
        type: GET_USERS_NAME_USERNAME,
        payload: response.data,
      });
    } catch (error) {
      message.error("Failed To Search Try Again");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

//for Active Inactive Toggle on userlist
export const activeAndInactiveCustomer = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/activeAndInactiveCustomer`,
      obj
    );
    message.success(response.data);
    // dispatch({
    //   type: USER_DETAILS,
    //   payload: response.data,
    // });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//get State List
export const getStateList = () => async (dispatch) => {
  try {
    let response = await axios.get(`${backend_uri_server}/api/v1/getStateList`);
    dispatch({
      type: GET_STATE_LIST,
      payload: response.data.data,
    });
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//get State List
export const getCityListByStateId = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/getCityListbyStateId`,
      obj
    );
    dispatch({
      type: GET_CITY_LIST,
      payload: response.data.data,
    });
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const changeAgent = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/convertAgent`,
      obj
    );
    dispatch({
      type: GET_Agent_Change,
      payload: response.data,
    });
    message.success(response.data.message);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getUserByAgent = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/userlistbyagent`,
      obj
    );
    dispatch({
      type: GET_USERBY_AGENT,
      payload: response.data.userlist,
    });

    return response;
    //  message.success(response.data.message)
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};


export const getUserByRoleName = (obj) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getStoreUserList`,
      obj
    );
    return response;
    //  message.success(response.data.message)
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const convertCategeory = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/convertCategory`,
      obj
    );
    message.success(response.data.message);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const convertStyle = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/convertStyle`,
      obj
    );

    message.success(response.data.message);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const convertColor = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/convertColor`,
      obj
    );

    message.success(response.data.message);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const convertSize = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/convertSize `,
      obj
    );

    message.success(response.data.message);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//get Pincode List
// export const getDataByPincode = (pincode) => async (dispatch) => {
//   try {
//     let response = await fetch(
//       `https://api.postalpincode.in/pincode/${pincode}`
//     );
//     const data = await response.json();
//     dispatch({
//       type: GET_PINCODE_DATA,
//       payload: data[0],
//     });
//     console.log("Line No: 772", data[0]);
//     return data[0];
//   } catch (error) {
//     console.log("Error", error);
//     dispatch({
//       type: GET_ERRORS,
//       payload: error,
//     });
//   }
// };

export const getDataByPincode = (pincode) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/getDetailsByPincode`,
      { pincode: pincode }
    );

    // Transform the new API response to match the old API response structure
    const newData = response.data;
    const transformedData = {
      Message: `Number of pincode(s) found:${newData.data.region.length}`,
      Status: newData.message, // Map 'message' to 'Status'
      PostOffice: newData.data?.region?.map((region, index) => ({
        Name: region.regionName,
        Description: null,
        BranchType: index === 0 ? "Sub Post Office" : "Branch Post Office", // Assuming first region is Sub Post Office, others are Branch
        DeliveryStatus: region.regionName.includes("Town")
          ? "Non-Delivery"
          : "Delivery", // Mimic logic for Non-Delivery
        Circle: newData.data.state, // Use state as Circle
        District: newData.data.city, // Use city as District
        Division: newData.data.city, // Use city as Division
        Region: "Indore", // Hardcoding as per old response; adjust if dynamic value available
        Block: region.regionName.includes("Town") ? "Nagda" : region.regionName, // Simplistic mapping; adjust if needed
        State: newData.data.state,
        Country: "India",
        Pincode: newData.data.pincode.toString(), // Ensure pincode is string
      })),
    };

    dispatch({
      type: GET_PINCODE_DATA,
      payload: transformedData,
    });
    console.log("Line No: 772", transformedData);
    return transformedData;
  } catch (error) {
    console.log("Error", error);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateAgent = (userObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/agent`,
      userObj
    );
    if (response.status == 200) {
      message.success(`Agent "${response.data.name}" Updated Successfully`);
    }
    return response;
  } catch (error) {
    console.log("##error", error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.message,
    });
  }
};

export const deleteAgent = (id) => async (dispatch) => {
  let response = await axios.delete(`${backend_uri_server}/api/v1/agent/${id}`);
  try {
    message.success(`Agent "${response.data.name}" Deleted Successfully`);
    return response;
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getAgentsList = (page) => async (dispatch) => {
  // let response = await axios.get(`${backend_uri_server}/api/v1/agentList?perPage=25&limit=${page}`);
  let response = await axios.get(`${backend_uri_server}/api/v1/agentList`);
  try {
    dispatch({
      type: GET_AGENTS_LIST,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const forgotPassword = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/forgotPassword`,
      obj
    );

    message.success(response.data.message);
    return response.data;
  } catch (error) {
    message.warning("User Not Found");
  }
};
