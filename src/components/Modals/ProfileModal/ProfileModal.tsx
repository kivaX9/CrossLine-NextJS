import { useState } from 'react'

import { Drawer, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'

import ProfileModalHeader from './ProfileModalHeader'
import ProfileModalContent from './ProfileModalContent'
import ProfileModalFavorites from './ProfileModalFavorites'

export default function ProfileModal({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: (event: React.KeyboardEvent | React.MouseEvent) => void
}) {
  const [alignment, setAlignment] = useState(false)

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    setAlignment((prev) => !prev)
  }

  return (
    <Drawer
      anchor="right"
      open={open ?? false}
      onClose={handleClose}
    >
      <Box
        sx={{
          width: '700px',
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <ProfileModalHeader handleClose={handleClose} />

        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value={false}>Профиль</ToggleButton>
          <ToggleButton value={true}>Избранное</ToggleButton>
        </ToggleButtonGroup>

        <div>
          {alignment ? <ProfileModalFavorites /> : <ProfileModalContent />}
        </div>
      </Box>
    </Drawer>
  )
}
