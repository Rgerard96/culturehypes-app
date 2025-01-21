import randomInteger from "random-int";

export const generateAuthtoken = () => {
    const randomCode = randomInteger(100000, 999999);

    return randomCode;
};


export default generateAuthtoken;