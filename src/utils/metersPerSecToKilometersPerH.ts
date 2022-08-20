const convertMpsToKmph = (mps:number):number =>{
        let kmph = mps * 3600;
        kmph = kmph/1000;
    return kmph;
}

export default convertMpsToKmph