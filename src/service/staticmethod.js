import AppEndPoints from "../config/AppEndPoints";
import ApiService from "./ApiService";

class StaticMethod {
    static openWhatsApp() {
        const number = localStorage.getItem('whatsapp_no');
        window.open(`https://wa.me/${number}`);
    }


    static async checkBookStatus() {
        const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
        
        const headers = {
            Authorization: `Bearer ${token}`, // Example header to specify language
            'Access-Control-Max-Age': '3600',
            // Add other headers as needed
        };
    
        try {
            const response = await ApiService.getData(AppEndPoints.book_status, headers);
            if (response.errorCode === 0) {
                const isPhone = response?.data?.is_phone || false;
                const isVerified = response?.data?.is_verified || false;
                return { isPhone, isVerified };
            } else {
                return { isPhone: false, isVerified: false }; // or handle the error case as needed
            }
        } catch (error) {
            console.log(error);
            return { isPhone: false, isVerified: false }; // or handle the error case as needed
        }
    }
    
}

export default StaticMethod;