import React, { useState, type MouseEvent, useMemo, useCallback } from 'react'

import { useRouter } from 'next/router'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'

import TelegramIcon from '@mui/icons-material/Telegram'
import InstagramIcon from '@mui/icons-material/Instagram'
import { AccountCircle } from '@mui/icons-material'

import { styled } from '@mui/system'

const CustomDivider = styled(Divider)(() => ({
  backgroundColor: 'white',
}))

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  width: '100%',
  top: 0,
  left: 0,
}

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
    <div style={headerStyle}>
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
