import React, { useState, type MouseEvent, useMemo, useCallback } from 'react'

import { useRouter } from 'next/router'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Divider,
} from '@mui/material'
import ProfileModal from '@/components/Modals/ProfileModal/ProfileModal'
import HeaderMenu from './HeaderMenu'

import TelegramIcon from '@mui/icons-material/Telegram'
import InstagramIcon from '@mui/icons-material/Instagram'
import { AccountCircle } from '@mui/icons-material'

import { styled } from '@mui/system'
import styles from './Header.module.scss'

const CustomDivider = styled(Divider)(() => ({
  backgroundColor: 'white',
}))

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [state, setState] = useState(false)
  const router = useRouter()
  const currentPath = router.pathname

  const disabledProducts = useMemo(
    () => currentPath === '/products',
    [currentPath],
  )
  const disabledNews = useMemo(() => currentPath === '/news', [currentPath])

  const goNews = useCallback(() => router.push('/news'), [router])
  const goProducts = useCallback(() => router.push('/products'), [router])

  const handleOpenMenu = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget),
    [],
  )
  const handleCloseMenu = useCallback(() => setAnchorEl(null), [])

  const toggleDrawer = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState((prev) => !prev)
      handleCloseMenu()
    },
    [handleCloseMenu],
  )

  return (
    <div className={styles.header}>
      <AppBar color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            CROSSLINE
          </Typography>
          <Box
            display="flex"
            gap={1}
          >
            <Button
              color="inherit"
              disabled={disabledProducts}
              onClick={goProducts}
            >
              Товары
            </Button>
            <Button
              color="inherit"
              disabled={disabledNews}
              onClick={goNews}
            >
              Новости
            </Button>

            <IconButton
              size="medium"
              onClick={handleOpenMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <CustomDivider
              orientation="vertical"
              flexItem
            />

            <IconButton color="inherit">
              <TelegramIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <HeaderMenu
        isOpened={anchorEl}
        handleCloseMenu={handleCloseMenu}
        toggleDrawer={toggleDrawer}
      />

      <ProfileModal
        open={state}
        handleClose={toggleDrawer}
      />
    </div>
  )
}
