import React, { useState, useEffect } from 'react'
import './navbar.css'

import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import CategoryIcon from '@mui/icons-material/Category'
import TravelIcon from '@mui/icons-material/TravelExplore'
import FoodIcon from '@mui/icons-material/Fastfood'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HotelIcon from '@mui/icons-material/Hotel';
import Divider from '@mui/material/Divider';
import SignInIcon from '@mui/icons-material/AccountCircle';
import SignUpIcon from '@mui/icons-material/PersonAdd';
import LanguageIcon from '@mui/icons-material/Language';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarsIcon from '@mui/icons-material/Stars';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FeedIcon from '@mui/icons-material/Feed';
import TourIcon from '@mui/icons-material/Tour';
import SearchIcon from '@mui/icons-material/Search'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { AppBar, Drawer, IconButton, Toolbar, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Avatar, TextField, Box, Typography, Button, Popover, ListItem } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { deepOrange } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'
import User_api from './api_demo/User_api'

import logo from '../Images/logo_black.png'
import title from '../Images/title.png'

import { useTheme, useMediaQuery } from '@mui/material'

import Cookies from 'js-cookie'
import ax from './axios_api/ax'


function Navbar() {


    const { t, i18n } = useTranslation()

    const [openMenuSlide, SetOpenMenuSlide] = useState(false)

    const OpenMenuSlide = (t) => {
        SetOpenMenuSlide(t)
    }

    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openProfileLogin, setOpenProfileLogin] = useState(false);
    const [openProfileLoginAdmin, setOpenProfileLoginAdmin] = useState(false);
    const [openlang, setOpenLang] = useState(false);
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [IsLogin, setIsLogin] = useState(false);
    const [IsAdmin, setIsAdmin] = useState(true);

    const [user, setUser] = useState(Cookies.get('user') != undefined ? JSON.parse(Cookies.get('user')) : undefined)

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickProfile = () => {
        if (!IsLogin) {
            setOpenProfile(!openProfile);
        } else {
            if (IsAdmin) {
                setOpenProfileLoginAdmin(!openProfileLoginAdmin)
            } else {
                setOpenProfileLogin(!openProfileLogin)
            }
        }
    };

    useEffect(() => {
        let lang = window.localStorage.getItem('lang')
        if (lang) {
            i18n.changeLanguage(lang)
        }
    }, [window.localStorage.getItem('lang')])

    useEffect(() => {


        setIsLogin(user != undefined ? true : false)
        setIsAdmin(user != undefined ? user.superuser : false)



    }, [])


    const mock_logout = () => {

        Cookies.remove('user')
        Cookies.remove('accress')


        ax.get('/auth/signout/').then(res => {

            window.location.href = '/'
        })


    }

    const handleClicklang = () => {
        setOpenLang(!openlang);
    };

    const handleClickAddProduct = () => {
        setOpenAddProduct(!openAddProduct);
    };

    const changeLang = (lang) => {
        window.localStorage.setItem('lang', lang)
        i18n.changeLanguage(lang)
    }

    const changepage = (lang) => {
        window.location.href = "/" + lang
    }

    const open_menu = Boolean(anchorEl)
    const [id, setId] = useState()

    const handle_category = (e, t) => {
        setId(t)
        setAnchorEl(e.currentTarget)
    }

    const handle_close = () => {
        setAnchorEl(null)
    }

    const theme = useTheme()

    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const [search_lst, setSearchLst] = useState([])

    const handle_search = (e) => {

        if (e.target.value !== "") {
            ax.get(`/api/search/?search=${e.target.value}`).then(res => {
                setSearchLst(res.data)
                console.log(res.data)
            })
        } else {
            setSearchLst([])
        }

    }

    return (
        <AppBar position='fixed'>
            {isMatch ? <Toolbar sx={{ height: '5rem' }}>

                <IconButton
                    size="large"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    color='inherit'
                    onClick={() => OpenMenuSlide(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ width: '100%', position: 'relative' }}>
                    <input className="search" placeholder={t("Search...")} onChange={handle_search}></input>
                    <List sx={{
                        position: 'absolute',
                        top: '120%',
                        width: '100%',
                        zIndex: -1,
                        backgroundColor: '#fff',
                        boxShadow: 3,
                        borderRadius: '5px',
                        display: search_lst.length !== 0 ? 'block' : 'none'
                    }}>
                        {search_lst.map((d, i) =>
                            <ListItem key={i} disablePadding>
                                <ListItemButton onClick={() => window.location.href = `/tour_detail/?id=${d.id}`}>
                                    <ListItemText primary={i18n.language === "th" ? d.title_th : d.title_en} sx={{ color: '#000' }} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>

                <IconButton
                    size="large"
                    edge="start"
                    aria-label="menu"
                    color='inherit'
                    sx={{ marginLeft: '0.5rem' }}
                >
                    <SearchIcon />
                </IconButton>

            </Toolbar> :
                <Toolbar>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: '15rem 1fr',
                            width: '50%',
                            alignContent: 'center',
                            justifyItems: 'flex-start',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gridGap: '1rem'
                            }}>
                                <img  width={80} src={logo} />
                                <img style={{ cursor :'pointer' }} onClick={()=> window.location.href = '/'} width={100} src={title} />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                gridGap: '1rem'
                            }}>
                                <Box sx={{ width: '100%', position: 'relative' }}>
                                    <input className="search" placeholder={t("Search...")} onChange={handle_search}></input>
                                    <List sx={{
                                        position: 'absolute',
                                        top: '120%',
                                        width: '100%',
                                        zIndex: -1,
                                        backgroundColor: '#fff',
                                        boxShadow: 3,
                                        borderRadius: '5px',
                                        display: search_lst.length !== 0 ? 'block' : 'none',
                                        padding : '0.5rem'
                                    }}>
                                        {search_lst.map((d, i) =>
                                            <React.Fragment>
                                                <ListItem key={i} disablePadding>
                                                    <ListItemButton onClick={() => window.location.href = `/tour_detail/?id=${d.id}`}>
                                                        <ListItemText primary={i18n.language === "th" ? d.title_th : d.title_en} sx={{ color: '#000' }} />
                                                    </ListItemButton>

                                                </ListItem>
                                                {((i+1) !== search_lst.length) ? <Divider /> : ""}
                                            </React.Fragment>
                                        )}
                                    </List>
                                </Box>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    aria-label="menu"
                                    color='inherit'
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '50%',
                            gridGap: '2rem',
                            marginRight: '2rem'
                        }}>
                            <Button onClick={() => changepage("")} sx={{ color: '#fff' }} variant='text'>{t('Home')}</Button>
                            <Button aria-describedby={id} onClick={(e) => handle_category(e, 'category')} sx={{ color: '#fff' }} variant='text' endIcon={(open_menu && id === "category") ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}>{t('Category')}</Button>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                gridGap: '1rem'
                            }} onClick={(e) => handle_category(e, 'profile')}>
                                {IsLogin ? <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.f_name[0]}</Avatar> : <SignInIcon sx={{ color: '#fff' }} />}
                                {IsLogin ? <ListItemText primary={user.f_name} /> : <ListItemText primary="Username" />}
                                {(open_menu && id === "profile") ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}

                            </Box>

                            <Button aria-describedby={id} onClick={(e) => handle_category(e, 'lang')} sx={{ color: '#fff' }} variant='text' endIcon={(open_menu && id === "lang") ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}>{t('Language')}</Button>

                        </Box>
                    </Box>
                    <Popover
                        id={id}
                        open={open_menu}
                        anchorEl={anchorEl}
                        onClose={handle_close}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}

                        sx={{
                            marginTop: '1rem'
                        }}
                    >
                        <Box sx={{
                            padding: '1rem'
                        }}>
                            {id === 'category' ?
                                <React.Fragment>
                                    <ListItemButton onClick={() => changepage("Travels")}>
                                        <ListItemIcon>
                                            <TravelIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Travels")} />
                                    </ListItemButton>
                                    <Divider />
                                    <ListItemButton onClick={() => changepage("Food")}>
                                        <ListItemIcon>
                                            <FoodIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Foods")} />
                                    </ListItemButton>
                                    <Divider />
                                    <ListItemButton onClick={() => changepage("Shoping")}>
                                        <ListItemIcon>
                                            <ShoppingBasketIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Shoping (OTOP Product)")} />
                                    </ListItemButton>
                                    <Divider />
                                    <ListItemButton onClick={() => changepage("Booking")}>
                                        <ListItemIcon>
                                            <HotelIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Booking")} />
                                    </ListItemButton>
                                    <Divider />
                                    <ListItemButton onClick={() => changepage("NEWS")}>
                                        <ListItemIcon>
                                            <NewspaperIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("NEWS")} />
                                    </ListItemButton>
                                </React.Fragment> : (id === 'profile' && !IsAdmin && IsLogin) ?
                                    <React.Fragment>
                                        <ListItemButton onClick={() => changepage("Manage_my_account")}>
                                            <ListItemIcon>
                                                <SignInIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("Manage My Account")} />
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton onClick={() => changepage("My_order")}>
                                            <ListItemIcon>
                                                <ShoppingCartIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("My Order")} />
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton onClick={() => changepage("in_progress")}>
                                            <ListItemIcon>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("In Progress")} />
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton onClick={() => changepage("Favorite")}>
                                            <ListItemIcon>
                                                <FavoriteIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("My Favorite")} />
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton onClick={() => changepage("history")}>
                                            <ListItemIcon>
                                                <HistoryIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("My History")} />
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton onClick={mock_logout}>
                                            <ListItemIcon>
                                                <LogoutIcon sx={{ color: "red" }} />
                                            </ListItemIcon>
                                            <ListItemText primary={t("Logout")} />
                                        </ListItemButton>
                                    </React.Fragment> : id === 'lang' ?
                                        <React.Fragment>

                                            <ListItemButton onClick={() => changeLang("en")}>
                                                <ListItemIcon>
                                                    <AssistantPhotoIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="English" />
                                            </ListItemButton>
                                            <Divider />
                                            <ListItemButton onClick={() => changeLang("th")}>
                                                <ListItemIcon>
                                                    <AssistantPhotoIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="ไทย" />
                                            </ListItemButton>
                                        </React.Fragment> : (id === 'profile' && IsAdmin && IsLogin) ?
                                            <React.Fragment>

                                                <ListItemButton onClick={() => changepage("Manage_my_account")}>
                                                    <ListItemIcon>
                                                        <SignInIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={t("Manage My Account")} />
                                                </ListItemButton>
                                                <Divider />
                                                <ListItemButton onClick={handleClickAddProduct}>
                                                    <ListItemIcon>
                                                        <AddBoxIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={t("Add Product")} />
                                                    {openAddProduct ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={openAddProduct} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <Divider />
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("add_tour")}>
                                                            <ListItemIcon>
                                                                <TourIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={t("Add Tour")} />
                                                        </ListItemButton>
                                                        <ListItemButton sx={{ pl: 4 }}>
                                                            <ListItemIcon>
                                                                <FoodIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={t("Add Food")} />
                                                        </ListItemButton>
                                                        <ListItemButton sx={{ pl: 4 }}>
                                                            <ListItemIcon>
                                                                <ShoppingBasketIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={t("Add OTOP Product")} />
                                                        </ListItemButton>
                                                        <ListItemButton sx={{ pl: 4 }}>
                                                            <ListItemIcon>
                                                                <HotelIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={t("Add Hotel")} />
                                                        </ListItemButton>
                                                    </List>
                                                    <Divider />
                                                </Collapse>
                                                <Divider />
                                                <ListItemButton onClick={() => changepage("add_news")}>
                                                    <ListItemIcon>
                                                        <FeedIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={t("Add NEWS")} />
                                                </ListItemButton>
                                                <Divider />
                                                <ListItemButton onClick={() => changepage("customer_order")}>
                                                    <ListItemIcon>
                                                        <ShoppingCartIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={t("View Orders")} />
                                                </ListItemButton>
                                                <Divider />
                                                <ListItemButton onClick={mock_logout}>
                                                    <ListItemIcon>
                                                        <LogoutIcon sx={{ color: "red" }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={t("Logout")} />
                                                </ListItemButton>
                                            </React.Fragment> : !IsLogin ?
                                                <React.Fragment>

                                                    <ListItemButton onClick={() => changepage("login")} sx={{ pl: 4 }}>
                                                        <ListItemIcon>
                                                            <SignInIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={t("Sign In")} />
                                                    </ListItemButton>
                                                    <Divider />
                                                    <ListItemButton onClick={() => changepage("register")} sx={{ pl: 4 }}>
                                                        <ListItemIcon>
                                                            <SignUpIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={t("Sign Up")} />
                                                    </ListItemButton>
                                                </React.Fragment> : ""}
                        </Box>
                    </Popover>
                </Toolbar>}

            <Drawer
                open={openMenuSlide}
                onClose={() => OpenMenuSlide(false)}
                anchor="left"
            >
                <List
                    sx={{ width: '18rem', padding: '1rem', bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={handleClickProfile}>
                        <ListItemIcon>
                            {IsLogin ? <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.f_name[0]}</Avatar> : <SignInIcon />}
                        </ListItemIcon>
                        {IsLogin ? <ListItemText primary={user.f_name} /> : <ListItemText primary="Username" />}
                        {(openProfile || openProfileLogin || openProfileLoginAdmin) ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={openProfileLogin} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Divider />
                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("Manage_my_account")}>
                                <ListItemIcon>
                                    <SignInIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Manage My Account")} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("My_order")}>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("My Order")} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("in_progress")}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("In Progress")} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("Favorite")}>
                                <ListItemIcon>
                                    <FavoriteIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("My Favorite")} />
                            </ListItemButton>
                            <ListItemButton onClick={() => changepage("history")} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("My History")} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={mock_logout}>
                                <ListItemIcon>
                                    <LogoutIcon sx={{ color: "red" }} />
                                </ListItemIcon>
                                <ListItemText primary={t("Logout")} />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Collapse in={openProfileLoginAdmin} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Divider />
                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("Manage_my_account")}>
                                <ListItemIcon>
                                    <SignInIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Manage My Account")} />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={handleClickAddProduct}>
                                <ListItemIcon>
                                    <AddBoxIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Add Product")} />
                                {openAddProduct ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={openAddProduct} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <Divider />
                                    <ListItemButton sx={{ pl: 8 }} onClick={() => changepage("add_tour")}>
                                        <ListItemIcon>
                                            <TourIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Add Tour")} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 8 }}>
                                        <ListItemIcon>
                                            <FoodIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Add Food")} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 8 }}>
                                        <ListItemIcon>
                                            <ShoppingBasketIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Add OTOP Product")} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 8 }}>
                                        <ListItemIcon>
                                            <HotelIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Add Hotel")} />
                                    </ListItemButton>
                                </List>
                                <Divider />
                            </Collapse>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("add_news")}>
                                <ListItemIcon>
                                    <FeedIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Add NEWS")} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("customer_order")}>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("View Orders")} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={mock_logout}>
                                <ListItemIcon>
                                    <LogoutIcon sx={{ color: "red" }} />
                                </ListItemIcon>
                                <ListItemText primary={t("Logout")} />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Collapse in={openProfile} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Divider />
                            <ListItemButton onClick={() => changepage("login")} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <SignInIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Sign In")} />
                            </ListItemButton>
                            <ListItemButton onClick={() => changepage("register")} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <SignUpIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Sign Up")} />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Divider />

                    <ListItemButton onClick={() => changepage("")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("Home")} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("Category")} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Divider />
                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("Travels")}>
                                <ListItemIcon>
                                    <TravelIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Travels")} />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("Food")}>
                                <ListItemIcon>
                                    <FoodIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Foods")} />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("Shoping")}>
                                <ListItemIcon>
                                    <ShoppingBasketIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Shoping (OTOP Product)")} />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("Booking")}>
                                <ListItemIcon>
                                    <HotelIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("Booking")} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => changepage("NEWS")}>
                                <ListItemIcon>
                                    <NewspaperIcon />
                                </ListItemIcon>
                                <ListItemText primary={t("NEWS")} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Divider />
                    <ListItemButton onClick={handleClicklang}>
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("Language")} />
                        {openlang ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={openlang} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Divider />
                            <ListItemButton onClick={() => changeLang("en")} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <AssistantPhotoIcon />
                                </ListItemIcon>
                                <ListItemText primary="English" />
                            </ListItemButton>
                            <ListItemButton onClick={() => changeLang("th")} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <AssistantPhotoIcon />
                                </ListItemIcon>
                                <ListItemText primary="ไทย" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                </List>
            </Drawer>
        </AppBar>
    )
}

export default Navbar