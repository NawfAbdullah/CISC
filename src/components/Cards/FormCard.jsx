import { motion } from "framer-motion";
import '../../styles/FormCard.css'

const FormCard = ({children,styleClass}) => {
    return <motion.div
        className={styleClass}
        initial={{x:-200}}
        animate={{x:0}}
        exit={{x:200}}
    >
        {children}
    </motion.div>;
}
 
export default FormCard;