import {
    Box,
    Button,
    createTheme,
    IconButton,
    Stack,
    ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { grey, red } from "@mui/material/colors";
import { useState } from "react";
import Image from "next/image";
import Barbora from "../images/barbore.png"
import Rimi from "../images/rime.png"
import Coop from "../images/cope.png"
import Selver from "../images/selve.png"
import { promise } from "zod";
import { Chart } from "chart.js";
import { createChart } from "../utils/parseData";
import { useEffect } from "react";

interface Props {
    image: string;
    productName: string;
    rimiPrice?: number;
    selverPrice?: number;
    coopPrice?: number;
    barboraPrice?: number;
    onChanged(count: number): void;
    count: number;
}

const themeColor = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: "#ff5722",
        },
    },
});


export default function BigProduct(props: Props) {
    const [counter, setCounter] = useState<number>(props.count);

    useEffect(() => {
        if (typeof counter === 'undefined' || counter < 0) return;
        props.onChanged(counter);
    }, [counter])

    useEffect(() => {
        if (props.count) setCounter(props.count);
    }, [props.count])

    return (
        <div className="items-center mt-16 rounded-lg space-x-20 bg-white p-10 w-auto flex-row flex place-content-center place-items-center self-center">
            <div className="flex-col items-center flex">
                <h1 className="self-start text-2xl text-slate-800 mb-5 font-bold">{props.productName}</h1>
                <img
                    alt={"a picture of " + props.productName}
                    className=""
                    src={props.image}
                    width={200}
                    height={200}
                ></img>

                {counter && counter > 0 ?
                    <div className="h-10 border-orange-500 border-2 rounded-full space-x-20 flex flex-row place-content-center place-items-center">
                        <IconButton
                            color="primary"
                            disabled={counter == 0}
                            aria-label="upload picture"
                            component="label"
                            onClick={() => setCounter(counter - 1)}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <p className="">{counter}</p>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            onClick={() => setCounter(counter + 1)}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                    :
                    <div className="flex mb-4 mt-10 place-content-center transition ease-in-out delay-50 hover:bg-orange-400 duration-200 bg-orange-200 border-2 border-orange-500 rounded">
                        <button onClick={() => setCounter(1)} className="text-gray-800 font-bold flex text-xl">Lisa ostukorvi</button>
                    </div>
                }

            </div>
            <div className="pr-10 flex-col space-y-10 w-[20rem]">
                {props.barboraPrice ? <div className="flex flex-raw items-center">
                    <Image alt="barbora logo" className="w-20 h-8 mr-16 flex" src={Barbora}></Image>
                    <p className="text-2xl text-orange-500 font-medium">{props.barboraPrice}</p>
                </div> : null}
                {props.rimiPrice ? <div className="flex flex-raw items-center">
                    <Image alt="rimi logo" className="w-auto h-6 mr-16 flex" src={Rimi}></Image>
                    <p className="text-2xl text-orange-500 font-medium">{props.rimiPrice}</p>
                </div> : null}
                {props.selverPrice ? <div className="flex flex-raw items-center">
                    <Image alt="selver logo" className="w-auto h-6 mr-16 flex" src={Selver}></Image>
                    <p className="text-2xl text-orange-500 font-medium">{props.selverPrice}</p>
                </div> : null}
                {props.coopPrice ? <div className="flex flex-raw items-center">
                    <Image alt="coop logo" className="-ml-2 w-auto h-8 mr-14 flex" src={Coop}></Image>
                    <p className="text-2xl text-orange-500 font-medium">{props.coopPrice}</p>
                </div> : null}
            </div>
            <div></div>
            {/* {new Chart(
                type: 'line',
                data: parseData.createChart(props.productName),
                options: {
                  responsive: true,
                  interaction: {
                    intersect: false,
                    axis: 'x'
                  },
                  plugins: {
                    title: {
                      display: true,
                      text: (ctx) => 'Step ' + ctx.chart.data.datasets[0].stepped + ' Interpolation',
                    }
                  }
                }
            )}; */}
        </div>
    )
}

