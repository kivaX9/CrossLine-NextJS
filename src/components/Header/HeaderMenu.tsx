import { MouseEventHandler, useCallback } from 'react'

import { Typography, Menu, MenuItem } from '@mui/material'

import newLocalStorageUser from '@/utils/LocalStorageUser'
import { useRouter } from 'next/router'

export default function HeaderMenu({
  isOpened,
  handleCloseMenu,
  toggleDrawer,
}: {
  isOpened: HTMLElement | null
  handleCloseMenu: () => void
  toggleDrawer: MouseEventHandler<HTMLLIElement> | undefined
}) {
  const router = useRouter()
  const open = Boolean(isOpened)

  function handleExit() {
    handleCloseMenu()
    newLocalStorageUser.removeLocalStorageUser()
    router.push('/auth/login')
  }

  return (
    <Menu
      anchorEl={isOpened}
      open={open}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={toggleDrawer}>Профиль</MenuItem>
      <MenuItem
        onClick={handleExit}
        color="error"
      >
        <Typography color={'red'}>Выйти</Typography>
      </MenuItem>
    </Menu>
  )
}
