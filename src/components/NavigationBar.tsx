import { Popover, Transition } from '@headlessui/react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { alpha, AppBar, createTheme, IconButton, InputBase, styled, ThemeProvider, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import RemoveIcon from "@mui/icons-material/Remove";
import red from "@mui/material/colors/red";
import { Grocery } from 'groceries-component';
import Image from 'next/image';
import Link from 'next/link';
import BreadPicture from '../images/bread.svg';
import ChildrenPicture from '../images/children.svg';
import CleaningPicture from '../images/cleaning.svg';
import DrinksPicture from '../images/drinks.svg';
import FlourPicture from '../images/flour.svg';
import FrozenPicture from '../images/frozen.svg';
import HomePicture from '../images/home.svg';
import MeatPicture from '../images/meat.svg';
import MilkPicture from '../images/milk.svg';
import OtherPicture from '../images/other.svg';
import BrushPicture from '../images/toothbrush.svg';
import VegetablesPicture from '../images/vegetables.svg';
import BasketPopupItem from './BasketPopupItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import SearchBarItem from './SearchBarItem';
import styledCon from 'styled-components';

const SoodneColor = deepOrange[400]

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
	width: 'auto',
	display: 'flex',
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
	width: 'full',
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
	total: number;
	items: Map<string, [Grocery, number]>,
	triggerOpen: boolean,
	onChanged(item: Grocery, count: number): void;
}

const categories = [
	[VegetablesPicture, "K????giviljad, puuviljad"],
	[MilkPicture, "Piimatooted ja munad"],
	[BreadPicture, "Leivad, saiad, kondiitritooted"],
	[MeatPicture, "Liha, kala, valmistoit"],
	[FlourPicture, "Kauas??ilivad toidukaubad"],
	[FrozenPicture, "K??lmutatud tooted"],
	[DrinksPicture, "Joogid"],
	[BrushPicture, "Enesehooldus tooted"],
	[CleaningPicture, "Puhastustarbed ja loomatooted"],
	[ChildrenPicture, "Lastekaubad"],
	[HomePicture, "Kodukaubad ja vaba aeg"],
	[OtherPicture, "Muu"]
];

// const CategoryContainer = styledCon.div`
// 	// w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200
// 	width: 32;
// 	height: auto;


// `;

export default function NavigationBar(props: Props) {
	const [query, setQuery] = useState<string>("");
	const [openSearchBar, setOpenSearchBar] = useState(false);
	const findItem = trpc.findItem.useQuery({ title: query?.length > 0 ? query : "" });
	let titles: string[];
	let values: [Grocery, number][];

	if (props.items.size !== 0) {
		titles = Array.from(props.items.keys());
		values = Array.from(props.items.values());
	}

	useEffect(() => {
		if (findItem?.data && findItem?.data?.length > 0) setOpenSearchBar(true);
	}, [query])

	return (
		<div>
			<ThemeProvider theme={themeColor}>
				<AppBar position="relative" className={"flex flex-col shadow-none items-center"}>
					<div className='flex w-full place-content-evenly'>
						<Typography
							color={SoodneColor}
							variant="h2"
							component="div"
						>
							<a className="" href="/">Soodne</a>
						</Typography>
						<Search className="hidden sm:block self-center w-[60%]">
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search???"
								inputProps={{ 'aria-label': 'search' }}
								onChange={(text) => setQuery(text?.target.value)}
								className='w-full'
							/>
							<Popover className={'flex absolute mt-56'} >
								{({ open }) => (
									<>
										<Transition
											className={`${openSearchBar ? "fixed right-150 top-16 rounded border-2 border-black " : ""}`}
											show={openSearchBar || open}
											enter="transition duration-100 ease-out"
											enterFrom="transform scale-95 opacity-0"
											enterTo="transform scale-100 opacity-100"
											leave="transition duration-75 ease-out"
											leaveFrom="transform scale-100 opacity-100"
											leaveTo="transform scale-95 opacity-0"
										>
											<Popover.Panel className={'bg-white mt-46'}>
												{findItem.data ? findItem.data?.map(item => {
													return (
														<SearchBarItem
															item={item}
														/>
													)
												}) : null}
											</Popover.Panel>
										</Transition>
									</>
								)}
							</Popover>
						</Search>

						<Popover className={'flex items-center'}>
							{({ open }) => (
								<>
									<Popover.Button className={`focus:outline-none sticky top-4 h-10`}>
										<div className='group w-auto flex h-10'>
											<ShoppingCartOutlinedIcon className={" group-hover:fill-orange-700 w-10 h-10 duration-75 mr-4"} />
											{values?.length > 0 ?
												<span className={'absolute left-6 -top-2 bg-slate-500 w-6 h-6 bg-opacity-85 rounded-full m-0 items-center text-center justify-center'}>
													<p className='text-white'>{values.length > 0 ? values.reduce((resultItem, currentItem) => [resultItem[0], resultItem[1] + currentItem[1]])[1] : 0}</p>
												</span> : null}
											<p className='text-2xl text-slate-700 font-medium group-hover:text-orange-700 duration-75 whitespace-nowrap'>{props.total} ???</p>
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
										<Popover.Panel className={'absolute -left-[425px] rounded-2xl bg-orange-500'}>
											<div className='p-2 rounded-2xl w-96'>
												<Link href={'/basket'}>
													<div className='bg-orange-100 border-2 border-orange-300 w-full h-fit mb-5 rounded-xl transition ease-in-out delay-50 hover:scale-95 duration-150 '>
														<p className='text-2xl text-slate-700 font-medium text-center p-2'>Sinu ostukorv</p>
													</div>
												</Link>
												{values?.length > 0 ? values.map((item, index: number) => {
													return (
														<BasketPopupItem
															key={index}
															item={item[0]}
															onChanged={(counter) => props.onChanged(item[0], counter)}
															count={props.items.get(item[0].name)?.[1]}
														/>
													)
												}) : <p className="text-xl text-slate-700 font-medium text-center">Sinu ostukorv on t??hi!</p>}
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					</div>
					<Search className="block sm:hidden w-[90%] self-center my-5">
						<SearchIconWrapper>
							<SearchIcon/>
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search???"
							inputProps={{ 'aria-label': 'search' }}
							onChange={(text) => setQuery(text?.target.value)}
							className='w-full'
						/>
						<Popover className={'flex absolute mt-56'} >
							{({ open }) => (
								<>
									<Transition
										className={`${openSearchBar ? "fixed right-150 top-16 rounded border-2 border-black " : ""}`}
										show={openSearchBar || open}
										enter="transition duration-100 ease-out"
										enterFrom="transform scale-95 opacity-0"
										enterTo="transform scale-100 opacity-100"
										leave="transition duration-75 ease-out"
										leaveFrom="transform scale-100 opacity-100"
										leaveTo="transform scale-95 opacity-0"
									>
										<Popover.Panel className={'bg-white mt-46'}>
											{findItem.data ? findItem.data?.map(item => {
												return (
													<SearchBarItem
														item={item}
													/>
												)
											}) : null}
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					</Search>
				</AppBar>
				<div className="hidden p-[2vw] bg-white sm:flex place-content-center gap-[1vw]">
					{categories.map((category, index) => {
						return (
							<Link href={`/category/${index}`}>
								<div className='flex flex-col max-w-[150px] max-h-[200px] items-center text-center transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
									<div className='transition ease-in-out delay-50 hover:scale-110 hover:bg-orange-200 duration-200 bg-orange-50 rounded-full border-2 border-orange-100'>
										<Image className='w-full h-full p-[1vw]' src={category[0]} alt="" />
									</div>
									<p className='mt-3 text-[1vw] text-slate-700 font-medium  break-word'>
										{category[1]}
									</p>
								</div>
							</Link>
						)
					})}
				</div>
			</ThemeProvider>

		</div>

	);
}
