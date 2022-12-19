import { Dialog } from "@headlessui/react";
import { useState } from "react";
import BurgerButton from '../images/hamburger-menu.svg';
import CategoryButton from '../images/category-menu.svg';
import Image from "next/image";
import Link from "next/link";
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

const categories = [
    [VegetablesPicture, "Köögiviljad, puuviljad"],
    [MilkPicture, "Piimatooted ja munad"],
    [BreadPicture, "Leivad, saiad, kondiitritooted"],
    [MeatPicture, "Liha, kala, valmistoit"],
    [FlourPicture, "Kauasäilivad toidukaubad"],
    [FrozenPicture, "Külmutatud tooted"],
    [DrinksPicture, "Joogid"],
    [BrushPicture, "Enesehooldus tooted"],
    [CleaningPicture, "Puhastustarbed ja loomatooted"],
    [ChildrenPicture, "Lastekaubad"],
    [HomePicture, "Kodukaubad ja vaba aeg"],
    [OtherPicture, "Muu"]
];

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className='flex sm:hidden bg-neutral-800 fixed bottom-0 w-full h-20 text-stone-300 items-center'>
                {/* <button className="w-full h-full flex flex-col items-center p-2" onClick={() => { setIsOpen(!isOpen) }}>
                    <Image className="max-w-[50%] max-h-[50%]" src={BurgerButton} alt="hamburger button" />
                    <span className="mt-1 text-md text-[#f2f6f7]">Menu</span>
                </button> */}
                <button className="w-full h-full flex flex-col items-center p-2" onClick={() => { setIsOpen(!isOpen) }}>
                    <Image className="max-w-[50%] max-h-[50%]" src={CategoryButton} alt="category button" />
                    <span className="mt-1 text-md text-[#f2f6f7]">Kategooriad</span>
                </button>
            </div>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 overflow-y-auto">
                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center p-4 w-full h-full">
                        {/* The actual dialog panel  */}
                        <Dialog.Panel className="p-5 mx-auto max-w-full max-h-full rounded bg-white w-full h-full">
                            <Dialog.Title className='text-3xl'>Kategooriad</Dialog.Title>
                            <div className=" bg-white flex flex-col place-content-center">
                                {categories.map((category, index) => {
                                    return (
                                        <Link href={`/category/${index}`} onClick={() => setIsOpen(false)}>
                                            <div className='border-b-2 border-slate-100 flex items-center'>
                                                <p className='mt-3 text-2xl text-slate-700 font-medium break-word'>
                                                    {category[1]}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}