import axios from "axios";

axios.defaults.validateStatus = (_) => true;

export default axios;