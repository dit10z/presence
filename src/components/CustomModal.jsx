import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '20px',
  width: '750px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const CustomModal = ({ open, onClose, title, children, onSubmit }) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6" mb={8}>
          {title}
        </Typography>
        <form onSubmit={onSubmit}>
          {children}
          <Box mt={6} display="flex" justifyContent="flex-end">
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ marginRight: 1 }}
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </ModalContent>
    </StyledModal>
  );
};

export default CustomModal;
