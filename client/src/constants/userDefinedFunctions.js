import axios from "axios";

export const getUserNameByUserId = async (user_id) => {



    try {
        const res = await axios.get(`http://localhost:8000/api/accounts/user/user_id/${user_id}`);
        // console.log(res);
        if (res.status === 200) {
            // console.log(res.data.username);
            return res.data.user.username;
        }
        else {
            console.error(res);
            return null;
        }
    }
    catch (err) {

        console.error(err);
    }

}

export const getLocalUpdatedDateToRenderInAuthorDetails = (updatedAt) => {
    if (!updatedAt) return '';
    let [month, day, year] = new Date(updatedAt).toLocaleDateString().split('/');
    const arrayOfNamesOfMonths = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    day = parseInt(day, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
        return arrayOfNamesOfMonths[month] + ' ' + day + ', ' + year;
    }
    else return '';

}
export const getHowManyWords = (content) => {

    return content.split(' ').length;

}
export const getTimeTakenToReadBlogInStringFormat = (content) => {

    const nWords = getHowManyWords(content);
    const avgWPM = 270;

    const time = Math.ceil(nWords / avgWPM);
    return time + ' min read';



}
