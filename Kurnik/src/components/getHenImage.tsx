import "../PlayerScreen.css";

const imageBasePath = '/henhouses/';

const getHenImage = (count: number) => {
    const safeCount = Math.max(0, Math.min(count, 9));
    return `${imageBasePath}HenCount${safeCount}.png`;
}

export default getHenImage;
