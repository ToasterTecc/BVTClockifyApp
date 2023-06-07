import axios from "axios";

export const getProjects = async () => {
  try {
    const res = await axios.get("http://localhost:3000/getProjects");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCohortMembers = async (formData: FormData) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/updateCohortMembers",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateClockifyHours = async (formData: FormData) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/updateClockifyHours",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const downloadCSV = async (csvOptions: string[]) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/downloadCSV",
      { csvOptions },
      {
        maxBodyLength: Infinity,
        responseType: "blob",
      }
    );

    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getFileSize = async () => {
  try {
    const res = await axios.get("http://localhost:3000/getFileSize");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
