const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');
const hour = String(currentDate.getHours()).padStart(2, '0');
const minute = String(currentDate.getMinutes()).padStart(2, '0');
const second = String(currentDate.getSeconds()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

export default formattedDate;
