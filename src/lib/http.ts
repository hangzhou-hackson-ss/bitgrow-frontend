import axios from 'axios';

// Create an instance of Axios with custom configurations if needed
const instance = axios.create({
  baseURL: 'http://43.128.42.225/api', // Replace with your API base URL
  timeout: 5000, // Timeout in milliseconds
  headers: {
    // 'Content-Type': 'application/json',
    // You can add other common headers here
  },
});

// Function to make a GET request
async function get(url: string, params: Record<string, any> = {}) {
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to make a POST request
async function post(url: string, data: Record<string, any> = {}) {
  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to make a PUT request
async function patch(url: string, data: Record<string, any> = {}) {
  try {
    const response = await instance.patch(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to make a DELETE request
async function del(url: string) {
  try {
    const response = await instance.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const http = {
  get,
  post,
  patch,
  del,
};

export default http;
