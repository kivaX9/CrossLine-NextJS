import React, { createContext, useContext, useState, ReactNode } from 'react'

import { Modal, Box, Typography, Button, Fade, Alert } from '@mui/material'

type ErrorContextType = {
  setError: (message: string) => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleError = (message: string) => {
    setError(message)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ErrorContext.Provider value={{ setError: handleError }}>
      {children}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              width: 400,
              borderRadius: 1,
              boxShadow: 24,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              color="primary"
            >
              Система:
            </Typography>
            <Alert severity="error">{error}</Alert>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Закрыть
            </Button>
          </Box>
        </Fade>
      </Modal>
    </ErrorContext.Provider>
  )
}

export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('Ошибка системы')
  }
  return context
}
