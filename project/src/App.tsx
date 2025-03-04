import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  CircularProgress,
  Paper,
  Divider,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchPosts, createPost, updatePost, deletePost } from './api/posts';
import { Post, PostFormData } from './types';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import ConfirmDialog from './components/ConfirmDialog';
import Notification from './components/Notification';

// Create a custom theme with white background
const theme = createTheme({
  palette: {
    background: {
      default: '#f8f9fa'
    },
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  
  // Confirm dialog state
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData: PostFormData) => {
    try {
      const newPost = await createPost(postData);
      setPosts([newPost, ...posts]);
      setOpenCreateForm(false);
      showNotification('Post created successfully!', 'success');
    } catch (err) {
      console.error('Error creating post:', err);
      showNotification('Failed to create post.', 'error');
    }
  };

  const handleUpdatePost = async (postData: PostFormData) => {
    if (!selectedPost) return;
    
    try {
      const updatedPost = await updatePost(selectedPost.id, postData);
      setPosts(posts.map(post => post.id === selectedPost.id ? updatedPost : post));
      setOpenEditForm(false);
      showNotification('Post updated successfully!', 'success');
    } catch (err) {
      console.error('Error updating post:', err);
      showNotification('Failed to update post.', 'error');
    }
  };

  const handleDeletePost = async () => {
    if (postToDelete === null) return;
    
    try {
      await deletePost(postToDelete);
      setPosts(posts.filter(post => post.id !== postToDelete));
      setOpenConfirmDialog(false);
      showNotification('Post deleted successfully!', 'success');
    } catch (err) {
      console.error('Error deleting post:', err);
      showNotification('Failed to delete post.', 'error');
    }
  };

  const openEditDialog = (post: Post) => {
    setSelectedPost(post);
    setOpenEditForm(true);
  };

  const openDeleteDialog = (id: number) => {
    setPostToDelete(id);
    setOpenConfirmDialog(true);
  };

  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2, backgroundColor: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1">
              JSONPlaceholder Posts
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateForm(true)}
              sx={{ px: 3, py: 1 }}
            >
              Create Post
            </Button>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography color="error">{error}</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={loadPosts} 
                sx={{ mt: 2 }}
              >
                Try Again
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {posts.map(post => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <PostCard
                    post={post}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/* Create Post Form */}
        <PostForm
          open={openCreateForm}
          onClose={() => setOpenCreateForm(false)}
          onSubmit={handleCreatePost}
          title="Create New Post"
        />

        {/* Edit Post Form */}
        <PostForm
          open={openEditForm}
          onClose={() => setOpenEditForm(false)}
          onSubmit={handleUpdatePost}
          post={selectedPost}
          title="Edit Post"
        />

        {/* Confirm Delete Dialog */}
        <ConfirmDialog
          open={openConfirmDialog}
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          onConfirm={handleDeletePost}
          onCancel={() => setOpenConfirmDialog(false)}
        />

        {/* Notification */}
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;