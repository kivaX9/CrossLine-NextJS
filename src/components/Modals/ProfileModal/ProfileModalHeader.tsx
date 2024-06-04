import { Box, Button, Typography, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function ProfileModalHeader({
  handleClose,
}: {
  handleClose: (event: React.KeyboardEvent | React.MouseEvent) => void
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
      <Button
        color="primary"
        size="large"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={handleClose}
      >
        Назад
      </Button>
      <Divider
        orientation="vertical"
        flexItem
      />
      <Typography
        variant="h6"
        sx={{ width: '100%' }}
      >
        Мой профиль
      </Typography>
    </Box>
  )
}
