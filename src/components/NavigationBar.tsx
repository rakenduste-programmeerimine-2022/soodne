import React, { Component } from 'react';
import { alpha, AppBar, Box, Button, FormControl, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import red from "@mui/material/colors/red";
import { deepOrange, green, orange, yellow } from "@mui/material/colors";
import VegetablesPicture from '../images/vegetables.svg';
import MilkPicture from '../images/milk.svg';
import BreadPicture from '../images/bread.svg';
import MeatPicture from '../images/meat.svg';
import BrushPicture from '../images/toothbrush.svg';
import FlourPicture from '../images/flour.svg';
import CleaningPicture from '../images/cleaning.svg';
import DrinksPicture from '../images/drinks.svg';
import FrozenPicture from '../images/frozen.svg';
import ChildrenPicture from '../images/children.svg';
import HomePicture from '../images/home.svg';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { Grocery } from 'groceries-component';


const Soodnecolor = deepOrange[400]

const themeColor = createTheme({
	palette: {
		primary: {
			main: red[50]
		},
		secondary: {
			main: '#ff5722',
		},
	}
});

const Search = styled('div')(({ theme }) => ({
	borderRadius: "16px",
	backgroundColor: alpha(theme.palette.common.black, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.black, 0.25),
	},
	width: '60%',
	[theme.breakpoints.up('sm')]: {
		width: 'center',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(2, 2),
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inerit',
	marginRight: theme.spacing(20),
	'& .MuiInputBase-input': {
		padding: theme.spacing(2, 2, 2),
		paddingLeft: theme.spacing(7),
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: 'auto'
		},
	},
}));

interface Props {
	items: Map<Grocery, number>,
	triggerOpen: boolean
}

export default function NavigationBar(props: Props) {
	let items = [] as Grocery[];
	let values = [] as number[];
	if (props.items.size !== 0) {
		items = Array.from(props.items.keys());
		values = Array.from(props.items.values());
	}

	return (
		<div>
			<ThemeProvider theme={themeColor}>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="relative" className={"shadow-none"}>
					<Toolbar>
						<Typography
							color={Soodnecolor}
							variant="h2"
							component="div"
							sx={{ mr: 3 }}
						>
							<a className="ml-40" href="/">Soodne</a>
						</Typography>
						<Search sx={{ zIndex: 'tooltip' }}>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Search>
						<Popover className={'h-10 sticky top-0'}>
							{({ open }) => (
								<>
									<Popover.Button className={`focus:outline-none w-16 h-16 group sticky top-0`}>
										<div className='flex flex-raw text-center'>
											<ShoppingCartOutlinedIcon className={"flex ml-5 mb-[40%] group-hover:fill-orange-700 w-10 h-10"}/>
											{/* <span className={'absolute left-10 -top-2 bg-slate-500 w-6 h-6 bg-opacity-85 rounded-full m-0 items-center text-center justify-center'}> 
												<p className='text-white'>{}</p>
											</span> */}
											<p className='flex ml-3 w-auto text-2xl text-slate-700 font-medium text-center'>Cart_Sum_$</p>
										</div>
									</Popover.Button>
									<Transition
										className={`${props.triggerOpen ? "fixed right-150 top-0" : ""}`}
										show={props.triggerOpen || open}
										enter="transition duration-100 ease-out"
										enterFrom="transform scale-95 opacity-0"
										enterTo="transform scale-100 opacity-100"
										leave="transition duration-75 ease-out"
										leaveFrom="transform scale-100 opacity-100"
										leaveTo="transform scale-95 opacity-0"
									>
										<Popover.Panel className={'absolute -left-[100px] rounded-2xl bg-orange-500 bg-opacity-90' }>
											<div className='p-2 rounded-2xl w-96'>
											<button className='bg-orange-100 border-2 border-orange-300 w-full h-fit mb-5 rounded-xl transition ease-in-out delay-50 hover:scale-95 duration-150 '>
												<p className='text-2xl text-slate-700 font-medium text-center p-2'>Sinu ostukorv</p>
											</button>
												{items.length > 0 ? items.map((item: Grocery, index: number) => {
													return (
														<div className='flex items-center bg-white rounded-xl gap-3 mb-2 p-2 '>
															<div className={'block relative'}>
																<img className={"w-20"} src={item.image}/>
																<span className={'absolute bottom-0 right-0 bg-slate-500 w-8 h-8 bg-opacity-85 rounded-full m-0 flex items-center text-center justify-center'}> <p className='text-white'>{values[index]}</p> </span>
															</div>
															<p key={index}><span>{item.name.length > 15 ? item.name.substring(0,15) + '...': item.name}</span> {item.price} $</p>
														</div>
													)
												}): <p className="text-xl text-slate-700 font-medium text-center">Sinu ostukorv on tühi!</p>}
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
						
					</Toolbar>
				</AppBar>
			</Box>
			<div className="p-7 bg-white flex place-content-center space-x-5">
				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={VegetablesPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal transition
					flex place-content-center place-items-center'>Köögiviljad, puuviljad</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={MilkPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Piimatooted ja munad
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={BreadPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Leivad, saiad, kondiitritooted
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={MeatPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Liha, kala, valmistoit
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={FlourPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Kauasäilivad toidukaubad
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={FrozenPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Külmutatud tooted
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={DrinksPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Joogid
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={BrushPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Enesehooldus tooted
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={CleaningPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Puhastustarbed ja loomatooted
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={ChildrenPicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Lastekaubad
					</a>
				</div>

				<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
					<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
					bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
						<Image className="w-24 h-24 flex" src={HomePicture} alt="" />
					</button>
					<a href="" className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
					flex place-content-center place-items-center'>Kodukaubad ja vaba aeg
					</a>
				</div>
			</div>
		</ThemeProvider>

		</div>
		
	);
}