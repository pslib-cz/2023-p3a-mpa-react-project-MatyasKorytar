import "../PlayerScreen.css";

import HenCount0 from "../assets/henhouses/HenCount0.png";
import HenCount1 from "../assets/henhouses/HenCount1.png";
import HenCount2 from "../assets/henhouses/HenCount2.png";
import HenCount3 from "../assets/henhouses/HenCount3.png";
import HenCount4 from "../assets/henhouses/HenCount4.png";
import HenCount5 from "../assets/henhouses/HenCount5.png";
import HenCount6 from "../assets/henhouses/HenCount6.png";
import HenCount7 from "../assets/henhouses/HenCount7.png";
import HenCount8 from "../assets/henhouses/HenCount8.png";
import HenCount9 from "../assets/henhouses/HenCount9.png";

const getHenImage = (count: number) => {
    const safeCount = Math.max(0, Math.min(count, 9)); 
    const henImages = [HenCount0, HenCount1, HenCount2, HenCount3, HenCount4, HenCount5, HenCount6, HenCount7, HenCount8, HenCount9];
    return henImages[safeCount];
}

export default getHenImage;
