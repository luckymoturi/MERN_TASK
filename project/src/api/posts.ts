import axios from 'axios';
import { Post, PostFormData } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${API_URL}/posts`);
  return response.data;
};

export const createPost = async (postData: PostFormData): Promise<Post> => {
  const response = await axios.post<Post>(`${API_URL}/posts`, postData);
  return response.data;
};

export const updatePost = async (id: number, postData: Partial<PostFormData>): Promise<Post> => {
  const response = await axios.put<Post>(`${API_URL}/posts/${id}`, postData);
  return response.data;
};

export const patchPost = async (id: number, postData: Partial<PostFormData>): Promise<Post> => {
  const response = await axios.patch<Post>(`${API_URL}/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/posts/${id}`);
};