import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField,
  Box
} from '@mui/material';
import { Post, PostFormData } from '../types';

interface PostFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PostFormData) => void;
  post?: Post;
  title: string;
}

const PostForm: React.FC<PostFormProps> = ({ open, onClose, onSubmit, post, title }) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    body: '',
    userId: 1, // Default userId
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
        userId: post.userId,
      });
    } else {
      setFormData({
        title: '',
        body: '',
        userId: 1,
      });
    }
  }, [post, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Content"
              name="body"
              value={formData.body}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {post ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PostForm;