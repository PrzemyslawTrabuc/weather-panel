const convertUnixTime=(unixTime: number) =>{
    const unixTimestamp:number = unixTime;
    const miliseconds:number = unixTime * 1000;
    const dateObject:Date = new Date(miliseconds);
    const hourString:string = String(dateObject.getHours()).padStart(2,'0');
    const minutesString:string = String(dateObject.getMinutes()).padStart(2,'0');
    return {hour:hourString, minutes:minutesString}
}

export default convertUnixTime