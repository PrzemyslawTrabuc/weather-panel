const convertUnixTime=(unixTime: number) =>{
    const unixTimestamp = unixTime;
    const miliseconds = unixTime * 1000;
    const dateObject = new Date(miliseconds);
    const hourString = String(dateObject.getHours()).padStart(2,'0');
    const minutesString = String(dateObject.getMinutes()).padStart(2,'0');
    return `${hourString}:${minutesString}`
}

export default convertUnixTime