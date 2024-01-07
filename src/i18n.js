import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "Travel": "Travel",
            "Food": "Food",
            "Shop": "Shop",
            "Search...": "Search...",
            "Home": "Home",
            "Category": "Category",
            "Travels": "Travels",
            "Foods": "Foods",
            "Shoping (OTOP Product)": "Shoping (OTOP Product)",
            "Booking": "Booking",
            "NEWS": "NEWS",
            "Sign In" : "Sign In",
            "Sign Up" : "Sign Up",
            "Book Now" : "Book Now",
            "Top Travels" : "Top Travels",
            "Top Foods" : "Top Foods",
            "Top Shops" : "Top Shops",
            "Top Hotels" : "Top Hotels",
            "Manage My Account" : "Manage My Account",
            "My Order" : "My Order",
            "In Progress" : "In Progress",
            "My Favorite" : "My Favorite",
            "My Reviews" : "My Reviews",
            "My History" : "My History",
            "Logout" : "Logout",
            "Add Product" : "Add Product",
            "Add Tour" : "Add Tour",
            "Add Food" : "Add Food",
            "Add OTOP Product" : "Add OTOP Product",
            "Add Hotel" : "Add Hotel",
            "Add NEWS" : "Add NEWS",
            "EDIT TOUR" : "EDIT TOUR",
            "View Orders" : "View Orders",
            "Reviews" : "Reviews",
            "Language" : "Language",
            "Welcome to PaiPaw! Please Sign Up." : "Welcome to PaiPaw! Please Sign Up.",
            "SIGN UP" : "SIGN UP",
            "Name" : "Name",
            "Surname" : "Surname",
            "Address" : "Address",
            "Email" : "Email",
            "Password" : "Password",
            "Password Again" : "Password Again",
            "I agree to the Terms of Service. and Privacy Policy." : "I agree to the Terms of Service. and Privacy Policy.",
            "Have user?" : "Have user?",
            "Here" : "Here",
            "New user?" : "New user?",
            "Forget Password?" : "Forget Password?",
            "Remember Me." : "Remember Me.",
            "Welcome to PaiPaw! Please Sign In." : "Welcome to PaiPaw! Please Sign In.",
            "SIGN IN" : "SIGN IN",
            "History" : "History",
            "Price":"Price",
            "ADD NEWS" : "ADD NEWS",
            "TITLE" : "TITLE",
            "English title..." : "English title...",
            "Thai title..." : "Thai title...",
            "DESCRIPTION" : "DESCRIPTION",
            "English description..." : "English description...",
            "Thai description..." : "Thai description...",
            "IMAGES" : "IMAGES",
            "ADD" : "ADD",
            "Upload File": "Upload File",
            "ADD TOUR" : "ADD TOUR",
            "PRICE" : "PRICE",
            "Adult Price..." : "Adult Price...",
            "Child Price..." : "Child Price...",
            "MAX PEOPLE" : "MAX PEOPLE",
            "Max people..." : "Max people...",
            "DATE TIME" : "DATE TIME",
            "Start" : "Start",
            "End" : "End",
            "Upload" : "Upload",
            "LINK VIDEO YOUTUBE" : "LINK VIDEO YOUTUBE",
            "Add +" : "Add +",
            "Sort by" : "Sort by",
            "Select" : "Select",
            "Rating" : "Rating",
            "Min" : "Min",
            "Max" : "Max",
            "Best Match" : "Best Match",
            "Hight Price - Low Price" : "Hight Price - Low Price",
            "Low Price - Hight Price" : "Low Price - Hight Price",
            "TOP TOURS" : "TOP TOURS",
            "TOP FOODS" : "TOP FOODS",
            "Tours" : "Tours",
            "Detail" : "Detail",
            "Adult" : "Adult",
            "Child" : "Child",
            "DETAIL" : "DETAIL",
            "Orderer" : "Orderer",
            "Bill" : "Bill",
            "Status" : "Status",
            "Paid" : "Paid",
            "Not Paid" : "Not Paid",
            "Click" : "Click",
            "None" : "None",
            "Confirm" : "Confirm",
            "Cancel" : "Cancel",
            "Warning" : "Warning",
            "Are you sure to cancel?" : "Are you sure to cancel?",
            "Yes" : "Yes",
            "OK" : "OK",
            "Edit" : "Edit",
            "Delete" : "Delete",
            "Buy Now" : "Buy Now",
            "Shoping" : "Shoping",
            "TOURS" : "TOURS",
            "FOODS" : "FOODS",
            "Manage account" : "Manage account",
            "SAVE" : "SAVE",
            "CANCEL" : "CANCEL",
            "Add your comment..." : "Add your comment...",
            "Are you sure to delete?" : "Are you sure to delete?",
            "No" : "No" ,
            "TOURS ORDER" : "TOURS ORDER",
            "Complete" : "Complete",
            'Book your tour' : 'Book your tour',
            'Ticket' : 'Ticket',
            'Amount' : 'Amount',
            'price' : 'price',
            'Total' : 'Total',
            "Sync information from your account?" : "Sync information from your account?",
            "Note..." : "Note...",
            "Note" : "Note",
            "Confirm to your Booking" : "Confirm to your Booking",
            "Phone number" : "Phone number",
            'Contact' : 'Contact',
            'Mobile Banking' : 'Mobile Banking',
            'Order Summary' : 'Order Summary',
            'Slip' : 'Slip',
            "Thank you for your visiting." : "Thank you for your visiting.",
            "Back to Home" : "Back to Home",
            'Finish' : 'Finish',
            'Next' : 'Next',
            "Order Number" : "Order Number",
            "Max Image is" : "Max Image is",
            "Time" : "Time",
            "IMAGE" : "IMAGE",
            "KRUNGTHAI BANK" : "KRUNGTHAI BANK",
            "The Siam Commercial Bank" : "The Siam Commercial Bank",
            "Please complete the information." : "Please complete the information.",
            "A confirmation email link has been sent to your account." : "A confirmation email link has been sent to your account.",
            "Tour name" : "Tour name",
            "SOLD OUT" : "SOLD OUT",
            "Coming soon." : "Coming soon.",
            "NOT FOUND" : "NOT FOUND",


        }
    },
    th: {
        translation: {
            "Travel": "เที่ยว",
            "Food": "อาหาร",
            "Shop": "ช็อป",
            "Search...": "ค้นหา...",
            "Home": "หน้าหลัก",
            "Category": "รายการ",
            "Travels": "ท่องเที่ยว",
            "Foods": "อาหาร",
            "Shoping (OTOP Product)": "ช็อปปิ้ง (สินค้า OTOP)",
            "Booking": "จองโรงแรม",
            "NEWS": "ข่าวสาร",
            "Sign In" : "ลงชื่อเข้าใช้",
            "Sign Up" : "สร้างบัญชีใหม่",
            "Book Now" : "จองเลย",
            "Top Travels" : "ท่องเที่ยวยอดนิยม",
            "Top Foods" : "อาหารยอดนิยม",
            "Top Shops" : "สินค้ายอดนิยม",
            "Top Hotels" : "โรงแรมยอดนิยม",
            "Manage My Account" : "จัดการบัญชี",
            "My Order" : "รายการสั่งซื้อ",
            "In Progress" : "กำลังดำเนินการ",
            "My Favorite" : "รายการโปรด",
            "My Reviews" : "รีวิว",
            "My History" : "ประวัติการสั่งซื้อ",
            "Logout" : "ออกจากระบบ",
            "Add Product" : "เพิ่มรายการสินค้า",
            "Add Tour" : "เพิ่มรายการทัวร์",
            "Add Food" : "เพิ่มรายการอาหาร",
            "Add OTOP Product" : "เพิ่มสินค้าโอท็อป",
            "Add Hotel" : "เพิ่มโรงแรม",
            "Add NEWS" : "เพิ่มข่าว",
            "View Orders" : "ดูรายการสั่งซื้อ",
            "Reviews" : "รีวิว",
            "Language" : "ภาษา",
            "Welcome to PaiPaw! Please Sign Up." : "ยินดีต้อนรับสู่ PaiPaw! กรุณาสมัครใช้งาน",
            "SIGN UP" : "สร้างบัญชีใหม่",
            "Name" : "ชื่อ",
            "Surname" : "นามสกุล",
            "Address" : "ที่อยู่",
            "Email" : "อีเมล",
            "Password" : "รหัสผ่าน",
            "Password Again" : "รหัสผ่านอีกครั้ง",
            "I agree to the Terms of Service. and Privacy Policy." : "ฉันยอมรับข้อตกลงในการให้บริการ. และนโยบายความเป็นส่วนตัว",
            "Have user?" : "มีบัญชีแล้ว?",
            "Here" : "ที่นี่",
            "New user?" : "ผู้ใช้ใหม่?",
            "Forget Password?" : "ลืมรหัสผ่าน?",
            "Remember Me." : "จดจำฉัน",
            "Welcome to PaiPaw! Please Sign In." : "ยินดีต้อนรับสู่ PaiPaw! กรุณาลงชื่อเข้าใช้",
            "SIGN IN" : "ลงชื่อเข้าใช้",
            "History" : "ประวัติการสั่งซื้อ",
            "Price":"ราคา",
            "ADD NEWS" : "เพิ่มข่าวสาร",
            "TITLE" : "หัวข้อ",
            "English title..." : "หัวข้อภาษาอังกฤษ...",
            "Thai title..." : "หัวข้อภาษาไทย...",
            "DESCRIPTION" : "คำอธิบาย",
            "English description..." : "คำอธิบายภาษาอังกฤษ...",
            "Thai description..." : "คำอธิบายภาษาไทย...",
            "IMAGES" : "รูปภาพ",
            "ADD" : "เพิ่ม",
            "Upload File": "อัปโหลดไฟล์",
            "ADD TOUR" : "เพิ่มทัวร์",
            "PRICE" : "ราคา",
            "Adult Price..." : "ราคาสำหรับผู้ใหญ่...",
            "Child Price..." : "ราคาสำหรับเด็ก...",
            "MAX PEOPLE" : "จำนวนคนสูงสุด",
            "Max people..." : "จำนวนคนสูงสุด...",
            "DATE TIME" : "วัน-เวลา",
            "Start" : "เริ่มต้น",
            "End" : "สิ้นสุด",
            "Upload" : "อัปโหลด",
            "LINK VIDEO YOUTUBE" : "ลิงค์วีดีโอยูทูป",
            "Add +" : "เพิ่ม +",
            "Sort by" : "เรียงตาม",
            "Select" : "เลือก",
            "Rating" : "เรทติ้ง",
            "Min" : "น้อยที่สุด",
            "Max" : "มากที่สุด",
            "Best Match" : "การจับคู่ที่ดีที่สุด",
            "Hight Price - Low Price" : "แพงที่สุด - ถูกที่สุด",
            "Low Price - Hight Price" : "ถูกที่สุด - แพงที่สุด",
            "TOP TOURS" : "ทัวร์ยอดนิยม",
            "TOP FOODS" : "อาหารยอดนิยม",
            "Tours" : "ทัวร์",
            "Detail" : "รายละเอียด",
            "Adult" : "ผู้ใหญ่",
            "Child" : "เด็ก",
            "DETAIL" : "รายละเอียด",
            "Orderer" : "ผู้สั่งซื้อ",
            "Bill" : "ใบเสร็จ",
            "Status" : "สถานะ",
            "Paid" : "จ่ายแล้ว",
            "Not Paid" : "ยังไม่จ่าย",
            "Click" : "กด",
            "None" : "ว่าง",
            "Confirm" : "ยืนยัน",
            "Cancel" : "ยกเลิก",
            "Warning" : "คำเตือน",
            "Are you sure to cancel?" : "ต้องการยกเลิกใช่หรือไม่?",
            "Yes" : "ใช่",
            "OK" : "ตกลง",
            "Edit" : "แก้ไข",
            "Delete" : "ลบ",
            "Buy Now" : "ซื้อเลย",
            "Shoping" : "ช็อปปิ้ง",
            "TOURS" : "รายการทัวร์",
            "FOODS" : "รายการอาหาร",
            "Manage account" : "จัดการบัญชี",
            "SAVE" : "บันทึก",
            "CANCEL" : "ยกเลิก",
            "Add your comment..." : "เพิ่มความคิดเห็นของคุณ...",
            "Are you sure to delete?" : "ต้องการลบใช่หรือไม่?",
            "No" : "ไม่",
            "Complete" : "เสร็จสิ้น",
            'Book your tour' : 'จองทัวร์ของคุณ',
            'Ticket' : 'ตั๋ว',
            'Amount' : 'จำนวน',
            'price' : 'ราคา',
            'Total' : 'รวม',
            "Sync information from your account?" : "ซิงค์ข้อมูลจากบัญชีของคุณ",
            "Note..." : "หมายเหตุ...",
            "Note" : "หมายเหตุ",
            "Confirm to your Booking" : "ยืนยันการจอง",
            "Phone number" : "หมายเลขโทรศัพท์",
            'Contact' : 'ช่องทางการติดต่อ',
            'Mobile Banking' : 'โมบายล์ แบงค์กิ้ง',
            'Order Summary' : 'ยอดรวมการสั่งซื้อ',
            "Thank you for your visiting." : "ขอบคุณที่ใช้บริการ",
            "Back to Home" : "กลับสู่หน้าหลัก",
            "Back" : "ย้อนกลับ",
            'Finish' : 'เสร็จสิ้น',
            'Next' : 'ถัดไป',
            "Order Number" : "หมายเลขการสั่งซื้อ",
            "Max Image is" : "จำนวนรูปสูงสุด",
            "Time" : "เวลา",
            "IMAGE" : "รูปภาพ",
            "KRUNGTHAI BANK" : "ธนาคารกรุงไทย",
            "The Siam Commercial Bank" : "ธนาคารไทยพาณิขย์",
            "EDIT TOUR" : "แก้ไขรายการทัวร์",
            "Please complete the information." : "กรุณาหรอกข้อมูลให้ครบถ้วน",
            "A confirmation email link has been sent to your account." : "ระบบส่งลิงค์สำหรับยืนยันอีเมลไปที่บัญชีของคุณแล้ว",
            "Tour name" : "ชื่อทัวร์",
            "SOLD OUT" : "เต็มแล้ว",
            "Coming soon." : "เร็วๆ นี้",
            "NOT FOUND" : "ไม่เจอรายการที่ค้นหา",
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;