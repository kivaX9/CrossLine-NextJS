import React, { useState, type MouseEvent, useMemo, useCallback } from 'react'

import { useRouter } from 'next/router'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Drawer,
  Divider,
} from '@mui/material'

import TelegramIcon from '@mui/icons-material/Telegram'
import InstagramIcon from '@mui/icons-material/Instagram'
import { AccountCircle } from '@mui/icons-material'

import { styled } from '@mui/system'
import styles from './Header.module.scss'
import newLocalStorageUser from '@/utils/LocalStorageUser'

const CustomDivider = styled(Divider)(() => ({
  backgroundColor: 'white',
}))

export default function Header() {
  const router = useRouter()

  const disabledProducts = useMemo(() => {
    return router.pathname === '/products'
  }, [router.pathname])
  const disabledNews = useMemo(() => {
    return router.pathname === '/news'
  }, [router.pathname])

  const goNews = useCallback(() => {
    return router.push('/news')
  }, [router])
  const goProducts = useCallback(() => {
    return router.push('/products')
  }, [router])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    // newLocalStorageUser.removeLocalStorageUser()
    // router.push('/auth/login')
  }, [])

  const [state, setState] = useState(false)

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
      handleClose()
    },
    [handleClose],
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
              onClick={handleClick}
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

      {/* Перенсти в отдельный компонент */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={toggleDrawer}>Профиль</MenuItem>
        <MenuItem
          onClick={handleClose}
          color="error"
        >
          <Typography color={'red'}>Выйти</Typography>
        </MenuItem>
      </Menu>

      {/* Перенсти в отдельный компонент */}
      <Drawer
        anchor="right"
        open={state}
        onClose={toggleDrawer}
      >
        Профиль
      </Drawer>
    </div>
  )
}
