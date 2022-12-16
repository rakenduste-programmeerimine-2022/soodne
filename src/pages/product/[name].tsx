import Chart, { CategoryScale } from 'chart.js/auto';
import { K } from 'chart.js/dist/chunks/helpers.core';
import { Grocery } from "groceries-component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import BigProduct from "../../components/BigProduct";
import Footer from '../../components/Footer';
import NavigationBar from "../../components/NavigationBar";
import { createChart } from "../../utils/parseData";

export default function BigProductPage( { data }: any) {
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<Map<string, [Grocery, number]>>(new Map());
    Chart.register(CategoryScale);
    const router = useRouter();
    if (typeof router.query.product !== "string") return;
    const counter = typeof router.query.count === 'string' ? Number(router.query.count) : 0;
    const item = JSON.parse(router.query.product) as Grocery;
    
    const image = item.image;
    const name = item.name;
    const rimiPrice = item.rimi_price;
    const selverPrice = item.selver_price;
    const coopPrice = item.coop_price;
    const barboraPrice = item.barbora_price;
    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            setCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
        }
    }, [])
 
    useEffect(() => {
		// console.log(cart);
		// setTimeout(() => setHasChanged(false), 1000);
		let currentTotal = 0;
		cart.forEach((product, title) => {
			currentTotal += product[1] * (product[0].allPrices ? Math.min.apply(null, product[0].allPrices) : 0);
		});
		setTotal(Math.round(currentTotal * 100) / 100);
		localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));
		// console.log(localStorage.getItem('cart'));
	}, [cart])

    // console.log(product);

    return(
        <div className={'flex flex-col'}>
            <NavigationBar 
                total={total} 
                items={cart} 
                triggerOpen={false}
            />
            <BigProduct 
                count={counter}
                image={image}
                productName={name}
                rimiPrice={rimiPrice}
                selverPrice={selverPrice}
                coopPrice={coopPrice}
                barboraPrice={barboraPrice}
                onChanged={(number) => {
                    if (number !== 0) {
                        // console.log(JSON.stringify(Array.from(cart.entries()).pop()?.[0]));
                        // console.log(cart);
                        
                        setCart(new Map(cart.set(item.name, [item, number])));
                    } else {
                        cart.delete(item.name);
                        setCart(new Map(cart));
                    }
                    // setHasChanged(true);
                }}
            />
           {data.datasets.length > 0 ? 
                <div className='bg-white rounded-lg px-5 py-10 flex flex-col self-center items-center w-auto h-auto mt-10 mb-10'>
                    <h1 className='self-start text-4xl text-orange-400 mb-5 ml-5'>Hinnamuutused</h1>
                    <Line width={1000} height={500} data={data}/>
                </div> 
            : null}
        </div>
    )
}

export async function getStaticPaths() {
    // const products = [...await Parser.getAllBarboraItems(), ...await Parser.getAllRimiItems()];
    const paths = [] as any[];
    // for (let i = 0; i < products.length; i++) {
    //     paths.push("/product/" + products[i].name);
    // }
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }: any) {
    // console.log(params);
    
    const data = await createChart(params.name);
    // const data = {};
    return {
        props: {
            data
        }
    }
}
